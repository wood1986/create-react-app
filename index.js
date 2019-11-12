/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-process-env, dot-notation
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const http = require("http"),
      http2 = require("http2"),
      polka = require("polka"),
      path = require("path"),
      morgan = require("morgan"),
      serveStatic = require("serve-static"),
      app = require("./dist/node.index.js"),
      fetch = require("node-fetch"),
      vm = require("vm"),
      selfsigned = require("selfsigned");

const pems = selfsigned.generate(null, {"algorithm": "sha256", "days": 1, "keySize": 2048}),
      codes = new Map();

[
  polka({
    "server": http2.createSecureServer({
      "allowHTTP1": true,
      "cert": Buffer.from(pems.cert),
      "key": Buffer.from(pems.private)
    })
  }).listen(443),
  polka({
    "server": http.createServer()
  }).listen(80)
].forEach((polka) => {
  polka.
    use(morgan("tiny")).
    use("/statics", serveStatic(path.join(__dirname, "dist"))).
    get("/ssr", (req, res) => {
      let p = null;
      if (app.entry === req.query.entry && req.query.vm !== "true") {
        p = app.default(req);
      } else {
        let code = codes.get(req.query.entry);
        if (req.query.cache === "false" || !code || Date.now() - code.createdAt > 60 * 60 * 15 ) {
          code = {};
          code.promise = fetch(`https://localhost${req.query.entry}`).
            then((res) => res.text()).
            then((code) => new vm.Script(code));
          code.createdAt = Date.now();
          codes.set(req.query.entry, code);
        }

        p = code.promise.then((script) => {
          const options = {
                  "timeout": 3000
                },
                sandbox = {
                  "__SANDBOX_REQ__": req,
                  ...global,
                  console,
                  require,
                  URLSearchParams
                };

          script.runInNewContext(sandbox, options);
          return sandbox.__SANDBOX_PROMISE__;
        });
      }

      p.then((html) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(html);
        return;
      }).catch((e) => {
        console.log(e);
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      });
    }).
    get("/", (req, res) => {
      res.statusCode = 200;
      res.end("OK");
    });
});

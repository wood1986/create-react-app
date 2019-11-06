/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-process-env, dot-notation
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

const pems = selfsigned.generate(null, { keySize: 2048, days: 1, algorithm: "sha256" }),
      codes = new Map();

[
  polka({
    server: http2.createSecureServer({
      key: Buffer.from(pems.private),
      cert: Buffer.from(pems.cert)
    })
  }).listen(443),
  polka({
    server: http.createServer()
  }).listen(80)
].forEach(polka => {
  polka
    .use(morgan("tiny"))
    .use("/statics", serveStatic(path.join(__dirname, "dist")))
    .get("/ssr", (req, res) => {
      let p = null;
      if (app.entry === req.query.entry) {
        p = app.default(req);
      } else {
        let code = codes.get(req.query.entry);
        if (req.query.cache === "false" || Date.now() - code.createdAt > 60 * 60 * 15 || !code) {
          let code = {};
          code.promise = fetch(`${req.query.entry}`)
            .then(res => res.text())
            .then(code => new vm.Script(code));
          code.createdAt = Date.now();
        }

        p = code.promise.then((script) => {
          const options = {
                  "timeout": 3000
                },
                sandbox = {
                  __SANDBOX_REQ__: req,
                  ...global,
                  console,
                  require
                }

          script.runInNewContext(sandbox, options);
          return sandbox.__SANDBOX_PROMISE__;
        })
      }

      p.then(html => {
        res.set("Content-Type", "text/html");
        res.end(html);
        return;
      }).catch(e => {
        console.log(e);
        res.status(500);
        res.end("Internal Server Error");
        return;
      })
    })
})

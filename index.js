/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-process-env, dot-notation
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const http = require("http"),
      http2 = require("http2"),
      polka = require("polka"),
      path = require("path"),
      morgan = require("morgan"),
      serveStatic = require("serve-static"),
      fs = require("fs"),
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
      const {entry} = req.query,
            filename = entry.replace(/\//g, "_");

      let promise = codes.get(filename);
      if (!promise) {
        if (entry) {
          promise = new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(`./tmp/${filename}`);
            stream.on("close", () => {
              try {
                resolve(require(`./tmp/${filename}`));
              } catch (err) {
                reject(err);
              }
            });
            stream.on("error", reject);
            http.get(`http://127.0.0.1${entry}`, (res) => { res.pipe(stream) });
          });

          codes.set(filename, promise);
        }
      }

      if (promise) {
        promise
          .then(app => app.default(req))
          .then(result => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(result);
          }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
          })
      } else {
        res.statusCode = 404;
        res.end();
      }
    }).
    get("/", (req, res) => {
      res.statusCode = 200;
      res.end("OK");
    });
});

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-process-env, dot-notation
const http = require("http"),
      http2 = require("http2"),
      polka = require("polka"),
      path = require("path"),
      morgan = require("morgan"),
      serveStatic = require("serve-static"),
      selfsigned = require("selfsigned");

const pems = selfsigned.generate(null, { keySize: 2048, days: 1, algorithm: "sha256" });

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
].forEach(app => {
  app
    .use(morgan("tiny"))
    .use("/statics", serveStatic(path.join(__dirname, "dist")))
})

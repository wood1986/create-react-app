/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-process-env, dot-notation
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const http = require("http"),
      http2 = require("http2"),
      Koa = require("koa"),
      Router = require("@koa/router"),
      path = require("path"),
      responseTime = require("koa-response-time"),
      serve = require("koa-static"),
      fetch = require("node-fetch"),
      certificate = require("./getCertificate")(console),
      vm = require("vm"),
      app = new Koa(),
      router = new Router();

require("dns").lookup(require("os").hostname(), (_err, add) => {
  console.log();
  console.log(`Go opening https://${add}/ssr/<version>`);
});

app.use(responseTime({"hrtime": true}));
app.use(serve(path.resolve(__dirname, "dist")));

router.get("/ssr/:version", (ctx) => {
  delete require.cache;
  require.cache = {};

  return fetch(`${ctx.origin}/${ctx.params.version}/node.index.js`).
    then((res) => res.text()).
    then((code) => {
      const sandbox = {
        URLSearchParams,
        "__SANDBOX_CTX__": ctx,
        "__SANDBOX_PROMISE__": null,
        ...global,
        require
      };

      vm.runInNewContext(code, sandbox);
      return sandbox.__SANDBOX_PROMISE__.then((html) => {
        ctx.body = html;
      });
    }).
    catch(console.log);
});

app.use(router.routes());

http2.createSecureServer({
  "key": certificate,
  "cert": certificate,
  "allowHTTP1": true,
  
}, app.callback()).listen(443);

http.createServer(app.callback()).listen(80);

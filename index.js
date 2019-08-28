const express = require("express"),
      app = express(),
      vm = require("vm"),
      axios = require("axios");

app.use(express.static("dist"));

app.get("/s/:app/:version", (req, res) => {
  axios({
    "method": "GET",
    "responseType": "text",
    "url": `http://127.0.0.1:8080/${req.params.version}/node.index.js`
  }).then((response) => {
    const sandbox = {
      "__SANDBOX_PROMISE__": null,
      "global": {},
      require
    };

    vm.runInNewContext(response.data, sandbox);
    // eslint-disable-next-line no-underscore-dangle
    sandbox.__SANDBOX_PROMISE__.then((html) => res.send(html));
  }).catch(console.log);
});

app.listen(8080);

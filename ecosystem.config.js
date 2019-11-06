module.exports = {
  apps : [{
    autorestart: true,
    exec_mode: "cluster",
    instances: "max",
    name: "API",
    script: "index.js",
    watch: false,
  }]
};

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
});
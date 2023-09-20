const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        ws: false, // websocket 오류 임시방편
        pathRewrite: {
          "^/": "",
        },
      },
    },
  },
});

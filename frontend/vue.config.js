const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  outputDir: path.resolve(__dirname, "../backend/public/"),
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

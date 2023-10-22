const path = require("path");
const webpack = require("webpack");

module.exports = {
  webpack: {
    alias: {
      "date-fns/min": path.resolve(__dirname, "node_modules/date-fns/index.js"),
      "date-fns/subSeconds": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
      "date-fns/isAfter": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
    resolve: {
      fallback: {
        buffer: require.resolve("buffer/"),
      },
    },
  },
};

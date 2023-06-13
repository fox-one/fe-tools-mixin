/* eslint-disable sort-keys */
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ProgressPlugin = require("progress-webpack-plugin");
// const BundleAnalyzerPlugin =
//   require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.ts",
  target: "web",
  mode: "production",
  // mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),
    new ProgressPlugin(true)
    // new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   minimize: false
  // },
  output: {
    filename: "mvm.min.js",
    library: {
      name: "MVM",
      type: "umd",
      export: "default"
    },
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@foxone/mixin-api": path.resolve(__dirname, "../api/src")
    }
  }
};

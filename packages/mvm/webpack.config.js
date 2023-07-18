/* eslint-disable sort-keys */
const path = require("path");
const webpack = require("webpack");
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
    new ProgressPlugin(true),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
    // new BundleAnalyzerPlugin()
  ],
  // optimization: {
  //   minimize: false
  // },
  // optimization: {
  //   splitChunks: {
  //     maxAsyncRequests: 1,
  //     maxInitialRequests: 1,
  //     cacheGroups: {
  //       default: false,
  //       minSize: 10000,
  //       maxSize: 250000
  //     }
  //   }
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

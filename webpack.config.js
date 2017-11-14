const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  entry : "./src/index.js",
  target : "node",

  output : {
    filename      : "index.js",
    libraryTarget : "commonjs2"
  },

  module: {
    rules: [{
      test : /\.js$/,
      use  : {
        loader : "babel-loader",
        options: {
          presets : [
            "env"
          ],
          plugins : [
            "babel-plugin-transform-object-rest-spread"
          ]
        }
      }
    }]
  },

  plugins: IS_PRODUCTION
    ? [ new UglifyJSPlugin() ]
    : undefined,
};
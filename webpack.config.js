const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
require("babel-polyfill");

module.exports = {
    entry: {
        renderer: [
            "babel-polyfill",
            path.join(__dirname, "src/index.js"),
        ]
    },
    output: {},
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        port: 8089,
    }
};

module.exports = merge(common, module.exports);

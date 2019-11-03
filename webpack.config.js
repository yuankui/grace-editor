const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

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
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^(fs|child_process)$/,
        }),
    ],
    devServer: {
        port: 8089,
    },
};

module.exports = merge(common, module.exports);

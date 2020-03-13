const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const _ = require('lodash');

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
    ],
    devServer: {
        port: 8089,
    },

    target: "electron-renderer",
    // externals: {
    //     child_process: 'child_process',
    // }
};

module.exports = merge(common, module.exports);

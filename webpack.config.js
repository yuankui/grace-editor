const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
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
        new webpack.IgnorePlugin({
            checkResource(resource) {
                return _.includes([
                        'fs',
                        'child_process',
                    ],
                    resource);
            }
        }),
    ],
    devServer: {
        port: 8089,
    },

    target: "electron-renderer"
};

module.exports = merge(common, module.exports);

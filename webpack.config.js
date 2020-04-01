const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const _ = require('lodash');

require("babel-polyfill");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();


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
        new webpack.DefinePlugin(
            {
                'VERSION': JSON.stringify(gitRevisionPlugin.version()),
                'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash().substring(0, 8)),
                'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
            }
        ),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mp3"]
    },
    devServer: {
        port: 8089,
    },

    target: "electron-renderer",
    // externals: {
    //     child_process: 'child_process',
    // }
};

module.exports = merge(common, module.exports);

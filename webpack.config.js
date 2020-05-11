const merge = require('webpack-merge');
const common = require('./config/webpack.common');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const _ = require('lodash');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('./package.json');

require("babel-polyfill");
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
    lightweightTags: true,
});


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
                'VERSION': JSON.stringify(pkg.version),
                'COMMIT_HASH': JSON.stringify(gitRevisionPlugin.commithash().substring(0, 8)),
                'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
            }
        ),
        // new BundleAnalyzerPlugin(),
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

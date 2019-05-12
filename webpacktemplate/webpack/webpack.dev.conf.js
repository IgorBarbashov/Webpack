const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,    // указываем, что dev-server должен
                                                                // искать index.html и другие статические
                                                                // файлы в папке dist
        port: 8081,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({                    // карта стилей
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise( (resolve, reject) => {
    resolve(devWebpackConfig);
});
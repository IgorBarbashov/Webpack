const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',                                        // режим сборки по умолчанию (если development, то bundle.js будет не минифицированным)
    entry: {                                                    // откуда начинать сборку
        main: './index.js',
        analytics: './analytics.js',
    },     
    output: {                                                   // куда собирать
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [                                                  // подключаем плагины как инстансы классов
        new HTMLWebpackPlugin({
            // title: 'Webpack Igor template',                  // не работает, если не указать шаблон
            template: './index.html'                            // указывает шаблон
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [                                                // объект, описывающий loaders
            {
                test: /\.css$/,                                 // маска файлов
                use: [                                          // какие loader будем использовать
                    'style-loader',                             // порядок прохождения через 
                    'css-loader'                                // loader - снизу в верх
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
};

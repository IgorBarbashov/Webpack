const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src                              // основная точка входа
        // sec: './src/second.js'                   // вторая точка входа
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,    // [name] будет браться из ярлыка (app.js)
        path: PATHS.dist,
        publicPath: '/'
    },
    module: {
        rules: [{                                   // правило для обработки js-файлов
            test: /\.js$/,
            loader: 'babel-loader',                 // пропускаем их через babel
            exclude: '/node_modules/'               // исключая папку '/node_modules/'
        }, {
            test: /\.(png|jpg|gif|svg)$/,           // теперь мы можем вставлять файлы без ошибок
            loader: 'file-loader',                  // а правила копирования задаются ниже
            options: {                              // в плагинах
                name: '[name].[ext]'
            }
        }, {
            test: /\.scss$/,                        // правило для обработки scss-файлов
            use: [                                  // loaders отрабатывают с низу в верх
                'style-loader',                     // добавляет css-код в итоговый файл в теге <style>
                MiniCssExtractPlugin.loader,        // этот loader разделяет js и css файлы
                {
                    loader: 'css-loader',           // читает css файлы по ссылкам и возвращает css строкой
                    options: { sourceMap: true }    // это надо бы отключать на production
                }, {
                    loader: 'postcss-loader',       // для postCSS обработки
                    options: {
                        sourceMap: true,            // это надо бы отключать на production
                        config: {
                            path: `${PATHS.src}/postcss.config.js`   // путь к файлу-конфигурации post-css (там подключаем плагины)
                        }
                    }
                }, {
                    loader: 'sass-loader',          // загружает файлы sass/scss и компилирует его в css
                    options: { sourceMap: true }    // это надо бы отключать на production
                }
            ]
        }, {
            test: /\.css$/,                         // правило для обработки css-файлов
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        config: {
                            path: `${PATHS.src}/postcss.config.js`
                        }
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({                      // регистрируем плагин
            filename: `${PATHS.assets}css/[name].css`   // куда будут собираться стили
        }),
        new HtmlWebpackPlugin ({                        // убираем index.html из корня и потом копируем его в dist
            hash: false,                                // (?)
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([                         // плагин для копирования статичных файлов
            { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/static`, to: '' }
        ])
    ]
}
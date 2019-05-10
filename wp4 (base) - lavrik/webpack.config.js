let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");


let conf = {
    entry: './src/index.js',                        // указваем точку входа (относительный)
    output: {                                       // указываем куда все это собирать (абсолютный)
        path: path.resolve(__dirname, './dist/'),   //      - путь
        filename: 'main.js',                        //      - и в какой файл
        publicPath: 'dist/'                         // отсюда модуль webpack-dev-server будет брать временный js-файл (относительный)
    },
    devServer: {                                    // настройки модуля webpack-dev-server
        overlay: true                               // чтобы js-ошибки показывались не в консоли, а в браузере
    },
    module: {
        rules: [                                    // правила обработки файлов при сборке
            // {
            //     test: /\.js$/,                      // регулярка для маски файлов *.js
            //     loader: 'babel-loader',             // кому их 'скармливаем'
            //     //exclude: '/node_modules/'         // исключение из правила
            // },
            {
                test: /\.css$/,
                
                // это закомментировали, вместо них используем ExtractTextPlugin
                // use: [                              // если используется несколько loader-ов
                //     'style-loader',                 // передаем их как массив use
                //     'css-loader'
                // ]

                use: ExtractTextPlugin.extract({       // способ загрузки css, чтобы они получались
                    fallback: "style-loader",          // в отдельном файле
                    use: "css-loader"
                })

            }
        ]
    },

    
    plugins: [
        new ExtractTextPlugin("styles.css"),        // указывает в каком файле будут итоговые стили
    ],


    //devtool: 'eval-sourcemap'                     // чтобы в консоли браузера правильно отображались
                                                    // номера строк js-файла 
                                                    // !!! важно - в режиме  production надо отключать,
                                                    // а то файл включает в себя лишнее
};

module.exports = (env, options) => {                // делаеми фукнцию, которая возвращает conf
    let prod = options.mode == 'production';        // и в зависимости от параметров донастраиваем объект conf
    conf.devtool = prod ?
        false : 'eval-sourcemap';
    return conf;
};
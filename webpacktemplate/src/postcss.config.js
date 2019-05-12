// файл с настройками для postcss-loader (путь к нему указывается в webpack.config.js)
module.exports = {
    plugins: [
      require('autoprefixer'),              // проставляет вендорные префиксы стилям
      require('css-mqpacker'),              // сжимает все @media-запросы в один файл
      require('cssnano')({                  // умный минификатор css
        preset: [                           // это настройки конкретного плагина
            'default', {
                discardComments: {          // удаление комментариев из css кода (используем на production)
                    removeAll: true
                }
            }
        ]
      })
    ]
}
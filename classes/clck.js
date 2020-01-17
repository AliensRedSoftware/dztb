const request = require('request')


/**
 * Возвращаем скрутить с сайта ссылку https://clck.ru
 */
this.getTwist = function (url, callback) {
    request('https://clck.ru/--?url=' + url, function(error, response, html) {
        callback(html)
    })
}

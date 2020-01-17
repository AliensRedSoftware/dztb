const cheerio = require('cheerio')
const request = require('request');

/**
 * Возвращаем рандомное видео https://coub.com/random
 */
this.getRandom = function (сallback) {
    request('https://coub.com/random', function(error, response, html) {
        const $ = cheerio.load(html)
        callback(($('.description__info').html()))
    })
}

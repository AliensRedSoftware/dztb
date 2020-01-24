const request = require('request')
const cheerio = require('cheerio')

/**
 * Возвращаем вс сайта https://exchangerate.guru/rub/usd/1/
 */
this.getConvert = function (current, get, val, callback) {
    request('https://pokur.su/' + current + '/' + get + '/' + val , function(error, response, html) {
        const $ = cheerio.load(html)
        var str = $('.blockquote-classic').text().trim().split("\n")
        if (str) {
            var amlet = ''
            str.forEach(function(data) {
                if(data.trim()) {
                    amlet += "\n->" + data.trim()
                } else {
                    amlet = false
                }
            })
            if (amlet) {
                callback(amlet + "\n")
            } else {
                callback(false)
            }
        } else {
            callback(false)
        }
    })
}


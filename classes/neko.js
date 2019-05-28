const request = require('request')
const cheerio = require('cheerio')
const random = require('random')

/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandom = function (callback) {
	    request('https://neko-booru.com/post/view/' + random.int(1,1789), function(error, response, html) {
        var $ = cheerio.load(html)
        var cards = []
        $('.blockbody').each(function() {
            cards.push({
                    url : $('img.shm-main-image',this).attr('src')
            })
        })
        cards.forEach(function(item, i, arr) {
            if(item['url'] != null) {
                callback("https://neko-booru.com" + item['url'])
            }
        })
    })
}
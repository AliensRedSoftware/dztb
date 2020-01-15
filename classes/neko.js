const request = require('request')
const cheerio = require('cheerio')
const random = require('random')

if (global.count == null) {
    global.count = 10
}

/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandom = function (callback) {
    request('https://neko-booru.com/post/view/' + random.int(1, global.count), function(error, response, html) {
        const $ = cheerio.load(html)
        var chank = []
        $('.blockbody').each(function() {
        	chank.push({
                    url : $('img.shm-main-image', this).attr('src')
            })
        })
        global.count = parseInt($('footer').text().split(":")[1].split(",")[0].trim() + $('footer').text().split(":")[1].split(",")[1].trim())
        chank.forEach(function(item, i, arr) {
            if (item['url'] != null) {
                var data = []
                data['url'] = "https://neko-booru.com" + item['url']
                data['count'] = global.count
                callback(data)
            }
        })
    })
}


/**
 * Возвращаем кол-во пикч с сайта http://neko-booru.com/
 */
this.getCount = function (callback) {
	request('https://neko-booru.com/post/view/' + random.int(1, global.count), function(error, response, html) {
        const $ = cheerio.load(html)
        global.count = parseInt($('footer').text().split(":")[1].split(",")[0].trim() + $('footer').text().split(":")[1].split(",")[1].trim())
        callback(global.count);
    })
}


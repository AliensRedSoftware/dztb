const request = require('request')
const cheerio = require('cheerio')
const random = require('random')

/**
 * Возвращаем рандомную пикчу с сайта https://anime-pictures.net
 * tag - trap||loli
 */
this.getRandom = function (tag, callback) {
    this.getRandomSelected(tag, function (selected) {
        if (selected) {
            request(selected, function(error, response, html) {
                const $ = cheerio.load(html)
                var chank = []
                callback('https://anime-pictures.net' + $('.download_icon').attr('href'))
            })
        } else {
            callback(false)
        }
    })
}

/**
 * Возвращаем рандомную пикчу с сайта https://anime-pictures.net
 */
this.getRandomSelected = function (tag, callback) {
    this.getRandomCountPage(tag, function (page) {
        if (page != null) {
            if (tag) {
                request('https://anime-pictures.net/pictures/view_posts/' + page + '?search_tag=' + tag, function(error, response, html) {
                    const $ = cheerio.load(html)
                    var chank = []
                    $('.img_block_big').each(function() {
                	    chank.push({
                             url : 'https://anime-pictures.net' + $('a', this).attr('href')
                        })
                    })
                    callback(chank[random.int(0, chank.length - 1)])
                })
            } else {
                request('https://anime-pictures.net/pictures/view_posts/' + page, function(error, response, html) {
                    const $ = cheerio.load(html)
                    var chank = []
                    $('.img_block_big').each(function() {
                	    chank.push({
                             url : 'https://anime-pictures.net' + $('a', this).attr('href')
                        })
                    })
                    callback(chank[random.int(0, chank.length - 1)])
                })
            }
        } else {
            callback(false)
        }
    })
}

/**
 * Возвращаем рандомную страницу с сайта https://anime-pictures.net
 */
this.getRandomCountPage = function (tag, callback) {
    if (tag == null) {
	    request('https://anime-pictures.net/pictures/view_posts/0?lang=ru', function(error, response, html) {
            const $ = cheerio.load(html)
            var count = $('a.disable_on_small').eq(2).text()
            callback(random.int(0, parseInt(count)))
        })
    } else {
    	request('https://anime-pictures.net/pictures/view_posts/0?lang=ru&search_tag=' + tag, function(error, response, html) {
            if (html) {
                const $ = cheerio.load(html)
                var count = parseInt($('a.disable_on_small').eq(2).text())
                if (!isNaN(count)) {
                    if (count != null) {
                        callback(random.int(0, count))
                    } else {
                        callback(0)
                    }
                } else {
                    callback(0)
                }
            } else {
                callback(false)
            }
        })
    }
}

/**
 * Возвращаем кол-во пикчи с сайта https://anime-pictures.net
 */
this.getCountPictures = function (tag, callback) {
    if (tag == null) {
	    request('https://anime-pictures.net/pictures/view_posts/0', function(error, response, html) {
            const $ = cheerio.load(html)
            var count = $('#posts').eq(0).text()
            callback(parseInt(count.split(' ')[2]))
        })
    } else {
        request('https://anime-pictures.net/pictures/view_posts/0?lang=en&search_tag=' + tag, function(error, response, html) {
            const $ = cheerio.load(html)
            var count = $('#posts').eq(0).text().split(' ')
            var sel = null
            count.forEach(function(data) {
                var russia = parseInt(data)
                if (russia != null) {
                    if (!isNaN(russia)) {
                        if (sel == null) {
                            sel = russia
                        }
                    }
                }
            })
            callback (sel)
        })
    }
}

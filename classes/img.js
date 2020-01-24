const request = require('request')
const cheerio = require('cheerio')
const random = require('random')

/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandomImgOpt = function (opt, callback) {
    var output = ['exception']
    var opts = ''
    for (var key in opt){
        if (opt.hasOwnProperty(key)) {
            if (key == 'page') { //время
                output.push ({
                    exception: "[Ошибка]-[Исключение] => [" + key + "] => [" + opt[key] + "]"
                })
            } else if (key == 'text') {
                opts += '&' + key + '=' + opt[key]
            } else {
                output.push ({
                    exception: "[Ошибка]-[Неизвестное опций] => [" + key + "] => [" + opt[key] + "]"
                })
            }
        }
    }

    request('https://imageshost.ru/' + opts, function(error, response, html) {
        const $ = cheerio.load(html)
        var chank = []
        $('.MMImageWrapper').each(function() {
        	chank.push({
                    url : $('img.MMImage MMImage_origin', this).attr('src')
            })
        })
        console.log(chank)
    })
}


/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandomImgTagOpt = function (opt, callback) {
    var output = ['exception']
    var opts = ''
    for (var key in opt){
        if (opt.hasOwnProperty(key)) {
            if (key == 'page') { //время
                output.push ({
                    exception: "[Ошибка]-[Исключение] => [" + key + "] => [" + opt[key] + "]"
                })
            } else if (key == 'text') {
                opts += '&' + key + '=' + opt[key]
            } else {
                output.push ({
                    exception: "[Ошибка]-[Неизвестное опций] => [" + key + "] => [" + opt[key] + "]"
                })
            }
        }
    }

    request('https://imageshost.ru/' + opts, function(error, response, html) {
        const $ = cheerio.load(html)
        var chank = []
        $('.MMImageWrapper').each(function() {
        	chank.push({
                    url : $('img.MMImage MMImage_origin', this).attr('src')
            })
        })
        console.log(chank)
    })
}

/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandomImg = function (callback) {
    request('https://imageshost.ru/?random', function(error, response, html) {
        const $ = cheerio.load(html)
        var chank = []
        $('.header-content-right').each(function() {
        	chank.push({
                    url : $('a.btn.btn-download.default', this).attr('href')
            })
        })
        callback(chank[0]['url'])
    })
}

/**
 * Возвращаем рандомную пикчу с сайта http://neko-booru.com/
 */
this.getRandomImgTag = function (tag, callback) {
    request('https://imageshost.ru/?random', function(error, response, html) {
        const $ = cheerio.load(html)
        var chank = []
        $('.header-content-right').each(function() {
        	chank.push({
                    url : $('a.btn.btn-download.default', this).attr('href')
            })
        })
        callback(chank[0]['url'])
    })
}

/**
 * Возвращаем проверку тегов
 */
this.is_tag = function (tag) {
    if (tag == '3d') { //Горячее
        return true
    } else if (tag == 'abstrakcii') { //В тренде
        return true
    } else if (tag == 'avto-moto') { //Свежее
        return true
    } else if (tag == 'arhitektura') { //Полгода
        return true
    } else if (tag == 'makro') { //Квартал
        return true
    } else if (tag == 'priroda') { //Месяц
        return true
    } else if (tag == 'profi') { //Неделя
        return true
    } else {
        return false
    }
}

/**
 * Возвращаем лист с тегами https://coub.com/random
 */
this.getTags = function () {
    return "\n[1] => 3d\n" +
            "[2] => abstrakcii\n" +
            "[3] => avto-moto\n" +
            "[4] => arhitektura\n" +
            "[5] => makro\n" +
            "[6] => priroda\n" +
            "[7] => profi\n"
}

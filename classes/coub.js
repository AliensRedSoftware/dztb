const request = require('request');
const random = require('random')

/**
 * Возвращаем рандомное видео https://coub.com/random
 */
this.getRandom = function (callback) {
    request('https://coub.com/api/v2/timeline/explore/random?' + 'page=' + random.int(1, 40) + '&per_page=25', function(error, response, html) {
        var json = JSON.parse(html);
        var src = []
        var output = []
        json.coubs.forEach(data => {
            if (data.file_versions.share.default != 'undefined') {
                if (!data.raw_video_title) {
                    data.raw_video_title = 'Ничего не найдено'
                }
                src.push({
                    url : data.file_versions.share.default,
                    title: data.title,
                    views_count: data.views_count,
                    link: 'https://coub.com/view/' + data.permalink,
                    likes: data.likes_count,
                    dislikes: data.dislikes_count,
                    name: data.raw_video_title,
                    original: data.external_download.url
                })
            }
        })
        selected = random.int(0, src.length - 1)
        output['url'] = src[selected]['url']
        output['title'] = src[selected]['title']
        output['views_count'] = src[selected]['views_count']
        output['link'] = src[selected]['link']
        output['likes'] = src[selected]['likes']
        output['dislikes'] = src[selected]['dislikes']
        output['name'] = src[selected]['name']
        output['original'] = src[selected]['original']
        if (output['original'] == null) {
            output['original'] = 'Ничего не найдено'
        }
        callback(output)
    })
}

/**
 * Возвращаем рандомное видео https://coub.com/random
 */
this.getRandomTagPeriod = function (tag, period, callback) {
    request('https://coub.com/api/v2/timeline/community/' + tag + '/' + period + '?' + 'page=' + random.int(1, 40) + '&per_page=25', function(error, response, html) {
        var json = JSON.parse(html);
        var src = []
        var output = []
        json.coubs.forEach(data => {
            if (data.file_versions.share.default != 'undefined') {
                if (!data.raw_video_title) {
                    data.raw_video_title = 'Ничего не найдено'
                }
                src.push({
                    url : data.file_versions.share.default,
                    title: data.title,
                    views_count: data.views_count,
                    link: 'https://coub.com/view/' + data.permalink,
                    likes: data.likes_count,
                    dislikes: data.dislikes_count,
                    name: data.raw_video_title,
                    original: data.external_download.url
                })
            }
        })
        selected = random.int(0, src.length - 1)
        output['url'] = src[selected]['url']
        output['title'] = src[selected]['title']
        output['views_count'] = src[selected]['views_count']
        output['link'] = src[selected]['link']
        output['likes'] = src[selected]['likes']
        output['dislikes'] = src[selected]['dislikes']
        output['name'] = src[selected]['name']
        output['original'] = src[selected]['original']
        if (output['original'] == null) {
            output['original'] = 'Ничего не найдено'
        }
        callback(output)
    })
}

/**
 * Возвращаем коуб видео https://coub.com/api/v2
 * id - ид видео или permalink
 */
this.getCoub = function (id, callback) {
    request('https://coub.com/api/v2/coubs/' + id, function(error, response, html) {
        var json = JSON.parse(html);
        if (json.error == 'Coub not found') {
            callback(false)
        } else {
            var src = []
            var output = []
            if (json.file_versions.share.default != 'undefined') {
                if (!json.raw_video_title) {
                    json.raw_video_title = 'Ничего не найдено'
                }
                src.push({
                    url : json.file_versions.share.default,
                    title: json.title,
                    views_count: json.views_count,
                    link: 'https://coub.com/view/' + json.permalink,
                    likes: json.likes_count,
                    dislikes: json.dislikes_count,
                    name: json.raw_video_title,
                    original: json.external_download.url
                })
            }
            output['url'] = src[0]['url']
            output['title'] = src[0]['title']
            output['views_count'] = src[0]['views_count']
            output['link'] = src[0]['link']
            output['likes'] = src[0]['likes']
            output['dislikes'] = src[0]['dislikes']
            output['name'] = src[0]['name']
            output['original'] = src[0]['original']
            if (output['original'] == null) {
                output['original'] = 'Ничего не найдено'
            }
            callback(output)
        }
    })
}

/**
 * Возвращаем рандомное видео с тегом https://coub.com/random
 * https://coub.com/api/v2/timeline/random/anime?page=1
 */
this.getRandomTag = function (tag, callback) {
    if (this.is_tag(tag)) {
        request('https://coub.com/api/v2/timeline/random/' + tag + '?page=' + random.int(1, 40) + '&per_page=25', function(error, response, html) {
            var json = JSON.parse(html);
            var src = []
            var output = []
            json.coubs.forEach(data => {
                if (data.file_versions.share.default != 'undefined') {
                    if (!data.raw_video_title) {
                        data.raw_video_title = 'Ничего не найдено'
                    }
                    src.push({
                        url : data.file_versions.share.default,
                        title: data.title,
                        views_count: data.views_count,
                        link: 'https://coub.com/view/' + data.permalink,
                        likes: data.likes_count,
                        dislikes: data.dislikes_count,
                        name: data.raw_video_title,
                        original: data.external_download.url
                    })
                }
            })
            selected = random.int(0, src.length - 1)
            output['url'] = src[selected]['url']
            output['title'] = src[selected]['title']
            output['views_count'] = src[selected]['views_count']
            output['link'] = src[selected]['link']
            output['likes'] = src[selected]['likes']
            output['dislikes'] = src[selected]['dislikes']
            output['name'] = src[selected]['name']
            output['original'] = src[selected]['original']
            if (output['original'] == null) {
                output['original'] = 'Ничего не найдено'
            }
            callback(output)
        })
    } else {
        callback(false)
    }
}

/**
 * Возвращаем лист с тегами https://coub.com/random
 */
this.getTags = function () {
    return "\n[1] => animals-pets\n" +
            "[2] => mashup\n" +
            "[3] => anime\n" +
            "[4] => movies\n" +
            "[5] => gaming\n" +
            "[6] => cartoons\n" +
            "[7] => art\n" +
            "[8] => music\n" +
            "[9] => news\n" +
            "[10] => sports\n" +
            "[11] => science-technology\n" +
            "[12] => celebrity\n" +
            "[13] => nature-travel\n" +
            "[14] => fashion\n" +
            "[15] => dance\n" +
            "[16] => cars\n" +
            "[17] => nsfw\n"
}


/**
 * Возвращаем лист с периоды https://coub.com/random
 */
this.getPeriod = function () {
    return "\n[1] [Горячее] => daily\n" +
            "[2] [В тренде] => rising\n" +
            "[3] [Свежие] => fresh\n" +
            "[4] [Свежие] => half\n" +
            "[5] [Квартал] => quarter\n" +
            "[6] [Месяц] => monthly\n" +
            "[7] [Неделя] => weekly\n" +
            "[8] [День] => daily\n"
}

/**
 * Возвращаем проверку тега
 */
this.is_tag = function (tag) { 
    if (tag == 'animals-pets') {
        return true
    } else if (tag == 'mashup') {
        return true
    } else if (tag == 'anime') {
        return true
    } else if (tag == 'movies') {
        return true
    } else if (tag == 'gaming') {
        return true
    } else if (tag == 'cartoons') {
        return true
    } else if (tag == 'art') {
        return true
    } else if (tag == 'music') {
        return true
    } else if (tag == 'news') {
        return true
    } else if (tag == 'sports') {
        return true
    } else if (tag == 'science-technology') {
        return true
    } else if (tag == 'celebrity') {
        return true
    } else if (tag == 'nature-travel') {
        return true
    } else if (tag == 'fashion') {
        return true
    } else if (tag == 'dance') {
        return true
    } else if (tag == 'cars') {
        return true
    } else if (tag == 'nsfw') {
        return true
    } else {
        return false
    }
}

/**
 * Возвращаем проверку период
 */
this.is_period = function (period) {
    if (period == 'daily') { //Горячее
        return true
    } else if (period == 'rising') { //В тренде
        return true
    } else if (period == 'fresh') { //Свежее
        return true
    } else if (period == 'half') { //Полгода
        return true
    } else if (period == 'quarter') { //Квартал
        return true
    } else if (period == 'monthly') { //Месяц
        return true
    } else if (period == 'weekly') { //Неделя
        return true
    } else if (period == 'daily') { //День
        return true
    } else {
        return false
    }
}

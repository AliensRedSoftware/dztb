const random = require('random')
const request = require('request')
const Discord = require('discord.js')
const msleep = require('msleep')
const nekosLife = require('nekos.life')
var coub = require("./classes/coub.js")
var neko = require("./classes/neko.js")
var clck = require("./classes/clck.js")
var ap = require("./classes/ap.js")
var cnv = require("./classes/cnv.js")
var img = require("./classes/img.js")
var spam = require("./classes/security/spam/spam.js")
require("./cfg.js")

const client = new Discord.Client()
const nekoClient = new nekosLife();

var prefix = global.prefix
var version = global.version
//sec
var spamStatus = false
var tm = []
var active = []

var rand = false
var nekoOptions = [rand = false, channel = null, freezing = 5, startFreezing = 1]
var options = [channel = null, text = null]


const calc = function (arithmetic) {
    var result = "NaN";
    try {
        result = eval(arithmetic.replace(/[^0-9\+\*\-\/\(\)]/g, ""));
    } catch (e) { }
    return result || "NaN";
};

const is_url = function (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

/**
 * Время ожидание выполнение
 */
var sleep = async (n, callback) => {
	msleep(n * 1000)
    callback(true)
};

/**
 * Возвращает готовую опцию ;)
 */
getOpt = function (command, offset) {
    for (var i = 0; i < offset; i++) {
        command.shift()
    }
    if (command[0]) {
        console.log(command)
        var text = ''
        command.forEach(function (data) { // key=val
            text += data
        })
        text = text.split('&')
        if (text.length > 0) {
            var opt = []
            text.forEach(function (data) { // key=val
                if (data) {
                    selected = data.split('=') // префикс гет запросы
                    key = selected[0]
                    val = selected[1]
                    opt[key] = val
                }
            })
        }
        return opt
    } else {
        return false
    }
}

client.on('message', message => {
    options["channel"] = message.channel.name
    options["text"] = message.content
})

/**
 * sec - защита
 */
client.on('message', message => {
    var currentHour = new Date().getHours();
    var currentMin = new Date().getMinutes();
    var currentSecond = new Date().getSeconds();
    var freezing = 10 //10 сек
    var maxShans = 5
    if (message.author.id != 396622379901648906) {
        if (spamStatus) {
            if (options["channel"]) {
                if (!active[message.author.id]) {
                    tm[message.author.id] = currentHour + ":" + currentMin + ":" + currentSecond
                    active[message.author.id] = maxShans //Попыток
                    message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [Сигнал] = [Установлен]")
                } else {
                    for (var id in active){
                        if (active.hasOwnProperty(id)) {
                            if (message.author.id == id) {
                                Hour = tm[id].split(':')[0]
                                Min = tm[id].split(':')[1]
                                Second = tm[id].split(':')[2]
                                //Разница
                                Hour = currentHour - Hour
                                Min = currentMin - Min
                                Second = currentSecond - Second
                                previwTime = Hour + ":" + Min + ":" + Second
                                //console.log("Прошлое =>" + Hour + ":" + Min + ":" + Second)
                                tm[message.author.id] = currentHour + ":" + currentMin + ":" + currentSecond
                                if (Math.sign(Hour) == -1) {
                                    Hour = 0
                                }
                                if (Math.sign(Min) == -1) {
                                    Min = 0
                                }
                                if (Math.sign(Second) == -1) {
                                    Second = freezing
                                }
                                if (Hour == 0) {
                                    if (Min == 0) {
                                        if (Second >= freezing) {
                                            //Успешное отслежка
                                        } else {
                                            if (id == message.author.id) {
                                                active[message.author.id] = active[message.author.id] - 1
                                                if (active[message.author.id] == 0) {
                                                    let muterole = message.guild.roles.find(role => role.name === "Мут");
                                                    message.member.addRole(muterole);
                                                    message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> [Добавлена новая роль Мут]")
                                                } else {
                                                    message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> [Осталось попыток " +  active[id] + " из " + maxShans + "]")
                                                }
                                            }
                                            message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] [" + previwTime + "]" + "=> [Оу оу Обнаружен ввод текста на красный сигнал] => [" + Second + ' из ' + freezing + "Сек]")
                                        }
                                    } else {
                                        //Успешное отслежка
                                        //message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> [Оу оу слишком быстрый текст не превышайте скорость остановки] => [" + Min + ' из ' + MinFreezing + "Сек]")
                                    }
                                } else {
                                    //Успешное отслежка
                                    //message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> Постить нельзя была Меньше " + Hour + "мин")
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
})

client.on('message', message => {
    var str = options["text"].split(' ')
    status = str[str.length - 1]
    waiting = str[str.length - 3]
    if (nekoOptions['rand'] == true) {
        if (nekoOptions['channel'] == options['channel']) {
            if (message.author.id == 396622379901648906) {
                if (waiting == '[Ожидание]') {
                    if (status != "[Обработка...]") {
                        if (status != "[Успешно!!!]") {
                            if (nekoOptions['startFreezing'] == nekoOptions['freezing']) {
                                sleep(nekoOptions['startFreezing'], function (data) {
                                    if (data) {
                                        message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + data['count'] + "]" + " [Ожидание] => " + "[Обработка...]")
                                        neko.getRandom(function (data) {
                                            message.channel.send({
                                                embed: {
                                                    description: data['url'],
                                                    image: {
                                                        url: data['url']
                                                    }
                                                }
                                            })
                                            nekoOptions['startFreezing'] = 0
                                            message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + data['count'] + "]" + " [Ожидание] => " + "[Успешно!!!]")
                                        })
                                    } else {
                                        message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + data['count'] + "]" + " [Ожидание] => " + "[Ошибка!!!]")
                                    }
                                })
                            } else {
                                neko.getCount(function (data) {
                                    nekoOptions['startFreezing']++
                                    message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + data + "]" + " [Ожидание] => " + "[" + nekoOptions['startFreezing'] + "/" + nekoOptions['freezing'] + "]")
                                })
                            }
                        }
                    } else {
                        neko.getCount(function (data) {
                            nekoOptions['startFreezing']++
                            message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + data + "]" + " [Ожидание] => " + "[" + nekoOptions['startFreezing'] + "/" + nekoOptions['freezing'] + "]")
                        })
                    }
                }
            }
        }
    }
})


client.on('message', message => {
    if(message.author === client.user) return;
    if (message.content.startsWith(prefix)) {
    	var str = options['text'];
    	var str1 = str.replace(prefix, ' ')
    	var command = str1.split(' ')
    	if (command[1] == 'nekoLife') {
    		if (command[2] == 'nsfw') {
    			if (command[3] == 'rand') {
    				nekoClient.nsfw.randomHentaiGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'pussy') {
    				nekoClient.nsfw.pussy().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'nekoGif') {
    				nekoClient.nsfw.nekoGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'neko1') {
    				nekoClient.nsfw.neko().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'lesbian') {
    				nekoClient.nsfw.lesbian().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'kuni') {
    				nekoClient.nsfw.kuni().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'cumsluts') {
    				nekoClient.nsfw.cumsluts().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'classic') {
    				nekoClient.nsfw.classic().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'boobs') {
    				nekoClient.nsfw.boobs().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'bj') {
    				nekoClient.nsfw.bJ().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'anal') {
    				nekoClient.nsfw.anal().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'avatar') {
    				nekoClient.nsfw.avatar().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'yuri') {
    				nekoClient.nsfw.yuri().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'trap') {
    				nekoClient.nsfw.trap().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'tits') {
    				nekoClient.nsfw.tits().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'girlSoloGif') {
    				nekoClient.nsfw.girlSoloGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'girlSolo') {
    				nekoClient.nsfw.girlSolo().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'smallBoobs') {
    				nekoClient.nsfw.smallBoobs().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'pussyWankGif') {
    				nekoClient.nsfw.pussyWankGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'pussyArt') {
    				nekoClient.nsfw.pussyArt().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'kemonomimi') {
    				nekoClient.nsfw.kemonomimi().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'kitsune') {
    				nekoClient.nsfw.kitsune().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'keta') {
    				nekoClient.nsfw.keta().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'holo') {
    				nekoClient.nsfw.holo().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'holoEro') {
    				nekoClient.nsfw.holoEro().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'hentai') {
    				nekoClient.nsfw.hentai().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'futanari') {
    				nekoClient.nsfw.futanari().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'femdom') {
    				nekoClient.nsfw.femdom().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'feetGif') {
    				nekoClient.nsfw.feetGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'eroFeet') {
    				nekoClient.nsfw.eroFeet().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'feet') {
    				nekoClient.nsfw.feet().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'ero') {
    				nekoClient.nsfw.ero().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'eroKitsune') {
    				nekoClient.nsfw.eroKitsune().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'eroKemonomimi') {
    				nekoClient.nsfw.eroKemonomimi().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'eroNeko') {
    				nekoClient.nsfw.eroNeko().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'eroYuri') {
    				nekoClient.nsfw.eroYuri().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'cumArts') {
    				nekoClient.nsfw.cumArts().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'blowJob') {
    				nekoClient.nsfw.blowJob().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'pussyGif') {
    				nekoClient.nsfw.pussyGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else {
    				message.channel.sendMessage(message.author + "\n" + "rand, pussy, nekoGif, neko, lesbian, kuni, cumsluts, classic, boobs, bj, anal, yuri, trap, tits, girlSoloGif, girlSolo, smallBoobs, pussyWankGif, pussyArt, kemonomimi, kitsune, keta, holo, holoEro, hentai, futanari, femdom, feetGif, eroFeet, feet, ero, eroKitsune, eroKemonomimi, eroNeko, eroYuri, cumArts, blowJob, pussyGif")
    			}
    		} else if (command[2] == 'sfw') {
    			if (command[3] == 'smug') {
    				nekoClient.sfw.smug().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'baka') {
    				nekoClient.sfw.baka().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'tickle') {
    				nekoClient.sfw.tickle().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'slap') {
    				nekoClient.sfw.slap().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'poke') {
    				nekoClient.sfw.poke().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'pat') {
    				nekoClient.sfw.pat().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'neko') {
    				nekoClient.sfw.neko().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'nekoGif') {
    				nekoClient.sfw.nekoGif().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'meow') {
    				nekoClient.sfw.meow().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'lizard') {
    				nekoClient.sfw.lizard().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'kiss') {
    				nekoClient.sfw.kiss().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'hug') {
    				nekoClient.sfw.hug().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'foxGirl') {
    				nekoClient.sfw.foxGirl().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'feed') {
    				nekoClient.sfw.feed().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'cuddle') {
    				nekoClient.sfw.cuddle().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'kemonomimi') {
    				nekoClient.sfw.kemonomimi().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'holo') {
    				nekoClient.sfw.holo().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else if (command[3] == 'woof') {
    				nekoClient.sfw.woof().then(response => {
    					message.channel.sendMessage(message.author + "\n" + response['url'])
    				})
    			} else {
    				message.channel.sendMessage(message.author + "\n" + "smug, baka, tickle, slap, poke, pat, neko, nekoGif, meow, lizard, kiss, hug, foxGirl, feed, cuddle, kemonomimi, holo, woof")
    			}
    		} else {
    			message.channel.sendMessage(message.author + "\n" + prefix + "nekoLife - nsfw или sfw")
    		}
    	} else if (command[1] == 'neko') {
    		if (command[2] == 'rand') {
    			neko.getRandom(function (data) {
		            message.channel.send({
		                embed: {
		                    image: {
		                        url: data['url']
		                    }
		                }
		            })
		        })
    		} else if (command[2] == 'update') {
    			if (nekoOptions['rand'] == true) {
		            nekoOptions['rand'] = false;
		        } else {
		            nekoOptions["channel"] = options["channel"];
		            nekoOptions['rand'] = true;
		        }
		        if (nekoOptions['rand'] == true) {
                    if (nekoOptions["freezing"] == null) {
                        nekoOptions["freezing"] = 5
                    }
                    if (nekoOptions["startFreezing"] == null) {
                        nekoOptions["startFreezing"] = 0
                    }
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + 'Неизвестно' + "]" + " [Ожидание] => " + "[Да]")
		        } else {
		            message.channel.sendMessage(message.author + "\n" + "[Logger] [neko] [rand] " + "[" + 'Неизвестно' + "]" + " [Ожидание] => " + "[Нет]")
		        }
    		} else if (command[2] == 'freezing') {
    			var value = parseInt(command[3]);
    			if (value != null && isNaN(value) != true && value > 0 && value < 11) {
    				message.channel.sendMessage(message.author + "\n" + 'Замарозка успешно установлена:' + value + "сек")
    				nekoOptions['freezing'] = value;
    			} else if (value > 0) {
    				message.channel.sendMessage(message.author + "\n" + 'Замарозка не может быть больше 10сек установлена')
    			} else if (value < 11) {
    				message.channel.sendMessage(message.author + "\n" + 'Замарозка не может быть меньше 1сек установлена')
    			} else if (typeof(value) == 'string') {
    				message.channel.sendMessage(message.author + "\n" + 'Замарозка не может равнятся строки = (')
    			} else {
    				message.channel.sendMessage(message.author + "\n" + 'Замарозка не может равнятся ничего = (')
    			}
    		} else {
    			message.channel.sendMessage(message.author + "\n" + "rand - Возвращает рандомное\nupdate - Режим обновление\nfreezing - Замарозка (5 сек)")
    		}
    	} else if (command[1] == 'util') {
            if (command[2] == 'clck') {
                if (command[3] == 'twist') {
                    clck.getTwist (command[4], function (r) {
                        if (r != null) {
                            message.channel.sendMessage(message.author + "\n" + "[Logger] [clck] [twist] [Успешно] => " + r)
                        } else {
                            message.channel.sendMessage(message.author + "\n" + "[Logger] [clck] [twist] [Ожидание] => [Ошибка!!!]")
                        }
                    })
                } else {
                    message.channel.sendMessage(message.author + "\n" + "twist - Скрутить ссылку")
                }
            } else if (command[2] == 'calc') {
                message.channel.sendMessage(calc(command[3]))
            } else if (command[2] == 'isUrl') {
                var url = is_url(command[3])
                if (url) {
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [url] [Валидность] [Ожидание] => " + "[Да]")
                } else {
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [url] [Валидность] [Ожидание] => " + "[Нет]")
                }
            } else if (command[2] == 'img') {
                if (command[3] == 'rand') {
                    //opt принять
                    var opt = getOpt(command, 4)
                    console.log(opt)
                    if (opt) {
                        img.getRandomImgOpt(opt, function (data) {
            
                        })
                    } else {
                        img.getRandomImg(function (src) {
                            message.channel.send({
	                            embed: {
                                    description: src,
	                                image: {
	                                    url: src
	                                }
	                            }
	                        })
                        })
                    }
                } else if (command[3] == 'tag') {
                    if (command[4] == 'rand') {
                        tag = command[5]
                        if (img.is_tag(tag)) {
                            //opt принять
                            opt = getOpt(command, 6)
                            if (opt) {
                                img.getRandomImgTagOpt(opt, function (data) {
                                })
                            } else {
                                img.getRandomImgTag(function (src) {
                                    message.channel.send({
	                                    embed: {
                                            description: src,
	                                        image: {
	                                            url: src
	                                        }
	                                    }
	                                })
                                })
                            }
                        } else {
                            if (!tag) {
                                tag = 'Неизвестный'
                            }
                            message.channel.sendMessage(message.author + "\n" + "[Logger] [img] [tag] [Ожидание] => [Неизвестный тег ->" + tag + "]")
                        }
                    } else if (command[4] == 'get') {
                        tags = img.getTags()
                        message.channel.sendMessage(message.author + "\n" + "[Logger] [img] [tag] [Ожидание] => " + "[" + tags + "]")
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "rand - Возвращает рандомное\ncount - Возвращает кол-во пикч всего\nget - Возвращает все установленные теги")
                    }
                } else {
                    message.channel.sendMessage(message.author + "\n" + "rand - Возвращает рандомное\ncount - Возвращает кол-во пикч всего\ntag - Возвращает с использованием тегом")
                }
            } else if (command[2] == 'cnv') {
                if (command[3] != null) {
                    current = command[3].split('-')[0]
                    get = command[3].split('-')[1]
                    val = command[4]
                    if (current) {
                        if (get) {
                            if (!parseInt(val)) {
                                val = 1
                            }
                            cnv.getConvert(current, get, val, function (data) {
                                if (data) {
                                    message.channel.sendMessage(message.author + "\n" + "[Logger] [cnv] [Ожидание] => " + "[" + data + "]")
                                } else {
                                    message.channel.sendMessage(message.author + "\n" + "[Logger] [cnv] [Ожидание] => " + "[Ошибка ничего не найдено!]")
                                }
                            })
                        } else {
                            message.channel.sendMessage(message.author + "\n" + "usd-rub - из usd в rub")
                        }
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "usd-rub - из usd в rub")
                    }
                } else {
                    message.channel.sendMessage(message.author + "\n" + "usd-rub - из usd в rub")
                }
            } else {
                message.channel.sendMessage(message.author + "\n" + "img - Вход в картинки" + "\n" + "clck - Укорачиватель ссылок\ncalc - Калькулятор\ncnv - Конвертировать валюту\nisUrl - Возвращает ссылка это или нет")
            }
        } else if (command[1] == 'waifu2x') {
            message.channel.sendMessage(message.author + "\n" + 'https://www.thiswaifudoesnotexist.net/example-' + random.int(0, 100000) + '.jpg')
        } else if (command[1] == 'isUrl') {
            var url = validURL(command[2])
            message.channel.sendMessage(message.author + "\n" + "[Logger] [url] [Валидность] [Ожидание] => " + "[" + url + "]")
        } else if (command[1] == 'coub') {
            if (command[2] == 'rand') {
                coub.getRandom(function (data) {
                    message.channel.send({
                        embed: {
                            description:
                            message.author + "\n" +
                            "[Об коубе]\n" +
                                '->[Название] => ' + '[' + data['title'] + "]\n" +
                                '->[:link:] =>' + '[' + data['link'] + "]\n" +
                                '->[:eye:] => ' + '[' + data['views_count'] + "]\n" +
                                '->[:heavy_plus_sign:] => ' + '[' + data['likes'] + "]\n" +
                                '->[:heavy_minus_sign:] => ' + '[' + data['dislikes'] + "]\n" +
                                '->[Оригинал] => ' + '[' + data['original'] + "]\n" +
                            "[Об файле]\n" +
                                '->[Название] => ' + '[' + data['name'] + "]",
                            files: [data['url']]
                        }
                    })
                })
            } else if (command[2] == 'get') {
                coub.getCoub(command[3], function (data) {
                    if (data) {
                        message.channel.send({
                            embed: {
                                description:
                                message.author + "\n" +
                                "[Об коубе]\n" +
                                    '->[Название] => ' + '[' + data['title'] + "]\n" +
                                    '->[:link:] =>' + '[' + data['link'] + "]\n" +
                                    '->[:eye:] => ' + '[' + data['views_count'] + "]\n" +
                                    '->[:heavy_plus_sign:] => ' + '[' + data['likes'] + "]\n" +
                                    '->[:heavy_minus_sign:] => ' + '[' + data['dislikes'] + "]\n" +
                                    '->[Оригинал] => ' + '[' + data['original'] + "]\n" +
                                "[Об файле]\n" +
                                    '->[Название] => ' + '[' + data['name'] + "]",
                                files: [data['url']]
                            }
                        })
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [Ожидание] => [Ошибка ничего не найдено!]")
                    }
                })
            } else if (command[2] == 'tag') {
                if (command[3] == 'rand') {
                    tag = command[4]
                    //opt принять
                    opt = getOpt(command, 5)
                    if (opt) {
                        coub.getRandomTagOpt(tag, opt, function (data) {
                            data.forEach(function (dop) {
                                if (dop['exception']) {
                                    message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [tag] [Ожидание] => " + dop['exception'])
                                }
                            })
                            if (data['url']) {
                                message.channel.send({
                                    embed: {
                                        description:
                                        message.author + "\n" +
                                        "[Об коубе]\n" +
                                            '->[Название] => ' + '[' + data['title'] + "]\n" +
                                            '->[:link:] =>' + '[' + data['link'] + "]\n" +
                                            '->[:eye:] => ' + '[' + data['views_count'] + "]\n" +
                                            '->[:heavy_plus_sign:] => ' + '[' + data['likes'] + "]\n" +
                                            '->[:heavy_minus_sign:] => ' + '[' + data['dislikes'] + "]\n" +
                                            '->[Оригинал] => ' + '[' + data['original'] + "]\n" +
                                        "[Об файле]\n" +
                                            '->[Название] => ' + '[' + data['name'] + "]",
                                        files: [data['url']]
                                    }
                                })
                            } else {
                                message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [tag] [Ожидание] => [Ошибка ничего не найдено!]")
                            }
                        })
                    } else {
                        coub.getRandomTag(tag, function (data) {
                            if (data['url']) {
                                message.channel.send({
                                    embed: {
                                        description:
                                        message.author + "\n" +
                                        "[Об коубе]\n" +
                                            '->[Название] => ' + '[' + data['title'] + "]\n" +
                                            '->[:link:] =>' + '[' + data['link'] + "]\n" +
                                            '->[:eye:] => ' + '[' + data['views_count'] + "]\n" +
                                            '->[:heavy_plus_sign:] => ' + '[' + data['likes'] + "]\n" +
                                            '->[:heavy_minus_sign:] => ' + '[' + data['dislikes'] + "]\n" +
                                            '->[Оригинал] => ' + '[' + data['original'] + "]\n" +
                                        "[Об файле]\n" +
                                            '->[Название] => ' + '[' + data['name'] + "]",
                                        files: [data['url']]
                                    }
                                })
                            } else {
                                if (!tag) {
                                    tag = 'Неизвестный'
                                }
                                message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [tag] [Ожидание] => [Неизвестный тег ->" + tag + "]")
                            }
                        })
                    }
                } else if (command[3] == 'opt') {
                    opt = coub.getOpt();
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [tag] [Ожидание] => " + "[" + opt + "]")
                } else if (command[3] == 'get') {
                    tags = coub.getTags();
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [coub] [tag] [Ожидание] => " + "[" + tags + "]")
                } else {
                    message.channel.sendMessage(message.author + "\n" + "[coub]<-[API]->[V2]\nrand - Возвращает рандомное\nopt - Возвращаем ключи\nget - Возвращает все установленные теги")
                }
            } else {
                message.channel.sendMessage(message.author + "\n" + "[coub]<-[API]->[V2]\nrand - Возвращает рандомное\nget - Возвращаем коуб\ntag - Возвращает с использованием тегом")
            }
        } else if (command[1] == 'ver') {
            message.channel.sendMessage(message.author + "\n" + "[discord zero_two bot] [ver] [Ожидание] => " + '[' + version + ']')
        } else if (command[1] == 'euqinu$') {
            if (command[2] == 'isURL') {
                if (message.author.id == 287992996669161472) {
                    global.patau = command[3]
                } else {
                    message.channel.sendMessage("](: апутсод тен[" + " >= ]еинадижо[ ]euqinu[ ]reggol[" + "\n" + message.author)
                }
            }
        } else if (command[1] == 'sec') {
            if (command[2] == 'spam') {
                if (command[3] == 'on') {
                    if (message.author.id == 287992996669161472) {
                        spamStatus = true
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [установка] => " + "[Включено]")
                    } else {
                            message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [установка] => " + "[У вас нету прав на использование этой команды]")
                        }
                } else if (command[3] == 'off') {
                    if (message.author.id == 287992996669161472) {
                        spamStatus = false
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [установка] => " + "[Выключено]")
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [установка] => " + "[У вас нету прав на использование этой команды]")
                    }
                } else if (command[3] == 'isStatus') {
                    if (spam.getIsStatus(message.author.id, active, tm, spamStatus, options["channel"])) {
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [Сигнал] [Цвет] = " + "[Зеленный]")
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [Сигнал] [Цвет] = " + "[Красный]")
                    }
                } else if (command[3] == 'isInstalled') {
                    if (spam.getIsInstalled(message.author.id, active)) {
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [Сигнал] => " + "[Установлен]")
                    } else {
                        message.channel.sendMessage(message.author + "\n" + "[security] => [spam] => [Сигнал] => " + "[Не установлен]")
                    }
                } else {
                    message.channel.sendMessage(message.author + "\n" + "[security] => [spam]\non - Включить\noff - Выключить\nisStatus - Возвращает цвет сигнала\nisInstalled - Возврщает установлен ли сигнал")
                }
            } else {
                message.channel.sendMessage(message.author + "\n" + "[security] => [V1.0.0 alpha]\nspam - Возвращает опцию спама")
            }
        } else if (command[1] == 'ap') {
            if (command[2] == 'rand') {
                ap.getRandom(null, function (data) {
	                message.channel.send({
	                    embed: {
                            description: data,
	                        image: {
	                            url: data
	                        }
	                    }
	                })
                })
            } else if (command[2] == 'count') {
                ap.getCountPictures(null, function (count) {
                    message.channel.sendMessage(message.author + "\n" + "[Logger] [ap] [count] [Ожидание] => " + '[' + count + ']')
                })
            } else if (command[2] == 'tag') {
                if (command[3] == 'rand') {
                    ap.getRandom(command[4], function (data) {
                        if (data) {
	                        message.channel.send({
	                            embed: {
                                    description: data,
	                                image: {
	                                    url: data
	                                }
	                            }
	                        })
                        } else {
                            message.channel.sendMessage(message.author + "\n" + "[Logger] [ap] [tag] [rand] [Ожидание] => " + '[Ошибка ничего не найдено!]')
                        }
                    })
                } else if (command[3] == 'count') {
                    ap.getCountPictures(command[4], function (count) {
                        message.channel.sendMessage(message.author + "\n" + "[Logger] [ap] [tag] [count] [Ожидание] => " + '[' + count + ']')
                    })
                } else {
                    message.channel.sendMessage(message.author + "\n" + "rand - Возвращает рандомное\ncount - Возвращает кол-во пикч всего\nСовместный тег! => foot||blush")
                }
            } else {
                message.channel.sendMessage(message.author + "\n" + "rand - Возвращает рандомное\ncount - Возвращает кол-во пикч всего\ntag - Возвращает с использованием тегом")
            }
        } else {
    		message.channel.sendMessage(message.author + "\n" + prefix + "discord - api дискорда" + "\n" + prefix + "coub - коуб видео\n" + prefix + "ap - аниме картинки [https://anime-pictures.net]\n" + prefix + "neko - 2d neko\n" + prefix + "waifu2x - Изоброжение рандомные waifu2x\n" + prefix + "nekoLife - NekoLife хентай ;)\n" + prefix + "sec - Защита\n" + prefix + "util - прочее команды\n" + prefix + "ver - Версия\n" + "ыднамок еыньлакину - euqinu" + prefix + "\n" + prefix + "h - стэк команд\n----------\n[dztb - v" + version + "] => discord.gg/uq57gQg\n[Исходный код] => https://github.com/AliensRedSoftware/dztb.git\n[Помощь]\n[Яд] => 410018314785030")
    	}

    }

})
client.login(global.token)

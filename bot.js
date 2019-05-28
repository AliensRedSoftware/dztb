const Discord = require('discord.js')
const msleep = require('msleep')
const nekosLife = require('nekos.life')
var neko = require("./classes/neko.js")

const client = new Discord.Client()
const nekoClient = new nekosLife();

var prefix = '='

var rand = false
var nekoOptions = [rand = false, channel = null, freezing = 5]
var options = [channel = null, text = null]

/**
 * Время ожидание выполнение
 */
function sleep(n) {
  msleep(n * 1000);
}

client.on('message', message => {
    options["channel"] = message.channel.name
    options["text"] = message.content
})

client.on('message', message => {
    if (nekoOptions['rand'] == true && nekoOptions['channel'] == options['channel']) {
        sleep(nekoOptions["freezing"]);
        neko.getRandom(function (data) {
            message.channel.send({
                embed: {
                    description: "https://neko-booru.com ;)",
                    image: {
                        url: data
                    }
                }
            })
        })
    }
})


client.on('message', message => {
    if(message.author === client.user) return;
    if (message.content.startsWith(prefix)) {
    	var str = options['text'];
    	var str1 = str.replace('=', ' ')
    	var command = str1.split(' ')
    	if (command[1] == 'nekoLife') {
    		if (command[2] == 'nsfw') {
    			if (command[3] == 'rand') {
    				nekoClient.nsfw.randomHentaiGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'pussy') {
    				nekoClient.nsfw.pussy().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'nekoGif') {
    				nekoClient.nsfw.nekoGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'neko') {
    				nekoClient.nsfw.neko().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'lesbian') {
    				nekoClient.nsfw.lesbian().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'kuni') {
    				nekoClient.nsfw.kuni().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'cumsluts') {
    				nekoClient.nsfw.cumsluts().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'classic') {
    				nekoClient.nsfw.classic().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'boobs') {
    				nekoClient.nsfw.boobs().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'bj') {
    				nekoClient.nsfw.bJ().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'anal') {
    				nekoClient.nsfw.anal().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'avatar') {
    				nekoClient.nsfw.avatar().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'yuri') {
    				nekoClient.nsfw.yuri().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'trap') {
    				nekoClient.nsfw.trap().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'tits') {
    				nekoClient.nsfw.tits().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'girlSoloGif') {
    				nekoClient.nsfw.girlSoloGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'girlSolo') {
    				nekoClient.nsfw.girlSolo().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'smallBoobs') {
    				nekoClient.nsfw.smallBoobs().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'pussyWankGif') {
    				nekoClient.nsfw.pussyWankGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'pussyArt') {
    				nekoClient.nsfw.pussyArt().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'kemonomimi') {
    				nekoClient.nsfw.kemonomimi().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'kitsune') {
    				nekoClient.nsfw.kitsune().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'keta') {
    				nekoClient.nsfw.keta().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'holo') {
    				nekoClient.nsfw.holo().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'holoEro') {
    				nekoClient.nsfw.holoEro().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'hentai') {
    				nekoClient.nsfw.hentai().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'futanari') {
    				nekoClient.nsfw.futanari().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'femdom') {
    				nekoClient.nsfw.femdom().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'feetGif') {
    				nekoClient.nsfw.feetGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'eroFeet') {
    				nekoClient.nsfw.eroFeet().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'feet') {
    				nekoClient.nsfw.feet().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'ero') {
    				nekoClient.nsfw.ero().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'eroKitsune') {
    				nekoClient.nsfw.eroKitsune().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'eroKemonomimi') {
    				nekoClient.nsfw.eroKemonomimi().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'eroNeko') {
    				nekoClient.nsfw.eroNeko().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'eroYuri') {
    				nekoClient.nsfw.eroYuri().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'cumArts') {
    				nekoClient.nsfw.cumArts().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'blowJob') {
    				nekoClient.nsfw.blowJob().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'pussyGif') {
    				nekoClient.nsfw.pussyGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else {
    				message.channel.sendMessage("rand, pussy, nekoGif, neko, lesbian, kuni, cumsluts, classic, boobs, bj, anal, yuri, trap, tits, girlSoloGif, girlSolo, smallBoobs, pussyWankGif, pussyArt, kemonomimi, kitsune, keta, holo, holoEro, hentai, futanari, femdom, feetGif, eroFeet, feet, ero, eroKitsune, eroKemonomimi, eroNeko, eroYuri, cumArts, blowJob, pussyGif")
    			}
    		} else if (command[2] == 'sfw') {
    			if (command[3] == 'smug') {
    				nekoClient.sfw.smug().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'baka') {
    				nekoClient.sfw.baka().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'tickle') {
    				nekoClient.sfw.tickle().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'slap') {
    				nekoClient.sfw.slap().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'poke') {
    				nekoClient.sfw.poke().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'pat') {
    				nekoClient.sfw.pat().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'neko') {
    				nekoClient.sfw.neko().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'nekoGif') {
    				nekoClient.sfw.nekoGif().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'meow') {
    				nekoClient.sfw.meow().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'lizard') {
    				nekoClient.sfw.lizard().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'kiss') {
    				nekoClient.sfw.kiss().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'hug') {
    				nekoClient.sfw.hug().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'foxGirl') {
    				nekoClient.sfw.foxGirl().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'feed') {
    				nekoClient.sfw.feed().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'cuddle') {
    				nekoClient.sfw.cuddle().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'kemonomimi') {
    				nekoClient.sfw.kemonomimi().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'holo') {
    				nekoClient.sfw.holo().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else if (command[3] == 'woof') {
    				nekoClient.sfw.woof().then(response => {
    					message.channel.sendMessage(response['url'])
    				})
    			} else {
    				message.channel.sendMessage("smug, baka, tickle, slap, poke, pat, neko, nekoGif, meow, lizard, kiss, hug, foxGirl, feed, cuddle, kemonomimi, holo, woof")
    			}
    		} else {
    			message.channel.sendMessage("=nekoLife - nsfw или sfw")
    		}
    	} else if (command[1] == 'neko') {
    		if (command[2] == 'rand') {
    			neko.getRandom(function (data) {
		            message.channel.send({
		                embed: {
		                    description: "https://neko-booru.com ;)",
		                    image: {
		                        url: data
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
		            message.channel.sendMessage("[" + nekoOptions["channel"] + "]" + "[" + nekoOptions["freezing"]  + "сек" + "]" + "Получение => " + "Да )");
		        } else {
		            message.channel.sendMessage("[" + nekoOptions["channel"] + "]" + "[" + nekoOptions["freezing"]  + "сек" + "]" + "Получение => " + "Нет (");
		        }
    		} else if (command[2] == 'freezing') {
    			var value = parseInt(command[3]);
    			if (value != null && isNaN(value) != true && value > 0 && value < 11) {
    				message.channel.sendMessage('Замарозка успешно установлена:' + value + "сек")
    				nekoOptions['freezing'] = value;
    			} else if (value > 0) {
    				message.channel.sendMessage('Замарозка не может быть больше 10сек установлена')
    			} else if (value < 11) {
    				message.channel.sendMessage('Замарозка не может быть меньше 1сек установлена')
    			} else if (typeof(value) == 'string') {
    				message.channel.sendMessage('Замарозка не может равнятся строки = (')
    			} else {
    				message.channel.sendMessage('Замарозка не может равнятся ничего = (')
    			}
    		} else {
    			message.channel.sendMessage("=rand - Возвращает рандомное\n=update - Режим обновление\n=freezing - Замарозка (5 сек)")
    		}
    	} else {
    		message.channel.sendMessage("=neko - 2d neko\n=nekoLife - NekoLife хентай ;)\n=h - стэк команд\n----------0\n[dztb - v0.0.1] => discord.gg/A4GWdAM\n[Помощь]\n[Яд] => 410018314785030")
    	}

    }

})
client.login('')
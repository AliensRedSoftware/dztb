
/**
 * Возврщает установлен ли сигнал ;)
 * selected - id
 */
this.getIsInstalled = function (selected, active) {
    for (var id in active){
        if (active.hasOwnProperty(id)) {
            if (id == selected) {
                return true
            }
        }
    }
}


/**
 * Возвращает цвет сигнала
 */
this.getIsStatus  = function (botid, active, tm, spamStatus, channel) {
    var currentHour = new Date().getHours();
    var currentMin = new Date().getMinutes();
    var currentSecond = new Date().getSeconds();
    var freezing = 10 //10 сек
    var maxShans = 5
    if (botid != 396622379901648906) {
        if (spamStatus) {
            if (channel) {
                for (var id in active){
                    if (active.hasOwnProperty(id)) {
                        Hour = tm[id].split(':')[0]
                        Min = tm[id].split(':')[1]
                        Second = tm[id].split(':')[2]
                        //Разница
                        Hour = currentHour - Hour
                        Min = currentMin - Min
                        Second = currentSecond - Second
                        previwTime = Hour + ":" + Min + ":" + Second
                        //console.log("Прошлое =>" + Hour + ":" + Min + ":" + Second)
                        if (Math.sign(Hour) == -1) {
                            Hour = 0
                        }
                        if (Math.sign(Min) == -1) {
                            Min = 0
                        }
                        if (Math.sign(Second) == -1) {
                            Second = freezing
                        }
                        if (Hour >= 0) {
                            if (Min >= 0) {
                                if (Second >= freezing) {
                                    return true
                                } else {
                                    return false
                                }
                            } else {
                                //message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> [Оу оу слишком быстрый текст не превышайте скорость остановки] => [" + Min + ' из ' + MinFreezing + "Сек]")
                            }
                        } else {
                            //message.channel.sendMessage(message.author + "\n" + "[security] => [spam] [" + message.author + "] " + "=> Постить нельзя была Меньше " + Hour + "мин")
                        }
                    }
                }
            }
        }
    }
}

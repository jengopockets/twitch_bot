let commands = {
    "!yomama": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: false
    },
    "!norris": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: false
    },
    "!xp": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: false
    },
    "!sad": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: false
    },
    "!why": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: false
    },
    "!wth": {
        waitTime: 1* 60000,
        lastUsed: false,
        restricted: false
    },
    "!vc": {
        waitTime: 5* 60000,
        lastUsed: false,
        restricted: true
    }


}

function pocketFilter(client, message, userState){
    
   
    if(!(message in commands)){
        return false
    }
    let msgSentDate = Date.now()
    let defaultWaitTime = 60000 * 2
    let commandWaitTimer = commands[message] || {waitTime: defaultWaitTime, lastUsed:false}
    
    let timeWait = (commandWaitTimer.waitTime - (msgSentDate - commandWaitTimer.lastUsed)) / 1000
    
    if(commandWaitTimer.lastUsed !== false ? msgSentDate - commandWaitTimer.lastUsed < commandWaitTimer.waitTime : false){

        client.say(process.env.CHANNEL, `Sorry you need to wait ${timeWait} seconds to use command ${message}`);
        return true
    }
    commands[message].lastUsed = msgSentDate;
}

exports.pocketFilter = pocketFilter

function pocketFilter(client, message, userState){
    
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
            waitTime: 5* 60000,
            lastUsed: false,
            restricted: false
        },
        "!vc": {
            waitTime: 5* 60000,
            lastUsed: false,
            restricted: true
        }
    
    
    }
    console.log(message);
    if(message !== commands[message]){
        return false
    }
    let msgSentDate = Date.now()
    let defaultWaitTime = 60000 * 2
    let commandWaitTimer = commands[message] || {waitTime: defaultWaitTime, lastUsed:false}
    console.log(commandWaitTimer);
    if((commandWaitTimer.lastUsed !== false ? msgSentDate - commandWaitTimer.lastUsed < commandWaitTimer.waitTime : false)){
        console.log('hit');
        client.Say('Sorry you need to wait' + (commandWaitTimer.waitTime - (msgSentDate - commandWaitTimer.lastUsed)) / 1000 + ' seconds');
        return true
    }
    commands[message].lastUsed = msgSentDate;
    console.log(commands[message]);
}

exports.pocketFilter = pocketFilter
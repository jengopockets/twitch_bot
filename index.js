const tmi = require('tmi.js');
const axios = require('axios')
require('dotenv').config()

const { soundBoard } = require('./soundBoard')
const { rockPaper } = require('./games/rps');
const { joke } = require('./joke');
const { musicPlayer } = require('./visuals/musicPlayer');
const { pocketFilter } = require('./utility/pocketFilter');

const channelName = process.env.CHANNEL
// console.log(process.env.USERNAME)
const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: process.env.USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels:[channelName]
};

const client = new tmi.client(options);

let commandsTimers = {
    "!yomama": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!norris": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!xp": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!sad": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!why": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!wth": {
        waitTime: 5* 60000,
        lastUsed: false
    },
    "!vc": {
        waitTime: 5* 60000,
        lastUsed: false
    },


}

client.connect();

client.on('connected', (address, port) => {
    client.action(channelName, 'Stumbled in...')
});

client.on('message', (channel, userState, message, self) => {
    // console.log(pocketFilter(client, message, userState));
    if(pocketFilter(client, message, userState)){
        return
    }
    // pocketFilter(client, message, userState)
    // let msgSentDate = Date.now()
    // let defaultWaitTime = 60000 * 2
    // let commandWaitTimer = commandsTimers[message] || {waitTime: defaultWaitTime, lastUsed:false}
    
    // if((commandWaitTimer.lastUsed !== false ? msgSentDate - commandWaitTimer.lastUsed < commandWaitTimer.waitTime : false)){
    //     console.log('User need to wait' + (commandWaitTimer.waitTime - (msgSentDate - commandWaitTimer.lastUsed)) / 1000 + ' seconds');
    //     return
    // }
    // commandsTimers[message].lastUsed = msgSentDate;


    const messenger = userState.username
    const commands = message.split(" ")
    // console.log(commands);
    if(commands[0] === '!vs' ){
        musicPlayer(commands[0], commands[1])
    }
    if(message === '!commands') {
        client.action(process.env.CHANNEL, `!discord, !rps, !yomama, !norris, !wth, !why, !sad, !xp`)
    }
    if(message === '!discord'){
        client.say(process.env.CHANNEL, 'Join our discord here https://discord.gg/nTfWKkFkc5')
    }

    if(message === '!rps'){
        client.action(process.env.CHANNEL, `To play Rock Paper Sissors type !rps <Move>. Valid Moves are r p s.` );
        
    }
    
    if(message === `!rps r` || message === '!rps s' || message === '!rps p'){
       const [result, cpu] = rockPaper(message[5]);
       let entry = null
       if (message[5] === 'r'){
           entry = 'Rock'
       }else if(message[5] === 's'){
           entry = 'Scissors'
       }else{
           entry = 'Paper'
       }

       client.action(process.env.CHANNEL, `You Chose ${entry} , Your Opponent Chose ${cpu}! (${result})` );
    }
    if(message === '!wth' || message === '!sad' || message === '!xp' || message === '!why'){
        soundBoard(message.substring(1), 2)
    }

    if(message === '!yomama' || message === '!norris'){
        joke(messenger, client, message)
    }
    
})
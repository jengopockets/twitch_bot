const axios = require('axios')
const { soundBoard } = require('./soundBoard')
function joke(messenger, client, type){

    const types = {
        '!norris': `http://api.icndb.com/jokes/random?firstName=${messenger}`,
        '!yomama': 'https://api.yomomma.info/'
    }
    const api = types[type]
    let joke = ''
    // console.log(api);

    axios.get(api)
            .then(res => {
                // console.log(type);
                if(type === '!yomama'){
                    joke = messenger + ' ' + res.data.joke;
                }else{
                    // console.log(res);
                    joke = res.data.value.joke
                }
                // console.log(joke);
                
    
    
                soundBoard(joke, 1)
                client.say(process.env.CHANNEL, joke)
            })
            .catch(err => {
                console.log("error");
            })
}

exports.joke = joke
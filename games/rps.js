const tmi = require("tmi.js")





function rockPaper(user){

    const moves = ['Rock','Paper','Scissors']
    const wins = {
    'r': 's',
    's': 'p',
    'p': 'r'
}
    
    const cpu = moves[Math.floor(Math.random() * moves.length)]
    const aiMove = cpu[0].toLowerCase()

    console.log(aiMove);

    if(aiMove === user){
        return ['Tie', cpu]
    }

    if(wins[user] !== aiMove ){
        return ['Loss', cpu]
    }

    return ['Win', cpu]

    

    
    
}

exports.rockPaper = rockPaper
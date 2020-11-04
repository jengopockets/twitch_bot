const { exec } = require("child_process");

function musicPlayer(command, message){
    console.log(command, message);
    if(message === 'quit'){
        
        exec(`vlc vlc://quit`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                   return;
             }
            if (stderr) {
                 console.log(`stderr: ${stderr}`);
                  return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }else{
        console.log('hey listen', message);
        exec(`vlc --intf dummy ${message} vlc://quit`, (error, stdout, stderr) => {
            if (error) {
                 console.log(`error: ${error.message}`);
                   return;
            }
            if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
            }
            console.log(`stdout: ${stdout}`);
        })

    }

}

exports.musicPlayer = musicPlayer
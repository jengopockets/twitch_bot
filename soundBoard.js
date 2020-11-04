const { exec } = require("child_process");

function soundBoard(message, type){

    if(type === 1){
        exec(`espeak -v en-sc -g 5 "${message}"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        
    }else{
        exec(`vlc --intf dummy sounds/${message}.mp3 vlc://quit`, (error, stdout, stderr) => {
             if (error) {
                console.log(`error: ${error.message}`);
                   return;
             }
            if (stderr) {
                 console.log(`stderr: ${stderr}`);
                  return;
            }
            console.log(`stdout: ${stdout}`);
        });

    }
}
exports.soundBoard = soundBoard
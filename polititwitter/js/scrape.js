var username = handle;

const { spawn } = require('child_process');

const child = spawn('scrape-twitter', ['timeline', username]);

// const child = spawn('pwd');
setTimeout(kill, 5000);




function kill(){
    var txts = [];
    child.stdin.pause();
    child.kill();
    child.stdout.on('data', function(data) {
        var data_str = data.toString()
        var re = /"text":.*?"userMentions"/;
        var match = data_str.match(re)
        for (var i=0; i<match.length; i++){
            txts.push(match[i].replace('"text":', "").replace('"userMentions"', ""));

        }
        // console.log(data["screenName"] + " ")
        // console.log(typeof data)
        // console.log(Object.entries(data + " "))
        //Here is where the output goes
    });
    setTimeout(function () {
        console.log(txts)
    }, 1000)

}
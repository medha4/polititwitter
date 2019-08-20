// We'll use Axios to make our HTTP Request, install with NPM or Yarn!
var Axios = require('axios')

// Our Phone2Action API Key goes here
// Super important, we need this to show that we're authorized to make our request
var xAPIKey = '' // Should not be empty, see the README for info on how to get an API Key

Axios.defaults.headers.common['X-API-Key'] = 'ie5EtNqb2pafUpw0FsMC84hHqrW9L4uf2Ql9YTJF' // We apply the API Key to Axios
// We're changing the defaults, so every HTTP Request Axios sends will include the API Key!
const { spawn } = require('child_process');


function recent_tweets_with_score(){
    // this method returns a dictionary of {tweet:sentiment, tweet1:sentiment1 ...} 
    var username = 'realdonaldtrump';
    
    const child = spawn('scrape-twitter', ['timeline', username]);
    
    var txts = [];
    var dict = {}
    // const child = spawn('pwd');
    setTimeout(kill, 5000);
    setTimeout(function () {
        for (var i=0; i<txts.length; i++) {
            // console.dir(sentiment.analyze(txts[i]).score + " " + txts[i] )
            dict[txts[i]] = sentiment.analyze(txts[i]).score
        }
        return dict;
    }, 6000);
}

function representatives_from_address(address) {
    //returns a representatives DICTIONARY. 
    // i commented some code that you need to use to make this work below vvv
    // representatives.forEach(function(representative) {
            
        //     var firstName = representative['first_name']
        //     var lastName = representative['last_name']
        //     console.log('Your Representative in national Congress is', firstName, lastName);
        //     // var medias = representative.socials;
        //     // handles = []
        //     // for (var i = 0; i < medias.length; i++) {
        //     //     if (medias[i].identifier_type == 'TWITTER'){
        //     //         handles.push(medias[i].identifier_value)
        //     //
        //     //     }
        //     // }
        // }
    // First, we define our base URL and our parameters
    // Our parameters can be a JSON, since Axios will convert them
    var endpoint = 'https://fmrrixuk32.execute-api.us-east-1.amazonaws.com/hacktj/legislators'
    var parameters = {
        'level': 'NATIONAL_LOWER',
        'address': address
    }
    
    // Now, we're able to fire the configured HTTP GET request
    // Axios uses JavaScript Promises, so it'll call `.then()` when done
    Axios.get(endpoint, {
        params: parameters
    }).then(function(response) {
        var representatives = response.data.officials
        // Finally, we pick out the data we want and print it to the console
        // Use Postman to figure out what format your data is in and access it accordingly
        return representatives;
        // representatives.forEach(function(representative) {
            
        //     var firstName = representative['first_name']
        //     var lastName = representative['last_name']
        //     console.log('Your Representative in national Congress is', firstName, lastName);
        //     // var medias = representative.socials;
        //     // handles = []
        //     // for (var i = 0; i < medias.length; i++) {
        //     //     if (medias[i].identifier_type == 'TWITTER'){
        //     //         handles.push(medias[i].identifier_value)
        //     //
        //     //     }
        //     // }
    
        // })
    }).catch(function(error) {
        if (xAPIKey === '') {
            console.error('GET Request failed, your API Key is empty!')
            console.error('Set the `xAPIKey` variable\'s value (line 6) to your Phone2Action API Key!')
        } else {
            console.error(error)
        }
    })
}
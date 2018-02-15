// ****************************************************** DOTENV PACKAGE *********************************************

// config reads your .env file, parses the contents, assigns it to process.env, and returns an Object with a parsed key

require("dotenv").config();

//const result = dotenv.config();

//if(result.error) {
    //return console.log(error);
//}

//console.log(result.parsed);


var action = process.argv[2];
var value = process.argv[3];



// ****************************************************** IMPORT KEYS.JS FILE *********************************************

var keys = require('./keys.js');

// Add code require to import keys.js file and store it in a variable

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

// ****************************************************** Function Commands *********************************************



// to retrieve data from Twitter, Spotify, and OMDB APIs you need to send requests. 

//Use Request to grab data from the OMDB API


// Make it so liri.js can take in *my-tweets (this will show your last 20 tweets and when they were created in your terminal window)

//'spotify-this-song' (This will show the following info: Artist(s), song name, a preview link of the song from Spotify, the album that the song is from
//Use the node-spotify-api package to retrieve song info from Spotify's API

//Use request package to retrieve data from the OMDB API. This API does require an API key. You may use trilogy??? What does that mean?

//Use the fs NOde packaget to make LIRi take the txt inside of random.txt, and then use it to call one of LIRI's command. It should run spotify-this-song


// ****************************************************** SPOTIFY *********************************************


//In terminal npm install --save node-spotify-api

var Spotify = require('node-spotify-api');

Spotify.search({artist, query: 'My search query', limit: 20}, function(error, data) {
    if(err) {
        return console.log('err');
    }

    console.log(data);

});

// Spotify requests
// var Spotify = require('node-spotify-api');
// var spotify = new Spotify({
    //id: <your spoitfy client id>,
    //secret: <your spotify client secret>
//});

// spotify
// .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8')
// .then(function(data) {
    //console.log(data);
//})
//.catch(function(err) {
    //console.log(error);
//});

// ****************************************************** TWITTER *********************************************

//npm install twitter

var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
 
 
var params = {
    screen_name: 'Antilliack'
} && {
    coundt: 20
};



// ****************************************************** OMDB *********************************************

var request = require('request');

var fs = require('fs'); 

request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});


// ****************************************************** SWITCH FOR ACTIONS AND VALUES*********************************************

switch(action) {
    case 'mytweets':
        myTweets();
        break;
    case 'spotify':
        spotifyThis(value);
        break;
    case 'omdb':
        omdbThis(value);
        break;
    case 'command':
        command();
        break;
}


// ****************************************************** FUNCTIONS********************************************


// MY-TWEETS

function myTweets() {
    client.get('statueses/user_timeline', params, function(error, tweets, response) {
        if(!error && response.statusCode == 200) {
            fs.appendFile('terminal.log', (Date() + '/r/nr//nTERMINAL COMMANDS:/R/N$:' + process.argv + '/r/n/r/nDATA OUTPUT:/r/n'), function(err) {
               if(error) {
                   return console.log(error);
               }
            });

            console.log('');
            console.log('Last 20 Tweets:')
            for (i = 0; i <tweets.length; i++) {
                var number = i + 1;
                console.log('');
                console.log([i+1] + '.' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log('');
                fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '/r/nCreated at: ' + tweets[i].created_at + '/r/n') ,function(err) {
                    if(err){
                        return console.log(error);
                    }
                });
            }
        }
    });
} 

// spotifyThis
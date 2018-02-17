

// config reads your .env file, parses the contents, assigns it to process.env, and returns an Object with a parsed key
require("dotenv").config();

var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
var keys = require('./keys');
var client = new Twitter(keys.twitterKeys);


var params = {
    name: 'Antilliack',
    count: 20
}

var request = require('request');
var fs = require('fs');

//Course of action

switch(params[0]) {

    case 'my-tweets':
        myTweets();
        break;
    case'spotify-this-song':
       if(params[1]) {  
       spotifyIt();
       } else {
        spotifyIt('The Sign');
       }
       break;
    case 'movie-this':
        omdbThis(value);
        break;
    case 'do-what-it-says':
        command();
        break;
}







function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode == 200) {

            console.log('Last 20 Tweets:')
            for (i = 0; i < tweets.length; i++) {
                var number = i + 1
                console.log('');
                console.log([i + 1] + '. ' + tweets[i].text);
                console.log('Created on: ' + tweets[i].created_at);
                console.log(' ');
            }

        }

    })
}






// spotifyThis function
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);

function spotifyIt() {
    spotify.search({ type: 'track', query: params[1] }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;  //from spotify npm docs
      }
      else{
      var songInfo = data.tracks.items[0];
      var songResult = console.log(songInfo.artists[0].name)
                       console.log(songInfo.name)
                       console.log(songInfo.album.name)
                       console.log(songInfo.preview_url)
      console.log(songResult);
      };
    });
  }   // end spotifyThis function

// omdbThis function
function omdbThis(value) {
    if (value == null) {
        value = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = [];
            jsonBody = JSON.parse(body);
            
            data.push({
                'Title: ' : jsonData.Title,
                'Year: ' : jsonData.Year,
                'Rated: ' : jsonData.Rated,
                'IMDB Rating: ' : jsonData.imdbRating,
                'Country: ' : jsonData.Country,
                'Language: ' : jsonData.Language,
                'Plot: ' : jsonData.Plot,
                'Actors: ' : jsonData.Actors,
                'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
                'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
            });

       
                console.log(data);
                writeToLog(data);
        }
}) //end omdbThis function

}

//command function
function command() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    })
} 
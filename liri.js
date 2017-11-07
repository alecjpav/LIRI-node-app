//VARIABLES
var keys = require("./keys.js"); //GRABS HIDDEN KEYS
var Twitter = require('twitter'); //NODE TWITTER PACKAGE
var spotify = require("spotify"); //NODE SPOTIFY PACKAGE
var fs = require("fs"); //USED TO READ random.txt FILE
var request = require('request'); //USED TO CALL OMDB SITE 
var params = process.argv.slice(2); //USE TO IGNORE FIRST TWO ARGV 




//SWITCH CASE 
switch (command) {
    case "my-tweets":
        myTweets(); 
        break;
        
    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        findMovie();
        break;

    case "do-what-it-says":
        readTxt();
        break;


}
//myTweets FUNCTION

function myTweets() {

    var client = new twitter (keys.twitterKeys);

    client.get('statuses/user_timeline', { screen_name: 'Harwyn', count: 20 }, function(error, data, response) {
        if (error) throw error;
        for (var i = 0; i < data.length; i++) {

            var tweetResults = data[i].text + "\n";
            console.log(" " + " " + "My last 20 Tweets" + " " + " ")
              console.log("------------------------------------------"); 
                console.log(tweetResults);

        };
    });
}


//SPOTIFY FUNCTION

function spotifySong() {
    spotify.search({ type: 'track', query: params[1] }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return; 
        } else {
            var songInfo = data.tracks.items[0];
            console.log(" " + " " + "Spotify Results" + " " + " ")
              console.log("------------------------------------------");
            console.log("artist name", songInfo.artists[0].name);
            console.log("song name", songInfo.name);
            console.log("album name", songInfo.album.name);
            console.log("preview link", songInfo.preview_url);

        };
    });
}
spotifySong();


//MOVIE FUNCTION
function findMovie() {
  request("http://www.omdbapi.com/?t=" + params[1] + "&y=&plot=short&r=json", function(error, response, body){
    var movieObject = JSON.parse(body);
    console.log(" " + " " + "Movie Results" + " " + " ")
        console.log("------------------------------------------");
    console.log("the title is", movieObject.Title);
    console.log("the year is", movieObject.Year);
    console.log("the IMDB Rating is", movieObject.imdbRating);
    console.log("the Rotten Tomatoes Rating is", + data.Ratings[1].Value);
    console.log("the country is", movieObject.Country);
    console.log("the language is", movieObject.Language);
    console.log("the plot is", movieObject.Plot);
    console.log("the actors are", movieObject.Actors);
  });
};





function readTxt() {
  fs.readFile("random.txt", "utf-8", function(err, data){
    data.split(',');
    spotifySong(data[1]);
  });
};
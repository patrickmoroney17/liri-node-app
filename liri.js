require('dotenv').config();

var keys = require('./keys.js')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

const axios = require("axios");

// Load the fs package to read and write
var fs = require("fs");

// Take two arguments.
var targetApi = process.argv[2];
var searchFor = process.argv[3];

// The switch-case will direct which api gets hit gets run.
switch (targetApi) {
case "concert-this":
  concertSearch();
  break;

case "spotify-this-song":
  spotifySearch();
  break;

case "movie-this":
  movieSearch();
  break;

case "do-what-it-says":
    doWhatItSays();
    break;
}

function concertSearch() {

    var giphyKey = "&api_key=G5D2MIcE6V9sCDXy9QtdjqYySLgcyNIp";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchFor + giphyKey + "&limit=10";

    axios.get(queryURL)
    .then(response => {

      var results = response.data;
      console.log(queryURL);
      displayConcerts(results);
      
    })
    .catch(error => {
      console.log(error);
    });

}

function displayConcerts(results) {
    console.log(results);
    console.log("yay");

    var data = results.data

    for (var i = 0; i < data.length; i++) {
        console.log("value: " + data[i].rating);
    }

}

function spotifySearch() {

  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(data); 
    console.log("yay");
  });

}

function movieSearch() {

  var movie = searchFor;
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  axios.get(queryURL)
  .then(response => {

    var results = response.data;
    displayMovie(results);
    
  })
  .catch(error => {
    console.log(error);
  });

}

function displayMovie(results) {

  var title = results.Title;
  console.log("Title: " + title);

  var released = results.Released;
  console.log("Released: " + released);

  var rating = results.imdbRated;
  console.log("IMDB Rating: " + rating);

  var rottenTR = results.Ratings.Source;
  console.log("Rotten Tomatoes Rating: " + rottenTR);

  var country = results.Country;
  console.log("Country where movie was produced: " + country);

  var language = results.Language;
  console.log("Language of movie: " + language);

  var plot = results.Plot;
  console.log("Plot: " + plot);

  var actors = results.Actors;
  console.log("Actors: " + actors);

}


function do-what-it-says() {
  console.log("yay");
}
require('dotenv').config();

var keys = require('./keys.js')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

const axios = require("axios");

var moment = require('moment');
moment().format();

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

  var concert = searchFor;
  var queryURL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";

  axios.get(queryURL)

  .then(function(response) {  

    console.log("yay");  
    for (var i = 0; i < response.data.length; i++) {

        var eventdate = response.data[i].datetime;
        var eventDate = eventdate.split("T");

        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city)
        console.log("Event date: " + eventDate);
        console.log("---------------------------------------");
    }
  })
  .catch(function (error) {
      console.log(error);
  });     
}

function spotifySearch() {

  var song = searchFor;
  searchArr = {type: "track", query: song, limit: 3}

  spotify.search(searchArr)
  .then(function(response) {

    console.log(response);
    for (var i = 0; i < 3; i++) {

      console.log("Artists: " + response.tracks.items[i].artists[0].name);  
      console.log("Song Name: " + response.tracks.items[i].name);
      console.log("Album Name: " + response.tracks.items[i].album.name);
      console.log("Preview Link: " + response.tracks.items[i].preview_url);
      console.log("---------------------------------------");

    }
  })
  .catch(function (error) {
      console.log(error);
  });     
}

function movieSearch() {

  var movie = searchFor;
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  axios.get(queryURL)
  .then(function(response) {

    console.log(response);

    var results = response.data;
    displayMovie(results);
    
  })
  .catch(error => {
    console.log(error);
  });

}

function displayMovie(results) {
  console.log(results);

  var title = results.Title;
  console.log("Title: " + title);

  var released = results.Released;
  console.log("Released: " + released);

  var rating = results.imdbRating;
  console.log("IMDB Rating: " + rating);

  var rottenTR = results.Ratings[1].Value;
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


// function do-what-it-says() {
//   console.log("yay");
// }
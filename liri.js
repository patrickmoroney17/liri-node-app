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

  searchArr = {type: "track", query: "Roundabout", limit: 3}

  spotify.search(searchArr, function(err, results) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  
  var data = results.tracks;
  displaySpotify(data);

});

}

function displaySpotify(data) {
  console.log("yay");

  var results = data.items;
  console.log(results);
  // console.log(JSON.stringify(results, null, 2));

  for (var i = 0; i < results.length; i++) {
      // console.log("i: " + i)
      console.log("Song name: " + results[i].name);
      console.log("Preview URL: " + results[i].preview_url);

      for (j = 0; j < results[i].artists.length; j++) {     
        console.log("Artists: " + results[i].artists[j].name);
      }

      for (k = 0; k < results[i].album.length; k++) {     
        console.log("Album: " + results[i].album[k].name);
        console.log("--------------------");
      }
  }
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


// function do-what-it-says() {
//   console.log("yay");
// }
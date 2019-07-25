require('dotenv').config();

var keys = require('./keys.js')
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)

const axios = require("axios");

var moment = require('moment');
moment().format();

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

  // var concert = searchFor;
  var queryURL = "https://rest.bandsintown.com/artists/" + searchFor + "/events?app_id=codingbootcamp";

  axios.get(queryURL)

  .then(function(response) {  

    for (var i = 0; i < response.data.length; i++) {

        var eventdate = response.data[i].datetime;
        var eventDate = eventdate.split("T");

        console.log("---------------------------------------");
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

  searchArr = {type: "track", query: searchFor, limit: 3}

  spotify.search(searchArr)
  .then(function(response) {

    for (var i = 0; i < 3; i++) {

      console.log("---------------------------------------");
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

  if (!searchFor) {
    searchFor = "Mr Nobody";
  }

  var queryURL = "https://www.omdbapi.com/?t=" + searchFor + "&apikey=trilogy";

  axios.get(queryURL)
  .then(function(response) {

    var results = response.data;
    displayMovie(results);
    
  })
  .catch(function (error) {
    console.log(error);
}); 

}

function displayMovie(results) {

  console.log("---------------------------------------");
  console.log("Title: " + results.Title);
  console.log("Released: " + results.Released);
  console.log("IMDB Rating: " + results.imdbRating);
  console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
  console.log("Country where movie was produced: " + results.Country);
  console.log("Language of movie: " + results.Language);
  console.log("Plot: " + results.Plot);
  console.log("Actors: " + results.Actors);
  console.log("---------------------------------------");

}


function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
          return console.log(error);
      }

      var dataArr = data.split(",");
      searchArr = {type: "track", query: dataArr[1], limit: 3}

      spotify.search(searchArr)
      .then(function(response) {

        for (var i = 0; i < 3; i++) {
    
          console.log("---------------------------------------");
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
  })
}
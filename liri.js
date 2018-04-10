require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
// var Request = require("request");
var keys = require("./keys");
var fs = require("fs");

var params = { screen_name: "voodoorundown", count: 20 };
var spotify = new Spotify(keys.spotify);

// *******  Twitter *******
//
function myTweets() {
  var client = new Twitter(keys.twitter);
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(
          "Tweet: " + tweets[i].text + "\nCreated on: " + tweets[i].created_at
        );
      }
    }
  });
}

// *******  Spotify *******
//
function askSpotify() {
  var client = new Spotify(keys.spotify);
  // }
  song = process.argv[3];
  if (song === undefined) {
    song = "The Sign";
  }

  spotify.search({ type: "track", query: song, limit: 10 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error in Spotify: " + err);
    }

    //   console.log ("Full:", JSON.stringify(data));
    console.log("Artist:", data.tracks.items[0].artists[0].name);
    console.log("Track name:", data.tracks.items[0].name);
    console.log("Preview: ", data.tracks.items[0].preview_url);
    console.log("Album: ", data.tracks.items[0].album.name);
  });
}
// *******  OMDB *******
//
function askOMDB() {
  var movie = process.argv[3];

  if (movie == undefined) {
    movie = "Mr. Nobody";
  }

  var request = require("request");
  var req = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
  // console.log("Movie is:", movie, ":");
  request(req, function(error, response, body) {
    // console.log(body);
    // console.log(req);
    json = JSON.parse(body);
    console.log("Title:", json.Title);
    console.log("Year:", json.Year);
    console.log("IMDB Rating:", json.imdbRating);
    //    console.log ("Rotten Tomatoes",
    console.log("Country:", json.Country);
    console.log("Language:", json.Language);
    console.log("Plot:", json.Plot);
    console.log("Actors:", json.Actors);
  });
}

// ******* fs *******
//
function doWhat() {
  fs.readFile("random.txt", "UTF-8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
}

// if (cmd === "do-what-it-says") {
// go to random file, using Fs require
// get contents
// put contents into cmd, proceed with rest of code
// return as result of that function the contents of random text file
// }

var cmd = process.argv[2];

if (cmd === "do-what-it-says") {
  cmd = doWhat();
}
if (cmd === "my-tweets") {
  myTweets();
} else if (cmd === "spotify-this-song") {
  askSpotify();
} else if (cmd === "movie-this") {
  askOMDB();
} else {
  console.log("Please enter valid command");
}

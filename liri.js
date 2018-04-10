require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
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
function askSpotify(song) {
  var client = new Spotify(keys.spotify);
  if (song === undefined) {
    song = "The Sign";
    var artist = "Ace of Base";
  }
  spotify.search({ type: "track", query: song, limit: 10 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error in Spotify: " + err);
    }
    var i = 0;
    if (artist != undefined) {
      while (data.tracks.items[i].artists[0].name != artist) {
        i++;
      }
    }
    console.log("Artist:", data.tracks.items[i].artists[0].name);
    console.log("Track name:", data.tracks.items[i].name);
    console.log("Preview: ", data.tracks.items[i].preview_url);
    console.log("Album: ", data.tracks.items[i].album.name);
  });
}

// *******  OMDB *******
//
function askOMDB(movie) {
  if (movie == undefined) {
    movie = "Mr. Nobody";
  }

  var request = require("request");
  var req = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
  request(req, function(error, response, body) {
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
      console.log(data);

      var dataArr = data.split(",");
      cmd = dataArr[0];
      search = dataArr[1];

      if (cmd === "spotify-this-song") {
        askSpotify(search);
      } else if (cmd === "movie-this") {
        askOMDB(search);
      } else if (cmd === "my-tweets") {
        myTweets();
      } else {
        console.log("Please enter valid command");
      }
    }
  });
}

var cmd = process.argv[2];

if (cmd === "do-what-it-says") {
  doWhat();
} else if (cmd === "my-tweets") {
  myTweets();
} else if (cmd === "spotify-this-song") {
  askSpotify(process.argv[3]);
} else if (cmd === "movie-this") {
  askOMDB(process.argv[3]);
} else {
  console.log("Please enter valid command");
}

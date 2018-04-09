require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request");
var keys = require("./keys");

var params = { screen_name: "voodoorundown", count: 20 };
var spotify = new Spotify(keys.spotify);

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

function askSpotify() {
  // console.log("Spotify");
  var client = new Spotify(keys.spotify);
}

song = process.argv[3];
if (song === undefined) {
  song = "The Sign";
}

spotify.search({ type: "track", query: song, limit: 10 }, function(err, data) {
  if (err) {
    return console.log("Error in Spotify: " + err);
  }

  //   console.log ("Full:", JSON.stringify(data));
  console.log("Artist:", data.tracks.items[0].artists[0].name);
  console.log("Track name:", data.tracks.items[0].name);
  console.log("Artist:", data.tracks.items[0].artists[0].name);
  console.log("Track name:", data.tracks.items[0].name);
  console.log("Preview: ", data.tracks.items[0].preview_url);
  console.log("Album: ", data.tracks.items[0].album.name);
});

var cmd = process.argv[2];

if (cmd === "my-tweets") {
  myTweets();
} else if (cmd === "spotify-this-song") {
  askSpotify();
}

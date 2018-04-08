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

myTweets();

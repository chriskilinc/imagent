const Twit = require('twit');
const twitterConfig = require('./twitterConfig');
console.log("[imagent]  Starting Imagent");

//  Twitter Config
var T = new Twit(twitterConfig);

//  Create a USER stream on FOLLOW event
var tStream = T.stream('user');
tStream.on('follow', followed);

function followed(eventData){
  console.log("[T]  Someone Followed");
}
const Twit = require('twit');
const twitterConfig = require('./twitterConfig');
console.log("[imagent]  Starting Imagent");

//  Twitter Config
var T = new Twit(twitterConfig);

//  Create a USER stream on FOLLOW event
var tStream = T.stream('user');
tStream.on('follow', followed);

let followerName;
let followerScreenName;
function followed(eventData){
  console.log("[T]  Someone Followed");
  followerName = eventData.source.name;
  followerScreenName = eventData.source.screen_name;
  console.log("@"+followerScreenName+" - '"+followerName+"'");

  //  Exexcute Program Processing
}

const Twit = require('twit');
const twitterConfig = require('./twitterConfig');
const exec = require('child_process').exec;
const fs = require('fs');

//  Twitter Config
const T = new Twit(twitterConfig);
//  Processing Sketch Executable Command
const processingCmd = 'processing-java --sketch=%cd%/imagen --run';

//  Program  //
console.log("[imagent]  Starting Imagent");

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
  exec(processingCmd, processing);
}

function processing(){
  console.log('[P]  Finished Executing Process "processing-java"');
  console.log('[P]  An Image Was Created "output.png"')
}

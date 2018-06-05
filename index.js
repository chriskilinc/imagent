const Twit = require('twit');
const twitterConfig = require('./config/twitterConfig');
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
  console.log("|[T| EVENT]  Someone Followed");
  followerName = eventData.source.name;
  followerScreenName = eventData.source.screen_name;
  console.log("|@"+followerScreenName+" - '"+followerName+"'");

  //  Exexcute Program Processing
  exec(processingCmd, processing);
}

function processing(){
  console.log('|[P]  Finished Executing Process "processing-java"');
  console.log('|[P]  An Image Was Created "output.png"');
  const fileLocation = 'imagen/output.png';
  const params = {encoding: 'base64'}
  const b64content = fs.readFileSync(fileLocation,params);
  //  Upload Image to Twitter
  uplaodMediaToTwitter(b64content);
}

function uplaodMediaToTwitter(mediaData){
  console.log("|[T] Uploading Media To Twitter..");
  T.post('media/upload', {media_data: mediaData}, postTweetWithMedia);
}

function postTweetWithMedia(err, data, res){
  if(err){
    console.log(err);
  }
  else{
    console.log("|[T] Media was Uploaded Successfully to Twitter");
    const mediaId = data.media_id_string;
    var tweetWithMedia = {
      status: 'Thanks for the follow! @'+followerScreenName+' Here is an image i made for you with #processing',
      media_ids: [mediaId]
    }
    T.post('statuses/update', tweetWithMedia, tweeted);
  }
}

function tweeted(err, data, response) {
  if (err) {
    console.log(err);
  }
  else {
    console.log("|[T] Tweet Posted!");
  }
}
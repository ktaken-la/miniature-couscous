song="";
scoreLeftWrist=0;
scoreRightWrist=0;

LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;

function preload(){
  song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
  image(video,0,0,600,500);

  fill(255,0,0);
  stroke(255,0,0);
if (scoreRightWrist >= 0.2) {
  circle(RightWristX,RightWristY,20);

  if (RightWristY>0 && RightWristY<=100){
    document.getElementById("speed").innerHTML="speed= 0.5x";
    song.rate(0.5);
  }
  else if(RightWristY>100 && RightWristY<=200){
    document.getElementById("speed").innerHTML="speed= 1x";
    song.rate(1);
  }
  else if(RightWristY>200 && RightWristY<=300){
    document.getElementById("speed").innerHTML="speed= 1.5x";
    song.rate(1.5);
  }
  else if(RightWristY>300 && RightWristY<=400){
    document.getElementById("speed").innerHTML="speed= 2x";
    song.rate(2);
  }
  else if(RightWristY>400 && RightWristY<=500){
    document.getElementById("speed").innerHTML="speed= 2.5x";
    song.rate(2.5);
}
  
  }


  if(scoreLeftWrist>0.2){
  circle(LeftWristX,LeftWristY,20);
  InNumberleftWristY=Number(LeftWristY);
  remove_decimals=floor(InNumberleftWristY);
  volume=remove_decimals/500;
  console.log("volume= "+volume);
  document.getElementById('volume').innerHTML="volume="+volume;
  song.setVolume(volume);
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function modelLoaded() {
  console.log('Posenet is initialized');
}

function gotPoses(results){
  if(results.length>0){
    console.log(results);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("LeftWristX="+LeftWristX+" LeftWristY="+LeftWristY);
    RightWristX=results[0].pose.leftWrist.x;
    RightWristY=results[0].pose.leftWrist.y;
    console.log("RightWristX="+RightWristX+" RightWristY="+RightWristY);
  }
}
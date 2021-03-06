status = "";

object = [];

function preload(){
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide(); 
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

    r = random(255);
    g = random(255);
    b = random(255);

    objectDetector.detect(video, gotResult);

    for (i = 0; i < object.length; i++){

    document.getElementById("status").innerHTML = "Status : Objects Detected";
    doccument.getElementById("no_of_objects").innerHTML = "Number of Objects detected are : " + object.length;

    fill(r, g, b);
    percent = floor(object[i].confidence * 100);
    text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
    noFill();
    stroke(r, g, b);
    rect(object[i].x, object[i].y, object[i].width, object[i].height);

    }
    }

}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;

}

function gotResult(error, results){

    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}
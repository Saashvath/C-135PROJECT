Status = "";
object = [];
song = "";

function preload(){
song = loadSound("alarm.mp3");

}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400)
    video.hide()
    holder =  ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("Status").innerHTML = " Status Is Detecting Object";
}

function draw(){
    image(video,0,0,400,400);

  
        if(Status !=""){
            holder.detect(video,gotResult);
            for(i=0; i<object.length; i++){
                
                document.getElementById("Status").innerHTML = "Status = Objects Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of objects detected : ";
                percent = floor(object[i].confidence*100);
                fill("red");
                text(object[i].label + " " + percent + "%" , object[i].x +15 , object[i].y +15);
                noFill();
                stroke("red");
               rect(object[i].x  , object[i].y , object[i].width  , object[i].height);

               if(object[i].label== "person"){
                document.getElementById("number_of_objects").innerHTML = " Baby Found ";
                console.log("stop");
                song.stop();
               }
               else{

                document.getElementById("number_of_objects").innerHTML = " Baby Not Found ";
                console.log("play");
                song.play();
               }
            }
           

        }


}



function modelLoaded(){

    console.log("Model Has Been Loaded Successfully!");
    Status = true;
    holder.detect(video,gotResult);

}

function gotResult(error,results){

    if(error){

        console.log(error);
    }

    else{

        console.log(results);
        object = results;
    }

}
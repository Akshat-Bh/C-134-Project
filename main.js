img = "";
dstatus = "";
objects = [];

function preload()
{
    siren= loadSound("Ambulance_Siren_Sound.mp3");
}

function setup() 
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if (dstatus != "")
    {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);

        for (i=0; i< objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of object(s) detected are: " + objects.length;
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, object[i].y);
            noFill();
            stroke(r, g, b);
            //Needs fill function to work(it sets the border colour)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects = "Person")
            {
                document.getElementById("object_found").innerHTML = "Person";
                siren.stop()
            }
            else
            {
                document.getElementById("object_found").innerHTML = "Not a person";
                siren.play()
            }
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    dstatus = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
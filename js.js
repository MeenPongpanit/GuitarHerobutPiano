var button = {};
var speed = 2;
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"G", "A":"H", "B":"J", "C2":"K", "S1":"W", "S2":"E", "S3":"T", "S4":"Y", "S5":"U", "S6":"O"};
var buttonkey = {"A":"C", "S":"D", "D":"E", "F":"F", "G":"G", "H":"A", "J":"B", "K":"C2", "W":"S1", "E":"S2", "T":"S3", "Y":"S4", "U":"S5", "O":"S6"};
var tilewidth = {"TC":50, "TS1":25, "TD":50, "TS2":25, "TE":50, "TF":50, "TS3":25, "TG":50, "TS4":25, "TA":50, "TS5":25, "TB":50, "TC2":50};
var score = 0;
var buttonuse = ["A", "S", "D", "F", "G", "H", "J", "K", "W", "E", "T", "Y", "U", "O"];
var presscount = 0;
var notedowned = 0;
var miss = 0;
var sound = {
    "A":document.querySelector(`audio[data-key="A"]`),
    "S":document.querySelector(`audio[data-key="S"]`),
    "D":document.querySelector(`audio[data-key="D"]`),
    "F":document.querySelector(`audio[data-key="F"]`),
    "G":document.querySelector(`audio[data-key="G"]`),
    "H":document.querySelector(`audio[data-key="H"]`),
    "J":document.querySelector(`audio[data-key="J"]`),
    "K":document.querySelector(`audio[data-key="K"]`),
    "W":document.querySelector(`audio[data-key="W"]`),
    "E":document.querySelector(`audio[data-key="E"]`),
    "T":document.querySelector(`audio[data-key="T"]`),
    "Y":document.querySelector(`audio[data-key="Y"]`),
    "U":document.querySelector(`audio[data-key="U"]`),
    "O":document.querySelector(`audio[data-key="O"]`)
};
var playing = {"A":0, "S":0, "D":0, "F":0, "G":0, "H":0, "J":0, "K":0, "W":0, "E":0, "T":0, "Y":0, "U":0};


function playsound(soundname){
    if(playing[soundname] == 0){
        playing[soundname] = 1;
        sound[soundname].currentTime = 0;
        sound[soundname].play();
    }
}

function pausesound(soundname){
    sound[soundname].pause();
    playing[soundname] = 0;
}

setInterval(function(){

}, 50);


console.log(String.fromCharCode(186));
document.onkeydown = document.onkeyup = function(e){
    var key_code = String.fromCharCode(e.keyCode);
    button[key_code] = e.type == "keydown";
    for(i in button){
        if(button[i]){
            var tileid = document.getElementById("T" + buttonkey[key_code]);
            if(buttonuse.includes(key_code))
            if(tileid.hasChildNodes()){
                var firstnode = tileid.firstChild;
                var posy = firstnode.getAttribute("y");
                var notesize = Number(firstnode.getAttribute("size"))*20;
                var canhit = (posy >= (450 - notesize)) && (posy <= 450);
                if(!canhit){
                    updatekeyart("T" + buttonkey[key_code], "miss");
                    miss += 1;
                }
            }
            else{
                miss += 1;
            }
        }
    }
    if(e.type == "keyup" && buttonuse.includes(key_code)){
        pausesound(key_code);
    }
    if(e.type == "keydown" && buttonuse.includes(key_code)){
        playsound(key_code);
    }
    presscount += e.type == "keyup";
    // keypress.innerText = pressing;
    pressing = "";
}
var allkeyid = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B", 7:"C2", 8:"S1", 9:"S2", 10:"S3", 11:"S4", 12:"S5", 13:"S6"};

// document.onkeyup = function(){
//     presscount += 1;
// }

for(i = 0 ; i <= 13 ; i++){
    var pk = document.getElementById(allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
    pk.style.top = 450;
}

for(i = 0 ; i <= 13 ; i++){
    var pk = document.getElementById("T" + allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
}


setInterval(whatkeypress, 10);


function whatkeypress(){
    for(i = 0 ; i <= 12 ; i++){
        if(button[keybutton[allkeyid[i]]]){
            updatekeyart(allkeyid[i], "onpress");
            updatekeyart("T" + allkeyid[i], "onpress");
        }
        else{
            updatekeyart(allkeyid[i], "unpress");
            updatekeyart("T" + allkeyid[i], "unpress");
        }
    }   
}

function updatekeyart(keyname, statset){
    var keypressed = document.getElementById(keyname);
    keypressed.setAttribute("status", statset);
}

var fallingnote = [];

function addnote(tileid, rythm){
    var note = document.createElement("div");
    note.setAttribute("class", "note");
    note.setAttribute("y", 300);
    note.setAttribute("size", rythm);
    note.setAttribute("keytohit", tileid.slice(1, tileid.length));
    note.style.width = tilewidth[tileid];
    fallingnote.push(note);
    tile = document.getElementById(tileid);
    tile.appendChild(note);
    notedowned += 1;
}
var song = [["C", 1], ["C", 2], ["E", 3], ["F", 0.5]];
var songtime = 0;
for(let i = 0 ; i <= song.length - 1 ; i++){
    songtime += song[i][1]*(i != 0);
    console.log(songtime*1000/Math.pow(speed, 2));
    setTimeout(function(){
        addnote("T" + song[i][0], song[i][1]);

    }, songtime*1000/Math.pow(speed, 2));
}

function falldownnote(noteid){
        var note = fallingnote[noteid];
        var posy = Number(note.getAttribute("y"));
        posy += speed;
        note.setAttribute("y", posy);
        note.style.top = posy;
}

function delunbound(noteid){
    var note = fallingnote[noteid];
    note.parentNode.removeChild(note)
    fallingnote.splice(noteid, 1);

}

function isunboundnote(noteid){
    var note = fallingnote[noteid];
    var posy = Number(note.getAttribute("y"));
    return (posy >= 480)
}

function keyhit(){
    //hit is 450 1 rythm = 20
    for(let i = 0 ; i < fallingnote.length ; i++){
        var posy = fallingnote[i].getAttribute("y");
        var notesize = Number(fallingnote[i].getAttribute("size"))*20;
        var canhit = (posy >= (450 - notesize)) && (posy <= 450);
        var hit = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]]
        // keypress.innerText = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]];
        fallingnote[i].setAttribute("hit", hit);
        if(hit){score += 10*speed;}
    }
}

setInterval(function(){
    if(fallingnote){
        for(let i = 0 ; i < fallingnote.length ; i ++){
            falldownnote(i);
            if(isunboundnote(i)){
                delunbound(i);
        }
    }
}
    keyhit();
    keypress.innerText = JSON.stringify(button);
    accuracy.innerText = miss;
}, 50/speed)

setInterval(function(){
    keyhit();
}, 50/speed)

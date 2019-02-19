var button = {};
var pressing = "";
var speed = 1.5;
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"J", "A":"K", "B":"L", "C2":String.fromCharCode(186), "S1":"W", "S2":"E", "S3":"U", "S4":"I", "S5":"O"};
var tilewidth = {"TC":50, "TS1":25, "TD":50, "TS2":25, "TE":50, "TF":50, "TS3":25, "TG":50, "TS4":25, "TA":50, "TS5":25, "TB":50, "TC2":50};
var score = 0;
var presscount = 0;
var notedowned = 0;

document.onkeydown = document.onkeyup = function(e){
    var key_code = String.fromCharCode(e.keyCode);
    button[key_code] = e.type == "keydown";
    for(i in button){
        if(button[i]){
            pressing += i + " ";
        }
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
    note.setAttribute("y", 0);
    note.setAttribute("size", rythm);
    note.setAttribute("keytohit", tileid.slice(1, tileid.length));
    note.style.width = tilewidth[tileid];
    fallingnote.push(note);
    tile = document.getElementById(tileid);
    tile.appendChild(note);
    notedowned += 1;
}
var song = [["C", 1], ["D", 0.5], ["E", 2], ["S1", 4], ["B", 3]];
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
        keypress.innerText = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]];
        if(canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]]){
            fallingnote[i].setAttribute("hit", "yes");
            score += 10;
        }
    }
}

setInterval(function(){
    if(fallingnote){
        for(let i = 0 ; i < fallingnote.length ; i ++){
            falldownnote(i);
            if(isunboundnote(i)){
                delunbound(i);
        }
        keyhit();
    }
}
// keypress.innerText = score;
accuracy.innerText = presscount;
}, 50/speed)
//make wrongpress condition
//make red bg color tiles when wrong hit
//reset status of tile when tile's key up
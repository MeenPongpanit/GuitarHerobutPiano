var button = {};
var speed = 2;
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"G", "A":"H", "B":"J", "C2":"K", "bC":"W", "bD":"E", "bF":"T", "bA":"Y", "bB":"U"};
var buttonkey = {"A":"C", "S":"D", "D":"E", "F":"F", "G":"G", "H":"A", "J":"B", "K":"C2", "W":"bC", "E":"bD", "T":"bF", "Y":"bA", "U":"bB"};
var tilewidth = {"TC":50, "TbC":25, "TD":50, "TbD":25, "TE":50, "TF":50, "TbF":25, "TG":50, "TbA":25, "TA":50, "TbB":25, "TB":50};
var score = 0;
var buttonuse = ["A", "S", "D", "F", "G", "H", "J", "W", "E", "T", "Y", "U"];
var presscount = 0;
var notedowned = 0;
var miss = 0;
//pull audio element to play.
var sound = {
    "C2":document.querySelector(`audio[data-key="C2"]`),
    "D2":document.querySelector(`audio[data-key="D2"]`),
    "E2":document.querySelector(`audio[data-key="E2"]`),
    "F2":document.querySelector(`audio[data-key="F2"]`),
    "G2":document.querySelector(`audio[data-key="G2"]`),
    "A2":document.querySelector(`audio[data-key="A2"]`),
    "B2":document.querySelector(`audio[data-key="B2"]`),
    "bC2":document.querySelector(`audio[data-key="bC2"]`),
    "bD2":document.querySelector(`audio[data-key="bD2"]`),
    "bF2":document.querySelector(`audio[data-key="bF2"]`),
    "bA2":document.querySelector(`audio[data-key="bA2"]`),
    "bB2":document.querySelector(`audio[data-key="bB2"]`),

    "C3":document.querySelector(`audio[data-key="C3"]`),
    "D3":document.querySelector(`audio[data-key="D3"]`),
    "E3":document.querySelector(`audio[data-key="E3"]`),
    "F3":document.querySelector(`audio[data-key="F3"]`),
    "G3":document.querySelector(`audio[data-key="G3"]`),
    "A3":document.querySelector(`audio[data-key="A3"]`),
    "B3":document.querySelector(`audio[data-key="B3"]`),
    "bC3":document.querySelector(`audio[data-key="bC3"]`),
    "bD3":document.querySelector(`audio[data-key="bD3"]`),
    "bF3":document.querySelector(`audio[data-key="bF3"]`),
    "bA3":document.querySelector(`audio[data-key="bA3"]`),
    "bB3":document.querySelector(`audio[data-key="bB3"]`),

    "C4":document.querySelector(`audio[data-key="C4"]`),
    "D4":document.querySelector(`audio[data-key="D4"]`),
    "E4":document.querySelector(`audio[data-key="E4"]`),
    "F4":document.querySelector(`audio[data-key="F4"]`),
    "G4":document.querySelector(`audio[data-key="G4"]`),
    "A4":document.querySelector(`audio[data-key="A4"]`),
    "B4":document.querySelector(`audio[data-key="B4"]`),
    "bC4":document.querySelector(`audio[data-key="bC4"]`),
    "bD4":document.querySelector(`audio[data-key="bD4"]`),
    "bF4":document.querySelector(`audio[data-key="bF4"]`),
    "bA4":document.querySelector(`audio[data-key="bA4"]`),
    "bB4":document.querySelector(`audio[data-key="bB4"]`)

};
//contain playing note.
// var playing = {};

function playsound(soundname, playtime){
        console.log(soundname);
        // playing[soundname] = 1;
        sound[soundname].currentTime = 0;
        sound[soundname].play();
        setTimeout(function(){
            pausesound(soundname);
            // playing[soundname] = 0;
        }, playtime*1000/speed/speed);
}

function pausesound(soundname){
    setTimeout(function(){
    sound[soundname].pause();
    // playing[soundname] = 0;
    }, 100)
}

setInterval(function(){

}, 50);


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
    // if(e.type == "keyup" && buttonuse.includes(key_code)){
    //     pausesound(key_code);
    // }
    // if(e.type == "keydown" && buttonuse.includes(key_code)){
    //     playsound(key_code);
    // }
    presscount += e.type == "keyup";
    // keypress.innerText = pressing;
    pressing = "";
}
var allkeyid = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B", 7:"bC", 8:"bD", 9:"bF", 10:"bA", 11:"bB"};

// document.onkeyup = function(){
//     presscount += 1;
// }

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById(allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
    pk.style.top = 450;
}

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById("T" + allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
}


setInterval(whatkeypress, 10);


function whatkeypress(){
    for(i = 0 ; i <= 11 ; i++){
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
    note.setAttribute("keytohit", tileid.slice(1, tileid.length - 1));
    note.setAttribute("soundkey", tileid.slice(1, tileid.length));
    note.style.width = tilewidth[tileid];
    if(tileid == "0"){
        note.style.display = "none";
    }
    fallingnote.push(note);
    tile = document.getElementById(tileid.slice(0, tileid.length - 1));
    tile.appendChild(note);
    notedowned += 1;
}

var song = [["C3", 4], ["D3", 4], ["E3", 4], ["F3", 4], ["G3", 4], ["A3", 4], ["B3", 4], ["C4", 4]];

// ["C", 2], ["D", 2], ["E", 2], ["E", 1], ["E", 2], ["E", 3], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 2], ["G", 1], ["G", 3],
// ["0", 2], ["C", 2], ["D", 2], ["E", 3], ["E", 2],  ["E", 2], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 2], ["G", 1], ["G", 3],
// ["0", 2], ["D", 2], ["E", 2], ["D", 3], ["C", 2], ["C", 4], ["D", 2], ["C", 3], ["G", 2], ["F", 4],
// ["0", 1], ["D", 2], ["E", 1], ["D", 1], ["C", 2], ["C", 2], ["D", 1], ["E", 2], ["D", 4],
// ["0", 3], ["C", 2], ["D", 2], ["E", 2], ["E", 1], ["E", 2], ["E", 3], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 1], ["G", 2], ["G", 3],
// ["0", 2], ["C", 2], ["D", 1], ["E", 3], ["E", 2], ["E", 1], ["E", 3], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 1], ["G", 1], ["G", 4],
// ["0", 2], ["D", 2], ["E", 1], ["D", 3], ["C", 2], ["C", 4], ["0", 1], ["C", 2], ["D", 2], ["E", 1], ["D", 1], ["C", 4],
// ["0", 2], ["E", 2], ["F", 1], ["E", 2], ["D", 1], ["C", 3], ["C", 2], ["D", 1], ["C", 4],
// ["0", 2], ["E", 2], ["F", 2], ["G", 1], ["A", 4], ["A", 1], ["B", 2], ["A", 1], ["G", 2], ["F", 2], ["G", 4],
// ["0", 2], ["C", 2], ["D", 2], ["E", 1], ["F", 3], ["0", 1], ["F", 2], ["G", 1], ["F", 1], ["E", 2], ["D", 1], ["E", 2], ["G", 4],
// ["0", 2], ["G", 2], ["G", 1], ["G", 1], ["A", 2], ["0", 1], ["A", 2], ["B", 2], ["A", 1], ["G", 2], ["F", 1], ["G", 2], ["F", 2], ["E", 4],
// ["0", 2], ["E", 2], ["A", 2], ["E", 1], ["E", 2], ["E", 1], ["E", 1], ["D", 2], ["G", 2], ["E", 4],
// ["0", 2], ["C", 2], ["D", 2], ["E", 2], ["E", 1], ["E", 2], ["E", 3], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 2], ["G", 1], ["G", 3],
// ["0", 2], ["C", 2], ["D", 2], ["E", 3], ["E", 2], ["E", 2], ["0", 1], ["D", 2], ["C", 2], ["D", 2], ["G", 2], ["G", 1], ["G", 3],
// ["0", 2], ["D", 2], ["E", 2], ["D", 2], ["C", 4], ["C", 1], ["C", 3], ["0", 1], ["C", 1], ["C", 2], ["C", 1], ["D", 2], ["C", 4],
// ["0", 2], ["E", 2], ["F", 2], ["E", 2], ["D", 1], ["C", 3], ["0", 1], ["C", 2], ["D", 1], ["C", 4],
// ["0", 4], ["0", 4], ["E", 2], ["F", 2], ["E", 2], ["D", 2], ["C", 2], ["C", 2], ["D", 2], ["C", 4]

var songtime = 0;
for(let i = 0 ; i <= song.length - 1 ; i++){
    songtime += song[i][1]*(i != 0);
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
        var canhit = (posy >= (445 - notesize)) && (posy <= 450);
        var hit = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]]
        // keypress.innerText = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]];
        fallingnote[i].setAttribute("hit", hit);
        if(hit){
            score += 10*speed;
            playsound(fallingnote[i].getAttribute("soundkey"), fallingnote[i].getAttribute("size"))
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
    }
}
    keyhit();
    // keypress.innerText = JSON.stringify(playing);
    accuracy.innerText = score;
}, 50/speed)

setInterval(function(){
    keyhit();
}, 50/speed)

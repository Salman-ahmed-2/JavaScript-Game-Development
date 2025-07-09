
let state = 'idle';


const dropdown = document.getElementById('animation');
dropdown.addEventListener('change', function(e) {
    state = e.target.value;
});


// === Canvas Setup ===
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

const canw = canvas.width = 600;   
const canh = canvas.height = 300;  


const img = new Image();
const sw = 575;  
const sh = 525;  
img.src = '/shadow_dog.png';



let sf = 5;    
let gf = 0;    


const spriteanimation = [];


const animationstate = [
    { name: 'idle',    frames: 7 },
    { name: 'jump',    frames: 7 },
    { name: 'fall',    frames: 9 },
    { name: 'run',     frames: 9 },
    { name: 'dizzy',   frames: 11 },
    { name: 'sit',     frames: 5 },
    { name: 'roll',    frames: 7 },
    { name: 'bite',    frames: 7 },
    { name: 'ko',      frames: 12 },
    { name: 'gethit',  frames: 4 }
];


animationstate.forEach((State, index) => {
    let frames = { loc: [] };

    for (let i = 0; i < State.frames; i++) {
        let posx = i * sw;      
        let posy = index * sh;   
        frames.loc.push({ x: posx, y: posy });
    }

    spriteanimation[State.name] = frames;  
});

console.log(spriteanimation); 




function loop() {
    con.clearRect(0, 0, canw, canh);  

   
    let pos = Math.floor(gf / sf) % spriteanimation[state].loc.length;

   
    let x = sw * pos;  
    let y = spriteanimation[state].loc[pos].y;

    con.drawImage(
        img,
        spriteanimation[state].loc[pos].x, 
        y,                           
        sw,                             
        sh,                               
        0, 0,                             
        canw, canh                         /
    );

    gf++;

    requestAnimationFrame(loop); 
}

loop(); 

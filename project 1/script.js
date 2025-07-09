// current animation state (idle, run, jump, etc.)
let state = 'idle';

// get dropdown element and update animation state when user selects a new option
const dropdown = document.getElementById('animation');
dropdown.addEventListener('change', function(e) {
    state = e.target.value;
});


// === Canvas Setup ===
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

const canw = canvas.width = 600;   // canvas width
const canh = canvas.height = 300;  // canvas height

// load the sprite sheet image
const img = new Image();
const sw = 575;   // width of one sprite frame
const sh = 525;   // height of one sprite frame
img.src = '/shadow_dog.png';


// === Sprite Control Variables ===
let sf = 5;     // slow factor to control animation speed
let gf = 0;     // global frame count

// store sprite frames per animation state
const spriteanimation = [];


// === Define Animation States and Their Frame Counts ===
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


// === Populate Frame Locations for Each Animation ===
// Each state gets an array of frame positions (x, y)
animationstate.forEach((State, index) => {
    let frames = { loc: [] };

    for (let i = 0; i < State.frames; i++) {
        let posx = i * sw;       // frame x position in sprite sheet
        let posy = index * sh;   // frame y position depends on the state index
        frames.loc.push({ x: posx, y: posy }); // store frame position
    }

    spriteanimation[State.name] = frames;  // store all frame positions for this state
});

console.log(spriteanimation); // debug: view the full sprite frame map



// === Game Loop ===
function loop() {
    con.clearRect(0, 0, canw, canh);  // clear the previous frame

    // calculate current animation frame
    let pos = Math.floor(gf / sf) % spriteanimation[state].loc.length;

    // get the frame's x and y position from pre-stored data
    let x = sw * pos;  // not used (you already calculate y from array below)
    let y = spriteanimation[state].loc[pos].y;

    // draw the current frame from the sprite sheet
    con.drawImage(
        img,
        spriteanimation[state].loc[pos].x, // source x
        y,                                 // source y
        sw,                                // source width
        sh,                                // source height
        0, 0,                              // destination x, y
        canw, canh                         // scale to full canvas size
    );

    gf++; // move to the next frame (this works with sf to control speed)

    requestAnimationFrame(loop); // continue the loop
}

loop(); // start the game loop

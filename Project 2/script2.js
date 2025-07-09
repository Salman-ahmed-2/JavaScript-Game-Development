// 🎮 Set up canvas and context
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

// 🎮 Set canvas width and height
const canw = canvas.width = 600;
const canh = canvas.height = 300;

// 🌄 Load parallax background images
const bg1 = new Image(); bg1.src = 'bg/bgneon.jpg';
const bg2 = new Image(); bg2.src = 'bg/layer-5.png';
const bg3 = new Image(); bg3.src = 'bg/layer-2.png';


// 🌐 Variables for scroll and control
let x = 0;          // not used directly here, but can be reused in games
let x1 = 600;       // same as above
let gf = 0;         // unused, reserved for gameplay/frame count
let speed = 1;      // master speed multiplier (controlled by slider)

// 📦 Create a Layer class for parallax scrolling
class layer {
    constructor(image, speedm) {
        this.x = 0;                          // current x position of image
        this.y = 0;                          // y is fixed at top
        this.x1 = x1;                        // backup x1 (not used directly here)
        this.width = canw;
        this.height = canh;
        this.x2 = this.width;               // secondary image position (for seamless scroll)
        this.image = image;                 // image to draw
        this.speedm = speedm;               // speed multiplier for parallax effect
        this.speed = speed * this.speedm;   // final calculated speed
    }

    update() {
        this.speed = speed * this.speedm;   // update speed if global speed changes

        // reset image position once it moves off screen
        if (this.x <= -this.width) this.x = 0;

        // move image to left
        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        // draw two copies of the image side-by-side for infinite scrolling effect
        con.drawImage(this.image, this.x, this.y, this.width, this.height);
        con.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

// 🧱 Create each layer instance with specific image and speed multiplier

const l1 = new layer(bg1, 0.5);
const l2 = new layer(bg2, 0.5);
const l3 = new layer(bg3, 0.5);


// 🧱 Add layers into an array for easy update/draw in loop
const gameobj = [l1, l2];

// 🌀 Main game loop (runs every frame)
function loop() {
    con.clearRect(0, 0, canw, canh); // clear canvas

    // update and draw each layer (manual version, but reusable)
    for (let i = 0; i < gameobj.length; i++) {
        gameobj[i].update();
        gameobj[i].draw();
    }

    // keep looping
    requestAnimationFrame(loop);
}

// ✅ Check if layers loaded
console.log(gameobj, length); // small typo: should be console.log(gameobj.length)

// 🔁 Start the loop
loop();

// 🎛️ Setup slider to control speed dynamically
const slider = document.getElementById('slider');
slider.value = speed;

const showspeed = document.getElementById('showspeed');
showspeed.innerHTML = speed;

// 👂 Update speed on slider change
slider.addEventListener('change', function(e) {
    speed = e.target.value;
    showspeed.innerHTML = e.target.value;
});
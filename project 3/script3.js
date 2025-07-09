// 🎨 Get canvas and context
const canvas = document.getElementById("can");
const con = canvas.getContext("2d");

// 📏 Set canvas size
const canw = canvas.width = 600;
const canh = canvas.height = 300;

// ⚔️ Total number of enemies
const noe = 10;

// 🕰️ Global frame counter (used for timing sprite frames)
let gf = 0;

// 👾 Enemy class
class enemy {
  constructor() {
    // 🖼️ Load enemy sprite
    this.img = new Image();
    this.img.src = "enemy1.png";

    // 🧱 Sprite frame size (source width & height from sprite sheet)
    this.sw = 293;
    this.sh = 155;

    // 📐 Size of enemy on canvas
    this.width = this.sw / 2.5;
    this.height = this.sh / 2.5;

    // 🖼️ Sprite frame index
    this.sf = 0;

    // 🕊️ Controls wing flap speed (animation rate)
    this.wings = Math.floor(Math.random() * 3 + 1);

    // 📍 Random starting position
    this.x = Math.random() * (canw - this.width);
    this.y = Math.random() * (canh - this.height);

    // 🔄 For curve movement
    this.angles = Math.random() * 0.2; // angle increment
    this.angle = 0;                    // current angle
    this.curve = Math.random() * 7;    // wave height
  }

  // 🔁 Update position and animation frame
  update() {
    // 🧭 Random horizontal movement
    this.x += Math.random() * 5 - 2.5;

    // 🌀 Sine wave vertical movement
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += this.angles;

    // 🎞️ Control sprite frame switching (wing flapping)
    if (gf % this.wings === 0) {
      if (this.sf > 4) this.sf = 0;
      else this.sf++;
    }
  }

  // 🖍️ Draw enemy on canvas
  draw() {
    // 🔳 Optional: draw boundary box (for debugging)
    con.strokeRect(this.x, this.y, this.width, this.height);

    // 🖼️ Draw one frame from the sprite sheet
    con.drawImage(
      this.img,
      this.sf * this.sw, // shift source x by frame index
      0,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

// 🧱 Create enemy objects and store in array
let e = [];
for (let i = 0; i < noe; i++) {
  e[i] = new enemy();
}

// 🔁 Main animation loop
function loop() {
  // 🧹 Clear the canvas for next frame
  con.clearRect(0, 0, canw, canh);

  // 🔁 Update and draw each enemy
  for (let i = 0; i < noe; i++) {
    e[i].update();
    e[i].draw();
  }

  // ⏲️ Increment global frame counter
  gf++;

  // 🎥 Request next animation frame
  requestAnimationFrame(loop);
}

// ▶️ Start the game loop
loop();

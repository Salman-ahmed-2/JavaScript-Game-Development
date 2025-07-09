// Get the canvas element and 2D drawing context
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

// Set canvas dimensions
const canw = canvas.width = 600;
const canh = canvas.height = 300;

// Get the canvas's position on the screen (used for mouse click correction)
const canpos = canvas.getBoundingClientRect();

// Array to store active explosions
const explosion = [];

// Explosion class handles image/sound, position, animation frames, and rotation
class Explosion {
    constructor(x, y) {
        // Load explosion image (spritesheet)
        this.img = new Image();
        this.img.src = "boom.png";

        // Load explosion sound
        this.sound = new Audio();
        this.sound.src = "sound/Wind effects 5.wav";

        // Explosion position (where user clicked)
        this.x = x;
        this.y = y;

        // Sprite frame width and height (from image)
        this.sw = 200;
        this.sh = 178;

        // Scale explosion size to 70%
        this.width = this.sw * 0.7;
        this.height = this.sh * 0.7;

        // Sprite frame index
        this.sf = 0;

        // Timer for controlling animation speed
        this.timer = 0;

        // Random rotation angle for effect variety
        this.angle = Math.random() * 6.2; // ~0 to 2π radians
    }

    // Update explosion frame and play sound once
    update() {
        if (this.sf === 0) this.sound.play(); // Play sound only on first frame
        this.timer++;
        if (this.timer % 10 === 0) {
            this.sf++; // Go to next sprite frame every 10 ticks
        }
    }

    // Draw current explosion frame with rotation
    draw() {
        con.save(); // Save current canvas state
        con.translate(this.x, this.y); // Move origin to explosion center
        con.rotate(this.angle); // Rotate explosion

        // Draw current frame of sprite
        con.drawImage(
            this.img,
            this.sf * this.sw, // source x in spritesheet
            0,
            this.sw,
            this.sh,
            0 - this.sw / 2, // center it
            0 - this.sh / 2,
            this.width,
            this.height
        );

        con.restore(); // Restore canvas state
    }
}

// Mouse click event triggers explosion creation
window.addEventListener('click', function(e) {
    dust(e); // Create new explosion at click position
});

// Function to convert mouse position to canvas coordinates and create explosion
function dust(e) {
    let posx = e.x - canpos.left;
    let posy = e.y - canpos.top;

    explosion.push(new Explosion(posx, posy)); // Add new explosion to array
}

// Main animation loop (called every frame)
function loop() {
    con.clearRect(0, 0, canw, canh); // Clear canvas

    for (let i = 0; i < explosion.length; i++) {
        explosion[i].update(); // Update animation
        explosion[i].draw();   // Draw explosion

        // If animation passed last frame, remove it from array
        if (explosion[i].sf > 5) {
            explosion.splice(i, 1); // Remove this explosion
            i--; // Adjust index due to removal
        }
    }

    requestAnimationFrame(loop); // Keep the loop going
}

// Start the animation loop
loop();

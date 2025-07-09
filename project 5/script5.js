
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

// Set canvas size to fill the entire window
const canw = canvas.width = window.innerWidth;
const canh = canvas.height = window.innerHeight;


const canvas1 = document.getElementById('coll');
const coll = canvas1.getContext('2d', { willReadFrequently: true });

// Match size with main canvas
const collw = canvas1.width = window.innerWidth;
const collh = canvas1.height = window.innerHeight;


let reveninter = 761;      // Interval (currently unused but can be used to slow down spawning)
let lastt = 0;            // Last frame timestamp
let timetonext = 0;       // Time accumulator for spawning ravens
let gf = 0;               // Global frame counter
let points = 0;           
con.font = '50px Impact'; 


let revens = [];
let explosion =[];
let smoke=[];

class raven {
  constructor() {
    this.width = 100;
    this.height = 50;

    // Start at right edge, random vertical position
    this.x = canw;
    this.y = Math.random() * (canh - this.height);

    // Random speed and direction
    this.dirx = Math.random() * 5;
    this.diry = Math.random();

    // Sprite sheet values
    this.img = new Image();
    // this.img.src = "raven.png";
     this.img.src = "raven.png";
    this.sw = 273;
    this.sh = 194;
    this.sf = 0;
    this.maxsf = 4; // Total frames
    this.wings = 0; // Timer to control flapping
    this.interval = Math.random() * 50 + 50;
     this.hast=Math.random()>0.5;

    this.markdele = false; // Will be set true if hit

  
    this.rancol = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ];
    this.color = 'rgb(' + this.rancol[0] + ',' + this.rancol[1] + ',' + this.rancol[2] + ')';
  }

 
  update(deltatime) {
    // Bounce off top and bottom
    if (this.y < 0 || this.y > canh - this.height) {
      this.diry *= -1;
    }

    // Move left + slight vertical motion
    this.x -= this.dirx;
    this.y += this.diry;

    // Control sprite frame switching based on elapsed time
    this.wings += deltatime;
    if (this.wings > this.interval) {
      if(this.sf>this.maxsf) this.sf=0;
      else this.sf++;
      this.wings = 0;
if(this.hast){
  for(let i=0;i<5;i++)
smoke.push(new Smoke(this.x,this.y,this.width,this.color));
}
      
    }

    // Extra logic based on frame count (can be reused for syncing animations)
    if (gf % this.wings === 0) {
      this.sf = (this.sf + 1) % (this.maxsf + 1);
    }
  }

  
  draw() {
  
    coll.fillStyle = this.color;
    coll.fillRect(this.x, this.y, this.width, this.height);

    // Draw raven sprite on visible canvas
    con.drawImage(
      this.img,
      this.sf * this.sw, // Crop frame from sprite sheet
      0,
      this.sw,
      this.sh,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
};



class Explosion {
    constructor(x, y,size) {
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
        this.size=size;

        // Timer for controlling animation speed
        this.timer = 0;
 this.interval = Math.random() * 50 + 50;
        // Random rotation angle for effect variety
        this.angle = Math.random() * 6.2; // ~0 to 2π radians
        this.markdele = false; // Will be set true if hit
    }

    // Update explosion frame and play sound once
     update(deltatime) {
        if (this.sf === 0) this.sound.play(); // Play sound only on first frame
       

         // Control sprite frame switching based on elapsed time
    this.timer += deltatime;
    if (this.timer > this.interval) {
     
         this.sf++; // Go to next sprite frame every 10 ticks
this.timer=0;
         if(this.sf>5) this.markdele=true;
    }
    }

    // Draw current explosion frame with rotation
    draw() {
    
        // Draw current frame of sprite
        con.drawImage(
            this.img,
            this.sf * this.sw, // source x in spritesheet
            0,
            this.sw,
            this.sh,
            this.x , // center it
            this.y- this.size / 4,
            this.size,
            this.size
        );

       
    }
};



class Smoke{
   constructor(x, y,size,color) {
       
        this.size=size;
        // Explosion position (where user clicked)
        this.x = x + this.size/2;
        this.y = y + this.size/3;

        this.rad=Math.random()*this.size/10;
        this.maxrad=Math.random()*20+20;
        // Sprite frame index
        this.sf = 0;
       
         this.speedx=Math.random()*0.1 +0.5;
        this.color=color;
        this.markdele = false; // Will be set true if hit
       
    }

    update(){
      this.x+=this.speedx;
      this.rad+=0.3;
      if(this.rad>this.maxrad-5) this.markdele=true;
    }
    draw(){
      con.save();
      con.globalAlpha=1-this.rad/this.maxrad;
      con.beginPath();
      // con.fillStyle=this.color;
      con.arc(this.x,this.y,this.rad,0,Math.PI*2);
      con.fill();
      con.restore();

    }

};


function gameover(){

       con.fillStyle = 'black'; // Shadow
  con.fillText('congrats :  Score = ' + points, canw/2, canh/2);
   con.fillStyle = 'red'; // Foreground
 con.fillText('congrats  :  Score = ' + points, (canw/2)+2, (canh/2)+2);
    
}




function point() {
  con.fillStyle = 'black'; // Shadow
  con.fillText('score: ' + points, 52, 77);
  con.fillStyle = 'white'; // Foreground
  con.fillText('score: ' + points, 50, 75);
}


window.addEventListener('click', function (e) {
  const canvasPos = canvas1.getBoundingClientRect(); // Always subtract canvas position
  const x = e.x - canvasPos.left;
  const y = e.y - canvasPos.top;

  const detect = coll.getImageData(x, y, 1, 1);
  const pc = detect.data;

  for (let i = 0; i < revens.length; i++) {
    if (
      revens[i].rancol[0] === pc[0] &&
      revens[i].rancol[1] === pc[1] &&
      revens[i].rancol[2] === pc[2]
    ) {
      revens[i].markdele = true;
      points++;
       explosion.push(new Explosion(revens[i].x, revens[i].y,revens[i].width)); // Add new explosion to array
       console.log(explosion);
    }

  }
});


function loop(timestamp) {
  // Clear both canvases
  con.clearRect(0, 0, canw, canh);
  coll.clearRect(0, 0, collw, collh);

  // Draw score
  point();

  let deltatime = timestamp - lastt;
  lastt = timestamp;
  timetonext += deltatime;


  if (timetonext > reveninter) {
    revens.push(new raven());
    timetonext = 0;

    // Sort ravens by width (if needed for depth sorting or rendering order)
    revens.sort(function (a, b) {
      return a.width - b.width;
    });
  };


  [...smoke,...revens,...explosion].forEach(object=>object.update(deltatime));
  [...smoke,...revens,...explosion].forEach(object=>object.draw());
 


   
  revens = revens.filter(object => !object.markdele);
  explosion = explosion.filter(object => !object.markdele);

  smoke = smoke.filter(object => !object.markdele);




gf++;


if(points>50) gameover();
else
  requestAnimationFrame(loop); // Call next frame
}

loop(0); // Start game

//[...revens,...explosion].forEach(object=>object.update(deltatime));

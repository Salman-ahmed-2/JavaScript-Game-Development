
const canvas = document.getElementById("can");
const con = canvas.getContext("2d");


const canw = canvas.width = 600;
const canh = canvas.height = 300;


const noe = 10;


let gf = 0;


class enemy {
  constructor() {
   
    this.img = new Image();
    this.img.src = "enemy1.png";

   
    this.sw = 293;
    this.sh = 155;

    this.width = this.sw / 2.5;
    this.height = this.sh / 2.5;

 
    this.sf = 0;

    
    this.wings = Math.floor(Math.random() * 3 + 1);

   
    this.x = Math.random() * (canw - this.width);
    this.y = Math.random() * (canh - this.height);

   
    this.angles = Math.random() * 0.2; 
    this.angle = 0;                    
    this.curve = Math.random() * 7;  
  }

  
  update() {
    
    this.x += Math.random() * 5 - 2.5;

   
    this.y += Math.sin(this.angle) * this.curve;
    this.angle += this.angles;

  
    if (gf % this.wings === 0) {
      if (this.sf > 4) this.sf = 0;
      else this.sf++;
    }
  }

  draw() {
  
    con.strokeRect(this.x, this.y, this.width, this.height);

   
    con.drawImage(
      this.img,
      this.sf * this.sw,
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


let e = [];
for (let i = 0; i < noe; i++) {
  e[i] = new enemy();
}


function loop() {

  con.clearRect(0, 0, canw, canh);

  
  for (let i = 0; i < noe; i++) {
    e[i].update();
    e[i].draw();
  }

  
  gf++;

  
  requestAnimationFrame(loop);
}

loop();

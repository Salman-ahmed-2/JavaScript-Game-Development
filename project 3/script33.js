const canvas = document.getElementById("can");
const con = canvas.getContext("2d");


const canw=canvas.width=600;
const canh=canvas.height=300;
const noe = 20;
let gf = 0;

class enemy {
  constructor() {
    this.img = new Image();

    this.img.src = "enemy/enemy4.png";

    this.speed=Math.random()*4-2;
    this.sw = 218;
    this.sh = 177;
    this.width = this.sw / 2;
    this.height = this.sh / 2;
    this.sf = 0;
    this.wings = Math.floor(Math.random() * 2 + 1);
    this.x = Math.random() * (canw - this.width);
    this.y = Math.random() * (canh - this.height);
    this.nx = Math.random() * (canw );
    this.ny = Math.random() * (canh);
    this.interval=Math.random()*250;
   
  }
  update() {
    if(gf%this.interval==0)
    {
        this.nx = Math.random() * (canw - this.width);
    this.ny = Math.random() * (canh - this.height);
    }
    let dx=this.x-this.nx;
    let dy=this.y-this.ny;
  //   this.x += this.speed;
  //  this.y += Math.sin(this.angle)*this.curve;
  this.x-=dx/20;
  this.y-=dy/20;

      
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

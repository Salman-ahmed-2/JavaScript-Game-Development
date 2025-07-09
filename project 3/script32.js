const canvas = document.getElementById("can");
const con = canvas.getContext("2d");


const canw=canvas.width=600;
const canh=canvas.height=300;
const noe = 200;
let gf = 0;

class enemy {
  constructor() {
    this.img = new Image();

    this.img.src = "enemy/enemy3.png";

    this.speed=Math.random()*4-2;
    this.sw = 218;
    this.sh = 177;
    this.width = this.sw / 2;
    this.height = this.sh / 2;
    this.sf = 0;
    this.wings = Math.floor(Math.random() * 3 + 1);
    this.x = Math.random() * (canw - this.width);
    this.y = Math.random() * (canh - this.height);
    this.angles=Math.random()*1;
    this.angle=0;
    this.curve=Math.random()*250;
  }
  update() {
  //   this.x += this.speed;
  //  this.y += Math.sin(this.angle)*this.curve;
  this.x=Math.sin(this.angle*Math.PI/90)*canw/2+(canw/2-this.width/2);
  this.y=Math.cos(this.angle*Math.PI/360)*canh/2+(canw/2-this.width/2);
    this.angle+=this.angles;
      if (this.x+this.width< 0) this.x=canw;
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

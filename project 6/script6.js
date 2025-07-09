window.addEventListener("load", () => {
  const canvas = document.getElementById("can");
  const con = canvas.getContext("2d");

  // Set canvas dimensions
  const canw = (canvas.width = window.innerWidth);
  const canh = (canvas.height = window.innerHeight);



  class Game {
    constructor(con,canw,canh) {
      this.con=con;
      this.enemies = [];
      this.enemyinterval=500;
      this.etimer=0;
      this.width = canw;
      this.height = canh;
      this.enemytype=['worm','ghost','spider'];
   
    }
    update(deltaTime) {
       this.enemies=this.enemies.filter(Object => !Object.markfordele);
if(this.etimer>this.enemyinterval)
{
 this.#addnewenemy();
 this.etimer=0;
}
else 
this.etimer+=deltaTime;



      this.enemies.forEach((Object) => {
        Object.update();
      });
    }

    draw() {
      this.enemies.forEach((Object) => {
        Object.draw(this.con);
      });
    }
    #addnewenemy() {
      const rande=this.enemytype[Math.floor(Math.random()* this.enemytype.length)];
      if(rande=="ghost")
      this.enemies.push(new ghost(this));
    else if(rande=="worm")
      this.enemies.push(new worm(this));
    else
      this.enemies.push(new spider(this));
  
    }
  };

  class enemy {
    constructor(game) {
      this.game=game;
      console.log(this.game)
      this.x = this.game.width;
      this.y = Math.random()*this.game.height;
      this.width = 100;
      this.height = 100;
      this.markfordele=false;
         this.sf=0;
      this.maxf=5;

      this.finter=100;
      this.ftime=0;
      
    }
    update(deltaTime) {
     
      // this.x-=this.vx*deltaTime;
this.x--;

      if(this.x<this.width) this.markfordele=true;
      if(this.ftime>this.finter){
        if (this.sf<this.maxf) this.sf++;  else this.sf=0; this.ftime=0;
      }
        else this.ftime+=deltaTime;
    }
    draw(con) {
     
      con.drawImage(this.img,this.sf*canw,0,this.sw,this.sh,this.x, this.y, this.width, this.height);
    }
  };


  class worm extends enemy{
    constructor(game){
      super(game);
    
        this.x = this.game.width;
      this.y = this.game.height-this.height;
      this.sh=229;
      this.sw=171;
      this.width = this.sw/2;
      this.height = this.sh/2;
      this.vx=Math.random()*0.1+0.1;
       this.img = w;
      //   this.img.src = "boom.png";

    }

  };

   class ghost extends enemy{
    constructor(game){
      super(game);
        this.x = this.game.width;
      this.y = Math.random()*this.game.height+0.6;
      this.sw=261;
      this.sh=209;
      this.width = this.sw/2;
      this.height = this.sh/2;
      this.vx=Math.random()*0.2+0.1;
       this.img = g;
      //   this.img.src = "boom.png";
      this.angle=0;
      this.curve=Math.random()*3;
     

    }
    update(deltaTime)
    {
super.update(deltaTime);
this.y+=Math.sin(this.angle)*this.curve;
this.angle+=0.04;
    }
draw(con){
  con.save();
  con.globalAlpha=0.7;
  super.draw(con)
  con.restore();
}
  };

class spider extends enemy {
  constructor(game) {
    super(game);
    this.sw = 310;
    this.sh = 175;
    this.width = this.sw / 2;
    this.height = this.sh / 2;

    this.x = Math.random() * this.game.width ;
    this.y =  this.height;

    this.vx = 0;
    this.vy = Math.random() * 0.1 * 0.1;

    this.img = s;
    this.maxlen = Math.random() * this.game.height;


  }

  update(deltaTime) {
    super.update(deltaTime);
    this.y+=this.vy+1;
   

   
    if (this.y > this.maxlen) {
      this.vy*=-1;
    }
  }

  draw(con) {

    con.beginPath();
    con.moveTo(this.x + this.width / 2, 0);
    con.lineTo(this.x + this.width / 2, this.y+10);
    con.strokeStyle = "black";
    con.stroke();
    super.draw(con);
 
  }
}

  const game = new Game(con,canw,canh);
  let lastt = 0;
  // 🔁 Game loop
  function loop(timestamp) {
    con.clearRect(0, 0, canw, canh);

    let deltatime = timestamp - lastt;
    lastt = timestamp;

    game.update(deltatime);
    game.draw();

    requestAnimationFrame(loop); // Call next frame
  }

  loop(0); // Start game
});

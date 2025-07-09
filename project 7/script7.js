window.addEventListener("load", function() {
  const canvas = document.getElementById("can");
  const con = canvas.getContext("2d");
 

  // Set canvas dimensions
  const canw = canvas.width = 1400;
  const canh = (canvas.height = 720);

let enemies=[];
let score=0;
let gameover=false;
class InputHan{


    constructor(){
        this.keys=[];
        this.touchy='';
        this.touchtres=30;
        window.addEventListener('keydown',e =>{

            if((e.key === 'ArrowDown' ||
               e.key === 'ArrowUp'  ||
               e.key === 'ArrowLeft' ||
               e.key === 'ArrowRight')&&this.keys.indexOf(e.key)===-1
            ){
                this.keys.push(e.key);
            }
            else if(e.key==='Enter' && gameover) restarts();
                    

        });
         window.addEventListener('keyup',e =>{

            if((e.key === 'ArrowDown' ||
               e.key === 'ArrowUp'  ||
               e.key === 'ArrowLeft' ||
               e.key === 'ArrowRight' 
            ) ){
                this.keys.splice(this.keys.indexOf(e.key),1);
            }
                      

        });
        window.addEventListener('touchstart',e=>{
            this.touchy=e.changedTouches[0].pageY

        });
         window.addEventListener('touchmove',e=>{
const swipedis =e.changedTouches[0].pageY-this.touchy;
if(swipedis<this.touchtres && this.keys.indexOf('swipe up') ===-1) this.keys.push('swipe up');
else if(swipedis>this.touchtres && this.keys.indexOf('swipe down') === -1){ this.keys.push('swipe down');

if(gameover)restarts();

}
        });
         window.addEventListener('touchend',e=>{
this.keys.splice(this.keys.indexOf('swipe up') ,1);
this.keys.splice(this.keys.indexOf('swipe down') ,1);

        });
    }
}

class Player{


    constructor(gw,gh){
        this.gw=gw;
        this.gh=gh;
        this.width=200;
        this.height=200;
        this.x=10;
        this.y=this.gh-this.height;
        this.img = document.getElementById('p')
        this.fx=0;
        this.fy=0; 
        this.maxf=8;
        this.speed=0;
        this.vy=0;
        this.weight=4;
        this.fps=20;
        this.finter = 1000 / this.fps;  // Frame interval in ms
this.ftime = 0; 

        
         
    }
    update (input,deltaTime,enemies){
        enemies.forEach(e=>{
            const dx= (e.x+e.width/2-20)-(this.x +this.width/2);
        const dy=(e.y+e.height/2)-(this.y +this.height/2+20); 
    const dist=Math.sqrt(dx*dx +dy*dy);
if(dist<e.width/3+this.width/3){
    gameover=true;
}      })
      
         if(this.ftime>this.finter){
      if(this.fx>=this.maxf)  this.fx=0; else this.fx++;   this.ftime=0;
      }
        else this.ftime+=deltaTime;
       
        if(input.keys.indexOf('ArrowRight')>-1) {
            this.speed=5;
        }
        else if(input.keys.indexOf('ArrowLeft')>-1) {
            this.speed=-5; 
        }
        else if(( input.keys.indexOf('ArrowUp')>-1 || input.keys.indexOf('swipe up')>-1) && this.onground()) {
            this.vy-=50;
        }
        
        else{
            this.speed=0;
        }

  this.x+=this.speed;  
 if(this.x<0) this.x=0;
        else if(this.x>this.gw-this.width)  this.x=this.gw-this.width;




  this.y+=this.vy;  
        

          if(!this.onground()){
            this.vy+=this.weight;
            this.maxf=5;
            this.fy=1;
          }
          else {
            this.vy=0;
            this.maxf=8;
            this.fy=0;
          }
          if(this.y>this.gh-this.height) this.y=this.gh-this.height;
        
    }
    restart(){
          this.x=10;
        this.y=this.gh-this.height;
         this.fy=0; 
        this.maxf=8;

    }

    onground(){
        return this.y>=this.gh-this.height;
    }

    draw(context){
     
        context.drawImage(
        this.img,
        this.width*this.fx,
         this.height*this.fy  ,                              
        this.width,                                
        this.height,                                
        this.x, this.y,                          
      this.width,                                
        this.height                  
    );
    //     context.strokesStyle='blue';
    //     context.strokeRect(this.x, this.y, this.width, this.height);
    //    context.beginPath();
    //    context.arc(this.x,this.y,this.width/2,0,Math.PI*2);
    //    context.stroke();
    }
}

class Bg{

    constructor(gw,gh){
        this.gw=gw;
        this.gh=gh;
        this.img=document.getElementById('bg');
        this.x=0;
        this.y=0;
        this.width=2100;
        this.height=920;
        this.speed=20 ; 

    }
    update(){
        this.x-=this.speed;
        if(this.x<0-this.width) this.x=0;
    }
    restart(){
        this.x=0;
    }
    draw(context){
        
          context.drawImage(this.img, this.x, this.y, this.width, this.height);
     
      
        context.drawImage(
        this.img,
        this.x+this.width,
       
         this.y  ,                                 // source y
        this.width,                                // source width
        this.height,                                // source height
                         // scale to full canvas size
    );
       
}
}


  class enemy {
    constructor(gw,gh) {
      this.gw=gw;
        this.gh=gh;
          this.width = 223;
      this.height = 149;
      this.x =this.gw;
      this.y = this.gh -this.height;
     
      this.markfordele=false;
         this.fx=0;
      this.maxf=5;
this.fps=20;
      this.finter=100;
      this.ftime=0;
       this.img=document.getElementById('w');
      this.speed=8;
      this.markfordele=false;
    }
    update(deltaTime) {
     if(this.x<0){ this.markfordele=true;  score++;}
//       // this.x-=this.vx*deltaTime;
this.x-=this.speed;

//       if(this.x<this.width) this.markfordele=true;
      if(this.ftime>this.finter){
        if (this.fx<this.maxf) this.fx++;  else this.fx=0;   this.ftime=0;
      }
        else this.ftime+=deltaTime;
      
    }
    draw(context) {
       
      context.drawImage(this.img,this.fx*this.width,0,this.width,this.height,this.x, this.y, this.width, this.height);
    }
  };

function handleenemy(deltaTime){
   enemyTimer += deltaTime;
  if (enemyTimer > enemyInterval+ranenemyInterval) {
    enemies.push(new enemy(canw, canh));
    enemyTimer = 0;
  }
enemies.forEach(e => {
    e.draw(con);
    e.update(deltaTime);
     

    
});
 enemies=enemies.filter(Object => !Object.markfordele);
 
}

function display(context) {
  context.fillStyle = 'black';
  context.font = '40px Arial'; // you missed specifying the font family
  context.fillText('Score: ' + score, 50, 70);

  if(gameover){
      con.TextAlign ='center';
         con.fillStyle = 'red'; // Shadow
  con.fillText('Game over Press Enter Or swipe down', canw/2, canh/2-100);

    
    con.textAlign ='center';
         con.fillStyle = 'red'; // Shadow
  con.fillText('congrats :  Score = ' + score, canw/2, canh/2);

    
  }
}

function restarts(){
    player.restart();
    bg.restart();
 enemies=[];
 score=0;
 gameover=false;
 loop(0);
}

function fullscreenn(){
if(!document.fullscreenElement)
{
    canvas.requestFullscreen().then().catch(err=>
        alert('cant enable full screen $(err.message)')

    ); 
}
else {
    document.exitFullscreen();
}

}



const input =new InputHan();
const player =new Player(canw,canh);
const bg= new Bg(canw,canh);

lastt=0;  
let enemyTimer = 0;
let enemyInterval = 1000; // 1 enemy per 1
let ranenemyInterval = Math.random()*1000+500; // 1 enemy per 1

function loop(timespan){


       const deltaTime = timespan - lastt; // Calculate deltaTime
    lastt = timespan; // Update lastt for the next frame


    con.clearRect(0, 0, canw, canh);
bg.update();
bg.draw(con);
player.update(input,deltaTime,enemies);
player.draw(con);
handleenemy(deltaTime);
display(con);

if(!gameover) {
requestAnimationFrame(loop);} 

}


loop(0);








});
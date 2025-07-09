
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');

const canw = canvas.width = 600;
const canh = canvas.height = 300;


const bg1 = new Image(); bg1.src = 'bg/bgneon.jpg';
const bg2 = new Image(); bg2.src = 'bg/layer-5.png';
const bg3 = new Image(); bg3.src = 'bg/layer-2.png';



let x = 0;         
let x1 = 600;      
let gf = 0;        
let speed = 1;      


class layer {
    constructor(image, speedm) {
        this.x = 0;                          
        this.y = 0;                       
        this.x1 = x1;                     
        this.width = canw;
        this.height = canh;
        this.x2 = this.width;               
        this.image = image;                
        this.speedm = speedm;               
        this.speed = speed * this.speedm;   
    }

    update() {
        this.speed = speed * this.speedm;   

        
        if (this.x <= -this.width) this.x = 0;

        
        this.x = Math.floor(this.x - this.speed);
    }

    draw() {
        
        con.drawImage(this.image, this.x, this.y, this.width, this.height);
        con.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}



const l1 = new layer(bg1, 0.5);
const l2 = new layer(bg2, 0.5);
const l3 = new layer(bg3, 0.5);



const gameobj = [l1, l2];

function loop() {
    con.clearRect(0, 0, canw, canh);

  
    for (let i = 0; i < gameobj.length; i++) {
        gameobj[i].update();
        gameobj[i].draw();
    }

    // keep looping
    requestAnimationFrame(loop);
}


console.log(gameobj, length); 


loop();


const slider = document.getElementById('slider');
slider.value = speed;

const showspeed = document.getElementById('showspeed');
showspeed.innerHTML = speed;


slider.addEventListener('change', function(e) {
    speed = e.target.value;
    showspeed.innerHTML = e.target.value;
});

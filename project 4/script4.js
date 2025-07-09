
const canvas = document.getElementById('can');
const con = canvas.getContext('2d');


const canw = canvas.width = 600;
const canh = canvas.height = 300;


const canpos = canvas.getBoundingClientRect();


const explosion = [];


class Explosion {
    constructor(x, y) {
        
        this.img = new Image();
        this.img.src = "boom.png";

     
        this.sound = new Audio();
        this.sound.src = "sound/Wind effects 5.wav";

        this.x = x;
        this.y = y;

      
        this.sw = 200;
        this.sh = 178;

      
        this.width = this.sw * 0.7;
        this.height = this.sh * 0.7;

    
        this.sf = 0;

    
        this.timer = 0;

        
        this.angle = Math.random() * 6.2; 
    }

    
    update() {
        if (this.sf === 0) this.sound.play(); /
        this.timer++;
        if (this.timer % 10 === 0) {
            this.sf++; 
        }
    }

 
    draw() {
        con.save();
        con.translate(this.x, this.y);
        con.rotate(this.angle); 

    
        con.drawImage(
            this.img,
            this.sf * this.sw, 
            0,
            this.sw,
            this.sh,
            0 - this.sw / 2, 
            0 - this.sh / 2,
            this.width,
            this.height
        );

        con.restore();
    }
}


window.addEventListener('click', function(e) {
    dust(e);
});


function dust(e) {
    let posx = e.x - canpos.left;
    let posy = e.y - canpos.top;

    explosion.push(new Explosion(posx, posy));
}


function loop() {
    con.clearRect(0, 0, canw, canh); // Clear canvas

    for (let i = 0; i < explosion.length; i++) {
        explosion[i].update();
        explosion[i].draw();   

    
        if (explosion[i].sf > 5) {
            explosion.splice(i, 1); 
            i--; 
        }
    }

    requestAnimationFrame(loop);
}


loop();

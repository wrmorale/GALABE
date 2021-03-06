//Rocket prefab 
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, leftMove, rightMove, fire, time){
        super(scene, x, y, texture, frame);

        // add object to existiting scene
        scene.add.existing(this);

        //firing state
        this.isFiring  = false;
        //movement speed of rocket
        this.moveSpeed = 2;

        //rocket sound
        this.sfxRocket = scene.sound.add('sfx_rocket');
        
        // assign keys 
        this.left = leftMove;
        this.right = rightMove;
        this.Fire = fire;
        this.Time = time;

    }

    update(){
        // left/right movement before firing
        if(!this.isFiring){
            if(this.left.isDown && this.x >= borderUIsize + this.width){
                this.x -= this.moveSpeed;
            }else if(this.right.isDown && this.x <= game.config.width - borderUIsize - this.width){
                this.x += this.moveSpeed
            }
        }
        //left/right movement after firing
        else if(this.isFiring){
            if(this.left.isDown && this.x >= borderUIsize + this.width){
                this.x -= this.moveSpeed;
            }else if(this.right.isDown && this.x <= game.config.width - borderUIsize - this.width){
                this.x += this.moveSpeed;
            }
        }
        
        //fire button
        if(Phaser.Input.Keyboard.JustDown(this.Fire) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }

        //if fired, move up
        if(this.isFiring && this.y >= borderUIsize){
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUIsize){
            this.Time.delay -= 5000; // time if you miss 
            this.reset();
        }
    }

    //reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUIsize - borderPadding;    
    }

}


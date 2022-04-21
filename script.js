const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const backSound = new Audio('sound_background.mp3');
let isJumping = false;
let position = 0;
let gameOverSound = 0;
let backgroundSoundPlay = 0;
let score = 0;
let maxScore = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if("!isJumping") {
            jump();
        }
    }
}

function jump(){
    const jumpSound = new Audio('jump_sound.mp3');
    jumpSound.play();
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {

    backgroundSound();

    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() + 1000;
 
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            if(!gameOverSound) {
                gameOver();
                gameOverSound = 1;
                backgroundSoundPlay = 1;
            }
            clearInterval(leftInterval);
            document.body.innerHTML = '<div class="container"> <h1 class="game-over">GAME OVER</h1>  <button class="play-again" onClick="window.location.reload();">Play Again</button> </div>'
            
        }else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20);

    setTimeout(createCactus, randomTime);
}

function gameOver(){
    const gameOverSound = new Audio('sound_gameover.wav');
    gameOverSound.play();
}

function backgroundSound(){
    
    if(!backgroundSoundPlay){
        backSound.play();
    }else{
        backSound.pause();
    }
    
}

function scoreInterval(){
    
    let scoreInterval = setInterval(() => {
        document.getElementById("scoreValue").innerHTML = score++;
    }, 20)
}

scoreInterval();
createCactus();
document.addEventListener('keyup', handleKeyUp);

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
let gameOverSound = 0;

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
            }
            clearInterval(leftInterval);
            document.body.innerHTML = '<div class="container"> <h1 class="game-over">Fim de jogo</h1>  <button class="play-again" onClick="window.location.reload();" >Jogar novamente</button> </div>'
            
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

createCactus();
document.addEventListener('keyup', handleKeyUp);

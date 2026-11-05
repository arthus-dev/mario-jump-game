const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreValue = document.getElementById('score-value');
const gameOverImg = document.getElementById('Game-img')

let score = 0;
let canScore = true; // Controle para contar apenas 1 ponto por salto
let isGameOver = false;

function jump() {
    if (isGameOver) return; // Nâo salta se o jogo tiver terminado

    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        // Incrementer a pontuação a cada salto
        if (canScore) {
            score++;
            scoreValue.textContent = score;
            canScore = false;
        }

        setTimeout(() => {
            mario.classList.remove('jump');
            canScore = true; // Libera para pontuar no próximo salta
        }, 500);
    }

}

// Função para acionar o pulo
function handleJump(event) {
    // Se for evento de teclado, verificar se foi a seta para ccima ou espaço
    if (event.type === 'keydown') {
        if (event.key === 'ArrowUp' || event.key === '') {
            jump();
        }
    } else {
        // Se for toque na tela (mobile) ou clique com o mouse
        jump();
    }
}

// Loop para verificar se houve colisão a cada 10 milissegundos
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    // Converte a string do 'bottom' (ex: "50px") para número puro (50)
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Se o tubo chegar à posição do Mário (entre 0px e 120px) 
    // E o Mário estiver numa altura menor que 80px (colisão!)
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        isGameOver = true;

        // Para a animação do tubo onde ele colidiu
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // Para a animação do Mário onde ele colidiu
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Troca a imagem do Mário para a de Game Over (se tiveres uma imagem game-over.png)
        mario.src = 'Game.png';
        mario.style.width = '100px';
        mario.style.marginLeft = '35px';

        gameOverImg.style.display = 'block';

        // Para o loop de verificação
        clearInterval(loop);
    }
}, 10);

// Escuta o teclado (Computador)
document.addEventListener('keydown', handleJump);

// Escuta o toque na tela (Telemóvel / Celular)
document.addEventListener('touchstart', (event) => {
    // Evita comportamrntos padrão de toque duplo/zoom no navegador do celular
    event.preventDefault();
    jump();
}, { passive: false });

// Escuta o clique do mouse (Garante funcionsmento em dispositivo com tela toucht)
document.addEventListener('click', jump);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === ' ') {
        jump();
    }
});
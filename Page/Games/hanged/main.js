const words = ['BIODIVERSITY', 'ECOSYSTEM', 'CONSERVATION', 'SUSTAINABILITY', 'HABITAT', 'CLIMATE', 'SPECIES', 'PRESERVATION', 'FAUNA', 'JUNGET'];
let selectedWord = '';
let guessedLetters = [];
let remainingTries = 6;

const wordDisplay = document.getElementById('word-display');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const triesLeft = document.getElementById('tries-left');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingTries = 6;
    updateWordDisplay();
    updateHangman();
    message.textContent = '';
    triesLeft.textContent = `Remaining attempts: ${remainingTries}`;
    guessButton.disabled = false;
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
}

function updateHangman() {
    const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    hangmanParts.forEach((part, index) => {
        document.getElementById(part).style.visibility = index < 6 - remainingTries ? 'visible' : 'hidden';
    });
}

function makeGuess() {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = '';

    if (guess.length !== 1 || !/[A-ZÑ]/.test(guess)) {
        message.textContent = 'Please enter a single letter.';
        return;
    }

    if (guessedLetters.includes(guess)) {
        message.textContent = 'You already guessed that letter.';
        return;
    }

    guessedLetters.push(guess);

    if (selectedWord.includes(guess)) {
        updateWordDisplay();
        if (!wordDisplay.textContent.includes('_')) {
            message.textContent = 'Congratulations! You won!';
            guessButton.disabled = true;
            startConfetti();
        }
    } else {
        remainingTries--;
        updateHangman();
        triesLeft.textContent = `Remaining attempts: ${remainingTries}`;
        if (remainingTries === 0) {
            message.textContent = `Game over. The word was ${selectedWord}.`;
            guessButton.disabled = true;
        }
    }
}

guessButton.addEventListener('click', makeGuess);
guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        makeGuess();
    }
});

// Confetti animation
const confetti = document.getElementById('confetti');
const ctx = confetti.getContext('2d');
let confettiPieces = [];

function resizeCanvas() {
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;
}

function createConfettiPiece() {
    return {
        x: Math.random() * confetti.width,
        y: 0,
        size: Math.random() * 5 + 5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        speed: Math.random() * 3 + 1
    };
}

function drawConfetti() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);
    confettiPieces.forEach(piece => {
        ctx.beginPath();
        ctx.arc(piece.x, piece.y, piece.size, 0, 2 * Math.PI);
        ctx.fillStyle = piece.color;
        ctx.fill();

        piece.y += piece.speed;
        if (piece.y > confetti.height) {
            piece.y = 0;
        }
    });

    requestAnimationFrame(drawConfetti);
}

function startConfetti() {
    resizeCanvas();
    confettiPieces = Array(100).fill().map(createConfettiPiece);
    drawConfetti();
}

window.addEventListener('resize', resizeCanvas);

initGame();
const wordList = [{ word: 'BIODIVERSITY', hint: 'Variety of life on Earth' },
{ word: 'CONSERVATION', hint: 'Nature protection' },
{ word: 'ECOLOGY', hint: 'Science that studies the interactions between organisms and their environment' },
{ word: 'ENVIRONMENT', hint: 'Natural environment that surrounds living beings' },
{ word: 'ECOSYSTEM', hint: 'Community of living beings and their environment' },
{ word: 'SUSTAINABILITY', hint: 'Ability to maintain itself without depleting resources' },
{ word: 'CLIMATIC', hint: 'Related to long-term atmospheric conditions' },
{ word: 'RESOURCES', hint: 'Natural materials that can be used' },
{ word: 'NATURAL', hint: 'Related to nature, not artificial' },
{ word: 'BIOSPHERE', hint: 'Layer of the Earth where life develops' },
{ word: 'CLIMATE', hint: 'Set of atmospheric conditions characteristic of an area' },
{ word: 'SUSTAINABILITY', hint: 'Responsible use of natural resources' },
{ word: 'SPECIES', hint: 'Groups of similar organisms capable of reproducing with each other' },
{ word: 'HABITAT', hint: 'Place where an organism naturally lives' },
{ word: 'ENVIRONMENT', hint: 'Environment that surrounds living beings' },
{ word: 'NATURE', hint: 'Physical world and its phenomena' },
{ word: 'PROTECTION', hint: 'Action of caring and preserving' }];

const environmentalMessages = [
    {
        title: "Protect Biodiversity",
        content: "Biodiversity is essential for life on Earth. Each species plays a crucial role in the balance of ecosystems."
    },
    {
        title: "Conserve Natural Resources",
        content: "The responsible use of natural resources ensures their availability for future generations and protects natural habitats."
    },
    {
        title: "Fight against Climate Change",
        content: "Reducing our carbon footprint is crucial to mitigate the effects of climate change and protect our planet."
    },
    {
        title: "Practice Sustainability",
        content: "Adopting sustainable practices in our daily lives can have a significant impact on preserving the environment."
    },
    {
        title: "Educate about the Environment",
        content: "Environmental education is key to raising awareness and promoting actions that protect our planet."
    }
];

const hangmanParts = ['head', 'body', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];

const hangmanSVG = `
    <svg width="100%" height="100%" viewBox="0 0 300 300">
        <!-- Base -->
        <line x1="50" y1="280" x2="150" y2="280" stroke="#6A4C2F" stroke-width="10" stroke-linecap="round"/>
        <!-- Poste -->
        <line x1="100" y1="280" x2="100" y2="50" stroke="#6A4C2F" stroke-width="10" stroke-linecap="round"/>
        <!-- Viga superior -->
        <line x1="100" y1="50" x2="200" y2="50" stroke="#6A4C2F" stroke-width="10" stroke-linecap="round"/>
        <!-- Cuerda -->
        <line x1="200" y1="50" x2="200" y2="80" stroke="#B6866A" stroke-width="5"/>
        
        <!-- Cabeza -->
        <circle id="head" cx="200" cy="100" r="20" fill="none" stroke="#000" stroke-width="5" visibility="hidden"/>
        <!-- Cuerpo -->
        <path id="body" d="M200 120 Q200 170 200 180" stroke="#000" stroke-width="5" fill="none" visibility="hidden"/>
        <!-- Brazo izquierdo -->
        <path id="leftArm" d="M200 130 Q180 150 170 170" stroke="#000" stroke-width="5" fill="none" visibility="hidden"/>
        <!-- Brazo derecho -->
        <path id="rightArm" d="M200 130 Q220 150 230 170" stroke="#000" stroke-width="5" fill="none" visibility="hidden"/>
        <!-- Pierna izquierda -->
        <path id="leftLeg" d="M200 180 Q190 220 180 240" stroke="#000" stroke-width="5" fill="none" visibility="hidden"/>
        <!-- Pierna derecha -->
        <path id="rightLeg" d="M200 180 Q210 220 220 240" stroke="#000" stroke-width="5" fill="none" visibility="hidden"/>
    </svg>
`;

function initGame() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    game = {
        selectedWord: wordList[randomIndex].word,
        selectedHint: wordList[randomIndex].hint,
        guessedLetters: [],
        remainingTries: 6,
        score: 0,
        gameActive: true
    };

    document.getElementById('hangman').innerHTML = hangmanSVG;
    updateWordDisplay();
    updateTriesLeft();
    createKeyboard();
    updateScore();

    document.getElementById('message').textContent = '';
    document.getElementById('hint-text').textContent = '';
    document.getElementById('hint-text').style.display = 'none';

    // Reset hangman parts
    hangmanParts.forEach(part => {
        const partElement = document.getElementById(part);
        if (partElement) {
            partElement.style.visibility = 'hidden';
        }
    });

    // Add fade-in animation
    document.querySelector('.game-board').classList.add('fade-in');
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = game.selectedWord
        .split('')
        .map(letter => game.guessedLetters.includes(letter) ? letter : '_')
        .join(' ');
    wordDisplay.classList.add('fade-in');
}

function updateTriesLeft() {
    const triesLeftElement = document.getElementById('tries-left');
    if (triesLeftElement) {
        triesLeftElement.textContent = `Remaining attempts: ${game.remainingTries}`;
        triesLeftElement.classList.add('fade-in');
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${game.score}`;
    scoreElement.classList.add('fade-in');
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.className = 'key fade-in';
        button.style.animationDelay = `${(i - 65) * 0.05}s`;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    }
}

function handleGuess(letter) {
    if (!game.gameActive || game.guessedLetters.includes(letter)) return;

    game.guessedLetters.push(letter);
    const keyElement = document.querySelector(`.key:nth-child(${letter.charCodeAt(0) - 64})`);
    keyElement.disabled = true;

    if (game.selectedWord.includes(letter)) {
        keyElement.style.backgroundColor = '#4CAF50';
        updateWordDisplay();
        checkWin();
    } else {
        keyElement.style.backgroundColor = '#F44336';
        game.remainingTries--;
        updateTriesLeft();
        updateHangman();
        checkLoss();
    }

    keyElement.classList.add('shake');
}

function updateHangman() {
    const partIndex = 6 - game.remainingTries;
    hangmanParts.forEach((part, index) => {
        const partElement = document.getElementById(part);
        if (partElement) {
            if (index < partIndex) {
                partElement.style.visibility = 'visible';
                partElement.classList.add('fade-in');
                partElement.style.animation = 'drawPart 0.5s ease-in-out forwards';
            } else {
                partElement.style.visibility = 'hidden';
            }
        }
    });
}

function checkWin() {
    if (game.selectedWord.split('').every(letter => game.guessedLetters.includes(letter))) {
        game.gameActive = false;
        game.score += game.remainingTries * 10;
        updateScore();
        showEnvironmentalMessage();
    }
}

function checkLoss() {
    if (game.remainingTries === 0) {
        game.gameActive = false;
        showPopover("¡Juego terminado!", `La palabra era: ${game.selectedWord}. ¡Sigue aprendiendo sobre el medio ambiente y vuelve a intentarlo!`);
    }
}

function showEnvironmentalMessage() {
    const randomMessage = environmentalMessages[Math.floor(Math.random() * environmentalMessages.length)];
    showPopover(randomMessage.title, randomMessage.content);

    // Mantener el popover abierto por más tiempo
    setTimeout(() => {
        closePopover();
        showPopover("¡Felicitaciones!", "Has completado el juego y has aprendido una valiosa lección sobre el cuidado del medio ambiente. ¡Sigamos protegiendo nuestro planeta!");
    }, 5000);
}

function showPopover(title, content) {
    const popover = document.getElementById('popover');
    const overlay = document.getElementById('overlay');

    document.getElementById('popover-title').textContent = title;
    document.getElementById('popover-content').textContent = content;

    popover.classList.add('show');
    overlay.classList.add('show');
}

function closePopover() {
    const popover = document.getElementById('popover');
    const overlay = document.getElementById('overlay');

    popover.classList.remove('show');
    overlay.classList.remove('show');
}

function showHint() {
    const hintText = document.getElementById('hint-text');
    hintText.textContent = `Pista: ${game.selectedHint}`;
    hintText.style.display = 'block';
    hintText.classList.add('fade-in');
    game.score -= 5;
    updateScore();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Oscuro';
    updateHangmanColors(isDarkMode);
}

function updateHangmanColors(isDarkMode) {
    const hangmanSvg = document.querySelector('.hangman-svg');
    const elements = hangmanSvg.querySelectorAll('line, path, circle');
    elements.forEach(element => {
        const currentStroke = element.getAttribute('stroke');
        if (isDarkMode) {
            if (currentStroke === '#000000' || currentStroke === '#000') {
                element.setAttribute('stroke', '#ffffff');
            } else if (currentStroke === '#6A4C2F' || currentStroke === '#B6866A') {
                element.setAttribute('stroke', '#D2B48C');
            }
        } else {
            if (currentStroke === '#ffffff' || currentStroke === '#fff') {
                element.setAttribute('stroke', '#000000');
            } else if (currentStroke === '#D2B48C') {
                element.setAttribute('stroke', '#6A4C2F');
            }
        }
    });
}

// Event Listeners
document.getElementById('new-game-btn').addEventListener('click', initGame);
document.getElementById('hint-btn').addEventListener('click', showHint);
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('close-popover').addEventListener('click', closePopover);
document.getElementById('accept-popover').addEventListener('click', closePopover);
document.getElementById('overlay').addEventListener('click', closePopover);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePopover();
    }
    const key = event.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
    }
});

const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes drawPart {
        from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
        }
        to {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
        }
    }
`;
document.head.appendChild(styleElement);

// Iniciar juego
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateHangmanColors(isDarkMode);
});
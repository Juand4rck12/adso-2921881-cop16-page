const images = [
    {
        src: 'https://cdn-icons-png.flaticon.com/512/2719/2719880.png',
        tip: 'Planta un árbol en tu comunidad. Un solo árbol puede absorber hasta 22 kg de CO2 al año y proporcionar oxígeno para 2 personas.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/869/869796.png',
        tip: 'Opta por energías renovables. Instalar paneles solares puede reducir tu huella de carbono hasta en un 80% y ahorrar en facturas de electricidad.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/1598/1598402.png',
        tip: 'Recicla correctamente. Separa tus residuos en orgánicos, plásticos, papel y vidrio. Reciclar una tonelada de papel salva 17 árboles.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/998/998507.png',
        tip: 'Conserva el agua. Cierra el grifo mientras te cepillas los dientes y ahorra hasta 12 litros por minuto. Repara las fugas: una gota por segundo desperdicia 30 litros al día.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/4014/4014344.png',
        tip: 'Consume productos locales y de temporada. Reduces las emisiones asociadas al transporte y apoyas la economía local. Los alimentos locales son hasta un 17% más frescos.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/6134/6134700.png',
        tip: 'Cambia a bombillas LED. Usan hasta un 75% menos de energía y duran 25 veces más que las incandescentes. Puedes ahorrar $75 al año por bombilla.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/4357/4357574.png',
        tip: 'Usa la bicicleta para trayectos cortos. Reducirás emisiones y mejorarás tu salud. Andar en bicicleta 10 km al día ahorra 1.5 toneladas de CO2 al año.'
    },
    {
        src: 'https://cdn-icons-png.flaticon.com/512/1046/1046820.png',
        tip: 'Reduce tu consumo de carne. La producción de carne es responsable del 14.5% de las emisiones de gases de efecto invernadero. Un día sin carne a la semana puede reducir tu huella de carbono en un 8%.'
    }
];

let cards = [];
let selectedCards = [];
let matchedPairs = 0;
let attempts = 0;
let timer;
let timeElapsed = 0;

const levelConfig = {
    easy: 16,
    medium: 24,
    hard: 32
};

const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart');
const difficultySelect = document.getElementById('level');
const tipPopover = document.getElementById('tipPopover');
const closeBtn = tipPopover.querySelector('.close-btn');
let overlay;

function createOverlay() {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
}

createOverlay();

function showTipPopover(card) {
    const cardIndex = parseInt(card.getAttribute('data-id'));
    const cardData = cards[cardIndex];
    
    const tipImage = document.getElementById('tipImage');
    const tipText = document.getElementById('tipText');
    
    tipImage.src = cardData.src;
    tipText.textContent = cardData.tip;
    
    tipPopover.style.display = 'block';
    overlay.style.display = 'block';
}

function closeTipPopover() {
    tipPopover.style.display = 'none';
    overlay.style.display = 'none';
}

closeBtn.addEventListener('click', closeTipPopover);
overlay.addEventListener('click', closeTipPopover);

const createCards = (level) => {
    const cardCount = levelConfig[level];
    const shuffledImages = shuffleCards(images).slice(0, cardCount / 2);
    cards = [...shuffledImages, ...shuffledImages];
    cards = shuffleCards(cards);
    renderCards();
};

const renderCards = () => {
    gameContainer.innerHTML = '';
    cards.forEach((image, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${image.src}" alt="Card Image"></div>
            </div>`;
        cardElement.addEventListener('click', () => handleCardClick(cardElement, index));
        gameContainer.appendChild(cardElement);
    });
};

const handleCardClick = (cardElement, index) => {
    if (selectedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.classList.add('flipped');
        selectedCards.push({ element: cardElement, index });

        if (selectedCards.length === 2) {
            attempts++;
            scoreElement.innerText = `Intentos: ${attempts}`;
            setTimeout(checkForMatch, 1000);
        }
    }
};

const checkForMatch = () => {
    const [firstCard, secondCard] = selectedCards;
    const firstImage = cards[firstCard.index].src;
    const secondImage = cards[secondCard.index].src;

    if (firstImage === secondImage) {
        matchedPairs++;
        setTimeout(() => showTipPopover(firstCard.element), 500);
        
        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => {
                alert('¡Felicidades! Has encontrado todos los pares.');
            }, 1000);
        }
    } else {
        setTimeout(() => {
            firstCard.element.classList.remove('flipped');
            secondCard.element.classList.remove('flipped');
        }, 1000);
    }
    selectedCards = [];
};

const shuffleCards = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const startGame = () => {
    closeTipPopover();
    const selectedLevel = difficultySelect.value;
    createCards(selectedLevel);
    resetGame();
};

const resetGame = () => {
    selectedCards = [];
    matchedPairs = 0;
    attempts = 0;
    timeElapsed = 0;
    scoreElement.innerText = 'Intentos: 0';
    timerElement.innerText = 'Tiempo: 0s';
    clearInterval(timer);
    timer = setInterval(() => {
        timeElapsed++;
        timerElement.innerText = `Tiempo: ${timeElapsed}s`;
    }, 1000);
};

restartButton.addEventListener('click', startGame);
difficultySelect.addEventListener('change', startGame);

const adjustGridColumns = () => {
    const width = window.innerWidth;
    if (width <= 480) {
        gameContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (width <= 768) {
        gameContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        gameContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
    }
};

window.addEventListener('resize', adjustGridColumns);
window.onload = () => {
    startGame();
    adjustGridColumns();
};
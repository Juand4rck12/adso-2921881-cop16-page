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
let seconds = 0;

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    shuffleCards(cards).forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;
        cardElement.dataset.image = card.src;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const img = document.createElement('img');
        img.src = card.src;
        cardBack.appendChild(img);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);

        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        selectedCards.push(this);

        if (selectedCards.length === 2) {
            attempts++;
            updateScore();
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.dataset.image === card2.dataset.image) {
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matchedPairs++;
        showTip(card1.dataset.image);
        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`¡Felicidades! Has completado el juego en ${seconds} segundos con ${attempts} intentos.`);
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    selectedCards = [];
}

function showTip(imageSrc) {
    const tip = images.find(img => img.src === imageSrc).tip;
    document.getElementById('tipText').textContent = tip;
    document.getElementById('tipModal').style.display = 'block';
}

function updateScore() {
    document.getElementById('score').textContent = `Intentos: ${attempts}`;
}

function updateTimer() {
    seconds++;
    document.getElementById('timer').textContent = `Tiempo: ${seconds}s`;
}

function restartGame() {
    clearInterval(timer);
    seconds = 0;
    selectedCards = [];
    matchedPairs = 0;
    attempts = 0;
    updateScore();
    document.getElementById('timer').textContent = 'Tiempo: 0s';
    setDifficulty();
    createBoard();
    timer = setInterval(updateTimer, 1000);
}

function setDifficulty() {
    const level = document.getElementById('level').value;
    switch (level) {
        case 'easy':
            cards = [...images, ...images];
            document.getElementById('game-container').style.maxWidth = '600px';
            break;
        case 'medium':
            cards = [...images, ...images, ...images.slice(0, 4), ...images.slice(0, 4)];
            document.getElementById('game-container').style.maxWidth = '700px';
            break;
        case 'hard':
            cards = [...images, ...images, ...images, ...images];
            document.getElementById('game-container').style.maxWidth = '800px';
            break;
    }
}

document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('level').addEventListener('change', restartGame);
document.getElementById('closeTip').addEventListener('click', () => {
    document.getElementById('tipModal').style.display = 'none';
});

setDifficulty();
createBoard();
timer = setInterval(updateTimer, 1000);
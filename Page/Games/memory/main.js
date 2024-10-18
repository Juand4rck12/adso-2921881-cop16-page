const environmentalPairs = [
    '🌱', '🌱', '🌳', '🌳', '♻️', '♻️', '💧', '💧',
    '🌞', '🌞', '🍃', '🍃', '🌍', '🌍', '🔋', '🔋'
];

const environmentalMessages = [
    {
        title: "Tree Planting",
        content: "A single tree can absorb up to 22 kg of CO2 per year and provide oxygen for 2 people. Urban reforestation reduces local temperatures by up to 2°C and increases biodiversity by 30%."
    },
    {
        title: "Renewable Energies",
        content: "Installing solar panels can reduce your carbon footprint by up to 80%. A house with solar energy avoids the emission of 3-4 tons of CO2 annually, equivalent to planting 100 trees."
    },
    {
        title: "Effective Recycling",
        content: "Recycling one ton of paper saves 17 trees and 26,000 liters of water. Correctly separating waste can reduce up to 80% of the garbage that reaches landfills. A recycled mobile phone saves metals equivalent to 24 kg of gold."    },
    {
        title: "Water Conservation",
        content: "Turning off the tap while brushing your teeth saves up to 12 liters per minute. A leak of one drop per second wastes 30 liters per day. Using an efficient shower head can save 11,000 liters of water per person per year."
    },
    {
        title: "Local and Sustainable Consumption",
        content: "Local foods are up to 17% fresher and reduce transportation emissions. Buying seasonal products reduces your carbon footprint by 10% and supports local farmers, strengthening the community economy."
    },
    {
        title: "Energy Efficiency",
        content: "LED bulbs use up to 75% less energy and last 25 times longer than incandescent bulbs. You can save $75 a year per bulb. Setting your thermostat 1°C lower in winter reduces energy consumption by 10% "
    },
    {
        title: "Sustainable Transportation",
        content: "Riding a bicycle 10 km a day saves 1.5 tons of CO2 per year. Using public transport can reduce your carbon footprint by 2.6 tons per year. Carpooling to work reduces emissions and traffic by up to 20%."
    },
    {
        title: "Conscious Eating",
        content: "Reducing meat consumption one day a week can reduce your carbon footprint by 8%. Meat production uses 20 times more land and 6 times more water than plant proteins. A plant-based diet can save 1,100 liters of water per day."
    }
];

let flippedCards = [];
let matchedPairs = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    const shuffledPairs = shuffleArray([...environmentalPairs]);
    
    gameBoard.innerHTML = '';
    shuffledPairs.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        showEnvironmentalMessage();
        if (matchedPairs === environmentalPairs.length / 2) {
            setTimeout(() => {
                showPopover("¡Felicitaciones!", "Has completado el juego y has aprendido valiosas lecciones sobre el cuidado del medio ambiente. ¡Sigamos protegiendo nuestro planeta!");
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

function showEnvironmentalMessage() {
    const randomMessage = environmentalMessages[Math.floor(Math.random() * environmentalMessages.length)];
    showPopover(randomMessage.title, randomMessage.content);
}

function showPopover(title, content) {
    const popover = document.getElementById('popover');
    const overlay = document.getElementById('overlay');
    
    popover.querySelector('.popover-title').textContent = title;
    popover.querySelector('.popover-content').textContent = content;
    
    popover.classList.add('show');
    overlay.classList.add('show');
}

function closePopover() {
    const popover = document.getElementById('popover');
    const overlay = document.getElementById('overlay');
    
    popover.classList.remove('show');
    overlay.classList.remove('show');
}

document.getElementById('close-popover').addEventListener('click', closePopover);
document.getElementById('accept-popover').addEventListener('click', closePopover);
document.getElementById('overlay').addEventListener('click', closePopover);

document.getElementById('popover').addEventListener('click', function(e) {
    e.stopPropagation();
});

document.getElementById('restart-btn').addEventListener('click', () => {
    matchedPairs = 0;
    flippedCards = [];
    createBoard();
});

// Iniciar juego
createBoard();
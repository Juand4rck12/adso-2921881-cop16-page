const environmentalPairs = [
    '🌱', '🌱', '🌳', '🌳', '♻️', '♻️', '💧', '💧',
    '🌞', '🌞', '🍃', '🍃', '🌍', '🌍', '🔋', '🔋'
];

const environmentalMessages = [
    {
        title: "Plantación de Árboles",
        content: "Un solo árbol puede absorber hasta 22 kg de CO2 al año y proporcionar oxígeno para 2 personas. La reforestación urbana reduce la temperatura local hasta 2°C y aumenta la biodiversidad en un 30%."
    },
    {
        title: "Energías Renovables",
        content: "Instalar paneles solares puede reducir tu huella de carbono hasta en un 80%. Una casa con energía solar evita la emisión de 3-4 toneladas de CO2 anualmente, equivalente a plantar 100 árboles."
    },
    {
        title: "Reciclaje Efectivo",
        content: "Reciclar una tonelada de papel salva 17 árboles y 26,000 litros de agua. Separar correctamente los residuos puede reducir hasta un 80% la basura que llega a los vertederos. Un teléfono móvil reciclado ahorra metales equivalentes a 24 kg de oro."
    },
    {
        title: "Conservación del Agua",
        content: "Cerrar el grifo mientras te cepillas los dientes ahorra hasta 12 litros por minuto. Una fuga de una gota por segundo desperdicia 30 litros al día. Usar un cabezal de ducha eficiente puede ahorrar 11,000 litros de agua por persona al año."
    },
    {
        title: "Consumo Local y Sostenible",
        content: "Los alimentos locales son hasta un 17% más frescos y reducen las emisiones de transporte. Comprar productos de temporada reduce la huella de carbono en un 10% y apoya a los agricultores locales, fortaleciendo la economía de la comunidad."
    },
    {
        title: "Eficiencia Energética",
        content: "Las bombillas LED usan hasta un 75% menos de energía y duran 25 veces más que las incandescentes. Puedes ahorrar $75 al año por bombilla. Configurar el termostato 1°C más bajo en invierno reduce el consumo de energía en un 10%."
    },
    {
        title: "Transporte Sostenible",
        content: "Andar en bicicleta 10 km al día ahorra 1.5 toneladas de CO2 al año. Usar transporte público puede reducir tu huella de carbono en 2.6 toneladas anuales. Compartir coche al trabajo disminuye las emisiones y el tráfico en hasta un 20%."
    },
    {
        title: "Alimentación Consciente",
        content: "Reducir el consumo de carne un día a la semana puede disminuir tu huella de carbono en un 8%. La producción de carne utiliza 20 veces más tierra y 6 veces más agua que las proteínas vegetales. Una dieta basada en plantas puede ahorrar 1,100 litros de agua por día."
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
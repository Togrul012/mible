let playerTiles = [];
let botTiles = [];
let board = [];
let currentPlayer = 'player'; // Игрок начинает первым

// Определяем возможные значения для камней домино
const allTiles = [];
for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        allTiles.push([i, j]);
    }
}

// Функция для случайной раздачи камней
function dealTiles() {
    let shuffledTiles = allTiles.sort(() => Math.random() - 0.5);
    playerTiles = shuffledTiles.slice(0, 7);
    botTiles = shuffledTiles.slice(7, 14);
    renderTiles();
}

// Отображаем камни на руках игрока
function renderTiles() {
    const playerHand = document.getElementById('player-hand');
    const botHand = document.getElementById('bot-hand');
    playerHand.innerHTML = '';
    botHand.innerHTML = '';

    // Отображаем камни игрока
    playerTiles.forEach(tile => {
        const tileDiv = createTileDiv(tile);
        tileDiv.onclick = () => playerTurn(tile);
        playerHand.appendChild(tileDiv);
    });

    // Отображаем камни бота (для упрощения, просто выводим кол-во)
    botHand.innerHTML = `Бот: ${botTiles.length} камней`;
}

// Создаем элемент для камня
function createTileDiv(tile) {
    const tileDiv = document.createElement('div');
    tileDiv.classList.add('tile');
    tileDiv.textContent = `${tile[0]}|${tile[1]}`;
    return tileDiv;
}

// Ход игрока
function playerTurn(tile) {
    if (currentPlayer === 'player') {
        board.push(tile);
        playerTiles = playerTiles.filter(t => t !== tile);
        playSound('place-sound');
        renderTiles();
        checkGameStatus();
        currentPlayer = 'bot';
        botTurn();
    }
}

// Ход бота
function botTurn() {
    if (currentPlayer === 'bot') {
        setTimeout(() => {
            const tile = botTiles[Math.floor(Math.random() * botTiles.length)];
            board.push(tile);
            botTiles = botTiles.filter(t => t !== tile);
            playSound('place-sound');
            renderTiles();
            checkGameStatus();
            currentPlayer = 'player';
        }, 1000);
    }
}

// Проверяем статус игры
function checkGameStatus() {
    if (playerTiles.length === 0 || botTiles.length === 0) {
        const message = document.getElementById('message');
        if (playerTiles.length === 0) {
            message.textContent = "Поздравляем, вы выиграли!";
            playSound('win-sound');
        } else if (botTiles.length === 0) {
            message.textContent = "Бот выиграл!";
            playSound('win-sound');
        }
    } else {
        const message = document.getElementById('message');
        message.textContent = currentPlayer === 'player' ? "Ваш ход" : "Ход бота";
    }
}

// Воспроизведение звука
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.play();
}

// Инициализация игры
dealTiles();

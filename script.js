// Получаем элементы из DOM
const authContainer = document.getElementById('authContainer');
const gameContainer = document.getElementById('gameContainer');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const playerName = document.getElementById('playerName');
const coinButton = document.getElementById('coinButton');
const coinDisplay = document.getElementById('coinCount');
const energyDisplay = document.getElementById('energyCount');
const energyBar = document.getElementById('energyBar');

let playerData = JSON.parse(localStorage.getItem('playerData')) || {};

// Обновляем интерфейс
function updateUI() {
    coinDisplay.textContent = playerData.coins;
    energyDisplay.textContent = playerData.energy;
    updateEnergyBar(playerData.energy);
}

// Обновляем шкалу энергии
function updateEnergyBar(energy) {
    const maxEnergy = 5000;
    const percentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${percentage}%`;
}

// Функция для входа в игру
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        playerData = { name: username, coins: 0, energy: 5000 };
        localStorage.setItem('playerData', JSON.stringify(playerData));
        showGame(playerData);
    }
});

// Показываем игровое поле
function showGame(data) {
    authContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    playerName.textContent = data.name;
    updateUI();
}

// Клик для получения монет и уменьшения энергии
coinButton.addEventListener('click', () => {
    if (playerData.energy >= 10) {
        playerData.coins += 1;
        playerData.energy -= 10;
        updateUI();
        localStorage.setItem('playerData', JSON.stringify(playerData));
    } else {
        alert("Недостаточно энергии!");
    }
});

// Восстанавливаем энергию каждую секунду
setInterval(() => {
    if (playerData.energy < 5000) {
        playerData.energy += 2;  // Медленное восстановление
        updateUI();
        localStorage.setItem('playerData', JSON.stringify(playerData));
    }
}, 2000);

// Функция выхода из игры
logoutButton.addEventListener('click', () => {
    gameContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
    usernameInput.value = '';
});

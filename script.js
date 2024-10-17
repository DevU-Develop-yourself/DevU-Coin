// Получаем элементы из DOM
const authContainer = document.getElementById('authContainer');
const gameContainer = document.getElementById('gameContainer');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const playerName = document.getElementById('playerName');
const coinButton = document.getElementById('coinButton');
const coinDisplay = document.getElementById('coinCount');
const energyDisplay = document.getElementById('energyCount'); // Элемент для отображения энергии
const energyBar = document.getElementById('energyBar'); // Элемент для шкалы энергии
let playerData = JSON.parse(localStorage.getItem('playerData')) || {};
playerData.energy = playerData.energy || 5000; // Начальное количество энергии (максимум 5000)

// Если данные есть, показываем игру
if (playerData.name) {
    showGame(playerData);
}

// Функция для отображения игрового экрана
function showGame(data) {
    playerName.textContent = data.name;
    coinDisplay.textContent = data.coins;
    energyDisplay.textContent = data.energy; // Отображаем количество энергии
    updateEnergyBar(data.energy); // Обновляем шкалу энергии
    authContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
}

// Обработка кликов по монете
coinButton.addEventListener('click', () => {
    if (playerData.energy > 0) {
        playerData.coins++;
        playerData.energy-=5; // Уменьшаем энергию
        coinDisplay.textContent = playerData.coins;
        energyDisplay.textContent = playerData.energy; // Обновляем отображение энергии
        updateEnergyBar(playerData.energy); // Обновляем шкалу энергии
        localStorage.setItem('playerData', JSON.stringify(playerData));
    } else {
        alert("У вас недостаточно энергии!");
    }
});

// Функция для восстановления энергии
function restoreEnergy() {
    playerData.energy = Math.min(playerData.energy + 1, 5000); // Максимум 5000 энергии
    energyDisplay.textContent = playerData.energy;
    updateEnergyBar(playerData.energy); // Обновляем шкалу энергии
    localStorage.setItem('playerData', JSON.stringify(playerData));
}

// Обновление шкалы энергии
function updateEnergyBar(energy) {
    const maxEnergy = 5000;
    const percentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${percentage}%`;
}

// Восстанавливаем энергию каждую секунду
setInterval(restoreEnergy, 5000);

// Функция выхода из игры
logoutButton.addEventListener('click', () => {
    // localStorage.removeItem('playerData');
    gameContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
    usernameInput.value = '';
});

// Функция для входа в игру
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        playerData = { name: username, coins: 0, energy: 5000 };
        localStorage.setItem('playerData', JSON.stringify(playerData));
        showGame(playerData);
    }
});

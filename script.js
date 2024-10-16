// Получаем элементы из DOM
const authContainer = document.getElementById('authContainer');
const gameContainer = document.getElementById('gameContainer');
const achievementsContainer = document.getElementById('achievementsContainer');
const achievementsList = document.getElementById('achievementsList');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const playerName = document.getElementById('playerName');
const coinButton = document.getElementById('coinButton');
const coinDisplay = document.getElementById('coinCount');

// Загружаем данные игрока из localStorage
let playerData = JSON.parse(localStorage.getItem('playerData')) || {};
let achievements = {
    firstCoin: false,
    fiftyCoins: false,
    hundredCoins: false
};

// Если данные есть, показываем игру
if (playerData.name) {
    showGame(playerData);
}

// Функция для входа в игру
loginButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        playerData = { name: username, coins: 0 };
        localStorage.setItem('playerData', JSON.stringify(playerData));
        showGame(playerData);
    }
});

// Функция для отображения игрового экрана
function showGame(data) {
    playerName.textContent = data.name;
    coinDisplay.textContent = data.coins;
    authContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    achievementsContainer.classList.remove('hidden'); // Показываем блок достижений
    renderAchievements();
}

// Обработка кликов по монете
coinButton.addEventListener('click', () => {
    playerData.coins++;
    coinDisplay.textContent = playerData.coins;
    localStorage.setItem('playerData', JSON.stringify(playerData));

    // Проверка достижений
    checkAchievements(playerData.coins);
});

function checkAchievements(coins) {
    if (coins === 1 && !achievements.firstCoin) {
        achievements.firstCoin = true;
        addAchievement("Вы получили достижение: Первая монета!");
    }
    if (coins === 50 && !achievements.fiftyCoins) {
        achievements.fiftyCoins = true;
        addAchievement("Вы получили достижение: 50 монет!");
    }
    if (coins === 100 && !achievements.hundredCoins) {
        achievements.hundredCoins = true;
        addAchievement("Вы получили достижение: 100 монет!");
    }
}

// Функция добавления достижения в список
function addAchievement(message) {
    const li = document.createElement('li');
    li.textContent = message;
    achievementsList.appendChild(li);
}

// Функция отображения достижений
function renderAchievements() {
    achievementsList.innerHTML = '';
    for (let key in achievements) {
        if (achievements[key]) {
            addAchievement(key);
        }
    }
}

// Функция выхода из игры
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('playerData');
    gameContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
    usernameInput.value = '';
    achievementsList.innerHTML = ''; // Очищаем достижения при выходе
});

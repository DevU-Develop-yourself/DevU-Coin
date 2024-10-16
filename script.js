// Получаем элементы из DOM
const authContainer = document.getElementById('authContainer');
const gameContainer = document.getElementById('gameContainer');
const achievementsContainer = document.getElementById('achievementsContainer');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const playerName = document.getElementById('playerName');
const coinButton = document.getElementById('coinButton');
const coinDisplay = document.getElementById('coinCount');
const achievementList = document.getElementById('achievementList');

// Загружаем данные игрока из localStorage
let playerData = JSON.parse(localStorage.getItem('playerData')) || {};

// Если данные есть, показываем игру
if (playerData.name) {
    showGame(playerData);
}

// Достижения
const achievements = [
    { name: "Начинающий игрок", condition: (coins) => coins >= 10 },
    { name: "Монетный магнат", condition: (coins) => coins >= 50 },
];

function checkAchievements() {
    achievementList.innerHTML = ''; // Очищаем список перед обновлением
    achievements.forEach((achievement) => {
        if (achievement.condition(playerData.coins)) {
            const listItem = document.createElement('li');
            listItem.textContent = achievement.name;
            achievementList.appendChild(listItem);
        }
    });
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
    achievementsContainer.classList.remove('hidden');
    checkAchievements(); // Проверка достижений
}

// Обработка кликов по монете
coinButton.addEventListener('click', () => {
    playerData.coins++;
    coinDisplay.textContent = playerData.coins;
    localStorage.setItem('playerData', JSON.stringify(playerData));
    checkAchievements(); // Проверка достижений
});

// Функция выхода из игры
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('playerData');
    gameContainer.classList.add('hidden');
    achievementsContainer.classList.add('hidden');
    authContainer.classList.remove('hidden');
    usernameInput.value = '';
});

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const coinButton = document.getElementById("coinButton");
    const logoutButton = document.getElementById("logoutButton");
    const authContainer = document.getElementById("authContainer");
    const gameContainer = document.getElementById("gameContainer");
    const playerNameDisplay = document.getElementById("playerName");
    const coinCountDisplay = document.getElementById("coinCount");
    const energyCountDisplay = document.getElementById("energyCount");
    const energyBar = document.getElementById("energyBar");

    let coins = 0;
    let energy = 5000;

    loginButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        if (username) {
            playerNameDisplay.textContent = username;
            authContainer.classList.add("hidden");
            gameContainer.classList.remove("hidden");
        } else {
            alert("Введите имя!");
        }
    });

    coinButton.addEventListener("click", function () {
        coins++;
        coinCountDisplay.textContent = coins;
        energy -= 50; // уменьшаем энергию за клик
        energyCountDisplay.textContent = energy;

        // обновляем полоску энергии
        energyBar.style.width = (energy / 5000) * 100 + "%";

        if (energy <= 0) {
            alert("Энергия исчерпана!");
            energy = 0;
            energyCountDisplay.textContent = energy;
            coinButton.disabled = true; // отключаем кнопку
        }
    });

    logoutButton.addEventListener("click", function () {
        authContainer.classList.remove("hidden");
        gameContainer.classList.add("hidden");
        coins = 0;
        energy = 5000;
        coinCountDisplay.textContent = coins;
        energyCountDisplay.textContent = energy;
        energyBar.style.width = "100%";
        coinButton.disabled = false; // включаем кнопку
        document.getElementById("username").value = ""; // очищаем поле ввода
    });
});

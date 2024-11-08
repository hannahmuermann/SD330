const clock = document.getElementById('clock');
const temperature = document.getElementById('temperature');
const powerButton = document.getElementById('powerButton');
const mainDisplay = document.getElementById('mainDisplay');
const fridgeButton = document.getElementById('fridgeButton');
const tvButton = document.getElementById('tvButton');
const browserButton = document.getElementById('browserButton');
const musicButton = document.getElementById('musicButton');
const timerButton = document.getElementById('timerButton');
const shoppingButton = document.getElementById('shoppingButton');
const tempUp = document.getElementById('tempUp');
const tempDown = document.getElementById('tempDown');
const weather = document.getElementById('weather');
const alarmSound = document.getElementById('alarmSound');
const tvSound = document.getElementById('tvSound');

let isOn = true;
let is24Hour = true;
let isCelsius = true;
let temp = Math.floor(Math.random() * (8 - 2 + 1)) + 2; // Random temp between 2-8°C

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    if (!is24Hour) {
        hours = hours % 12 || 12;
    }
    clock.textContent = `${hours.toString().padStart(2, '0')}:${minutes}`;
}

function toggleClockFormat() {
    is24Hour = !is24Hour;
    updateClock();
}

function updateTemperature() {
    temperature.textContent = isCelsius ? `${temp}°C` : `${Math.round(temp * 9/5 + 32)}°F`;
}

function toggleTemperatureUnit() {
    isCelsius = !isCelsius;
    updateTemperature();
}

function changeTemperature(change) {
    temp += change;
    updateTemperature();
}

function togglePower() {
    isOn = !isOn;
    powerButton.classList.toggle('off');
    mainDisplay.style.display = isOn ? 'flex' : 'none';
    document.querySelectorAll('.control-button').forEach(button => {
        button.style.display = isOn ? 'flex' : 'none';
    });
}

function setActiveButton(button) {
    document.querySelectorAll('.control-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function updateDisplay(content) {
    mainDisplay.innerHTML = content;
}

function updateWeather() {
    const forecasts = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
    const forecast = forecasts[Math.floor(Math.random() * forecasts.length)];
    weather.textContent = `Weather: ${forecast}`;
}

function showTimer() {
    updateDisplay(`
        <h2>Timer</h2>
        <input type="number" id="timerInput" min="1" max="60" value="1">
        <button id="startTimer">Start Timer</button>
        <div id="timerDisplay"></div>
    `);
    document.getElementById('startTimer').addEventListener('click', startMinuteTimer);
}

function startMinuteTimer() {
    const timerInput = document.getElementById('timerInput');
    const timerDisplay = document.getElementById('timerDisplay');
    let seconds = timerInput.value * 60;
    timerDisplay.textContent = `${timerInput.value}:00`;
    const countdown = setInterval(() => {
        seconds--;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        if (seconds === 0) {
            clearInterval(countdown);
            alarmSound.play();
        }
    }, 1000);
}

function showShoppingList() {
    updateDisplay(`
        <h2>Shopping List</h2>
        <ul id="shoppingList"></ul>
        <input type="text" id="newItem" placeholder="Add new item">
        <button id="addItem">Add</button>
    `);
    const shoppingList = document.getElementById('shoppingList');
    const newItem = document.getElementById('newItem');
    const addItem = document.getElementById('addItem');

    ['Milk', 'Eggs', 'Bread', 'Cheese', 'Apples'].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        shoppingList.appendChild(li);
    });

    addItem.addEventListener('click', () => {
        if (newItem.value.trim() !== '') {
            const li = document.createElement('li');
            li.textContent = newItem.value;
            shoppingList.appendChild(li);
            newItem.value = '';
            if (shoppingList.children.length > 5) {
                shoppingList.removeChild(shoppingList.firstChild);
            }
        }
    });
}

powerButton.addEventListener('click', togglePower);
clock.addEventListener('click', toggleClockFormat);
temperature.addEventListener('click', toggleTemperatureUnit);
tempUp.addEventListener('click', () => changeTemperature(1));
tempDown.addEventListener('click', () => changeTemperature(-1));

fridgeButton.addEventListener('click', () => {
    setActiveButton(fridgeButton);
    updateDisplay(`
        <h2>Fridge Interior</h2>
        <img src="https://cdn.airportappliance.com/media/magefan_blog/Beyond-the-Basics--Deep-Cleaning-Your-Refrigerator-Inside-and-Out-.jpg" alt="Fridge Interior">
    `);
});

tvButton.addEventListener('click', () => {
    setActiveButton(tvButton);
    updateDisplay(`
        <h2>Television</h2>
        <img src="https://aptokash.github.io/SD330-2/06-tv.jpg" alt="Television">
    `);
    tvSound.play();
});

browserButton.addEventListener('click', () => {
    setActiveButton(browserButton);
    updateDisplay(`
        <h2>Web Browser</h2>
        <img src="https://aptokash.github.io/SD330-2/06-web.jpg" alt="Browser">
    `);
});

musicButton.addEventListener('click', () => {
    setActiveButton(musicButton);
    updateDisplay(`
        <h2>Music Player</h2>
        <audio controls>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    `);
});

timerButton.addEventListener('click', () => {
    setActiveButton(timerButton);
    showTimer();
});

shoppingButton.addEventListener('click', () => {
    setActiveButton(shoppingButton);
    showShoppingList();
});

// Initialize
setInterval(updateClock, 1000);
updateClock();
updateTemperature();
updateWeather();
setInterval(updateWeather, 600000); // Update weather every 10 minutes
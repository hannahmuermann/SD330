const clock = document.getElementById('clock');
const temperature = document.getElementById('temperature');
const powerButton = document.getElementById('powerButton');
const mainDisplay = document.getElementById('mainDisplay');
const fridgeButton = document.getElementById('fridgeButton');
const tvButton = document.getElementById('tvButton');
const browserButton = document.getElementById('browserButton');

let isOn = true;

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;
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

powerButton.addEventListener('click', togglePower);

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
});

browserButton.addEventListener('click', () => {
    setActiveButton(browserButton);
    updateDisplay(`
        <h2>Web Browser</h2>
        <img src="https://aptokash.github.io/SD330-2/06-web.jpg" alt="Browser">
    `);
});

setInterval(updateClock, 1000);
updateClock();
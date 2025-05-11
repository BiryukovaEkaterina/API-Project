const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Функция для определения времени суток
function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours >= 5 && hours < 10) return 'morning';    // 5:00-9:59 - утро
    if (hours >= 10 && hours < 18) return 'day';      // 10:00-17:59 - день
    if (hours >= 18 && hours < 23) return 'evening';  // 18:00-22:59 - вечер
    return 'night';                                   // 23:00-4:59 - ночь
}

// Установка фона в зависимости от времени суток
function setBackground() {
    const timeOfDay = getTimeOfDay();
    let backgroundImage = '';
    
    switch (timeOfDay) {
        case 'morning':
            backgroundImage = '1.gif';
            break;
        case 'day':
            backgroundImage = '2.gif';
            break;
        case 'evening':
            backgroundImage = '3.gif';
            break;
        case 'night':
            backgroundImage = '4.gif';
            break;
    }
    
    canvas.style.backgroundImage = `url('${backgroundImage}')`;
}

// Обновляем время каждую секунду
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("time").textContent = `Время: ${timeString}`;
    
    // Проверяем, нужно ли изменить фон
    const currentHour = now.getHours();
    if (currentHour !== lastCheckedHour) {
        lastCheckedHour = currentHour;
        setBackground();
    }
}

let lastCheckedHour = (new Date()).getHours();

// Устанавливаем начальный фон
setBackground();
setInterval(updateTime, 1000);

// Получаем погоду (Open-Meteo API без ключа)
async function fetchWeather() {
    try {
        // Используем API, которое не требует ключа (например, wttr.in)
        const response = await fetch("https://wttr.in/Saint%20Petersburg?format=%c+%t");
        const weatherText = await response.text();
        document.getElementById("weather").textContent = `Погода в СПб: ${weatherText}`;
    } catch (error) {
        console.error("Ошибка загрузки погоды:", error);
        document.getElementById("weather").textContent = "Погода: ошибка загрузки";
    }
}

fetchWeather();

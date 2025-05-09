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
    // Координаты Санкт-Петербурга
    const latitude = 59.9343;
    const longitude = 30.3351;
    
    // Запрос к Open-Meteo
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Температура и код погоды
        const temp = data.current_weather.temperature;
        const weatherCode = data.current_weather.weathercode;
        
        // Расшифровка кодов погоды
        const weatherDescriptions = {
            0: "☀️ Ясно",
            1: "🌤️ Преимущественно ясно",
            2: "⛅ Переменная облачность",
            3: "☁️ Пасмурно",
            45: "🌫️ Туман",
            61: "🌧️ Небольшой дождь",
            80: "🌦️ Ливень",
            95: "⛈️ Гроза"
        };
        
        const weatherText = weatherDescriptions[weatherCode] || "❓ Неизвестно";
        document.getElementById("weather").textContent = `Погода в СПб: ${weatherText}, ${temp}°C`;
    } catch (error) {
        console.error("Ошибка загрузки погоды:", error);
        document.getElementById("weather").textContent = "Погода: ошибка загрузки";
    }
}

fetchWeather();
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const resultBox = document.getElementById("resultBox");

    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            resultBox.style.display = "block";
            resultBox.innerHTML = `<p>City not found. Try again.</p>`;
            return;
        }

        const data = await response.json();

        resultBox.style.display = "block";
        resultBox.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p class="temp">${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind: ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `<p>Error fetching weather.</p>`;
    }
}

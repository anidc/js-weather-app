const apikey = "f55c0a172aa14d28ad9182838212805"
const url = (city) => `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7&aqi=no&alerts=no`

async function getWeatherByCity(city) {
    const response = await fetch(url(city), { origin: "cors" })
    const respData = await response.json()

    console.log(respData);

    addWeatherToPage(respData)
}

function addWeatherToPage(data) {
    const temp = data.current.temp_c

    const weather = document.createElement("div")
    weather.classList.add("weather")

    weather.innerHTML = `${data.location.name}<h2><img src="${data.current.condition.icon}" alt=""><small>${data.current.condition.text}</small>${Math.round(temp)} °C</h2>
    `
    var days = document.createElement("div")
    days.classList.add("days")

    for (let i = 0; i < 3; i++) {

        const datum = data.forecast.forecastday[i].date
        const maxtemp = Math.round(data.forecast.forecastday[i].day.maxtemp_c)
        const mintemp = Math.round(data.forecast.forecastday[i].day.mintemp_c)
        const icon = data.forecast.forecastday[i].day.condition.icon
        const text = data.forecast.forecastday[i].day.condition.text
        console.log(days);
        days.innerHTML += `<div class="oneday">${datum}<img src="${icon}" alt=""><small>${text}</small><br><h2>${maxtemp} °C <br><small>${mintemp}°C</small></h2>
        </div>`

    }
    main.innerHTML = ""

    main.appendChild(weather)
    main.appendChild(days)
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const city = search.value;
    if (city) {
        getWeatherByCity(city);
    }
    search.value = ""
})


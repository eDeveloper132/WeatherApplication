const ApiKey = "e504dd454b9a28ba54e8f141639ca956";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const SearchBox = document.querySelector(".search input");
const SearchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");
const checkweather = async (city) =>
{
    const response = await fetch(ApiUrl + city + "&appid=" + ApiKey);

    try {
    
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }}
        catch (error)
        {
            console.error("Error fetching data:", error);
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
    
    if (response.status == 404) 
    {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    }
    else
    {
        let data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        if (data.weather[0].main == "Clouds") 
    {
        WeatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Rain")
    {
        WeatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle")
    {
        WeatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist")
    {
        WeatherIcon.src = "images/mist.png";
    }
    }

}
SearchBtn.addEventListener("click", () => 
{
    checkweather(SearchBox.value);
})
SearchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkweather(SearchBox.value);
    }
});



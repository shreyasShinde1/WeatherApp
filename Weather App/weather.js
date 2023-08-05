const apiKey ="780e3cde41aff6c33990c5db5edcf8b5";
const baseurl = `https://api.openweathermap.org/data/2.5`

const addCity = document.getElementById("add_city");
const searchBar = document.getElementById("search");
const container = document.getElementById("container");

addCity.addEventListener("click", ()=>{
    let SearchString = searchBar.value.toLocaleLowerCase().trim();
    // console.log(SearchString)
    getSearchResults(SearchString);
    searchBar.value ="";
})

searchBar.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        let SearchString = searchBar.value.toLocaleLowerCase().trim();
        // console.log(SearchString)
        getSearchResults(SearchString);
        searchBar.value ="";
    }
})

// let error = document.querySelector(".error-message");
async function getSearchResults(SearchString,error){
    let url = `${baseurl}/weather?q=${SearchString}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const result = await response.json();
    // console.log(result);
    addDataOnToUI(result);
    // error.style.display ="block";
}

function addDataOnToUI(cityData){
        let maxTemp = Math.floor(cityData.main.temp_max);
        let minTemp = Math.floor(cityData.main.temp_min);
        let cityName = cityData.name;
        let temprature = Math.floor(cityData.main.temp);
        let weatherType = cityData.weather[0].main;
        let country = getFullCountryName(cityData.sys.country);
        let weatherImg;
        
        if(cityData.weather[0].main === "Clouds"){
            weatherImg = "images/Moon cloud mid rain.png";
        }
        if(cityData.weather[0].main === "Clear"){
            weatherImg = "images/Sun cloud angled rain.png";
        }
        if(cityData.weather[0].main === "Haze"){
            weatherImg = "images/Moon cloud fast wind.png";
        }
        if(cityData.weather[0].main === "Rain"){
            weatherImg = "images/Sun cloud angled rain.png";
        }
        if(cityData.weather[0].main === "Drizzle"){
            weatherImg = "images/Tornado.png";
        }
        if(cityData.weather[0].main === "Mist"){
            weatherImg = "images/Moon cloud fast wind.png";
        }
        
        const div = document.createElement("div")
        div.className = "card1";
        
        div.innerHTML = `
        <div class="temprature-img">
        <div class="temprature">${temprature}&deg;</div>
        <div class="img">
            <img src="${weatherImg}" width="120px"   alt="">
        </div>
        </div>
        <div class="cityName-humidity">
        <div class="cityname-max-minTemp">
            <div class="max-min">
                H:${maxTemp}&deg; L:${minTemp}&deg;
            </div>
            <div class="cityName">
                ${cityName},${country}
            </div>
        </div>
        <div class="humidity">
            ${weatherType}
        </div>
        </div>
        `;
        container.appendChild(div);
}

function getFullCountryName(countryCode) {
    switch (countryCode) {
        case 'US':
            return 'United States';
        case 'CA':
            return 'Canada';
        case 'GB':
            return 'United Kingdom';
        case 'AU':
            return 'Australia';
        case 'DE':
            return 'Germany';
        case 'FR':
            return 'France';
        case 'JP':
            return 'Japan';
        case 'IN':
            return 'India';
        case 'CN':
            return 'China';
        case 'BR':
            return 'Brazil';
        case 'RU':
            return 'Russia';
        case 'KR':
            return 'South Korea';
        case 'SA':
            return 'Saudi Arabia';
        case 'ZA':
            return 'South Africa';
        case 'MX':
            return 'Mexico';
        default:
            return 'Not Found';
    }
}

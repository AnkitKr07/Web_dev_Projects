const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// variables needed
let currentTab = userTab;
const API_KEY = "199e1f8bfb0f4eaaa03037911488c310";
currentTab.classList.add("current-tab");
getfromSessionStorage();

//switching tabs
function switchTabs(clickedTab) {
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //if searchform contaoiner is invisible the make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else{
            // since we are already on searchTab we will make weather tab visible
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // now we are in weather tab so checking for coordinates from local storage
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTabs(userTab);
});
searchTab.addEventListener("click", () => {
    //pass clicked tab as input parameter
    switchTabs(searchTab);
})

// check if coordinates are already present in session/local storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    //hide grantcontainer
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API Call
    // https://api.weatherbit.io/v2.0/current?lat=17.33&lon=13.22&key=199e1f8bfb0f4eaaa03037911488c310&include=minutely
    try{
        const response = await fetch("ff"
            `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${API_KEY}&include=minutely`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){
    //firstly we have to fetch the element
    const cityName = document.querySelector("[data-cityName");
    const countryIcon = document.querySelector("[data-countryIcon");
    const desc = document.querySelector("[data-weatherDesc");
    const weatherIcon = document.querySelector("[data-weatherIcon");
    const temp = document.querySelector("[data-temp");
    const windspeed = document.querySelector("[data-windspeed");
    const humidity = document.querySelector("[data-humidity");
    const cloudiness = document.querySelector("[data-cloudiness");

    //fetch values from weatherInfo (api call) and then putting it into UI
    cityName.innerText = weatherInfo?.data[0]?.city_name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.data[0]?.weather?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.data[0]?.temp;
    windspeed.innerText = weatherInfo?.data[0]?.wind_spd;
    humidity.innerText = weatherInfo?.data[0]?.aqi;
    cloudiness.innerText = weatherInfo?.data[0]?.clouds;

}

async function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
async function showPosition(position){
    const userCoordinates = {
        lat : position.coords.latitude,
        lon : position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchInput.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === '') return;
    else    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){

    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response = await fetch(
            `xxxx`
        );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){
        console.log(err);
    }
};

















































// async function getLocation(){
//     if(navigator.geolocation){
//         await navigator.geolocation.getCurrentPosition(showPosition);
//     }
// }
// async function showPosition(position){
//     let lat = await position.coords.latitude;
//     let lon = await position.coords.longitude;

//     console.log(lat);
//     console.log(lon);
    
// }
// getLocation();

// // let latitude = lat;
// // let longitude = lon;


// const API_KEY = "199e1f8bfb0f4eaaa03037911488c310";
// // let city = "goa";
// let latitude = "35.7796";
// let longitude = "78.6382";
// async function weatherAPIcall(){
//       const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}&include=minutely`);
//       const result = await response.json();
//       console.log(result);

//     // return result;
//       let newChild = document.createElement('p');
//     const cityName = result.data[0].city_name;
//     const temperature = result.data[0].temp;
//     newChild.textContent = `The current temperature in ${cityName} is : ${temperature} degree celcius`;
//     document.body.appendChild(newChild);
// }
// // weatherAPIcall();
// // try{
// //     let result =  weatherAPIcall();
// //     console.log("try block");
// //     console.log(res);
// //     let newChild = document.createElement('p');
// //     const cityName = result.data[0].city_name;
// //     const temperature = result.data[0].temp;
// //     newChild.textContent = `The current temperature in ${cityName} is ${temperature}`;
// //     document.body.appendChild(newChild);
// // }
// // catch(e){
// //     console.log("Error found this one: ", e)
// // }


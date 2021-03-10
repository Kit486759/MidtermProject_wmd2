
// let default city = Vancouver 
let city = "vancouver"
// let cityinput from search 
let cityInput = `${city}`


// API  
const APIkey = "bb38ad245b56243dda6f74c97a8bcf6c"
const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
// const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${APIkey}`


// Testing search button and search box - 21mar09
var searchBtn = document.getElementById("searchBtn")
var searchInput = document.getElementById("searchInput")

// fetch 
fetch(api)

    .then(response => {
        if (response.status == 200) {
            // alert("connect success");
            response.json().then(result => {
                console.log(result);
                console.log(result.name);
            })
        }
    })


// Detect the click action on "search button"
searchBtn.addEventListener("click", () => {
    searchWeather();
    alert("test search button");

})

// Function for searching weather TESTING
function searchWeather() {
    document.getElementById("city").InnerHTML = (`<p>hihi</p>`)
}


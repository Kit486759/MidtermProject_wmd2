// Objective: (a) Create a Weather App with HTML,CSS and Javascript. Create a UI for a Weather
// App (webSite).
// 1) Use the Fetch API to fetch the data from Open Weather API
// (https://home.openweathermap.org/users/sign_in)
// 2) Your app must show Vancouver&#39;s weather as default, but the user can be able to search
// for the weather of another city.
// 3) If the city is not found, a pop up should appear informing the user that it was not found.
// 4) The information that the app should show is Name of the city, currently weather, Feel
// Like, etc.
// 5) Your app should update the weather after every 2 minutes.

// let content = document.getElementById("content")
//         let city = document.getElementById("city").getAttribute("value")
//         let date = document.getElementById("date")
//         let temp = document.getElementById("temp")
//         let weather = document.getElementById("weather")


// API  
const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "bb38ad245b56243dda6f74c97a8bcf6c"
}
// const api = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=bb38ad245b56243dda6f74c97a8bcf6c`

//=============================== Tag search box and search button
let searchInput = document.getElementById("searchInput")
let searchBtn = document.getElementById("searchBtn")

//=============================== Active the search weather function when search button clicked
function searchClick() {
    console.log("test search btn")
    //=============================== Get the search value
    searchWeather(searchInput.value)
    console.log(searchInput.value)
}

// document.addEventListener("keypress", pressEnter)
// function pressEnter(event) {
//     if (event.keycode === 13) {
//         console.log("Press enter test")
//     }
// }


// let testtoday = new Date();
// console.log(testtoday)
// alert(testtoday.getDate())


function searchWeather(cityName) {
    //=============================== Fetch data
    fetch(`${api.url}weather?q=${cityName}&units=metric&appid=${api.key}`)

        .then(data => {
            //=============================== Check fetch connection
            if (data.status == 200) {

                //=============================== Test connect
                console.log("connect success");

                //=============================== Store json data
                return data.json();

            } else {
                //=============================== Pop alert message if wrong input.
                alert("Something wrong. Please check your input and try again.")
            }
        })
        .then(function displayData(data) {
            console.log(data)
            console.log("city" + data.name)
            console.log("temp" + data.main.temp)
            console.log("min temp" + data.main.temp_min)
            console.log("max temp" + data.main.temp_max)
            console.log("weather" + data.weather[0].main)

            let city = document.getElementById("city")
            city.innerText = `${data.name} ,${data.sys.country}`


            let date = document.getElementById("date");
            //=============================== Get today by newDate()
            let today = new Date();
            let dateValue = today.getDate();

            //===============================Test get date
            // console.log(`date${today.getDay()} month${today.getMonth()} year${yearValue} day${dayValue}`)

            //=============================== Set month array as getMonth return index
            const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", "Dec"];
            let monthValue = monthArr[today.getMonth()];
            let yearValue = today.getFullYear();

            //=============================== Set Day as String form
            const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let dayValue = dayArr[today.getDay()];

            date.innerText = `${dateValue} ${monthValue} ${yearValue} ${dayValue}`

            let temp = document.getElementById("temp")
            temp.innerText = `${Math.round(data.main.temp)}°c`

            let feelTemp = document.getElementById("feelTemp")
            feelTemp.innerText = `Feels-like ${Math.round(data.main.feels_like)}°c`

            let minmaxTemp = document.getElementById("minmaxTemp")
            minmaxTemp.innerText = `LO ${Math.round(data.main.temp_min)}°c / HI ${Math.round(data.main.temp_max)}°c`

            let weather = document.getElementById("weather")
            weather.innerText = `${data.weather[0].main}`

        })
        //===============================  forecast weather action
        .then(function searchForecast() {
            console.log("test forecast")

            fetch(`${api.url}forecast?q=${cityName}&units=metric&appid=${api.key}`)

                .then(data => {
                    if (data.status == 200) {
                        // console.log(data);
                        return data.json();
                    } else {
                        //=============================== Pop alert message if wrong input.
                        alert("Something wrong. Please refresh your browser and try again.")
                    }
                })
                .then(function diaplaySearchForecast(data) {
                    console.log(data);

                    // Set day1 - day6
                    let day1 = document.getElementById("day-1")
                    let day2 = document.getElementById("day-2")
                    let day3 = document.getElementById("day-3")
                    let day4 = document.getElementById("day-4")
                    let day5 = document.getElementById("day-5")
                    let day6 = document.getElementById("day-6")

                    let day1Value = data.list[0]
                    let day2Value = data.list[7]
                    let day3Value = data.list[15]
                    let day4Value = data.list[23]
                    let day5Value = data.list[31]
                    let day6Value = data.list[39]


                    //=============================== Set day and month
                    let today = new Date();
                    let dateValue = today.getDate();
                    // console.log(dateValue)

                    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                        "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let monthValue = monthArr[today.getMonth()];


                    //===============================  Get Weather Image 
                    weatherImg = {
                        url: `http://openweathermap.org/img/wn/`,
                        format: `@2x.png`
                    }

                    //=============================== Set number dateValue to represent the next 6 days
                    day1.innerHTML = (`${dateValue + 1}${monthValue}<br>${day1Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day1Value.weather[0].icon}${weatherImg.format}">
                    <br>${day1Value.weather[0].main}<br>${day1Value.main.temp_min}°c / ${day1Value.main.temp_max}°c`)

                    day2.innerHTML = (`${dateValue + 2}${monthValue}<br>${day2Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day2Value.weather[0].icon}${weatherImg.format}">
                    <br>${day2Value.weather[0].main}<br>${day2Value.main.temp_min}°c / ${day2Value.main.temp_max}°c`)

                    day3.innerHTML = (`${dateValue + 3}${monthValue}<br>${day3Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day3Value.weather[0].icon}${weatherImg.format}">
                    <br>${day3Value.weather[0].main}<br>${day3Value.main.temp_min}°c / ${day3Value.main.temp_max}°c`)

                    day4.innerHTML = (`${dateValue + 4}${monthValue}<br>${day4Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day4Value.weather[0].icon}${weatherImg.format}">
                    <br>${day4Value.weather[0].main}<br>${day4Value.main.temp_min}°c / ${day4Value.main.temp_max}°c`)

                    day5.innerHTML = (`${dateValue + 5}${monthValue}<br>${day5Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day5Value.weather[0].icon}${weatherImg.format}">
                    <br>${day5Value.weather[0].main}<br>${day5Value.main.temp_min}°c / ${day5Value.main.temp_max}°c`)

                    day6.innerHTML = (`${dateValue + 6}${monthValue}<br>${day6Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day6Value.weather[0].icon}${weatherImg.format}">
                    <br>${day6Value.weather[0].main}<br>${day6Value.main.temp_min}°c / ${day6Value.main.temp_max}°c`)
                })
        })


}

window.addEventListener("load", defaultWeather)
function defaultWeather() {
    //=============================== Fetch data
    fetch(`${api.url}weather?q=vancouver&units=metric&appid=${api.key}`)

        .then(data => {
            //=============================== Check fetch connection
            if (data.status == 200) {

                //=============================== Test connect
                console.log("connect success");

                //=============================== Store json data
                return data.json();
            }
        })
        .then(function displayData(data) {
            console.log(data)
            console.log("city" + data.name)
            console.log("temp" + data.main.temp)
            console.log("min temp" + data.main.temp_min)
            console.log("max temp" + data.main.temp_max)
            console.log("weather" + data.weather[0].main)

            let city = document.getElementById("city")
            city.innerText = `${data.name} ,${data.sys.country}`


            let date = document.getElementById("date");
            //=============================== Get today by newDate()
            let today = new Date();
            let dateValue = today.getDate();

            //===============================Test get date
            // console.log(`date${today.getDay()} month${today.getMonth()} year${yearValue} day${dayValue}`)

            //=============================== Set month array as getMonth return index
            const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                "Aug", "Sep", "Oct", "Nov", "Dec"];
            let monthValue = monthArr[today.getMonth()];
            let yearValue = today.getFullYear();

            //=============================== Set Day as String form
            const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let dayValue = dayArr[today.getDay()];

            date.innerText = `${dateValue} ${monthValue} ${yearValue} ${dayValue}`

            let temp = document.getElementById("temp")
            temp.innerText = `${Math.round(data.main.temp)}°c`

            let feelTemp = document.getElementById("feelTemp")
            feelTemp.innerText = `Feels-like ${Math.round(data.main.feels_like)}°c`

            let minmaxTemp = document.getElementById("minmaxTemp")
            minmaxTemp.innerText = `LO ${Math.round(data.main.temp_min)}°c / HI ${Math.round(data.main.temp_max)}°c`

            let weather = document.getElementById("weather")
            weather.innerText = `${data.weather[0].main}`
        })

        //=============================== default forecast weather action
        .then(function defaultForecast() {
            console.log("test forecast")

            fetch(`${api.url}forecast?q=vancouver&units=metric&appid=${api.key}`)

                .then(data => {
                    if (data.status == 200) {
                        // console.log(data);
                        return data.json();
                    } else {
                        //=============================== Pop alert message if wrong input.
                        alert("Something wrong. Please refresh your browser and try again.")
                    }
                })
                .then(function diaplayDefaultForecast(data) {
                    console.log(data);

                    // Set day1 - day6
                    let day1 = document.getElementById("day-1")
                    let day2 = document.getElementById("day-2")
                    let day3 = document.getElementById("day-3")
                    let day4 = document.getElementById("day-4")
                    let day5 = document.getElementById("day-5")
                    let day6 = document.getElementById("day-6")

                    let day1Value = data.list[0]
                    let day2Value = data.list[7]
                    let day3Value = data.list[15]
                    let day4Value = data.list[23]
                    let day5Value = data.list[31]
                    let day6Value = data.list[39]


                    //=============================== Set day and month
                    let today = new Date();
                    let dateValue = today.getDate();
                    // console.log(dateValue)

                    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                        "Aug", "Sep", "Oct", "Nov", "Dec"];
                    let monthValue = monthArr[today.getMonth()];

                    //=============================== Set Day as String form
                    const dayArr = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
                    // let dayValue = dayArr[today.getDay()];
                    // console.log(dayArr[today.getDay() + 1])
                    // console.log(dayValue, [1])

                    //===============================  Get Weather Image 
                    weatherImg = {
                        url: `http://openweathermap.org/img/wn/`,
                        format: `@2x.png`
                    }

                    //=============================== Set number dateValue to represent the next 6 days
                    day1.innerHTML = (`${dateValue + 1} ${monthValue} ${dayArr[today.getDay() + 1]}<br>${day1Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day1Value.weather[0].icon}${weatherImg.format}">
                    <br>${day1Value.weather[0].main}<br>${day1Value.main.temp_min}°c / ${day1Value.main.temp_max}°c`)

                    day2.innerHTML = (`${dateValue + 2} ${monthValue} ${dayArr[today.getDay() + 2]}<br>${day2Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day2Value.weather[0].icon}${weatherImg.format}">
                    <br>${day2Value.weather[0].main}<br>${day2Value.main.temp_min}°c / ${day2Value.main.temp_max}°c`)

                    day3.innerHTML = (`${dateValue + 3} ${monthValue} ${dayArr[today.getDay() + 3]}<br>${day3Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day3Value.weather[0].icon}${weatherImg.format}">
                    <br>${day3Value.weather[0].main}<br>${day3Value.main.temp_min}°c / ${day3Value.main.temp_max}°c`)

                    day4.innerHTML = (`${dateValue + 4} ${monthValue} ${dayArr[today.getDay() + 4]}<br>${day4Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day4Value.weather[0].icon}${weatherImg.format}">
                    <br>${day4Value.weather[0].main}<br>${day4Value.main.temp_min}°c / ${day4Value.main.temp_max}°c`)

                    day5.innerHTML = (`${dateValue + 5} ${monthValue} ${dayArr[today.getDay() + 5]}<br>${day5Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day5Value.weather[0].icon}${weatherImg.format}">
                    <br>${day5Value.weather[0].main}<br>${day5Value.main.temp_min}°c / ${day5Value.main.temp_max}°c`)

                    day6.innerHTML = (`${dateValue + 6} ${monthValue} ${dayArr[today.getDay() + 6]}<br>${day6Value.main.temp}°c
                    <br><img src="${weatherImg.url}${day6Value.weather[0].icon}${weatherImg.format}">
                    <br>${day6Value.weather[0].main}<br>${day6Value.main.temp_min}°c / ${day6Value.main.temp_max}°c`)
                })
        })
}
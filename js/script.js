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

        let searchInput = document.getElementById("searchInput")
        let searchBtn = document.getElementById("searchBtn")

        function searchClick() {
            console.log("test search btn")
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
        }
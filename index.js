// SETS BACKGROUND IMAGE & DESCRIPTION IN BOTTOM LEFT
fetch('https://api.unsplash.com/photos/random?query=mountain&client_id=gjO3n85KzbGJBDcsqr-ueN6sw_yn7VM-c91cBGL9BO4')
    .then(res => res.json())
    .then(data =>{
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById('location').innerHTML = `
        <p><strong>${data.location.name ? data.location.name : data.alt_description}</strong></p>`
    })
    .catch(() => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1502085671122-2d218cd434e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzAwMTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjUyMDc0NzA&ixlib=rb-1.2.1&q=80&w=1080")`
    })

// SET CURRENCY RATES
fetch('https://openexchangerates.org/api/latest.json?app_id=eeaeb39321c64c87910a0c184dcab0b9&base=USD')
    .then(res => res.json())
    .then(data => {
        document.getElementById('top-left').innerHTML = `
        <p>USD: $1 | JPY: ¥${data.rates.JPY.toFixed(2)}</p>`
    })

// SETS TIME AND DATE
function getTime() {
    const time = new Date()
    document.getElementById("time").textContent = time.toLocaleTimeString("en-us", {timeStyle: "short"})
}
function getDate() {
    const date = new Date()
    document.getElementById("date").textContent = date.toLocaleDateString("en-us", {dateStyle: "medium"})
}

setInterval(getTime, 1000)
setInterval(getDate, 1000)

// SETS TODAY'S WEATHER IN THE CENTER RIGHT 
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=1c4a47c3eb5605ad07fe08f2ecd8da49`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            document.getElementById('right-center').innerHTML =`
            <p id="weather"><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"><span>${Math.round(data.main.temp)}º</span></p>
            <p>${data.name}</p>`
        })
        .catch(err => {
            document.getElementById('right-center').innerHTML = `
            <p>Sorry, no data right now</p>`
            console.error(err)})
})

// SETS THE 5 DAY WEATHER AT THE BOTTOM OF THE SCREEN
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=d607f0774396196ec446036d651635f4`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            // SETS FETCHED DATE TO THE DAY OF THE WEEK INSTEAD
            let dateStr1 = `${data.list[7].dt_txt}`;
            let dateStr2 = `${data.list[15].dt_txt}`;
            let dateStr3 = `${data.list[23].dt_txt}`;
            let dateStr4 = `${data.list[31].dt_txt}`;
            let dateStr5 = `${data.list[39].dt_txt}`;
            function getDay(dateStr, locale){
                let date = new Date(dateStr);
                return date.toLocaleDateString(locale, { weekday: 'long' });}
            let day1 = getDay(dateStr1, "en-US");
            let day2 = getDay(dateStr2, "en-US");
            let day3 = getDay(dateStr3, "en-US");
            let day4 = getDay(dateStr4, "en-US");
            let day5 = getDay(dateStr5, "en-US");
            document.getElementById('bottom-right').innerHTML =`
            <div class="forecast"></p><img src="http://openweathermap.org/img/wn/${data.list[7].weather[0].icon}.png"><span>${Math.round(data.list[7].main.temp)}º</span></p>
            <p>${day1}</p></div>
            <div class="forecast"></p><img src="http://openweathermap.org/img/wn/${data.list[15].weather[0].icon}.png"><span>${Math.round(data.list[15].main.temp)}º</span></p>
            <p>${day2}</p></div>
            <div class="forecast"></p><img src="http://openweathermap.org/img/wn/${data.list[23].weather[0].icon}.png"><span>${Math.round(data.list[23].main.temp)}º</span></p>
            <p>${day3}</p></div>
            <div class="forecast"></p><img src="http://openweathermap.org/img/wn/${data.list[31].weather[0].icon}.png"><span>${Math.round(data.list[31].main.temp)}º</span></p>
            <p>${day4}</p></div>
            <div class="forecast"></p><img src="http://openweathermap.org/img/wn/${data.list[39].weather[0].icon}.png"><span>${Math.round(data.list[39].main.temp)}º</span></p>
            <p>${day5}</p></div>`
        })
        .catch(err => {
            document.getElementById('bottom-right').innerHTML = `
            <p>Sorry, no data right now</p>`
            console.error(err)})
})

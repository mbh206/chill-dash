// SETS BACKGROUND IMAGE
fetch('https://api.unsplash.com/photos/random?query=mountain&client_id=gjO3n85KzbGJBDcsqr-ueN6sw_yn7VM-c91cBGL9BO4')
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById('location').innerHTML = `
        <p><strong>${data.location.name}</strong></p>`
    })
    .catch(() => {
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1502085671122-2d218cd434e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzAwMTV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjUyMDc0NzA&ixlib=rb-1.2.1&q=80&w=1080")`
    })

// SET CURRENCY RATES
fetch('https://openexchangerates.org/api/latest.json?app_id=eeaeb39321c64c87910a0c184dcab0b9&base=USD')
    .then(res => res.json())
    .then(data => {
        document.getElementById('top-left').innerHTML = `
        <p>USD: $1 | JPY: ¥${Math.round(data.rates.JPY)}</p>`
        console.log(data)
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

// SETS WEATHER 
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


"use strict";

var container = document.createElement("div");
container.className = "container";
document.body.append(container);
var row = document.createElement("div");
row.className = "row";

container.append(row);
//  Fetching Data From API
var res = fetch("https://restcountries.com/v2/all");
res
  .then(data => data.json())
  .then(data1 => foo(data1))
  .catch(error => console.log(error));

//  Function for Displaying Data Inside Cards
function foo(data1) {
  for (var i = 0; i < data1.length; i++) {
    try { 
      row.innerHTML += `<div class="col-md-4 col-sm-12">
   <div class="card deck card-box text-center text-black bg-light mb-3" style="width: 18rem;">
   <h4 class="card-title">${data1[i].name}</h4>
   <img src="${data1[i].flag}" class="card-img-top" alt="...">
<div class="card-body">
 <p class="card-text"><strong>Capital:🏙️${data1[i].capital} <br> Population:🧑‍🤝‍🧑${data1[i].population} <br> Region:🚗${data1[i].region}<br>Country code:📝${data1[i].alpha3Code}</strong> <br></p>
 <button type="button" class="btn btn-success" onclick=getWeatherData(${data1[i].latlng[0]},${data1[i].latlng[1]})>click for weather</button>
 <div><p id="temp"> </p> </div>
 <div><p id="error"> </p> </div>
</div>
</div>
</div>`;
    } catch (error) {
     console.log(error);
    }
  }
}

//  Function to Get Weather Data from OpenWeather Api
async function getWeatherData(lat, lon) {
  try {
    if (lon === undefined)
      throw new Error("Weather Is Not Available For This Country");
    let res3 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01195a91b1a0afc9c76a98728f85dc55`
    );
    let res4 = await res3.json();
    let weather = res4.main.temp;
    // console.log(weather);
    let res = document.getElementById("temp");
    res.innerHTML = `<strong>Temperature:☀️${weather} &deg C </strong>`;
  } catch (error) {
    errorblock.textContent = error;
  }
}

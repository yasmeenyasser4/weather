var searchInput = document.querySelector('.searchInput');
var btnFind = document.querySelector('.btnFind');
var containerRow = document.querySelector('.containerRow');
var currentAdress = "";

if (searchInput.value != null) {
  btnFind.addEventListener('click', function () {
    getCurrentWeather(searchInput.value);

    searchInput.value = null;

  })
}


// geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude: " + position.coords.latitude);
      console.log("Longitude: " + position.coords.longitude);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude; 
    
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
          let currentAddress = data.address.state;
          console.log(currentAddress);
          getCurrentWeather(currentAddress);
          } else {
            console.error("No results found.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
         
        })

    },
    (error) => {
      getCurrentWeather("cairo");
    }
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}



var containerCurrent = [];
var containerforecast = [];
var locationData = [];

// responce data
async function getCurrentWeather(city) {
  var result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a2a837c96934354a8b71751240812&q=${city}&days=3&aqi=no&alerts=no`)
  var data = await result.json();
  locationData = data.location;
  containerCurrent = data.current;
  containerforecast = data.forecast;
  displayFirtDay();
  displaySecondDay();
  displayThirdDay();

}

// display first day
function displayFirtDay() {
  var date = new Date(containerCurrent.last_updated).toString()
  var cartona = `
   <div class="headItem col-sm-12 col-lg-4  ">
                <div class="detailsToday d-flex justify-content-between py-2 px-2">
                  <div>${date.split(" ").slice(0, 1).join(" ")}</div>
                  <div>${date.split(" ").slice(2, 3).join(" ")} ${date.split(" ").slice(1, 2).join(" ")}</div>
                </div>
                <div class="bodyItem pt-3">
                  <div class="container">
                    <div class="location ">${locationData.name}

                    </div>
                    <div class="degree ">
                      <div class="num ">
                        <p>
                         ${containerCurrent.temp_c}
                          <sup>o</sup>
                          C

                        </p>
                      </div>
                      <div class="forecastImg ">
                        <img src="https:${containerCurrent.condition.icon}" alt="forcast image" class="ms-2" width="90">

                      </div>
                    </div>
                  </div>
                  <div class="custom my-3">${containerCurrent.condition.text} </div>
                  <span>
                    <img src="./images/icon-umberella.png" alt="umbrella">
                    20%
                  </span>
                  <span>
                    <img src="./images/icon-wind.png" alt="wind">
                    18km/h
                  </span>
                  <span>
                    <img src="./images/icon-compass.png" alt="compass">
                    East
                  </span>
                </div>
              </div>
   `;

  document.querySelector(".containerRow").innerHTML = cartona


}
// display second day
function displaySecondDay() {

  var date = new Date(containerforecast.forecastday[1].date).toString()
  var cartona = ` <div class=" col-sm-12 col-lg-4  ">
                <div class="forecastHeader ">
                  <div class="day py-2 px-2 ">${date.split(" ").slice(0, 1).join(" ")}</div>
                </div>
                <div class="bodyItem2 pt-2">
                  <div class="container">
                    <div class="imgIcon text-center py-3">
                      <img src="https:${containerforecast.forecastday[1].day.condition.icon}" alt="sun">

                    </div>
                    <div class="degree2 pt-3 ">
                      <p>
                         ${containerforecast.forecastday[1].day.avgtemp_c}
                        <sup>o</sup>
                        C
                      </p>
                    </div>
                    <div class="miniDegree2 pb-3 ">
                      <p>
                        ${containerforecast.forecastday[1].day.mintemp_c}
                        <sup>o</sup>

                      </p>
                    </div>

                    <div class="custom2 mb-3 pb-5 text-center">${containerforecast.forecastday[1].day.condition.text} </div>

                  </div>



                </div>
              </div>
    `;
  document.querySelector(".containerRow").innerHTML += cartona;


}
//display third day
function displayThirdDay() {
  var date = new Date(containerforecast.forecastday[2].date).toString()
  var cartona = ` <div class=" col-sm-12 col-lg-4  ">
                <div class="forecastHeader ">
                  <div class="forecastTomorrow py-2 px-2 ">${date.split(" ").slice(0, 1).join(" ")}</div>
                </div>
                <div class="bodyItem3 pt-2">
                  <div class="container">
                    <div class="imgIcon text-center py-3">
                      <img src="https:${containerforecast.forecastday[2].day.condition.icon}" alt="sun">

                    </div>
                    <div class="degree3 pt-3 ">
                      <p>
                      ${containerforecast.forecastday[2].day.avgtemp_c}
                        <sup>o</sup>
                        C
                      </p>
                    </div>
                    <div class="miniDegree3 pb-3 ">
                      <p>
                         ${containerforecast.forecastday[2].day.mintemp_c}
                        <sup>o</sup>

                      </p>
                    </div>

                    <div class="custom3 mb-3 pb-5 text-center">${containerforecast.forecastday[2].day.condition.text}</div>

                  </div>



                </div>
              </div>`;
  document.querySelector(".containerRow").innerHTML += cartona;

}





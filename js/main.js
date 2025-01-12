/*==========================================
TIPOS DE FETCH:

-Then anidado dentro de otro then
fetch(url, headers).then((response) => {
  response.json().then((data) => console.log(data.list));
});

-function flecha
fetch(url, headers)
  .then((response) => response.json())
  .then((data) => console.log(data));

-function con return
fetch(url, headers)
  .then((response) => {
    return response.json();
  })
  .then((data) => console.log(data));


============================================*/

let responseApiBasic = document.querySelector(".response-api-basic");
let responseApiDetails = document.querySelector(".response-api-details");

let btnSubmit = document
  .querySelector("#btn-submit")
  .addEventListener("click", getWeather);

const headers = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "ba9d450c5emshcd20840efdf0dd8p1460f2jsn14b4da0d0478",
  },
};

function getWeather() {
  let city = document.getElementById("inputUser").value;

  let url = `https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric`;
  fetch(url, headers)
    .then((response) => response.json())
    .then((data) => {
      /*container */
      let detailsContainer = document.querySelector(".details-container");
      let container = document.createElement("article");
      container.setAttribute("class", "details-content");
      detailsContainer.appendChild(container);

      let responseApiBasic = document.createElement("div");
      responseApiBasic.setAttribute("class", "response-api-basic");
      container.appendChild(responseApiBasic);

      let responseApiDetails = document.createElement("div");
      responseApiDetails.setAttribute("class", "response-api-details");
      container.appendChild(responseApiDetails);

      let hLine = document.createElement("hr");
      container.appendChild(hLine);

      /*seccion basic*/
      let countryName = document.createElement("h3");
      countryName.innerText = data.list[0].name;
      responseApiBasic.appendChild(countryName);
      let currentTemp = document.createElement("h2");
      currentTemp.innerText = data.list[0].main.temp + "°C";
      responseApiBasic.appendChild(currentTemp);
      let itemWeather = document.createElement("p");
      itemWeather.innerHTML = data.list[0].weather[0].main;
      responseApiBasic.appendChild(itemWeather);

      /*seccion details*/
      let infoWeather = document.createElement("ul");
      responseApiDetails.appendChild(infoWeather);
      let feelsLike = document.createElement("li");
      feelsLike.innerText = "Sensación: " + data.list[0].main.feels_like;
      infoWeather.appendChild(feelsLike);
      let minTemp = document.createElement("li");
      minTemp.innerText = "Mínima: " + data.list[0].main.temp_min;
      infoWeather.appendChild(minTemp);
      let maxTemp = document.createElement("li");
      maxTemp.innerText = "Máxima: " + data.list[0].main.temp_max;
      infoWeather.appendChild(maxTemp);

      /* for (i = 0; i < data.list[0].weather.length; i++) {
        weather.innerHTML =
          "Clima actual: " + data.list[0].weather[i].main + ". ";
      } */
    })
    .catch((err) => console.error("Error: " + err));
}

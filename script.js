//Initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityFiled = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojisField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// adding event listener to the form
form.addEventListener("submit", search);

// default location
let target = "delhi";

//function to fetch data from API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=16e05e7b58b348bc881125533222911&q=${target}
    `;

    const response = await fetch(url);
    const data = await response.json();

    // Destructure
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    // calling update function
    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

//function to update DOM
function updateDom(temperature, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());

  temperatureField.innerText = temperature + "°";
  cityFiled.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
  emojisField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

// function to search the location
function search(e) {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
}

// function to get the name of day
function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "unavailable";
  }
}

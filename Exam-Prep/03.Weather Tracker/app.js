const baseURL = "http://localhost:3030/jsonstore/tasks/";

const loadHistoryButton = document.getElementById("load-history");
const addButton = document.getElementById("add-weather");
const editButton = document.getElementById("edit-weather");

const locationField = document.getElementById("location");
const temperatureField = document.getElementById("temperature");
const dateField = document.getElementById("date");

const historyContainer = document.getElementById("list");

loadHistoryButton.addEventListener("click", getData);
addButton.addEventListener("click", postData);
function getData() {
  fetch(baseURL)
    .then((r) => r.json())
    .then((response) => {
      console.log(response);
      historyContainer.innerHTML = "";
      for (const townObj of Object.values(response)) {
        const container = document.createElement("div");
        container.className = "container";
        container.innerHTML = `
        <div class="container">
            <h2>${townObj.location}</h2>
            <h3>${townObj.date}</h3>
            <h3 id="celsius">${townObj.temperature}</h3>
        </div>`;

        const changeButton = document.createElement('button')
        changeButton.className = "change-btn";
        changeButton.textContent = 'Change'
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";


        const divForButtons = document.createElement("div");
        divForButtons.className = "buttons-container";
        divForButtons.appendChild(changeButton)
        divForButtons.appendChild(deleteButton);

        container.appendChild(divForButtons)
        historyContainer.appendChild(container);
      }
    });
}

function postData() {
    if (locationField.value === '' || temperatureField.value === '' || dateField.value === '') {
        return;
    }
  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({
      location: locationField.value,
      temperature: temperatureField.value,
      date: dateField.value,
    }),
  }).then(() => {
    getData();
    clearInputFields();
  });
}

function clearInputFields() {
  locationField.value = "";
  temperatureField.value = "";
  dateField.value = "";
}

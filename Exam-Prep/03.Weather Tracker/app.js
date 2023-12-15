const baseURL = "http://localhost:3030/jsonstore/tasks/";

const loadHistoryButton = document.getElementById("load-history");
const addButton = document.getElementById("add-weather");
const editButton = document.getElementById("edit-weather");

const locationField = document.getElementById("location");
const temperatureField = document.getElementById("temperature");
const dateField = document.getElementById("date");

const historyContainer = document.getElementById("list");
historyContainer.innerHTML = "";

loadHistoryButton.addEventListener("click", getData);
addButton.addEventListener("click", postData);
editButton.addEventListener("click", editData)

function getData() {
  fetch(baseURL)
    .then((r) => r.json())
    .then((response) => {
      
      historyContainer.innerHTML = ""; 
      for (const townObj of Object.values(response)) {
        const container = document.createElement("div");
        container.className = "container";
        container.setAttribute("data-townid", `${townObj._id}`)
        container.innerHTML = `
            <h2>${townObj.location}</h2>
            <h3>${townObj.date}</h3>
            <h3 id="celsius">${townObj.temperature}</h3>
        `;

        const changeButton = document.createElement('button')
        changeButton.className = "change-btn";
        changeButton.textContent = 'Change'
        changeButton.addEventListener('click', editWeather)
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener('click', deleteData)


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

function editData() {

    const townID = locationField.dataset.townid;

    fetch(baseURL + townID, {
      method: "PUT",
      body: JSON.stringify({
        _id: townID,
        location: locationField.value,
        temperature: temperatureField.value,
        date: dateField.value,
      }),
    })
      .then(getData)
      .then(
        locationField.removeAttribute("data-townid"),
        editButton.setAttribute("disabled", "disabled"),
        addButton.removeAttribute("disabled")
      )
      .then(clearInputFields);
}

function deleteData(e) {
    const deleteButton = e.currentTarget;
    const record = deleteButton.parentNode.parentNode;
    const townID = record.dataset.townid;

    fetch(baseURL + townID, {
      method: "DELETE",
    })
      .then(getData);
}

function editWeather(e){

    const changeButton = e.currentTarget
    const record = changeButton.parentNode.parentNode;
    const townID = record.dataset.townid
    locationField.value = record.children[0].outerText;
    temperatureField.value = record.children[2].outerText;
    dateField.value = record.children[1].outerText;

    locationField.setAttribute("data-townid", townID);

    addButton.setAttribute('disabled', 'disabled')
    editButton.removeAttribute("disabled");
    record.remove();

}

function clearInputFields() {
  locationField.value = "";
  temperatureField.value = "";
  dateField.value = "";
}


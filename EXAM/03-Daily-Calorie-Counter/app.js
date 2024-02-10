const baseURL = "http://localhost:3030/jsonstore/tasks/";

const loadMealsButton = document.getElementById("load-meals");
const addButton = document.getElementById("add-meal");
const editButton = document.getElementById("edit-meal");

const foodField = document.getElementById("food");
const caloriesField = document.getElementById("calories");
const timeField = document.getElementById("time");

const mealsList = document.getElementById("list");
mealsList.innerHTML = "";

loadMealsButton.addEventListener("click", getData);
addButton.addEventListener("click", postData);
editButton.addEventListener("click", editData);

function getData() {
  fetch(baseURL)
    .then((r) => r.json())
    .then((response) => {
      mealsList.innerHTML = "";
      for (const meal of Object.values(response)) {
        console.log(meal);
        const container = document.createElement("div");
        container.className = "meal";
        container.setAttribute("data-mealid", `${meal._id}`);
        container.innerHTML = `
            <h2>${meal.food}</h2>
            <h3>${meal.time}</h3>
            <h3>${meal.calories}</h3>
        `;

        const changeButton = document.createElement("button");
        changeButton.className = "change-meal";
        changeButton.textContent = "Change";
        changeButton.addEventListener("click", editMeal);
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-meal";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteData);

        const divForButtons = document.createElement("div");
        divForButtons.className = "meal-buttons";
        divForButtons.appendChild(changeButton);
        divForButtons.appendChild(deleteButton);

        container.appendChild(divForButtons);
        mealsList.appendChild(container);
      }
    });
}

function postData() {
  if (
    foodField.value === "" ||
    caloriesField.value === "" ||
    timeField.value === ""
  ) {
    return;
  }
  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify({
      food: foodField.value,
      calories: caloriesField.value,
      time: timeField.value,
    }),
  }).then(() => {
    getData();
    clearInputFields();
  });
}

function editData() {
  const mealID = foodField.dataset.mealid;

  fetch(baseURL + mealID, {
    method: "PUT",
    body: JSON.stringify({
      _id: mealID,
      food: foodField.value,
      calories: caloriesField.value,
      time: timeField.value,
    }),
  })
    .then(getData)
    .then(
      foodField.removeAttribute("data-mealid"),
      editButton.setAttribute("disabled", "disabled"),
      addButton.removeAttribute("disabled")
    )
    .then(clearInputFields);
}

function deleteData(e) {
  const deleteButton = e.currentTarget;
  const record = deleteButton.parentNode.parentNode;
  const mealID = record.dataset.mealid;

  fetch(baseURL + mealID, {
    method: "DELETE",
  }).then(getData);
}

function editMeal(e) {
  const changeButton = e.currentTarget;
  const record = changeButton.parentNode.parentNode;
  const mealID = record.dataset.mealid;
  foodField.value = record.children[0].outerText;
  caloriesField.value = record.children[2].outerText;
  timeField.value = record.children[1].outerText;

  foodField.setAttribute("data-mealid", mealID);

  addButton.setAttribute("disabled", "disabled");
  editButton.removeAttribute("disabled");
  record.remove();
}

function clearInputFields() {
  foodField.value = "";
  caloriesField.value = "";
  timeField.value = "";
}

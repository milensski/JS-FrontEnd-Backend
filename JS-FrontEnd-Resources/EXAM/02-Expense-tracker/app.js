window.addEventListener("load", solve);

function solve() {
  const expense = document.getElementById("expense");
  const amount = document.getElementById("amount");
  const date = document.getElementById("date");

  const addButton = document.getElementById("add-btn");


  const expensesList = document.getElementById("expenses-list");

  const deleteButton = document.querySelector("button.btn.delete")
  
  addButton.addEventListener("click", getInputFields);

  deleteButton.addEventListener("click", ()=>{location.reload()})

  function getInputFields(e) {
    if (expense.value === "" || amount.value === "" || date.value === "") {
      return;
    }
    const previewList = document.getElementById("preview-list");

    const liElement = document.createElement("li");
    liElement.className = "expense-item";

    const article = document.createElement("article");

    const expenseParagraph = document.createElement("p");
    expenseParagraph.textContent = `Type: ${expense.value}`;

    const paragraphAmount = document.createElement("p");
    paragraphAmount.textContent = `Amount: ${amount.value}$`;

    const paragraphDate = document.createElement("p");
    paragraphDate.textContent = `Date: ${date.value}`;

    const editButton = document.createElement("button");
    editButton.className = "btn edit";
    editButton.textContent = "edit";
    editButton.addEventListener("click", editSubmision);

    const okButton = document.createElement("button");
    okButton.className = "btn ok";
    okButton.textContent = "ok";
    okButton.addEventListener("click", okSubmission);

    const divForButtons = document.createElement('div')
    divForButtons.className = 'buttons'

    divForButtons.appendChild(editButton)
    divForButtons.appendChild(okButton);

    article.appendChild(expenseParagraph);
    article.appendChild(paragraphAmount);
    article.appendChild(paragraphDate);

    liElement.appendChild(article);
    liElement.appendChild(divForButtons);

    previewList.appendChild(liElement);

    addButton.setAttribute("disabled", "disabled");

    clearInputFields();
  }

  function editSubmision(e) {
    let parentLi = e.target.parentNode.parentNode;
    const previewParagraphs = parentLi.querySelectorAll('article p')

    const expenseTypeValue = previewParagraphs[0].textContent.split(" ")[1]
    const amountValue = previewParagraphs[1].textContent.split(" ")[1].split('$')[0];
    const dateValue = previewParagraphs[2].textContent.split(" ")[1];


    expense.value = expenseTypeValue;
    amount.value = amountValue;
    date.value = dateValue;

    parentLi.remove();
    addButton.removeAttribute("disabled");
  }

  function okSubmission(e) {
    let parentLi = e.target.parentNode.parentNode;
    console.log(parentLi);
    parentLi.querySelector(".buttons").remove();

    expensesList.appendChild(parentLi);
    addButton.removeAttribute("disabled");
  }

  function clearInputFields() {
    expense.value = "";
    amount.value = "";
    date.value = "";
  }
}
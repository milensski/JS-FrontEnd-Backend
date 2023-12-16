window.addEventListener("load", solve);

function solve() {
  const student = document.getElementById("student");
  const university = document.getElementById("university");
  const score = document.getElementById("score");

  const nextButton = document.getElementById("next-btn");

  // const previewList = document.getElementById("preview-list");
  const candidatesList = document.getElementById("candidates-list");

  nextButton.addEventListener("click", getInputFields);

  function getInputFields(e) {
    if (student.value === "" || university.value === "" || score.value === "") {
      return;
    }
    const previewList = document.getElementById("preview-list");

    const liElement = document.createElement("li");
    liElement.className = "application";

    const article = document.createElement("article");

    const headName = document.createElement("h4");
    headName.textContent = student.value;

    const paragraphUniversity = document.createElement("p");
    paragraphUniversity.textContent = `University: ${university.value}`;

    const paragraphScore = document.createElement("p");
    paragraphScore.textContent = `Score: ${score.value}`;

    const editButton = document.createElement("button");
    editButton.className = "action-btn edit";
    editButton.textContent = "edit";
    editButton.addEventListener("click", editSubmision);

    const applyButton = document.createElement("button");
    applyButton.className = "action-btn apply";
    applyButton.textContent = "apply";
    applyButton.addEventListener("click", applySubmission);

    article.appendChild(headName);
    article.appendChild(paragraphUniversity);
    article.appendChild(paragraphScore);

    liElement.appendChild(article);
    liElement.appendChild(editButton);
    liElement.appendChild(applyButton);

    previewList.appendChild(liElement);

    nextButton.setAttribute("disabled", "disabled");

    clearInputFields();
  }

  function editSubmision(e) {
    let parentLi = e.target.parentNode;
    student.value = parentLi.children[0].children[0].textContent;
    university.value =
      parentLi.children[0].children[1].textContent.split(" ")[1];
    score.value = parentLi.children[0].children[2].textContent.split(" ")[1];

    parentLi.remove();
    nextButton.removeAttribute("disabled");
  }

  function applySubmission(e) {
    let parentLi = e.target.parentNode;
    Array.from(parentLi.querySelectorAll("button")).forEach((b) => b.remove());

    candidatesList.appendChild(parentLi);
    nextButton.removeAttribute("disabled");
  }

  function clearInputFields() {
    student.value = "";
    university.value = "";
    score.value = "";
  }
}

window.addEventListener("load", solve);

function solve() {
  const playerName = document.getElementById("player");
  const score = document.getElementById("score");
  const round = document.getElementById("round");

  const addButton = document.getElementById("add-btn");
  const clearButton = document.querySelector(".btn.clear");

  let sureList = document.getElementById("sure-list");
  const scoreboardList = document.getElementById("scoreboard-list");

  addButton.addEventListener("click", () => {
    if (playerName.value === "" || score.value === "" || round.value === "") {
      return;
    }

    const article = document.createElement("article");
    const pName = document.createElement("p");
    const pScore = document.createElement("p");
    const pRound = document.createElement("p");

    const editButton = document.createElement("button");

    editButton.addEventListener("click", editScore);
    const okButton = document.createElement("button");
    okButton.addEventListener("click", spotOn);

    editButton.className = "btn edit";
    editButton.textContent = "edit";
    okButton.className = "btn ok";
    okButton.textContent = "ok";

    const liElement = document.createElement("li");

    pName.textContent = playerName.value;
    pScore.textContent = `Score: ${score.value}`;
    pRound.textContent = `Round: ${round.value}`;

    liElement.className = "dart-item";

    article.appendChild(pName);
    article.appendChild(pScore);
    article.appendChild(pRound);
    liElement.appendChild(article);
    liElement.appendChild(editButton);
    liElement.appendChild(okButton);

    sureList.appendChild(liElement);

    addButton.setAttribute("disabled", "disabled");

    clearInputs(playerName, score, round);

    function editScore() {
      playerName.value = pName.textContent;
      score.value = pScore.textContent.split(" ")[1];
      round.value = pRound.textContent.split(" ")[1];

      liElement.remove();
      addButton.removeAttribute("disabled");
    }

    function spotOn() {
      sureList.removeChild(liElement);
      liElement.removeChild(editButton);
      liElement.removeChild(okButton);
      scoreboardList.appendChild(liElement);
      addButton.removeAttribute("disabled");
    }
  });

  clearButton.addEventListener("click", () => {
    location.reload();
  });

  function clearInputs(inputName, inputScore, inputRound) {
    inputName.value = "";
    inputScore.value = "";
    inputRound.value = "";
  }
}


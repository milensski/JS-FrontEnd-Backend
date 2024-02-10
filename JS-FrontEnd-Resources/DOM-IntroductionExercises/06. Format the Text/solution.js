function solve() {
  let textArea = document.getElementById("input").value.split(".");
  let outputElement = document.getElementById("output");

  outputElement.textContent = "";

  textArea = textArea
  .filter((e) => e.length > 1)
  .map(е => е += ".");

  while (textArea.length > 0) {
    let p = document.createElement("p");

    p.textContent = textArea.splice(0, 3).join("");

    outputElement.appendChild(p);
  }
}

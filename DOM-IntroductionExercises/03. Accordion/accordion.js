function toggle() {
  button = document.getElementsByClassName("button")[0];
  expandedContent = document.getElementById("extra");

  if (button.textContent === "More") {
    expandedContent.style.display = "block";
    button.textContent = "Less";

  } else {
    button.textContent = "More"
    expandedContent.style.display = "none";
  }
}

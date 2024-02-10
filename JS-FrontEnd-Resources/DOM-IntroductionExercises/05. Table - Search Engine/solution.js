function solve() {
  document.querySelector("#searchBtn").addEventListener("click", onClick);

  tableBody = document.querySelectorAll("tbody tr");
  searchInput = document.getElementById("searchField");

  function onClick() {
    for (const element of Array.from(tableBody)) {
      element.setAttribute("class", "");
      if (element.textContent.includes(searchInput.value)) {
        element.setAttribute("class", "select");
      }
    }
    searchInput.value = "";
  }
}

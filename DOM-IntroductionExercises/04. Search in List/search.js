function search() {
   
   townsList = document.getElementById("towns").getElementsByTagName("li")
   searchText = document.getElementById("searchText").value;
   result = document.getElementById("result")
   let countMatches = 0

   for (const element of Array.from(townsList)) {
      element.style.fontWeight = "";
      element.style.textDecoration = "";

      
      if (element.textContent.includes(searchText)) {
         element.style.fontWeight = "bold";
         element.style.textDecoration = "underline";
         countMatches++
      }
   }

   result.textContent = `${countMatches} matches found`

}

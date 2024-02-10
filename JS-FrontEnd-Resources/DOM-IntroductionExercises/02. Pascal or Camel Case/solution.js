function solve() {
  let text = document.getElementById("text").value.toLowerCase();
  const namingConvention = document.getElementById("naming-convention").value;
  const output = document.getElementById("result");

  let result = "";

  if (namingConvention === "Camel Case") {
    text = text.split(" ");
    result = text[0];
    for (let index = 1; index < text.length; index++) {
      const element = text[index];
      result += element[0].toUpperCase() + element.slice(1);
    }
  } else if (namingConvention === "Pascal Case") {
    text = text.split(" ");
    for (let index = 0; index < text.length; index++) {
      const element = text[index];
      result += element[0].toUpperCase() + element.slice(1);
    }
  } else {
    result = "Error!";
  }

  output.innerText = result;
}

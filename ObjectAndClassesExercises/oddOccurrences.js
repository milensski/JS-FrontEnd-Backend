function solve(inputText) {
  words = inputText.split(" ").map((element) => element.toLowerCase());

  wordsCount = {};

  for (const word of words) {
    if (wordsCount.hasOwnProperty(word)) {
      wordsCount[word] += 1;
    } else {
      wordsCount[word] = 1;
    }
  }

  oddArray = [];

  Object.entries(wordsCount).forEach((element) => {
    if (element[1] % 2 != 0) {
      oddArray.push(element[0]);
    }
  });

  console.log(oddArray.join(' '));
}

solve("Java C# Php PHP Java PhP 3 C# 3 1 5 C#");

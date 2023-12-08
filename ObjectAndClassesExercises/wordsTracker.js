function solve(arrayOfWords) {
  let words = arrayOfWords.shift();

  let countedWords = {};

  for (const word of words.split(" ")) {
        countedWords[word] = 0
    for (const lookUpWord of arrayOfWords) {
      if (lookUpWord === word) {
        countedWords[word] += 1
      }
    }
  }

  sortedResult = Object.entries(countedWords).sort((a, b) => b[1] - a[1]);

  sortedResult.forEach((element) => {
    console.log(`${element[0]} - ${element[1]}`);
  });
}

solve([
  "is the",

  "first",
  "sentence",
  "Here",
  "is",

  "another",
  "the",
  "And",
  "finally",
  "the",

  "the",
  "sentence",
]);

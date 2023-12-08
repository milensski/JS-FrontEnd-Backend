function solve(input) {
  let movies = [];

  for (const row of input) {
    if (row.includes("addMovie")) {
      let movieName = row.split("addMovie ")[1];

      let movie = { name: movieName };
      movies.push(movie);
    } else if (row.includes("directedBy")) {
      let [movieName, director] = row.split(" directedBy ");

      let movieObject = movies.find((movie) => movie.name === movieName);

      if (movieObject) {
        movieObject["director"] = director;
      }
    } else if (row.includes("onDate")) {
      let [movieName, date] = row.split(" onDate ");

      let movieObject = movies.find((movie) => movie.name === movieName);

      if (movieObject) {
        movieObject["date"] = date;
      }
    }
  }

  for (const movie of movies) {
    if (movie.name && movie.director && movie.date) {
      console.log(JSON.stringify(movie))
    }
  }

}

solve([
  "addMovie The Avengers",
  "addMovie Superman",
  "The Avengers directedBy Anthony Russo",
  "The Avengers onDate 30.07.2010",
  "Captain America onDate 30.07.2010",
  "Captain America directedBy Joe Russo",
]);

solve([
  "addMovie Fast and Furious",
  "addMovie Godfather",
  "Inception directedBy Christopher Nolan",
  "Godfather directedBy Francis Ford Coppola",
  "Godfather onDate 29.07.2018",
  "Fast and Furious onDate 30.07.2018",
  "Batman onDate 01.08.2018",
  "Fast and Furious directedBy Rob Cohen",
]);

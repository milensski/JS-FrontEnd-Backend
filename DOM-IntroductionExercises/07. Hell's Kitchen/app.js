function solve() {
  document.querySelector("#btnSend").addEventListener("click", onClick);

  function onClick() {
    let textArea = document.querySelector("#inputs textarea").value;

    textArea = JSON.parse(textArea);

    let restaurants = {};

    for (const element of textArea) {
      let [restaurantName, workersInfo] = element.split(" - ");
      if (!restaurants.hasOwnProperty(restaurantName)) {
        restaurants[restaurantName] = {};
      }
      workersDetails = workersInfo.split(", ");
      for (const worker of workersDetails) {
        let [name, salary] = worker.split(" ");
        salary = Number(salary);

        restaurants[restaurantName][name] = salary;
      }
    }

    let bestSalary = 0;
    let avgSalary = 0;
    let bestRestaurant = "";

    for (const restaurant in restaurants) {
      let currentBestSalary = 0;
      let currentAvgSalary = 0;
      let totalSalary = 0;
      for (const salary of Object.values(restaurants[restaurant])) {
        totalSalary += salary;
        if (salary > currentBestSalary) {
          currentBestSalary = salary;
        }
      }

      currentAvgSalary =
        totalSalary / Object.keys(restaurants[restaurant]).length;

      if (currentAvgSalary > avgSalary) {
        avgSalary = currentAvgSalary;
        bestSalary = currentBestSalary;
        bestRestaurant = restaurant;
      }
    }

    const sortedSalaries = Object.entries(restaurants[bestRestaurant]).sort((a,b) => b[1] - a[1]);

    let outputBestRestaurant = document.querySelector("#bestRestaurant p");
    let outputWorkers = document.querySelector("#workers p");

    outputBestRestaurant.textContent = `Name: ${bestRestaurant} Average Salary: ${avgSalary.toFixed(
      2
    )} Best Salary: ${bestSalary.toFixed(2)}`;
    
    let result = ''

    for (const worker of sortedSalaries) {
      result += `Name: ${worker[0]} With Salary: ${worker[1]} `;
    }

    outputWorkers.textContent = result
  }
}

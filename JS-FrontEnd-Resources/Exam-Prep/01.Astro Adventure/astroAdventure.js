function solve(inputArray) {
  const count = inputArray.shift();

  astronauts = {};

  for (let index = 0; index < count; index++) {
    const [name, oxygenLevel, energyReservs] = inputArray.shift().split(" ");

    astronauts[name] = {
      oxygenLevel: Number(oxygenLevel),
      energyReservs: Number(energyReservs),
    };
  }

  let command = inputArray.shift();

  while (command !== "End") {
    command = command.split(" - ");
    const action = command[0];

    if (action === "Explore") {
      const astronautName = command[1];
      const energyNeeded = Number(command[2]);

      if (astronauts[astronautName].energyReservs >= energyNeeded) {
        astronauts[astronautName].energyReservs -= energyNeeded;
        console.log(
          `${astronautName} has successfully explored a new area and now has ${astronauts[astronautName].energyReservs} energy!`
        );
      } else {
        console.log(`${astronautName} does not have enough energy to explore!`);
      }
    } else if (action === "Refuel") {
      const astronautName = command[1];
      const refuelAmount = Number(command[2]);

      const oldEnergy = astronauts[astronautName].energyReservs;
      astronauts[astronautName].energyReservs += refuelAmount;

      if (astronauts[astronautName].energyReservs > 200) {
        astronauts[astronautName].energyReservs = 200;
      }

      const difference = astronauts[astronautName].energyReservs - oldEnergy;

      console.log(`${astronautName} refueled their energy by ${difference}!`);
    } else if (action === "Breathe") {
      const astronautName = command[1];
      const amount = Number(command[2]);

      const oldOxygenLevel = astronauts[astronautName].oxygenLevel;
      astronauts[astronautName].oxygenLevel += amount;

      if (astronauts[astronautName].oxygenLevel > 100) {
        astronauts[astronautName].oxygenLevel = 100;
      }

      const difference = astronauts[astronautName].oxygenLevel - oldOxygenLevel;

      console.log(
        `${astronautName} took a breath and recovered ${difference} oxygen!`
      );
    }

    command = inputArray.shift();
  }

  for (const [name, details] of Object.entries(astronauts)) {
    console.log(
      `Astronaut: ${name}, Oxygen: ${details.oxygenLevel}, Energy: ${details.energyReservs}`
    );
  }
}

solve([
  "4",
  "Alice 60 100",
  "Bob 40 80",
  "Charlie 70 150",
  "Dave 80 180",
  "Explore - Bob - 60",
  "Refuel - Alice - 30",
  "Breathe - Charlie - 50",
  "Refuel - Dave - 40",
  "Explore - Bob - 40",
  "Breathe - Charlie - 30",
  "Explore - Alice - 40",
  "End",
]);

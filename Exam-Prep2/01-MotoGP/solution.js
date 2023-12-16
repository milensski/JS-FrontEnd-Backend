function solve(inputArray){


    count = Number(inputArray.shift())

    const riders = {}

    for (let index = 0; index < count; index++) {
        let [name, fuel, position] = inputArray.shift().split('|')
        riders[name] = {
            fuel: Number(fuel),
            position: Number(position)
        }
    }

    let command = inputArray.shift();

    while (command !== 'Finish') {
        command  = command.split(' - ')
        const action = command[0]

        if (action === "StopForFuel") {
            const rider = command[1]
            const minimuFuel = Number(command[2])
            const changedPosition = Number(command[3])

            if (riders[rider].fuel < minimuFuel) {
                riders[rider].position = changedPosition;
                console.log(
                  `${rider} stopped to refuel but lost his position, now he is ${changedPosition}.`
                );
            } else {
                console.log(`${rider} does not need to stop for fuel!`);
            }

        } else if (action === "Overtaking"){
            const firstRider = command[1]
            const secondRider = command[2]

            if (riders[firstRider].position < riders[secondRider].position) {
                const firstRiderPosition = riders[firstRider].position;
                riders[firstRider].position = riders[secondRider].position;
                riders[secondRider].position = firstRiderPosition

                console.log(`${firstRider} overtook ${secondRider}!`);
            }

        } else if (action === "EngineFail"){
            const rider = command[1];
            const lapsLeft = command[2];

            delete riders[rider]
                
            console.log(
              `${rider} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`
            );

        }

        command = inputArray.shift();

    }

    for (const [name, details] of Object.entries(riders)) {
        console.log(name);
        console.log(`  Final position: ${details.position}`);
    }

}



solve([
  "4",
  "Valentino Rossi|100|1",
  "Marc Marquez|90|3",
  "Jorge Lorenzo|80|4",
  "Johann Zarco|80|2",
  "StopForFuel - Johann Zarco - 90 - 5",
  "Overtaking - Marc Marquez - Jorge Lorenzo",
  "EngineFail - Marc Marquez - 10",
  "Finish",
]);
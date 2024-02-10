function solve(inputArray){

    const count = inputArray.shift();

    cafeteria = {}

    for (let index = 0; index < count; index++) {
        
        let [barista, shift, coffieTypes] = inputArray.shift().split(' ');

        cafeteria[barista] = {
            shift: shift,
            coffieTypes: coffieTypes.split(',')
        }
        
    }

    let command = inputArray.shift();

    while (command !== 'Closed') {
        
        command = command.split(' / ')

        const action = command[0]
        const baristaName = command[1]

        if (action === 'Prepare') {
            const shift = command[2]
            const coffeType = command[3]

            if (
              cafeteria[baristaName].shift === shift &&
              cafeteria[baristaName].coffieTypes.includes(coffeType)
            ) {

                console.log(
                  `${baristaName} has prepared a ${coffeType} for you!`
                );

            } else {
                console.log(
                  `${baristaName} is not available to prepare a ${coffeType}.`
                );
            }

        } else if (action === 'Change Shift') {

            const newShift = command[2]

            cafeteria[baristaName].shift = newShift

            console.log(`${baristaName} has updated his shift to: ${newShift}`);

        } else if (action === 'Learn') {
            
            const newCoffeType = command[2]

            if (cafeteria[baristaName].coffieTypes.includes(newCoffeType)) {
                console.log(
                  `${baristaName} knows how to make ${newCoffeType}.`
                );
            } else {
                cafeteria[baristaName].coffieTypes.push(newCoffeType)
                console.log(
                  `${baristaName} has learned a new coffee type: ${newCoffeType}.`
                );
            }
        }

        command = inputArray.shift();
    }

    for (const [name, details] of Object.entries(cafeteria)) {
        console.log(
          `Barista: ${name}, Shift: ${details.shift}, Drinks: ${details.coffieTypes.join(', ')}`
        );
    }

}


solve([
  "4",
  "Alice day Espresso,Cappuccino",
  "Bob night Latte,Mocha",
  "Carol day Americano,Mocha",
  "David night Espresso",
  "Prepare / Alice / day / Espresso",
  "Change Shift / Bob / day",
  "Learn / Carol / Latte",
  "Prepare / Bob / night / Latte",
  "Learn / David / Cappuccino",
  "Prepare / Carol / day / Cappuccino",
  "Change Shift / Alice / night",
  "Learn / Bob / Mocha",
  "Prepare / David / night / Espresso",
  "Closed",
]);
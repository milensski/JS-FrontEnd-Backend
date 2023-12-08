function solve(inputArray) {
  const parkingLot = [];

  for (const line of inputArray) {
    let [direction, carNumber] = line.split(", ");

    if (direction === "IN") {
      if (!parkingLot.includes(carNumber)) {
        parkingLot.push(carNumber);
      }
    } else if (direction === "OUT") {
      carIndex = parkingLot.indexOf(carNumber);
      if (carIndex !== -1) {
        parkingLot.splice(carIndex, 1);
      }
    }
  }

  if (parkingLot.length === 0) {
    console.log("Parking Lot is Empty");
  } else {
    sortedParkingLot = parkingLot.sort((a, b) => a.localeCompare(b, {numeric: true}));
    console.log(sortedParkingLot.join('\n'));
  }
}

solve([
  "IN, CA2844AA",
  "IN, CA1234TA",
  "OUT, CA2844AA",
  "IN, CA9999TT",
  "IN, CA2866HI",
  "OUT, CA1234TA",
  "IN, CA2844AA",
  "OUT, CA2866HI",
  "IN, CA9876HH",
  "IN, CA2822UU",
]);

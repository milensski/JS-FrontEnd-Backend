function solve(input) {
  heroes = [];

  for (const row of input) {
    let [heroName, heroLevel, items] = row.split(" / ");

    hero = {
      name: heroName,
      level: Number(heroLevel),
      items: items,
    };

    heroes.push(hero);
  }

  sortedHeroes = heroes.sort((a, b) => a.level - b.level);

  sortedHeroes.forEach((element) => {
    console.log(`Hero: ${element.name}`);
    console.log(`level => ${element.level}`);
    console.log(`items => ${element.items}`);
  });
}

solve([
  "Isacc / 25 / Apple, GravityGun",
  "Derek / 12 / BarrelVest, DestructionSword",
  "Hes / 1 / Desolator, Sentinel, Antara",
]);

solve([
  "Batman / 2 / Banana, Gun",
  "Superman / 18 / Sword",
  "Poppy / 28 / Sentinel, Antara",
]);

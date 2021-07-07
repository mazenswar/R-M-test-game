// Three categories of players
// 1. Gold
// 2. Silver
// 3. Bronze

// Getting a random integer between two values
// This example returns a random integer between the specified values. The value is no lower than min (or the next integer greater than min if min isn't an integer), and is less than (but not equal to) max.
// ATTRIBUTES

const baseValue = 70;
// character name and adjustment value for stats
const mainCharacters = {
  'Rick Sanchez': 35,
  'Morty Smith': 10,
  'Summer Smith': 9,
  'Beth Smith': 9,
  'Jerry Smith': -50,
};

const names = ['Rick Sanchez', 'Morty Smith', 'Beth Smith', 'Summer Smith'];
const firstNames = names.map((name) => name.split(' ')[0]);
/////////////////
function randomNumberFromRange(arr) {
  return Math.random() * (arr[1] - arr[0]) + arr[0];
} //The maximum
// LEVEL MAKER

export default function makeLevel(player) {
  // initial data
  const data = { ...player, level: null };
  // adding level (gold, silver, bronze)
  const gold = names.some((n) => n === data.name);
  const silver = firstNames.some((n) => data.name.includes(n));
  // adding attribute
  let range = [1, 1.2];
  if (gold) {
    data.level = 'gold';
    const val = baseValue + (baseValue * 20) / 100 + mainCharacters[data.name];
    data.attack = Math.floor(val * randomNumberFromRange(range));
    data.defense = Math.floor(val * randomNumberFromRange(range));
    data.charisma = Math.floor(val * randomNumberFromRange([1, 1.3]));

    data.overall = Math.floor((data.attack + data.defense + data.charisma) / 3);
    return data;
  }
  if (silver) {
    data.level = 'silver';
    const val =
      baseValue + (baseValue * 10) / 100 + randomNumberFromRange([1, 7]);
    data.attack = Math.floor(val * randomNumberFromRange(range));
    data.defense = Math.floor(val * randomNumberFromRange(range));
    data.charisma = Math.floor(val * randomNumberFromRange(range)) - 5;
    data.overall = Math.floor((data.attack + data.defense + data.charisma) / 3);
    return data;
  }
  data.level = 'bronze';
  const val =
    baseValue + (baseValue * 9) / 100 + randomNumberFromRange([5, 15]);
  data.attack = Math.floor(val * randomNumberFromRange(range));
  data.defense = Math.floor(val * randomNumberFromRange(range));
  data.charisma = Math.floor(val * randomNumberFromRange(range)) - 10;
  if (data.name === 'Jerry Smith') {
    const offset = 25;
    data.attack -= offset;
    data.defense -= offset;
    data.charisma = Math.floor(val - offset);
  }
  data.overall = Math.floor((data.attack + data.defense + data.charisma) / 3);
  return data;
}

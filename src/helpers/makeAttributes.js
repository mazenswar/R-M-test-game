const baseValue = 50;
// character name and adjustment value for stats
const mainCharacters = {
  'Rick Sanchez': 10,
  'Morty Smith': 8,
  'Summer Smith': 7,
  'Beth Smith': 7,
  'Jerry Smith': -5,
};

function generateCharisma(player) {
  // offset by 50
  const appearancePercentage =
    Math.floor((player.episode.length / 41) * 100) + 50;
  let charisma = appearancePercentage;
  if (player.status === 'alive') charisma += 5;
  if (player.episode.length > 5) charisma += 5;
  if (player.species === 'Alien') charisma += 15;
  if (player.origin.name === 'Earth') charisma += 15;
  return charisma;
}

function generateAttackValue(player) {
  let charisma = generateCharisma(player);
  let attack = baseValue + charisma * 0.75;
  if (player.origin === 'unknown') attack += 25;
  if (player.origin === 'unknown') attack += 25;
  if (player.name.includes('Rick') && player.name !== 'Rick Sanchez')
    attack += 25;
  if (player.name.includes('Morty') && player.name !== 'Morty Smith')
    attack += 20;
  if (player.name.includes('Summer') && player.name !== 'Summer Smith')
    attack += 15;
  if (player.name.includes('Beth') && player.name !== 'Beth Smith')
    attack += 15;
  for (let key in mainCharacters) {
    if (player.name === key) attack += mainCharacters[key];
  }

  return attack;
}
function generateDefenseValue(player) {
  let charisma = generateCharisma(player);
  let defense = baseValue + charisma * 0.75;
  if (player.origin === 'unknown') defense += 25;
  if (player.name.includes('Rick') && player.name !== 'Rick Sanchez')
    defense += 25;
  if (player.name.includes('Morty') && player.name !== 'Morty Smith')
    defense += 20;
  if (player.name.includes('Summer') && player.name !== 'Summer Smith')
    defense += 15;
  if (player.name.includes('Beth') && player.name !== 'Beth Smith')
    defense += 15;
  for (let key in mainCharacters) {
    if (player.name === key) defense += mainCharacters[key];
  }
  if (player.name === 'Jerry Smith') defense -= 50;
  return defense;
}

function attributes(player) {
  let color = "bronze"
  let attr = {
    charisma: generateCharisma(player),
    attack: generateAttackValue(player),
    defense: generateDefenseValue(player)
  }
  const attrTotal =  attr["charisma"] + attr["attack"] + attr["defense"];
  if(attrTotal > 250) color = "silver";
  if (Object.keys(mainCharacters).some(p => p === player.name)) color = 'gold';
  if(player.name === "Rick Sanchez") color = 'black';
  if(player.name === "Jerry Smith") color = 'green';
  return {
    ...attr,
    cardColor: color
  };

}

function makeAttributes(player) {
  const attr = {
    ...player,
    ...attributes(player)
  };

  return attr;
}

export default makeAttributes;

// //"id": 1,
//       "name": "Rick Sanchez",
//       "status": "Alive",
//       "species": "Human",
//       "type": "",
//       "gender": "Male",
//       "origin": {
//         "name": "Earth (C-137)",
//         "url": "https://rickandmortyapi.com/api/location/1"
//       },
//       "location": {
//         "name": "Earth (Replacement Dimension)",
//         "url": "https://rickandmortyapi.com/api/location/20"
//       },
//       "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",

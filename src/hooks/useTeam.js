const useTeam = (teamArr, formationObj) => {
  function formationValue() {
    const formation = {
      defense: 0,
      midfield: 0,
      attack: 0,
    };
    let array = Object.entries(formationObj);
    array.forEach((arr) => {
      if (arr[1].left !== null) formation[arr[0]] += 1;
      if (arr[1].middle !== null) formation[arr[0]] += 1;
      if (arr[1].right !== null) formation[arr[0]] += 1;
    });
    return formation;
  }
  function teamChemistry() {
    // total charisma
    return (
      teamArr.reduce((sum, player) => sum + player.charisma, 0) / teamArr.length
    );
  }

  /// Attack
  function attackValue() {
    const formation = formationValue();
    const totalAttackValue = teamArr.reduce(
      (sum, player) => (sum += player.attack),
      0
    );
    return (totalAttackValue * (formation.midfield + formation.attack)) / 10;
  }
  // Defense
  function defenseValue() {
    const formation = formationValue();
    const totalDefenseValue = teamArr.reduce(
      (sum, player) => (sum += player.defense),
      0
    );
    if (formation.defense === 0) {
      return 50;
    }
    return (totalDefenseValue * (formation.defense + formation.midfield)) / 10;
  }

  return [defenseValue, attackValue, teamChemistry, formationValue];
};

export default useTeam;

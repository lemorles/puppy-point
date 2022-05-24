export const countRepit = (array) => {
  // eslint-disable-next-line no-sequences
  return array.reduce((a, d) => (a[d] ? (a[d] += 1) : (a[d] = 1), a), {});
};
export const ramdonColors = (num) => {
  const colors = [];
  const generateCharacter = () => {
    const characters = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    const number = (Math.random() * 15).toFixed(0);
    return characters[number];
  };
  const colourHex = () => {
    let colour = "";
    for (let i = 0; i < 6; i++) {
      colour = colour + generateCharacter();
    }
    return "#" + colour;
  };
  for (let i = 0; i < num; i++) {
    colors.push(colourHex());
  }
  return colors;
};

// utils/ColorTrait.js
export const getRandomColor = () => {
  const colors = [
    '#f45151',
    '#7854da',
    '#f2ba21',
    '#2C71F5',
    '#565656',
    '#222222',
    '#3b9f33',
    '#199f99',
    '#d958bb',
    '#CC14DB',
    '#08DB72',
    '#DBDB08',
    '#55B3E5',
    '#F08637',
    '#A34E58',
    '#4E51A3',
    '#AC9556',
    '#6487B7',
    '#566FF4',
    '#F58CA8',
    '#95B1ED'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
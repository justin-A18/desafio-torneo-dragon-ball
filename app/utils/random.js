export const getRandomIntBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const testProbability = (probabilityPercentage) => {
  return Math.random() * 100 < probabilityPercentage;
};

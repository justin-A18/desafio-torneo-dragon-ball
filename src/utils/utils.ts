export const getRandomIntBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const testProbability = (probabilityPercentage: number): boolean => {
  return Math.random() * 100 < probabilityPercentage;
};

export const applyPercentageToDamage = (
  damage: number,
  percentage: number
): number => {
  return Math.round(damage * (percentage / 100));
};

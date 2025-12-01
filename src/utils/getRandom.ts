export const getRandom = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

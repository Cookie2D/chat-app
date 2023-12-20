import { ColorsEnum } from 'src/const/colors/colorsEnum';

export const getRandomColor = (): string => {
  const colorKeys = Object.keys(ColorsEnum) as (keyof typeof ColorsEnum)[];
  const randomColorKey =
    colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return ColorsEnum[randomColorKey];
};

const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min) + min);

export default generateRandomNumber;

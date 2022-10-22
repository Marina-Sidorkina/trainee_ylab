// Генерирует случайное число в пределах максимального и минимального значения (min, max)
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

// Генерирует случайные координаты с учетом ширины и высоты канваса
export default function createCoordinates(canvas) {
  const displayWidth  = Math.floor(canvas.clientWidth);
  //const displayHeight = Math.floor(canvas.clientHeight);

  return {
   x: generateRandomNumber(0, displayWidth),
   y: generateRandomNumber(0, 100),
  }
}

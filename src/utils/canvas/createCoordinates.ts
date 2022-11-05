// Генерирует случайные координаты с учетом ширины и высоты канваса
import generateRandomNumber from "@src/utils/generateRandomNumber";

export default function createCoordinates(canvas: HTMLCanvasElement | null) {
  const displayWidth  = Math.floor((canvas as HTMLCanvasElement).clientWidth);
  //const displayHeight = Math.floor(canvas.clientHeight);

  return {
   x: generateRandomNumber(0, displayWidth),
   y: generateRandomNumber(0, 100),
  }
}

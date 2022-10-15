const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

export default function createCoordinates(canvas) {
  const realToCSSPixels = window.devicePixelRatio;
  const displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

   return {
     x: generateRandomNumber(0, displayWidth),
     y: generateRandomNumber(0, displayHeight),
   }
}

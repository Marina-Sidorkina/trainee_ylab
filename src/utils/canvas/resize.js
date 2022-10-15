export default function resize(canvas) {
  const realToCSSPixels = window.devicePixelRatio;
  // получаем размер HTML-элемента canvas
  const displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // проверяем, отличается ли размер canvas
  if (canvas.width  !== displayWidth || canvas.height !== displayHeight) {
    // подгоняем размер буфера отрисовки под размер HTML-элемента
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}

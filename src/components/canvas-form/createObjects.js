// Отношение разрешения дисплея текущего устройства в физических пикселях
// к разрешению в логических (CSS) пикселях
const pxl = window.devicePixelRatio;

// Объект с функциями создания фигур на канвасе
const options = {
  // Квадрат (закрашенный)
  fillRectangle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.fillRect (x, y, 100 * pxl, 100 * pxl);
  },
  // Квадрат (контур)
  strokeRectangle: (ctx, rgba, x, y) => {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, 150 * pxl, 150 * pxl);
  },
  // Круг
  fillCircle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.arc(x,y,50 * pxl,0,Math.PI*2,true);
    ctx.fill();
  },
  // Окружность
  strokeCircle: (ctx, rgba, x, y) => {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y,90 * pxl,0,Math.PI*2,true);
    ctx.stroke();
  },
  // Треугольник (закрашенный)
  fillTriangle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + 100,y + 100);
    ctx.lineTo(x + 100, y);
    ctx.fill();
  },
  // Треугольник (контур)
  strokeTriangle: (ctx, rgba, x, y) => {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 250, y + 250);
    ctx.lineTo(x + 250, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// Вызов одной из функций отрисовки фигур на канвасе в соответствии с переданными данными
export default function createObjects(ctx, {type, rgba, x, y}, movedY, movedX, offsetY, offsetX) {
  const newValueY = y - offsetY;
  const newValueX = x - offsetX;
  options[type](ctx, rgba, newValueX - (movedX * pxl), newValueY - (movedY * pxl));
}

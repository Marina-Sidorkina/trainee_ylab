// Отношение разрешения дисплея текущего устройства в физических пикселях
// к разрешению в логических (CSS) пикселях
const pxl = window.devicePixelRatio;

// Объект с функциями создания фигур на канвасе
const options = {
  // Квадрат (закрашенный)
  fillRectangle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    const width = 100 * pxl;
    const height = 100 * pxl;
    ctx.fillStyle = rgba;
    ctx.scale(scale, scale);
    ctx.fillRect (x, y, width, height);
    ctx.restore();
  },
  // Квадрат (контур)
  strokeRectangle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    const width = 150 * pxl;
    const height = 150 * pxl;
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.scale(scale, scale);
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  },
  // Круг
  fillCircle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    const radius = 50 * pxl;
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.scale(scale, scale);
    ctx.arc(x,y,radius,0,Math.PI*2,true);
    ctx.fill();
    ctx.restore();
  },
  // Окружность
  strokeCircle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    const radius = 90 * pxl;
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.scale(scale, scale);
    ctx.arc(x, y, radius,0,Math.PI*2,true);
    ctx.stroke();
    ctx.restore();
  },
  // Треугольник (закрашенный)
  fillTriangle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    ctx.fillStyle = rgba;
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + 100, y);
    ctx.lineTo(x + 100, y - 100);
    ctx.fill();
    ctx.restore();
  },
  // Треугольник (контур)
  strokeTriangle: (ctx, rgba, x, y, scale) => {
    ctx.save();
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 250, y);
    ctx.lineTo(x + 250, y - 250);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.restore();
  }
}

// Вызов одной из функций отрисовки фигур на канвасе в соответствии с переданными данными
export default function createObjects(ctx, {type, rgba, x, y, offsetX, offsetY}, movedY, movedX, scale) {
  const newValueY = y - offsetY;
  const newValueX = x - offsetX;
  options[type](ctx, rgba, newValueX - (movedX * pxl), newValueY - (movedY * pxl), scale);
}

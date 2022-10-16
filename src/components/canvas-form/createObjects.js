const pxl = window.devicePixelRatio;

const options = {
  fillRectangle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.fillRect (x, y, 100 * pxl, 100 * pxl);
  },
  strokeRectangle: (ctx, rgba, x, y) => {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, 150 * pxl, 150 * pxl);
  },
  fillCircle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.arc(x,y,50 * pxl,0,Math.PI*2,true);
    ctx.fill();
  },
  strokeCircle: (ctx, rgba, x, y) => {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y,90 * pxl,0,Math.PI*2,true);
    ctx.stroke();
  },
  fillTriangle: (ctx, rgba, x, y) => {
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + 100,y + 100);
    ctx.lineTo(x + 100, y);
    ctx.fill();
  },
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

export default function createObjects(ctx, {type, rgba, x, y}, movedY, movedX, offsetY, offsetX) {
  const newValueY = y - offsetY;
  const newValueX = x - offsetX;
  options[type](ctx, rgba, newValueX - (movedX * pxl), newValueY - (movedY * pxl));
}

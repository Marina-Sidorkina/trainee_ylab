export default function checkFall(type, y, check) {
  const pxl = window.devicePixelRatio;

  const canvas = document.querySelector('canvas');

  if (type === 'fillRectangle') {
    if ((y - check) + (100 * pxl) < Math.floor(canvas.clientHeight * pxl)) {
      return check;
    } else {
      return -(Math.floor(canvas.clientHeight * pxl) - y) + 100 * pxl;
    }
  }

  if (type === 'strokeRectangle') {
   if ((y - check) + (150 * pxl) < Math.floor(canvas.clientHeight * pxl)) {
     return check;
   } else {
     return -(Math.floor(canvas.clientHeight * pxl) - y) + 150 * pxl;
   }
  }

  if (type === 'fillTriangle' || type === 'strokeTriangle') {
    if ((y - check) < Math.floor(canvas.clientHeight * pxl)) {
      return check;
    } else {
      return -(Math.floor(canvas.clientHeight * pxl) - y);
    }
  }

  if (type === 'fillCircle') {
    if ((y - check) + (50 * pxl) < Math.floor(canvas.clientHeight * pxl)) {
      return check;
    } else {
      return -(Math.floor(canvas.clientHeight * pxl) - y) + 50 * pxl;
    }
  }

  if (type === 'strokeCircle') {
    if ((y - check) + (90 * pxl) < Math.floor(canvas.clientHeight * pxl)) {
      return check;
    } else {
      return -(Math.floor(canvas.clientHeight * pxl) - y) + 90 * pxl;
    }
  }
}

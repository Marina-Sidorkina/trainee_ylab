import * as leaves from '../../components/canvas-oop/graphics/img';
import leaf1 from "@src/components/canvas-oop/graphics/img/leave1.png";
import leaf2 from "@src/components/canvas-oop/graphics/img/leave2.png";
import leaf3 from "@src/components/canvas-oop/graphics/img/leave3.png";
import leaf4 from "@src/components/canvas-oop/graphics/img/leave4.png";
import leaf5 from "@src/components/canvas-oop/graphics/img/leave5.png";

const addImg = (src, id, width, height, element) => {
  const img = document.createElement('img');
  img.src = src;
  img.width = width;
  img.height = height;
  img.id = id;
  element.appendChild(img);
}

export const addImgElements = () => {
  const container = document.createElement('div');
  container.id = 'canvas-images';
  container.style.width = '0';
  container.style.height = '0';
  container.style.overflow = 'hidden';
  const params = [
    { width: 92, height: 97, src:  leaves['leaf1'], id: 'leaf1'},
    { width: 89, height: 91, src:  leaves['leaf2'], id: 'leaf2' },
    { width: 47, height: 50, src:  leaves['leaf3'], id: 'leaf3' },
    { width: 40, height: 50, src:  leaves['leaf4'], id: 'leaf4' },
    { width: 47, height: 50, src:  leaves['leaf5'], id: 'leaf5' },
  ]

  params.forEach(item => {
    addImg(item.src, item.id, item.width, item.height, container);
  });

  document.body.appendChild(container);
}

export const removeImgElements = () => {
  const container = document.getElementById('canvas-images');
  document.body.removeChild(container);
}

import FillRectangle from "@src/components/canvas-oop/graphics/figures/fill-rectangle";
import StrokeRectangle from "@src/components/canvas-oop/graphics/figures/stroke-rectangle";
import FillCircle from "@src/components/canvas-oop/graphics/figures/fill-circle";
import StrokeCircle from "@src/components/canvas-oop/graphics/figures/stroke-circle";
import FillTriangle from "@src/components/canvas-oop/graphics/figures/fill-triangle";
import StrokeTriangle from "@src/components/canvas-oop/graphics/figures/stroke-triange";

class Graphics {

  constructor() {
    this.elements = [];

    this.metrics = {
      zoom: 1,
      scrollX: 0,
      scrollY: 0
    }
    this.action = {};
    this.needDraw = true;
    this.pxl = window.devicePixelRatio;
  }

  /**
   *
   * @param root {HTMLElement}
   */
  mount(root) {
    this.root = root;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', {alpha: false});
    this.root.appendChild(this.canvas);
    this.bottom = Math.floor(this.canvas.clientHeight * this.pxl)

    this.needDraw = true;
    this.resize();
    this.draw();

    window.addEventListener('resize', this.resize);
  }

  unmount() {
    this.root.removeChild(this.canvas);
  }

  resize = () => {
    const realToCSSPixels = window.devicePixelRatio;
    // получаем размер HTML-элемента canvas
    const displayWidth  = Math.floor(this.canvas.clientWidth  * realToCSSPixels);
    const displayHeight = Math.floor(this.canvas.clientHeight * realToCSSPixels);

    // проверяем, отличается ли размер canvas
    if (this.canvas.width  !== displayWidth || this.canvas.height !== displayHeight) {
      // подгоняем размер буфера отрисовки под размер HTML-элемента
      this.canvas.width  = displayWidth;
      this.canvas.height = displayHeight;
    }
  }

  addElement({type, x, y, color}) {
    if (type === 'fillRectangle') this.elements = [...this.elements, new FillRectangle({x, y, color})];
    if (type === 'strokeRectangle') this.elements = [...this.elements, new StrokeRectangle({x, y, color})];
    if (type === 'fillCircle') this.elements = [...this.elements, new FillCircle({x, y, color})];
    if (type === 'strokeCircle') this.elements = [...this.elements, new StrokeCircle({x, y, color})];
    if (type === 'fillTriangle') this.elements = [...this.elements, new FillTriangle({x, y, color})];
    if (type === 'strokeTriangle') this.elements = [...this.elements, new StrokeTriangle({x, y, color})];
  }

  resetElements() {
    this.elements = [];
  }

  draw = () => {
    if (this.needDraw) {
      const time = performance.now();

      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      for (const element of this.elements) {
        element.animate(time, this.bottom);
        element.draw(this.ctx, this.metrics);
      }
    }
    requestAnimationFrame(this.draw);
  }
}

export default Graphics;

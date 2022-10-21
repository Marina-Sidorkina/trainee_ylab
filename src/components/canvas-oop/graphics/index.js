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
      scale: 1,
      scrollY: 0,
    }

    this.action = {};
    this.needAnimation = true;
    this.pxl = window.devicePixelRatio;
    this.timer = null;
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

    this.needAnimation = true;
    this.resize();
    this.draw();

    window.addEventListener('resize', this.resize);
    this.canvas.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    this.canvas.addEventListener('mousewheel', this.onMouseWheel);
  }

  unmount() {
    window.removeEventListener('resize', this.resize);
    this.canvas.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.canvas.removeEventListener('mousewheel', this.onMouseWheel);
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

  reset() {
    this.elements = [];
    this.metrics = {
      scale: 1,
      scrollY: 0,
    }
    this.action = {};
    this.needAnimation = true;
    this.timer = null;
  }

  onMouseDown = (evt) => {
    this.action = {
      name: 'mouseMove',
      startY: evt.clientY,
      startX: evt.clientX,
      scrollX: this.metrics.scrollX,
      scrollY: this.metrics.scrollY,
    }
  }

  onMouseMove = (evt) => {
    if (this.action.name === 'mouseMove') {
      this.needAnimation = false;
      this.action.active = true;
      this.action.scrollX = this.action.startX - evt.clientX;
      this.action.scrollY = this.action.startY - evt.clientY;
      this.action.startY =  evt.clientY;
      this.action.startX = evt.clientX;
    }
  }

  onMouseUp = () => {
    this.action.name = null;
    this.action.active = false;
    this.action.scrollX = null;
    this.action.scrollY = null;
    this.action.startY =  null;
    this.action.startX = null;
    this.needAnimation = true;
  }

  onMouseWheel = (evt) => {
    if (evt.shiftKey) {
      this.scale(evt);
    } else {
      this.scroll(evt)
    }
  }

  scale = (evt) => {
    let delta;
    if (evt.deltaY > 0) delta = this.metrics.scale >= 2 ? this.metrics.scale : this.metrics.scale + 0.1;
    if (evt.deltaY <= 0)  delta = this.metrics.scale <= 1 ? this.metrics.scale : this.metrics.scale - 0.1;
    this.metrics.scale = delta;
    this.needAnimation = true;
  }

  scroll = (evt) => {
    this.needAnimation = false;
    this.action.name = 'scroll';

    if (evt.deltaY > 0) this.metrics.scrollY = 7;
    if (evt.deltaY < 0) this.metrics.scrollY = -7;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.needAnimation = true;
      this.action.name = null;
    }, 100);
  }

  draw = () => {
    const time = performance.now();

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (const element of this.elements) {
      if (this.needAnimation) element.animate(time, this.bottom, this.metrics);
      element.draw(this.ctx, this.metrics, this.action);
    }

    requestAnimationFrame(this.draw);
  }
}

export default Graphics;

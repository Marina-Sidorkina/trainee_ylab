import FillRectangle from "@src/components/canvas-oop/graphics/figures/fill-rectangle";
import StrokeRectangle from "@src/components/canvas-oop/graphics/figures/stroke-rectangle";
import FillCircle from "@src/components/canvas-oop/graphics/figures/fill-circle";
import StrokeCircle from "@src/components/canvas-oop/graphics/figures/stroke-circle";
import FillTriangle from "@src/components/canvas-oop/graphics/figures/fill-triangle";
import StrokeTriangle from "@src/components/canvas-oop/graphics/figures/stroke-triange";

class Graphics {

  constructor(updateInputStoreData) {
    this.elements = [];

    this.metrics = {
      scrollY: 0,
      scale: 1,
      scaleScrollX: 0,
      scaleScrollY: 0,
    }

    this.action = {};
    this.needAnimation = true;
    this.pxl = window.devicePixelRatio;
    this.timer = null;
    this.updateFigureStoreData = updateInputStoreData;
  }

  /**
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
    this.reset();
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
    this.bottom = Math.floor(this.canvas.clientHeight * this.pxl);
  }

  /**
   * Добавление новой фигуры
   * @param type {string} Тип фигуры, которую нужно создать
   * @param x {number} Координата x фигуры, которую нужно создать
   * @param y {number} Координата y фигуры, которую нужно создать
   * @param color {string} Цвет фигуры, которую нужно создать
   * @param index {number} Индекс фигуры, которую нужно создать
   */
  addElement({type, x, y, color}, index) {
    if (type === 'fillRectangle') this.elements = [...this.elements, new FillRectangle({x, y, color}, index, this.updateFigureStoreData)];
    if (type === 'strokeRectangle') this.elements = [...this.elements, new StrokeRectangle({x, y, color}, index, this.updateFigureStoreData)];
    if (type === 'fillCircle') this.elements = [...this.elements, new FillCircle({x, y, color}, index, this.updateFigureStoreData)];
    if (type === 'strokeCircle') this.elements = [...this.elements, new StrokeCircle({x, y, color}, index, this.updateFigureStoreData)];
    if (type === 'fillTriangle') this.elements = [...this.elements, new FillTriangle({x, y, color}, index, this.updateFigureStoreData)];
    if (type === 'strokeTriangle') this.elements = [...this.elements, new StrokeTriangle({x, y, color}, index, this.updateFigureStoreData)];
  }

  /**
   * Сброс значений
   */
  reset() {
    this.elements = [];
    this.metrics = {
      scrollY: 0,
      scale: 1,
      scaleScrollX: 0,
      scaleScrollY: 0,
    }
    this.action = {};
    this.needAnimation = true;
    this.timer = null;
  }

  /**
   * Обработка события нажатия кнопки мыши
   * @param evt {MouseEvent}
   */
  onMouseDown = (evt) => {
    this.action = {
      name: 'mouseMove',
      startY: evt.clientY,
      startX: evt.clientX,
      scrollX: this.metrics.scrollX,
      scrollY: this.metrics.scrollY,
      clickX: evt.offsetX * this.pxl,
      clickY: evt.offsetY * this.pxl,
      click: true,
    }
    this.checkElementCoordinates();
  }

  /**
   * Обработка события передвижения курсора (мыши)
   * @param evt {MouseEvent}
   */
  onMouseMove = (evt) => {
    if (this.action.name === 'mouseMove') {
      this.action.active = true;
      this.action.scrollX = this.action.startX - evt.clientX;
      this.action.scrollY = this.action.startY - evt.clientY;
      this.action.startY =  evt.clientY;
      this.action.startX = evt.clientX;
    }
  }

  /**
   * Обработка события отпускания кнопки мыши
   */
  onMouseUp = () => {
    if (this.action.active) this.action.index = -1;
    this.action.name = null;
    this.action.active = false;
    this.action.scrollX = null;
    this.action.scrollY = null;
    this.action.startY =  null;
    this.action.startX = null;
    this.needAnimation = true;
  }

  /**
   * Обработка события прокручивания колесика мыши
   * @param evt {MouseEvent}
   */
  onMouseWheel = (evt) => {
    if (evt.shiftKey) {
      this.scale(evt,  {center: {x: evt.offsetX, y: evt.offsetY}});
    } else {
      this.scroll(evt)
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.needAnimation = true;
      this.action.name = null;
    }, 100);
  }

  /**
   * Обработка масштабирования
   * @param evt {MouseEvent}
   * @param center {Object}
   */
  scale = (evt, {center}) => {
    this.needAnimation = false;
    this.action.name = 'scale';
    let delta;

    if (evt.deltaY > 0) delta = this.metrics.scale >= 5 ? 0 : 0.1;
    if (evt.deltaY <= 0)  delta = this.metrics.scale <= 1 ? 0 : - 0.1;

    this.metrics.scale += delta;

    const centerNew = {
      x: center.x * this.metrics.scale,
      y: center.y * this.metrics.scale
    }

    this.metrics.scaleScrollX = this.metrics.scale === 1 ? 0 : centerNew.x - center.x;
    this.metrics.scaleScrollY = this.metrics.scale === 1 ? 0 : centerNew.y - center.y;
  }

  /**
   * Обработка скролла
   * @param evt {MouseEvent}
   */
  scroll = (evt) => {
    this.needAnimation = false;
    this.action.name = 'scroll';

    if (evt.deltaY > 0) this.metrics.scrollY = 7;
    if (evt.deltaY < 0) this.metrics.scrollY = -7;
  }

  /**
   * Проверка, попадает ли курсор мыши по какому-либо из элементов
   * Запись индекса последнего подходящего элемента или -1
   */
  checkElementCoordinates() {
    const check = this.elements
                    .map(item => item.checkClick({x: this.action.clickX, y: this.action.clickY}, this.metrics));

    this.action.index = check.lastIndexOf(true);
    this.action.follow = check.lastIndexOf(true);
  }

  /**
   * Изменение координат выбранного элемента
   * @param x {number}
   * @param y {number}
   */
  changeFigureCoordinates(x, y) {
    if (this.elements[this.action.index]) {
      this.elements[this.action.index].changeCoordinates({x, y});
      this.needAnimation = true;
      this.action.index = -1;
    }
  }

  /**
   * Отрисовка всех элементов
   */
  draw = () => {
    const time = performance.now();
    this.ctx.save();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(-this.metrics.scaleScrollX  * this.pxl, -this.metrics.scaleScrollY  * this.pxl);
    this.ctx.scale(this.metrics.scale, this.metrics.scale);

    for (const element of this.elements) {
      this.action.check = this.needAnimation && this.action.index !== element.index;

      if (this.action.check) element.animate(time, this.bottom, this.metrics);

      if (!element.checkVisibility()) element.draw(this.ctx, this.metrics, this.action);
    }

    this.ctx.restore();
    requestAnimationFrame(this.draw);
  }
}

export default Graphics;

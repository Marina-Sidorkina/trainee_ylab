class Base {
  pxl: number;
  x: number;
  y: number;
  color: string;
  a: number;
  index: string;
  time: number;
  bottomOffset: number;
  updateFigureStoreData: Function;
  follow: boolean;

  constructor(value: {x: number; y: number; color: string; type?: string; mod?: number}, index: string, updateFigureStoreData: Function) {
    this.pxl = window.devicePixelRatio;
    this.x = value.x * this.pxl;
    this.y = value.y * this.pxl;
    this.color = value.color;
    this.a = 9.8;
    this.index = index;
    this.time = performance.now();
    this.bottomOffset = 0;
    this.updateFigureStoreData = updateFigureStoreData;
    this.follow = false;
  }

  /**
   * Изменение координат фигуры
   * @param value {object}
   */
  changeCoordinates(value: {x: number; y: number}) {
    this.x = value.x * this.pxl;
    this.y = value.y * this.pxl;
  }

  /**
   * Обработка анимации
   * @param time {number}
   * @param bottom {number}
   */
  animate(time: number, bottom: number){
    const dt = (time - this.time) / 1000;

    if (this.y < bottom - this.bottomOffset) {
      this.follow = true;
      this.y += this.a * dt * dt / 2;
    } else {
      this.follow = false;
      this.y = bottom - this.bottomOffset;
    }
  }

  /**
   * Обработка действий пользователя в зависимости от типа action
   * @param metrics {Object}
   * @param action {Object}
   */
  processAction(action: any,
                metrics: {
                  scrollY: number;
                  scrollX: number;
                  scale: number;
                  scaleScrollX: number;
                  scaleScrollY: number;
                }) {
    if (action.name === 'mouseMove' && action.active && this.index === action.index) {
      this.x = this.x - (action.scrollX * this.pxl) / metrics.scale;
      this.y = this.y - (action.scrollY * this.pxl) / metrics.scale;
      this.time = performance.now();
    }

    if (action.name === 'scroll') {
      this.y = this.y - metrics.scrollY;
      this.time = performance.now();
    }

    if (action.name === 'scale' || !action.check) this.time = performance.now();
  }

  /**
   * Вызов обновления значений в сторе для инпута
   * @param action {Object}
   */
  processUpdate(action: any) {
    if (action.index === this.index || action.follow === this.index) {
      this.updateFigureStoreData(this.index, this.x / this.pxl, this.y / this.pxl);
    }
  }
}

export default Base;

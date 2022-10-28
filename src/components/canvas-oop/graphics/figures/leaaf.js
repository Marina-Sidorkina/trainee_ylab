import BaseRectangle from "@src/components/canvas-oop/graphics/figures/base-rectangle";
import generateRandomNumber from "@src/utils/generateRandomNumber";

class Leaf extends BaseRectangle {
  constructor({x, y, color, mod}, index, updateFigureStoreData){
    super({x, y, color}, index, updateFigureStoreData);
    this.type = 'leaf';
    this.a = 0.5;
    this.params = {
      leaf1: { width: 92 / 1.5, height: 97 / 1.5 },
      leaf2: { width: 89 / 1.5, height: 91 / 1.5 },
      leaf3: { width: 47 / 1.2, height: 50 / 1.2 },
      leaf4: { width: 40 / 1.2, height: 50 / 1.2 },
      leaf5: { width: 47 / 1.2, height: 50 / 1.2 },
    }
    this.mod = `leaf${mod}`;
    this.divider = generateRandomNumber(1, 2);
    this.img = document.getElementById(this.mod);
    this.width = (this.params[this.mod].width * this.pxl) / this.divider;
    this.height = (this.params[this.mod].height * this.pxl) / this.divider;
    this.bottomOffset =  (this.params[this.mod].height * this.pxl) / this.divider;
    this.angle = 0;
    this.animationFunctions = {
      1: this.swing,
      2: this.rotate,
    }
    this.animationVariant = this.animationFunctions[generateRandomNumber(1, 2)]
  }

  /**
   * Обработка анимации
   * @param time {number}
   * @param bottom {number}
   */
  animate(time, bottom) {
    this.dt = (time - this.time) / 1000;
    this.animationVariant();

    if (this.y < bottom) {
      this.y += 1;
      this.x += Math.sin(this.dt);
    } else {
      this.y = -200;
    }
  }

  swing() {
    this.angle += Math.sin(this.dt);
  }

  rotate() {
    this.angle += 1;
    if (this.angle > 360) this.angle = 0;
  }

  /**
   * @param ctx {CanvasRenderingContext2D}
   * @param metrics {Object}
   * @param action {Object}
   */
  async draw(ctx, metrics, action) {
    this.processAction(action, metrics);
    this.processUpdate(action);

    ctx.save();
    if (action.index === this.index || action.follow === this.index) ctx.strokeStyle = 'green';
    ctx.translate(this.x + this.width/2, this.y + this.height/2);
    ctx.rotate(this.angle * Math.PI / 180 );
    ctx.translate(-(this.x + this.width/2), -(this.y + this.height/2));
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (action.index === this.index || action.follow === this.index) ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

export default Leaf;

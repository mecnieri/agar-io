import { app } from "./Application.js";

let Graphics = PIXI.Graphics;
const colors = ["112F41", "0894A1", "47AB6C", "F2B134", "ED553B"];
class Circle {
  constructor(
    color = parseInt(colors[Math.floor(Math.random() * 5)].substring(0), 16),
    x = window.innerWidth / 2 + Math.random() * (app.stage.width - window.innerWidth),
    y = window.innerHeight / 2 + Math.random() * (app.stage.height - window.innerHeight),
    radius = 10
  ) {
    this.c = new Graphics();
    this.c.x = x;
    this.c.y = y;
    this.color = color;
    this.radius = radius;
    this.c.radius = radius;
  }
  draw() {
    this.c.beginFill(this.color);
    this.c.drawCircle(0, 0, this.radius);
    this.c.endFill();
    return this.c;
  }

  grow(x, y, r) {
    this.c.beginFill(this.color);
    this.c.drawCircle(0, 0, r);
    this.c.x = x;
    this.c.y = y;
    this.c.endFill();
    return this.c;
  }
}
export default Circle;

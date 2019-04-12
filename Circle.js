import { app } from "../Application.js";

let Graphics = PIXI.Graphics;
const colors = ["5D2B7D", "A72D89", "1474BB", "8FC33E", "FEEE22", "E41E26"];
class Circle {
  constructor(
    color = parseInt(
      colors[Math.floor(Math.random() * colors.length)].substring(0),
      16
    ),
    x = app.view.width / 2 +
      Math.random() * (app.stage.width - window.innerWidth),
    y = app.view.height / 2 +
      Math.random() * (app.stage.height - window.innerHeight),
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
    // this.c.lineStyle(4, 0xff3300, 1);
    this.c.drawCircle(0, 0, this.radius);
    this.c.endFill();
    return this.c;
  }

  grow(x, y, r) {
    this.c.beginFill(this.color);
    this.c.drawCircle(0, 0, r);
    this.c.x = x;
    this.c.y = y;
    // this.c.endFill();
    return this.c;
  }
}
export default Circle;

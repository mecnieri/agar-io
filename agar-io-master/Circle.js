let Graphics = PIXI.Graphics;

class Circle {
  constructor(
    x = Math.floor(Math.random() * 500),
    y = Math.floor(Math.random() * 500),
    radius = 10
  ) {
    this.c = new Graphics();
    this.c.x = x;
    this.c.y = y;
    this.radius = radius;
    this.c.radius = radius;
    this.color = 123133;
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

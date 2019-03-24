import Circle from "./Circle.js";
import { app, loader } from "./Application.js";
//load an image and run the `setup` function when it's done
loader.load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  let landscapeTexture = PIXI.Texture.fromImage("./images/d.png");

  // crop the texture to show just 100 px
  let texture2 = new PIXI.Texture(
    landscapeTexture,
    new PIXI.Rectangle(0, 0, 2960, 1440)
  );

  // new sprite
  var background = new PIXI.Sprite(texture2);

  background.anchor.x = 0.5;
  background.anchor.y = 0.5;

  background.position.x = window.innerWidth/2;
  background.position.y = window.innerHeight/2;

  console.log(background.width);
  app.stage.addChild(background);
  let r = new Circle(window.innerWidth/2, window.innerHeight/2);
  let c = r.draw();
  app.stage.addChild(c);
  //#region Movement
  let mousePosition = null;
  const getMousePosition = () => app.renderer.plugins.interaction.mouse.global;
  const move = () => {
    console.log(window.innerWidth)
    mousePosition = getMousePosition();
    dx = mousePosition.x - window.innerWidth/2;
    dy = mousePosition.y - window.innerHeight/2;
    angle = Math.atan2(dy, dx);
    xv = Math.cos(angle) * speed;
    yv = Math.sin(angle) * speed;

    c.x += xv;
    c.y += yv;

    app.stage.position.x -= xv;
    app.stage.position.y -= yv;
  };

  //#endregion
  //#region variables

  let xv = 1;
  let yv = 1;
  let speed = 5;
  let globalSpeed = 5;
  let angle = null;
  let dx;
  let dy;

  //#endregion

  let c2 = new Circle().draw();
  app.stage.addChild(c2);

  app.ticker.add(() => {
    move();
    speed = 5;

    // console.log(c.x);
    // console.log(app.stage.x);
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      speed = 0;
    } else {
      speed = globalSpeed;
    }

    if (Math.abs(c.x - c2.x) < r.radius && Math.abs(c.y - c2.y) < r.radius) {
      r.radius = c2.radius + r.radius;
      r.grow(c.x, c.y, r.radius);
      c2.parent.removeChild(c2);
      c2 = new Circle().draw();
      app.stage.addChild(c2);
      speed *= 0.9;
      globalSpeed = speed;
    }
  });
}

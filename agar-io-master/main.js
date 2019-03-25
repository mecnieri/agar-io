import Circle from "./Circle.js";
import { app, loader } from "./Application.js";
import bg from "./background.js";

//load an image and run the `setup` function when it's done
loader.load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  //#region variables

  let xv;
  let yv;
  let speed = 5;
  let globalSpeed = 5;
  let angle = null;
  let dx;
  let dy;
  const arr = app.stage.children;
  let counter = 0;
  let text = new PIXI.Text(`You have eaten 0 apples`, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xff1010,
    align: "center"
  });

  //#endregion
  //#region background
  app.stage.addChild(bg);
  app.stage.addChild(text);
  text.x = 30;
  text.y = 30;

  //#endregion

  //#region create main ball

  let r = new Circle(111312, window.innerWidth / 2, window.innerHeight / 2);
  let c = r.draw();
  app.stage.addChild(c);

  //#endregion

  //#region create other balls

  for (let i = 0; i < 30; i++) {
    app.stage.addChild(new Circle().draw());
  }
  //#endregion

  //#region Movement
  let mousePosition = null;
  const getMousePosition = () => app.renderer.plugins.interaction.mouse.global;
  const move = () => {
    mousePosition = getMousePosition();
    // difference between window center and mouse
    dx = mousePosition.x - window.innerWidth / 2;
    dy = mousePosition.y - window.innerHeight / 2;

    // angle depending on differences
    angle = Math.atan2(dy, dx);

    // vectors depending on angle
    xv = Math.cos(angle) * speed;
    yv = Math.sin(angle) * speed;

    //#region border logic
    if (
      (app.stage.x > 0 && xv < 0) ||
      (app.stage.x - window.innerWidth < -app.stage.width && xv > 0)
    ) {
      xv = 0;
    } else {
      xv = Math.cos(angle) * speed;
    }

    if (
      (app.stage.y > 0 && yv < 0) ||
      (app.stage.y - window.innerHeight < -app.stage.height && yv > 0)
    ) {
      yv = 0;
    } else {
      yv = Math.sin(angle) * speed;
    }
    //#endregion

    // move main ball by vector
    c.x += xv;
    c.y += yv;
    text.x += xv;
    text.y += yv;

    // move container by oposite vector
    app.stage.position.x -= xv;
    app.stage.position.y -= yv;
  };
  //#endregion
  app.ticker.add(() => {
    move();

    //#region eating

    for (let i = 3; i < arr.length; i++) {
      if (
        Math.abs(c.x - arr[i].x) < r.radius &&
        Math.abs(c.y - arr[i].y) < r.radius
      ) {
        r.radius = arr[i].radius + r.radius;
        r.grow(c.x, c.y, r.radius);
        app.stage.removeChild(arr[i]);
        app.stage.addChild(new Circle().draw());
        speed *= 0.96;
        counter++;
        globalSpeed = speed;

        // saving text coordinates
        let tx = text.x;
        let ty = text.y;

        // delete text
        app.stage.removeChild(text);

        // create new text.
        text = new PIXI.Text(`You have eaten ${counter} apples`, {
          fontFamily: "Arial",
          fontSize: 24,
          fill: 0xff1010,
          align: "center"
        });

        //connect to old coordinates
        app.stage.addChildAt(text, 1);
        text.x = tx;
        text.y = ty;
      }
    }

    //#endregion

    //#region stop when ball is near to the mouse
    if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      speed = 0;
    } else {
      speed = globalSpeed;
    }
    //#endregion
  });

  
}
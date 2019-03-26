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
  let counter = 0;
  let text = new PIXI.Text(`You have eaten 0 apples`, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xff1010,
    align: "center"
  });

  //#endregion
  //#region background
  let bgContainer = new PIXI.Container();
  bgContainer.addChild(bg);
  app.stage.addChild(text);
  app.stage.addChild(bgContainer);

  const arr = app.stage.children[1].children;
  text.x = 30;
  text.y = 30;

  //#endregion

  //#region create main ball

  let r = new Circle(111312, window.innerWidth / 2, window.innerHeight / 2);
  let c = r.draw();

  let mainContainer = new PIXI.Container();
  mainContainer.addChild(c);
  app.stage.addChild(mainContainer);

  //#endregion

  //#region create other balls

  for (let i = 0; i < 200; i++) {
    bgContainer.addChild(new Circle().draw());
  }
  //#endregion

  //#region Movement
  let mousePosition = null;
  const getMousePosition = () => app.renderer.plugins.interaction.mouse.global;
  const move = () => {
    mousePosition = getMousePosition();
 
    // difference between window center and mouse
    dx = mousePosition.x - c.x - app.stage.x;
    dy = mousePosition.y - c.y - app.stage.y;

    // angle depending on differences
    angle = Math.atan2(dy, dx);

    // vectors depending on angle
    xv = Math.cos(angle) * speed;
    yv = Math.sin(angle) * speed;
    //#region border logic

    if (
      (bgContainer.x > 0 && xv < 0) ||
      (bgContainer.x + bgContainer.width - window.innerWidth < 0 && xv > 0)
    ) {
      xv = 0;
    } else {
      xv = Math.cos(angle) * speed;
    }

    if (
      (bgContainer.y > 0 && yv < 0) ||
      (bgContainer.y + bgContainer.height - window.innerHeight < 0 && yv > 0)
    ) {
      yv = 0;
    } else {
      yv = Math.sin(angle) * speed;
    }
    //#endregion

    // move container by oposite vector
    bgContainer.position.x -= xv;
    bgContainer.position.y -= yv;
  };
  //#endregion

  //#region resize event
  window.addEventListener("resize", () => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerHeight;
    r.grow(window.innerWidth / 2, window.innerHeight / 2, r.radius);
  });
  //#endregion

  app.ticker.add(() => {
    move();

    //#region eating

    for (let i = 1; i < arr.length; i++) {
      // console.log(arr[1].x)
      if (
        Math.abs(c.x - arr[i].x - bgContainer.position.x) < r.radius &&
        Math.abs(c.y - arr[i].y - bgContainer.position.y) < r.radius
      ) {
        r.radius = arr[i].radius / 10 + r.radius;
        r.grow(c.x, c.y, r.radius);
        bgContainer.removeChild(arr[i]);
        bgContainer.addChild(new Circle().draw());
        speed *= 0.9968;
        counter++;
        globalSpeed = speed;

        // saving text coordinates
        let tx = text.x;
        let ty = text.y;

        // delete text
        app.stage.removeChild(text);

        // create new text.
        text = new PIXI.Text(`You have eaten ${counter} Skittles`, {
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

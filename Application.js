// import moveC from "./main.js";

//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared;

//Create a Pixi Application
let app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  transparent: true,
  resolution: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);



export { app, loader };

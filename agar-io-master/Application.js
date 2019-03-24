//Aliases
let Application = PIXI.Application,
  loader = PIXI.Loader.shared;

//Create a Pixi Application
let app = new Application({
  width: 2960,
  height: 1440,
  antialias: true,
  transparent: false,
  resolution: 1
});


//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


export { app, loader };

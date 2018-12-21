import {
  Simulation,
  MouseState
} from "@jlegrone/header/header";

const PARTICLE_COUNT = 1000;
const ACCELERATION_MULTIPLIER = 1.2;
const EFFECT_DISTANCE = 50.0;

const ctx: Worker = self as any;
// const canvas = <HTMLCanvasElement>document.getElementById('canvas');
// const context = canvas.getContext("2d");
// const mouse = new MouseState();

console.log(MouseState);

// function init() {
//   resizeCanvas();
//   addEventListener('resize', resizeCanvas, false);
//   addEventListener('mousemove', mouseMove);
//   addEventListener('mouseout', () => {
//     mouse.x = -1;
//     mouse.y = -1;
//   });
//   addEventListener('mousedown', () => mouse.down = true);
//   addEventListener('mouseup', () => mouse.down = false);

//   // Listen for web worker messages
//   addEventListener("message", (event) => {
//     console.log(event);
//     ctx.postMessage({ foo: "foo" });
//   });

//   const simulation = new Simulation(context, PARTICLE_COUNT, ACCELERATION_MULTIPLIER, EFFECT_DISTANCE);
//   requestAnimationFrame(() => draw(simulation));
// }

// function draw(simulation: Simulation) {
//   simulation.draw(canvas.width, canvas.height, mouse);
//   requestAnimationFrame(() => draw(simulation));
// }

// function resizeCanvas() {
//   canvas.width = 100;
//   canvas.height = 100;
// }

// function mouseMove(e: MouseEvent) {
//   console.log(e);
//   if (e.pageX || e.pageY) {
//     mouse.x = e.pageX;
//     mouse.y = e.pageY;
//   } else if ((e.clientX || e.clientY) && document.documentElement) {
//     mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//     mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//   }
// }

// init();

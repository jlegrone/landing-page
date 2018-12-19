import {
  Simulation,
  MouseState
} from "@jlegrone/header/header";

const PARTICLE_COUNT = 1000;
const ACCELERATION_MULTIPLIER = 1.2;
const EFFECT_DISTANCE = 50.0;

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const context = canvas.getContext("2d");
const mouse = new MouseState();

export function init() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('mousemove', mouseMove);
  window.addEventListener('mouseout', () => {
    mouse.x = -1;
    mouse.y = -1;
  });
  window.addEventListener('mousedown', () => mouse.down = true);
  window.addEventListener('mouseup', () => mouse.down = false);

  const simulation = new Simulation(context, PARTICLE_COUNT, ACCELERATION_MULTIPLIER, EFFECT_DISTANCE);
  window.requestAnimationFrame(() => draw(simulation));
}

function draw(simulation: Simulation) {
  simulation.draw(canvas.width, canvas.height, mouse);
  window.requestAnimationFrame(() => draw(simulation));
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function mouseMove(e: MouseEvent) {
  if (e.pageX || e.pageY) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  } else if ((e.clientX || e.clientY) && document.documentElement) {
    mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
}

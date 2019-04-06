/* tslint:disable */
/**
*/
export class MouseState {
  free(): void;
  x: number;
  y: number;
  down: boolean;
  constructor();
}
/**
*/
export class Simulation {
  free(): void;
  constructor(context: any, particle_count: number, acceleration_multiplier: number, effect_distance: number);
  draw(canvas_width: number, canvas_height: number, mouse: MouseState): void;
}

use std::f64;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

use util::random_inclusive;

const WHOLE_CIRCLE: f64 = f64::consts::PI * 2.0;
const MIN_RADIUS: f64 = 1.0;
const MAX_RADIUS: f64 = 2.5;
const MIN_OPACITY: f64 = 0.2;
const MAX_OPACITY: f64 = 0.4;
const MAX_INITIAL_VELOCITY: f64 = 0.05;

#[wasm_bindgen]
pub struct MouseState {
  pub x: f64,
  pub y: f64,
  pub down: bool,
}

#[wasm_bindgen]
impl MouseState {
  #[wasm_bindgen(constructor)]
  pub fn new() -> Self {
    MouseState {
      x: -1.0,
      y: -1.0,
      down: false,
    }
  }
}

#[wasm_bindgen]
pub struct Simulation {
  context: CanvasRenderingContext2d,
  particles: Vec<Particle>,
  acceleration_multiplier: f64,
  effect_distance: f64,
}

#[wasm_bindgen]
impl Simulation {
  #[wasm_bindgen(constructor)]
  pub fn new(
    context: CanvasRenderingContext2d,
    particle_count: i32,
    acceleration_multiplier: f64,
    effect_distance: f64,
  ) -> Self {
    let canvas = context.canvas().unwrap();
    let width = canvas.width() as f64;
    let height = canvas.height() as f64;
    let mut particles: Vec<Particle> = Vec::new();
    for _ in 0..particle_count {
      particles.push(Particle::new(width, height));
    }

    Simulation {
      context,
      particles,
      acceleration_multiplier,
      effect_distance,
    }
  }
  pub fn draw(&mut self, canvas_width: f64, canvas_height: f64, mouse: &MouseState) {
    // render_particles_unbounded(self, canvas_width, canvas_height, mouse);
    render_particles_bounded(self, canvas_width, canvas_height, mouse);
  }
}

struct Particle {
  x: f64,
  y: f64,
  dx: f64,
  dy: f64,
  radius: f64,
  style: JsValue,
}

impl Particle {
  fn new(max_x: f64, max_y: f64) -> Self {
    let mut style = String::from("rgba(255,255,255,");
    style.push_str(&random_inclusive(MIN_OPACITY, MAX_OPACITY).to_string());
    style.push_str(")");

    let radius = random_inclusive(MIN_RADIUS, MAX_RADIUS);

    Particle {
      x: random_inclusive(radius, max_x - radius),
      y: random_inclusive(radius, max_y - radius),
      dx: random_inclusive(-MAX_INITIAL_VELOCITY, MAX_INITIAL_VELOCITY),
      dy: random_inclusive(-MAX_INITIAL_VELOCITY, MAX_INITIAL_VELOCITY),
      radius,
      style: wasm_bindgen::JsValue::from_str(&style),
    }
  }
  fn render(&self, s: &Simulation) {
    s.context.begin_path();
    s.context.set_fill_style(&self.style);
    s.context.set_stroke_style(&self.style);
    s.context
      .arc(self.x, self.y, self.radius, 0.0, WHOLE_CIRCLE)
      .unwrap();
    s.context.fill();
  }
}

#[allow(dead_code)]
fn render_particles_unbounded(
  simulation: &mut Simulation,
  canvas_width: f64,
  canvas_height: f64,
  mouse: &MouseState,
) {
  if !mouse.down {
    simulation
      .context
      .clear_rect(0.0, 0.0, canvas_width, canvas_height);
  }

  for p in simulation.particles.iter_mut() {
    if mouse.down {
      // Calculate movement based on mouse proximity
      let x_diff = p.x - mouse.x;
      let y_diff = p.y - mouse.y;

      let distance = (x_diff * x_diff + y_diff * y_diff).sqrt();
      p.dx += x_diff / (distance * distance * p.radius) * simulation.acceleration_multiplier;
      p.dy += y_diff / (distance * distance * p.radius) * simulation.acceleration_multiplier;
    }

    p.x += p.dx;
    p.y += p.dy;
  }
  for p in simulation.particles.iter() {
    p.render(simulation);
  }
}

fn render_particles_bounded(
  simulation: &mut Simulation,
  canvas_width: f64,
  canvas_height: f64,
  mouse: &MouseState,
) {
  if !mouse.down {
    simulation
      .context
      .clear_rect(0.0, 0.0, canvas_width, canvas_height);
  }

  for p in simulation.particles.iter_mut() {
    let left_bound = 0.0 + p.radius;
    let right_bound = canvas_width - p.radius;
    let top_bound = left_bound;
    let bottom_bound = canvas_height - p.radius;
    if p.x < left_bound {
      p.dx = p.dx.abs();
    } else if p.x > right_bound {
      p.dx = -p.dx.abs();
    }
    if p.y < top_bound {
      p.dy = p.dy.abs();
    } else if p.y > bottom_bound {
      p.dy = -p.dy.abs();
    }

    let x_diff = p.x - mouse.x;
    let y_diff = p.y - mouse.y;
    let distance = (x_diff * x_diff + y_diff * y_diff).sqrt();
    if mouse.down || distance < simulation.effect_distance {
      // Calculate movement based on mouse proximity
      p.dx += x_diff / (distance * distance * p.radius) * simulation.acceleration_multiplier;
      p.dy += y_diff / (distance * distance * p.radius) * simulation.acceleration_multiplier;
    }

    p.x += p.dx;
    p.y += p.dy;
  }
  for p in simulation.particles.iter() {
    p.render(simulation);
  }
}

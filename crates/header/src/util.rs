use js_sys::Math;

pub fn random_inclusive(min: f64, max: f64) -> f64 {
  Math::random() * (max - min) + min
}

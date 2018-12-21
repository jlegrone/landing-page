extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

use js_sys::Object;
use wasm_bindgen::prelude::*;
use web_sys::{DedicatedWorkerGlobalScope};

pub fn main() {
  let worker: Object = js_sys::global();
  worker.close();
}

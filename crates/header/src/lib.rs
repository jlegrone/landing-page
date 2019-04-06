extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;
extern crate wee_alloc;

mod canvas;
mod util;

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

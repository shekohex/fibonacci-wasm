mod utils;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn fib(n: u64) -> u64 {
    let mut a = 0;
    let mut b = 1;
    for _ in 0..n {
        let tmp = a;
        a = b;
        b = a + tmp;
    }
    b
}

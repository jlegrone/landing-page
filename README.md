## Developing

To get started, you'll need [rust](https://doc.rust-lang.org/cargo/getting-started/installation.html), [node](https://nodejs.org/en/download/), and [yarn](https://yarnpkg.com/lang/en/docs/install).

1. Install wasm-pack: `cargo install wasm-pack`
1. `yarn install`
1. `yarn build`

For local development with hot reloading, run `yarn start` in a separate tab, and run `yarn build:wasm` each time you update rust code.

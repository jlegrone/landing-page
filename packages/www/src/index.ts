import fancyLog from './fancy-log';
// import './header.main'

// A dependency graph that contains any wasm must all be imported
// asynchronously. This bootstrap does the single async import, so
// that no one else needs to worry about it again.
// async function bootstrap() {
//   await import('./header.main');
// }

// bootstrap();

import Worker from 'worker-loader!./header.worker';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => { };

worker.addEventListener("message", (event) => { });

fancyLog(
  "Thanks for stopping by! This page was built with rust and webassembly. Source is available at https://github.com/jlegrone/jlegrone.github.io."
);

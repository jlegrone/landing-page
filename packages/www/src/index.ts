import fancyLog from './fancy-log';

// A dependency graph that contains any wasm must all be imported
// asynchronously. This bootstrap does the single async import, so
// that no one else needs to worry about it again.
async function bootstrap() {
  const { init } = await import('./header.worker');
  init();
}

bootstrap();

fancyLog(
  "Thanks for stopping by! This page was built with rust and webassembly. Source is available at https://github.com/jlegrone/jlegrone.github.io."
);

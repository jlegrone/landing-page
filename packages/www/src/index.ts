import './console';

// A dependency graph that contains any wasm must all be imported
// asynchronously. This bootstrap does the single async import, so
// that no one else needs to worry about it again.
async function bootstrap() {
  await import('./header');
}

bootstrap();

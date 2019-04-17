// console.log(worker);

// import Worker from 'worker-loader!./worker';

// const worker = new Worker();

// worker.postMessage({ a: 1 });
// worker.onmessage = function () {};

// worker.addEventListener("message", function () {});

async function bootstrap() {
  await import('./worker');
}

bootstrap();

export default null;

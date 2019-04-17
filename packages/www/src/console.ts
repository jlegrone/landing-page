const styles = [
  'background: linear-gradient(rgb(49, 176, 144), rgb(20, 20, 20))',
  'color: white',
  'display: block',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
  'line-height: 40px',
  'text-align: center',
  'font-weight: bold'
].join(';');

const text = "Thanks for stopping by! This page was built with rust and webassembly. Source is available at https://github.com/jlegrone/landing-page.";

console.info(`%c  ${text}  `, styles);

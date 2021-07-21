import './module';
import './style.css';

// const arr: number[] = [3, 4];

async function start() {
  await Promise.resolve();
}
console.log('Workinggg!');
// console.log(...arr);

start();
document.querySelector('#app').innerHTML = 'HELLO';

if (module.hot) {
  module.hot.accept();
}

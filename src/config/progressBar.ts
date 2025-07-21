const ProgressBar = require('progress');

const bar = new ProgressBar(':bar :rate/bps :percent :etas', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
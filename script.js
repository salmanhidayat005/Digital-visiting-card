const card = document.getElementById('card');
let flipped = false, rx = 0, ry = 0;

function render(){
  card.style.transform = `rotateX(${rx}deg) rotateY(${ry + (flipped ? 180 : 0)}deg)`;
}

// 3D tilt following mouse / finger
function tilt(e){
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  ry = (x - 0.5) * 28;
  rx = -(y - 0.5) * 28;
  card.style.transition = 'transform .08s linear';
  card.style.setProperty('--mx', x * 100 + '%');
  card.style.setProperty('--my', y * 100 + '%');
  render();
}
function reset(){
  rx = 0; ry = 0;
  card.style.transition = '';
  render();
}
window.addEventListener('pointermove', tilt);
window.addEventListener('pointerleave', reset);
card.addEventListener('pointerleave', () => {});

// flip on tap (links keep working normally)
card.addEventListener('click', e => {
  if (e.target.closest('a')) return;
  flipped = !flipped;
  card.style.transition = '';
  render();
});

render();

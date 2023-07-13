const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const clearEl = document.getElementById('clear');
const eraser = document.getElementById('eraser');
const ctx = canvas.getContext('2d');
let isErasing = false;
let size = 10;
let isDrawing = false;
let color = 'black';
let lastX = 0;
let lastY = 0;

function toggleErasing() {
  isErasing = !isErasing;
  eraser.classList.toggle('active');
  if(isErasing){
    canvas.classList.add("earaser_cursor");
  }
  else{
    canvas.classList.remove("earaser_cursor");
  }
  
}

eraser.addEventListener('click', toggleErasing);

function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = isErasing ? 'white' : color;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  if (size > 5) {
    size -= 5;
  }
  updateSizeOnScreen();
});

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
// Retrieve the color input element
const colorEl = document.getElementById('color');

// Add an event listener to the color input element
colorEl.addEventListener('input', (e) => {
  color = e.target.value;
});

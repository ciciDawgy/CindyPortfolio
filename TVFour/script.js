/* ==========================
   ELEMENT REFERENCES
========================== */
const powerBtn = document.querySelector('.fa-power-off');
const homeBtn = document.querySelector('.fa-home');

const upBtn = document.querySelector('.fa-chevron-up');
const downBtn = document.querySelector('.fa-chevron-down');
const leftBtn = document.querySelector('.fa-chevron-left');
const rightBtn = document.querySelector('.fa-chevron-right');
const okBtn = document.querySelector('.ok');

const tvGuide = document.querySelector('.tvGuide');
const videoFrame = document.getElementById('video');

const cells = Array.from(document.querySelectorAll('td'));

/* ==========================
   STATE
========================== */
let currentIndex = 0;
const COLS_PER_ROW = 14; // IMPORTANT: must match your table layout

/* ==========================
   INITIAL SETUP
========================== */
if (cells.length > 0) {
  cells[currentIndex].classList.add('selected');
}

/* ==========================
   SELECTION LOGIC
========================== */
function updateSelection(newIndex) {
  if (newIndex < 0 || newIndex >= cells.length) return;

  cells[currentIndex].classList.remove('selected');
  currentIndex = newIndex;
  cells[currentIndex].classList.add('selected');

  cells[currentIndex].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'nearest'
  });
}

/* ==========================
   REMOTE ARROWS
========================== */
rightBtn.addEventListener('click', () =>
  updateSelection(currentIndex + 1)
);

leftBtn.addEventListener('click', () =>
  updateSelection(currentIndex - 1)
);

downBtn.addEventListener('click', () =>
  updateSelection(currentIndex + COLS_PER_ROW)
);

upBtn.addEventListener('click', () =>
  updateSelection(currentIndex - COLS_PER_ROW)
);

/* ==========================
   KEYBOARD SUPPORT (OPTIONAL)
========================== */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') updateSelection(currentIndex + 1);
  if (e.key === 'ArrowLeft') updateSelection(currentIndex - 1);
  if (e.key === 'ArrowDown') updateSelection(currentIndex + COLS_PER_ROW);
  if (e.key === 'ArrowUp') updateSelection(currentIndex - COLS_PER_ROW);
});

/* ==========================
   OK BUTTON (PLAY VIDEO)
========================== */
okBtn.addEventListener('click', () => {
  const link = cells[currentIndex].querySelector('a');
  if (!link) return;

  videoFrame.src = link.href;
  videoFrame.classList.add('show', 'showVidNow');
});

/* ==========================
   POWER BUTTON (SHOW/HIDE GUIDE)
========================== */
powerBtn.addEventListener('click', () => {
  tvGuide.style.display =
    tvGuide.style.display === 'none' ? 'block' : 'none';
});

/* ==========================
   HOME BUTTON (RETURN TO GUIDE)
========================== */
homeBtn.addEventListener('click', () => {
  videoFrame.src = '';
  videoFrame.classList.remove('show', 'showVidNow');
  tvGuide.style.display = 'block';
});
// script.js - Bible Reading Tracker
// Tracks Genesis (50 chapters) using localStorage

const chapters = 50;
const chapterList = document.getElementById('chapterList');
const summary = document.getElementById('summary');

function loadProgress() {
  const saved = JSON.parse(localStorage.getItem('bibleProgress')) || [];
  return new Set(saved);
}

function saveProgress(set) {
  localStorage.setItem('bibleProgress', JSON.stringify([...set]));
}

function updateSummary(readSet) {
  const percent = ((readSet.size / chapters) * 100).toFixed(1);
  summary.textContent = `You’ve completed ${readSet.size} out of ${chapters} chapters (${percent}%)`;
}

function createTracker() {
  const readChapters = loadProgress();

  for (let i = 1; i <= chapters; i++) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = readChapters.has(i);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) readChapters.add(i);
      else readChapters.delete(i);
      saveProgress(readChapters);
      updateSummary(readChapters);
    });

    const label = document.createElement('label');
    label.textContent = `Genesis ${i}`;
    label.style.cursor = 'pointer';
    label.onclick = () => { 
      checkbox.checked = !checkbox.checked; 
      checkbox.dispatchEvent(new Event('change')); 
    };

    li.appendChild(checkbox);
    li.appendChild(label);
    chapterList.appendChild(li);
  }

  updateSummary(readChapters);
}

function resetProgress() {
  if (!confirm('Reset all progress?')) return;
  localStorage.removeItem('bibleProgress');
  chapterList.innerHTML = '';
  createTracker();
}

function toggleAll(markRead) {
  const set = new Set();
  if (markRead) {
    for (let i = 1; i <= chapters; i++) set.add(i);
  }
  saveProgress(set);
  chapterList.innerHTML = '';
  createTracker();
}

// Demo login (replace with backend later)
function login(){
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const msg = document.getElementById('loginMsg');
  if(u === 'student' && p === 'pass123') {
    msg.style.color = 'green';
    msg.textContent = 'Login successful 🎉';
  } else {
    msg.style.color = 'crimson';
    msg.textContent = '❌ Invalid credentials';
  }
}

createTracker();

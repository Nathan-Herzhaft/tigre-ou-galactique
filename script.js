// =====================================================
// script.js — logique du quiz
// Les données (questions, résultats, seuils) sont dans data.js
// =====================================================

const letters = ['A', 'B', 'C', 'D', 'E'];

let currentQ = 0;
let answers  = []; // index de l'option choisie par question

// --- Éléments DOM ---
const introHeader      = document.getElementById('introHeader');
const startCard        = document.getElementById('startCard');
const progressSection  = document.getElementById('progressSection');
const questionCard     = document.getElementById('questionCard');
const resultCard       = document.getElementById('resultCard');
const progressBar      = document.getElementById('progressBar');
const progressLabel    = document.getElementById('progressLabel');
const questionNumber   = document.getElementById('questionNumber');
const questionText     = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const btnNext          = document.getElementById('btnNext');
const btnBack          = document.getElementById('btnBack');
const btnShare         = document.getElementById('btnShare');

// --- Événements ---
const audio   = document.getElementById('bgAudio');
const btnMute = document.getElementById('btnMute');
let audioStarted = false;

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;
  audio.volume = 0.4;
  audio.play().catch(() => {}); // silencieux si bloqué
}

btnMute.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {});
    btnMute.textContent = '🔊';
  } else {
    audio.pause();
    btnMute.textContent = '🔇';
  }
});

// Démarrer au premier clic "C'est parti"
document.getElementById('btnStart').addEventListener('click', () => {
  startAudio();
  startQuiz();
});

// (on retire l'ancien listener simple sur btnStart)

btnNext.addEventListener('click', nextQuestion);
btnBack.addEventListener('click', prevQuestion);
document.getElementById('btnRestart').addEventListener('click', restart);
btnShare.addEventListener('click', shareResult);

// -------------------------------------------------------
// QUIZ
// -------------------------------------------------------
function startQuiz() {
  startCard.classList.add('hidden');
  introHeader.classList.add('hidden');
  progressSection.classList.remove('hidden');
  questionCard.classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  questionNumber.textContent = `Question ${currentQ + 1}`;
  questionText.textContent   = q.text;

  // Reset animation
  questionCard.style.animation = 'none';
  requestAnimationFrame(() => { questionCard.style.animation = ''; });

  optionsContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[currentQ] === i ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.label}</span>`;
    btn.addEventListener('click', () => selectOption(i, btn));
    optionsContainer.appendChild(btn);
  });

  btnNext.disabled           = answers[currentQ] === undefined;
  btnBack.style.visibility   = currentQ === 0 ? 'hidden' : 'visible';
  btnNext.textContent        = currentQ === questions.length - 1 ? 'Révéler mon âme 🔮' : 'Suivant →';

  const pct = (currentQ / questions.length) * 100;
  progressBar.style.width    = pct + '%';
  progressLabel.textContent  = `Question ${currentQ + 1} / ${questions.length}`;
}

function selectOption(index, btn) {
  answers[currentQ] = index;
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  btnNext.disabled = false;
}

function nextQuestion() {
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResult();
  }
}

function prevQuestion() {
  if (currentQ > 0) { currentQ--; renderQuestion(); }
}

// -------------------------------------------------------
// SCORE
// -------------------------------------------------------
function computeScore() {
  return answers.reduce((total, optionIndex, questionIndex) => {
    return total + questions[questionIndex].options[optionIndex].points;
  }, 0);
}

// Profil selon le score brut (négatif → tigre, positif → galactique)
// Les seuils dans data.js sont des valeurs absolues de points.
function getProfile(score) {
  if (score <= thresholds.low)  return 'TIGER';
  if (score >= thresholds.high) return 'GALAXY';
  return 'HYBRID';
}

// -------------------------------------------------------
// RÉSULTAT
// -------------------------------------------------------
function scoreLabel(score, key) {
  const MEAN = 3; // moyenne simulée arrondie
  const relative = Math.abs(score - MEAN);
  if (key === 'HYBRID') return `Score : ${score > 0 ? '+' : ''}${score}`;
  const side = key === 'TIGER' ? 'points tigre 🐯' : 'points galactique 🌌';
  return `${relative} ${side}`;
}

function showResult() {
  const score = computeScore();
  const key   = getProfile(score);
  const r     = results[key];

  questionCard.classList.add('hidden');
  progressSection.classList.add('hidden');

  resultCard.className = 'result-card ' + r.theme;
  resultCard.classList.remove('hidden');
  progressBar.style.width = '100%';

  document.getElementById('resultEmoji').textContent = r.emoji;
  document.getElementById('resultTitle').textContent = r.title;
  document.getElementById('resultTitle').style.color = r.color;
  document.getElementById('resultDesc').textContent  = r.desc;

  // Affichage du score
  const label = scoreLabel(score, key);
  document.getElementById('resultScore').textContent = label;
  document.getElementById('resultScore').style.color = r.color;

  // Fond pleine page
  document.body.classList.remove('bg-tiger', 'bg-galaxy', 'bg-hybrid');
  document.body.classList.add(r.bg);

  // Bouton partage
  btnShare.style.borderColor = r.color;
  btnShare.style.color       = r.color;
  btnShare.dataset.key       = key;
  btnShare.dataset.label     = label;
}

// -------------------------------------------------------
// PARTAGE
// -------------------------------------------------------
async function shareResult() {
  const key      = btnShare.dataset.key;
  const label    = btnShare.dataset.label;
  const r        = results[key];
  const shareUrl = window.location.href.split('?')[0];

  const text = `${r.emoji} Je suis "${r.title}" avec ${label} !\nFais le quiz : ${shareUrl}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'Tigre ou Galactique ?', text });
    } catch { /* annulé */ }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showShareFeedback('✅ Copié !');
    } catch {
      showShareFeedback('🔗 ' + shareUrl);
    }
  }
}

function showShareFeedback(message) {
  const original      = btnShare.textContent;
  btnShare.textContent = message;
  btnShare.disabled    = true;
  setTimeout(() => {
    btnShare.textContent = original;
    btnShare.disabled    = false;
  }, 2500);
}

// -------------------------------------------------------
// RESTART
// -------------------------------------------------------
function restart() {
  currentQ = 0;
  answers  = [];
  resultCard.className = 'result-card hidden';
  introHeader.classList.remove('hidden');
  startCard.classList.remove('hidden');
  progressSection.classList.add('hidden');
  document.body.classList.remove('bg-tiger', 'bg-galaxy', 'bg-hybrid');
  progressBar.style.width = '0%';
}
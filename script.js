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
document.getElementById('btnStart').addEventListener('click', startQuiz);
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

function computeMaxScore() {
  return questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
}

function getProfile(score, maxScore) {
  const pct = maxScore === 0 ? 50 : (score / maxScore) * 100;
  if (pct <= thresholds.low)  return 'TIGER';
  if (pct >= thresholds.high) return 'GALAXY';
  return 'HYBRID';
}

// -------------------------------------------------------
// RÉSULTAT
// -------------------------------------------------------
function showResult() {
  const score    = computeScore();
  const maxScore = computeMaxScore();
  const key      = getProfile(score, maxScore);
  const r        = results[key];

  questionCard.classList.add('hidden');
  progressSection.classList.add('hidden');

  resultCard.className = 'result-card ' + r.theme;
  resultCard.classList.remove('hidden');
  progressBar.style.width = '100%';

  document.getElementById('resultEmoji').textContent = r.emoji;
  document.getElementById('resultTitle').textContent = r.title;
  document.getElementById('resultTitle').style.color = r.color;
  document.getElementById('resultDesc').textContent  = r.desc;

  // Fond pleine page
  document.body.classList.remove('bg-tiger', 'bg-galaxy', 'bg-hybrid');
  document.body.classList.add(r.bg);

  // Pill avec animation du score
  const pillsEl = document.getElementById('scorePills');
  pillsEl.innerHTML = '';
  const pill = document.createElement('div');
  pill.className   = 'pill';
  pill.style.color = r.color;
  pill.textContent = `Score : 0 / ${maxScore}`;
  pillsEl.appendChild(pill);
  animateScore(pill, score, maxScore, r.color);

  // Bouton partage
  btnShare.style.borderColor = r.color;
  btnShare.style.color       = r.color;

  // Stocke le résultat courant pour le partage
  btnShare.dataset.key   = key;
  btnShare.dataset.score = score;
  btnShare.dataset.max   = maxScore;
}

// -------------------------------------------------------
// ANIMATION DU SCORE
// -------------------------------------------------------
function animateScore(pill, targetScore, maxScore, color) {
  const duration = 1200; // ms
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing ease-out
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * targetScore);

    pill.textContent = `Score : ${current} / ${maxScore}`;

    // Couleur qui s'intensifie pendant l'animation
    pill.style.opacity = 0.4 + eased * 0.6;

    if (progress < 1) requestAnimationFrame(step);
    else pill.style.opacity = 1;
  }

  requestAnimationFrame(step);
}

// -------------------------------------------------------
// PARTAGE
// -------------------------------------------------------
async function shareResult() {
  const key      = btnShare.dataset.key;
  const score    = btnShare.dataset.score;
  const max      = btnShare.dataset.max;
  const r        = results[key];
  const shareUrl = window.location.href.split('?')[0]; // URL propre sans paramètres

  const text = `${r.emoji} Je suis "${r.title}" ! (${score}/${max} pts)\nFais le quiz : ${shareUrl}`;

  // Utilise l'API Web Share si disponible (mobile), sinon copie dans le presse-papier
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Tigre ou Galactique ?', text });
    } catch {
      // L'utilisateur a annulé — on ne fait rien
    }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showShareFeedback('✅ Copié !');
    } catch {
      // Fallback si clipboard non disponible (ex: http sans https)
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
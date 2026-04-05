// -------------------------------------------------------
// 📝 QUESTIONS — modifie ici !
// Chaque option a une valeur (A, B ou C) qui détermine le profil final.
// -------------------------------------------------------
const questions = [
  {
    text: "C'est samedi matin, tu fais quoi ?",
    options: [
      { label: "Grasse mat' jusqu'à midi, évidemment 😴", value: "A" },
      { label: "Déjà dehors pour une balade ou du sport 🏃", value: "B" },
      { label: "Un projet créa ou lecture tranquille ☕", value: "C" },
    ]
  },
  {
    text: "En soirée, tu es plutôt…",
    options: [
      { label: "Celui/celle qui danse toute la nuit 🕺", value: "B" },
      { label: "Dans un coin à parler avec 2-3 personnes 🗣️", value: "C" },
      { label: "Rentré·e à minuit, le lit m'appelle 🛌", value: "A" },
    ]
  },
  {
    text: "Ton repas idéal ?",
    options: [
      { label: "Un bon plat fait maison, en prenant le temps 🍝", value: "C" },
      { label: "Un kebab entre amis à 2h du mat' 🌯", value: "B" },
      { label: "N'importe quoi du moment que c'est rapide 😅", value: "A" },
    ]
  },
  {
    text: "Un truc se casse chez toi. Tu…",
    options: [
      { label: "Tu cherches un tuto YouTube et tu répares 🔧", value: "C" },
      { label: "Tu demandes à quelqu'un de le faire à ta place 😇", value: "A" },
      { label: "Tu improvises jusqu'à ce que ça marche (ou pas) 🤞", value: "B" },
    ]
  },
  {
    text: "Quelle phrase te ressemble le plus ?",
    options: [
      { label: "\"Je verrai ça demain\" 😌", value: "A" },
      { label: "\"Carpe diem, on y va !\" ⚡", value: "B" },
      { label: "\"Laisse-moi d'abord faire une liste\" 📋", value: "C" },
    ]
  },
  {
    text: "Tu reçois un message inattendu d'un inconnu. Tu…",
    options: [
      { label: "Réponds avec enthousiasme, nouvelle aventure ! 🎉", value: "B" },
      { label: "Lis, marques comme non lu, réponds dans 3 jours 👀", value: "A" },
      { label: "Analyses le message avant de répondre prudemment 🧐", value: "C" },
    ]
  },
  {
    text: "Ton superpouvoir idéal ?",
    options: [
      { label: "Téléportation — bye bye les transports 🚀", value: "B" },
      { label: "Lire dans les pensées 🧠", value: "C" },
      { label: "Ne jamais avoir besoin de dormir... ou l'inverse 😴", value: "A" },
    ]
  },
];

// -------------------------------------------------------
// 🏆 RÉSULTATS — modifie les titres, emojis et descriptions !
// -------------------------------------------------------
const results = {
  A: {
    emoji: "🐨",
    title: "Le/La Cozy Bear",
    desc: "Tu es la définition du confort. Tu sais apprécier les petits plaisirs de la vie : le plaid, la tisane, le silence. Tes amis t'adorent pour ton calme et ta zénitude. Tu n'es pas paresseux·se, tu es simplement sélectif·ve avec ton énergie. 🌟",
    color: "#ffd93d",
    bg: "#fff8e0",
  },
  B: {
    emoji: "🦊",
    title: "Le/La Wild Fox",
    desc: "Tu vis à 200 à l'heure et tu adores ça. Spontané·e, curieux·se, toujours partant·e pour une nouvelle expérience. Tes amis savent que c'est toi qui amènes la bonne énergie. La routine ? Connais pas. ⚡",
    color: "#ff6b6b",
    bg: "#fff0f0",
  },
  C: {
    emoji: "🦉",
    title: "Le/La Wise Owl",
    desc: "Tu observes, tu analyses, tu crées. Tu es le genre de personne qui a toujours un carnet à portée de main. Tes amis viennent te voir pour avoir de bons conseils. Tu n'es pas lent·e — tu es précis·e. 🎯",
    color: "#4d96ff",
    bg: "#f0f4ff",
  },
};

// -------------------------------------------------------
// LOGIQUE
// -------------------------------------------------------
let currentQ = 0;
let answers = [];
const letters = ['A', 'B', 'C', 'D'];

const introHeader     = document.getElementById('introHeader');
const startCard       = document.getElementById('startCard');
const progressSection = document.getElementById('progressSection');
const questionCard    = document.getElementById('questionCard');
const resultCard      = document.getElementById('resultCard');
const progressBar     = document.getElementById('progressBar');
const progressLabel   = document.getElementById('progressLabel');
const questionNumber  = document.getElementById('questionNumber');
const questionText    = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const btnNext         = document.getElementById('btnNext');
const btnBack         = document.getElementById('btnBack');

document.getElementById('btnStart').addEventListener('click', startQuiz);
btnNext.addEventListener('click', nextQuestion);
btnBack.addEventListener('click', prevQuestion);
document.getElementById('btnRestart').addEventListener('click', restart);

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
  questionText.textContent = q.text;

  // Reset animation
  questionCard.style.animation = 'none';
  requestAnimationFrame(() => { questionCard.style.animation = ''; });

  optionsContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[currentQ] === opt.value ? ' selected' : '');
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.label}</span>`;
    btn.addEventListener('click', () => selectOption(opt.value, btn));
    optionsContainer.appendChild(btn);
  });

  btnNext.disabled = answers[currentQ] === undefined;
  btnBack.style.visibility = currentQ === 0 ? 'hidden' : 'visible';
  btnNext.textContent = currentQ === questions.length - 1 ? 'Voir mon résultat 🎉' : 'Suivant →';

  const pct = (currentQ / questions.length) * 100;
  progressBar.style.width = pct + '%';
  progressLabel.textContent = `Question ${currentQ + 1} / ${questions.length}`;
}

function selectOption(value, btn) {
  answers[currentQ] = value;
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

// Calcul du score et affichage du résultat
function showResult() {
  const scores = { A: 0, B: 0, C: 0 };
  answers.forEach(a => { if (scores[a] !== undefined) scores[a]++; });
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const r = results[winner];

  questionCard.classList.add('hidden');
  progressSection.classList.add('hidden');
  resultCard.classList.remove('hidden');
  progressBar.style.width = '100%';

  document.getElementById('resultEmoji').textContent = r.emoji;
  document.getElementById('resultTitle').textContent = r.title;
  document.getElementById('resultTitle').style.color = r.color;
  document.getElementById('resultDesc').textContent = r.desc;
  resultCard.style.background = r.bg;

  // Pills de score
  const pillsEl = document.getElementById('scorePills');
  pillsEl.innerHTML = '';
  const labels = { A: '🐨 Cozy', B: '🦊 Wild', C: '🦉 Wise' };
  const colors = { A: ['#ffd93d', '#7a5c00'], B: ['#ff6b6b', '#7a0000'], C: ['#4d96ff', '#001f7a'] };
  Object.entries(scores).forEach(([k, v]) => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.style.background = colors[k][0] + '33';
    pill.style.color = colors[k][1];
    pill.textContent = `${labels[k]}: ${v} pts`;
    pillsEl.appendChild(pill);
  });
}

function restart() {
  currentQ = 0;
  answers = [];
  resultCard.classList.add('hidden');
  introHeader.classList.remove('hidden');
  startCard.classList.remove('hidden');
  progressSection.classList.add('hidden');
  progressBar.style.width = '0%';
  resultCard.style.background = '';
}
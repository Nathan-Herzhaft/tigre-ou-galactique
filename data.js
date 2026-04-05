// =====================================================
// 📝 data.js — toutes les données du quiz
// C'est le seul fichier que tu as besoin de modifier !
// =====================================================

// -------------------------------------------------------
// QUESTIONS
// Chaque option a un champ "points" (entier, >= 0).
// Le nombre d'options par question est libre (2 à 5).
// -------------------------------------------------------
const questions = [
  {
    text: "C'est samedi matin, tu fais quoi ?",
    options: [
      { label: "Grasse mat' jusqu'à midi, évidemment 😴", points: 0 },
      { label: "Déjà dehors pour une balade ou du sport 🏃", points: 2 },
      { label: "Un projet créa ou lecture tranquille ☕", points: 1 },
    ]
  },
  {
    text: "En soirée, tu es plutôt…",
    options: [
      { label: "Celui/celle qui danse toute la nuit 🕺", points: 3 },
      { label: "Dans un coin à parler avec 2-3 personnes 🗣️", points: 1 },
      { label: "Rentré·e à minuit, le lit m'appelle 🛌", points: 0 },
    ]
  },
  {
    text: "Ton repas idéal ?",
    options: [
      { label: "Un bon plat fait maison, en prenant le temps 🍝", points: 1 },
      { label: "Un kebab entre amis à 2h du mat' 🌯", points: 3 },
      { label: "N'importe quoi du moment que c'est rapide 😅", points: 0 },
    ]
  },
  {
    text: "Un truc se casse chez toi. Tu…",
    options: [
      { label: "Cherches un tuto YouTube et tu répares 🔧", points: 2 },
      { label: "Demandes à quelqu'un de le faire à ta place 😇", points: 0 },
      { label: "Improvises jusqu'à ce que ça marche (ou pas) 🤞", points: 3 },
    ]
  },
  {
    text: "Quelle phrase te ressemble le plus ?",
    options: [
      { label: "\"Je verrai ça demain\" 😌", points: 0 },
      { label: "\"Carpe diem, on y va !\" ⚡", points: 3 },
      { label: "\"Laisse-moi d'abord faire une liste\" 📋", points: 1 },
    ]
  },
  {
    text: "Tu reçois un message inattendu d'un inconnu. Tu…",
    options: [
      { label: "Réponds avec enthousiasme, nouvelle aventure ! 🎉", points: 3 },
      { label: "Lis, marques comme non lu, réponds dans 3 jours 👀", points: 0 },
      { label: "Analyses le message avant de répondre prudemment 🧐", points: 1 },
    ]
  },
  {
    text: "Ton superpouvoir idéal ?",
    options: [
      { label: "Téléportation — bye bye les transports 🚀", points: 3 },
      { label: "Lire dans les pensées 🧠", points: 1 },
      { label: "Ne jamais avoir besoin de dormir... ou l'inverse 😴", points: 0 },
    ]
  },
];

// -------------------------------------------------------
// SEUILS
//
// Le score est normalisé en % (0–100) pour être
// indépendant du nombre de questions et de points.
//
//   score% <= low   → TIGRE
//   score% >= high  → GALACTIQUE
//   entre les deux  → HYBRIDE (tigre cosmique)
// -------------------------------------------------------
const thresholds = {
  low:  35, // % en dessous → Tigre
  high: 65, // % au dessus  → Galactique
};

// -------------------------------------------------------
// RÉSULTATS
// - emoji  : affiché en grand
// - title  : titre du profil
// - desc   : description (drôle de préférence 😄)
// - color  : couleur principale (texte, pill)
// - theme  : classe CSS appliquée sur .result-card
// - bg     : classe CSS appliquée sur body (fond pleine page)
// -------------------------------------------------------
const results = {
  TIGER: {
    emoji: "🐯",
    title: "TIGRE SUPRÊME",
    desc:  "Tu es un prédateur. Pas au sens littéral (enfin on espère). Tu fonces, tu rugis, tu agis avant de réfléchir — et ça marche. La jungle, c'est ton terrain. Les autres suivent ou ils déblayent. 🔥",
    color: "#ff6b1a",
    theme: "theme-tiger",
    bg:    "bg-tiger",
  },
  GALAXY: {
    emoji: "🌌",
    title: "ÊTRE GALACTIQUE",
    desc:  "Tu flottes au-dessus de tout ça. Littéralement. Ton cerveau tourne à une fréquence que les autres ne captent pas encore. Tu penses en années-lumière pendant que les autres pensent en minutes. 🛸",
    color: "#00d4ff",
    theme: "theme-galaxy",
    bg:    "bg-galaxy",
  },
  HYBRID: {
    emoji: "🐯🚀",
    title: "TIGRE COSMIQUE",
    desc:  "Félicitations, tu es un accident cosmique rarissime. Mi-fauve, mi-extraterrestre. Tu rugis dans le vide intersidéral et ça ne t'étonne même pas. Les scientifiques ne savent pas quoi faire de toi. Bienvenue au club. 🌿✨",
    color: "#00ff88",
    theme: "theme-hybrid",
    bg:    "bg-hybrid",
  },
};
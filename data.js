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
    text: "Mon jeu vidéo préféré d'enfance ?",
    options: [
      { label: "Pokemon Platine", points: -1 },
      { label: "Super Mario Galaxy", points: 2 },
      { label: "Le programme d'entraînement cérébral du Docteur Kawashima", points: 2 },
      { label: "GTA (sur DS)", points: -1},
    ]
  },
  {
    text: "Ma suite de résultats préférée au triman (sachant que je ne suis pas triman) ?",
    options: [
      { label: "3-1, 5-5, 5-2", points: 2 },
      { label: "4-2 (sec)", points: -3 },
      { label: "3-3, 3-3, 4-2", points: -1 },
      { label: "1-1 (bus par politesse), 2-1, 5-1", points: 1 },
      { label: "2-1, 4-1", points: 2}
    ]
  },
  {
    text: "Ma suite de résultats préférée au triman (sachant que je suis triman) ?",
    options: [
      { label: "3-1, 5-5, 5-2", points: 2 },
      { label: "4-2 (sec)", points: 0 },
      { label: "3-3, 3-3, 4-2", points: -2 },
      { label: "1-1 (bus par politesse), 2-1, 5-1", points: 1 },
      { label: "2-1, 4-1", points: 3}
    ]
  },
    {
    text: "A l'école des sorciers, je suis dans la maison…",
    options: [
      { label: "Gryffondor", points: -1 },
      { label: "Serpentard", points: 2 },
      { label: "Serdaigle", points: 3 },
      { label: "Poufsouffle", points: -2 },
    ]
  },
    {
    text: "Mon superpouvoir idéal ?",
    options: [
      { label: "Se téléporter", points: 1 },
      { label: "Cracher du feu", points: -2 },
      { label: "Lire dans les pensées", points: 3 },
      { label: "Super vitesse", points: -1}
    ]
  },
  {
    text: "En khôlle de maths... ?",
    options: [
      { label: "J'arrive sans connaître le cours", points: 0 },
      { label: "Je plie un classique, comme d'habitude", points: 0 },
      { label: "Je tente d'arnaquer le colleur (la supercherie ne fonctionne pas, il me met 10)", points: -1 },
      { label: "Je réussi l'exo sans faire exprès et prends mon 18 (je n'ai rien compris)", points: 1 },
      { label: "Je gaze la salle", points: -1 },
    ]
  },
  {
    text: "Mon Genin préféré dans Naruto ?",
    options: [
      { label: "Naruto", points: -1 },
      { label: "Gaara", points: 0 },
      { label: "Sasuke", points: 2 },
      { label: "Shikamaru", points: 1 },
      { label: "Kiba", points: -1 },
    ]
  },
  {
    text: "Mon plat préféré, au déjeuner avant de reprendre les cours de l'après-midi ?",
    options: [
      { label: "Une pizza chèvre-miel", points: 1 },
      { label: "Du pouler", points: -1 },
      { label: "Un tupperware gnoochi épinards, préparé la veille", points: 2 },
      { label: "Un panini", points: 0 },
    ]
  },
  {
    text: "19h un soir d'été en terasse après le travail je préfère...",
    options: [
      { label: "Le pichet de blonde de Dom", points: 0 },
      { label: "La delirium du pop simoké", points: -1 },
      { label: "Un coca bien frais chacal", points: 2 },
      { label: "Je préfère rentrer chez moi", points: 3 },
    ]
  },
  {
    text: "Mon style de jeu sur un terrain de foot ?",
    options: [
      { label: "Je fais un pressing étouffant tah Dembele", points: 3 },
      { label: "Je n'arrive pas à passer la défense donc je tente un frappe de loin (qui échoue)", points: -2 },
      { label: "Je me blesse", points: -1 },
      { label: "J'attends devant les cages adverses qu'un ballon arrive dans mes pieds", points: 2 },
    ]
  },
  {
    text: "Dans un Fallen Kingdom, durant la phase préparatoire…",
    options: [
      { label: "Je mine indéfiniment jusqu'à ce que ma team entière soit full diamant", points: 3 },
      { label: "Je chasse du pouler", points: -1 },
      { label: "Je regarde un tuto pour crafter une épée en bois", points: 2 },
      { label: "Je prépare des pièges avec de la lave et je meure dedans", points: -1 },
      { label: "Je triche", points: 2}
    ]
  },
  {
    text: "En normal game sur LoL…",
    options: [
      { label: "Je joue Tryndamere et ma team ne me voit pas avant que je sois level 16", points: 0 },
      { label: "Je joue Xerath mid et je tire de loin", points: 2 },
      { label: "Je joue un duo bot Xayah-Rakan en mode no homo", points: -1 },
      { label: "Je joue Nunu", points: -2 },
      { label: "Je random pick", points: -2}
    ]
  },
  {
    text: "Dans mon groupe de musique je joue…",
    options: [
      { label: "De la guitare électrique", points: -1 },
      { label: "Du saxophone", points: -1 },
      { label: "Du piano", points: 1 },
      { label: "Je chante", points: 1 },
      { label: "Je chante (moyennement bien, mais je ne sais rien faire d'autre)", points: 0}
    ]
  },
  {
    text: "C'est l'anniversaire de mon ami. Je lui offre…",
    options: [
      { label: "Rieng", points: 0 },
      { label: "Une bonne pinte", points: 0 },
      { label: "Un super happening préparé en amont", points: 1 },
      { label: "Un cadeau de fou qui lui fera trop plaisir", points: -1 },
    ]
  },
  {
    text: "Mon serveur préféré au café des Halles…",
    options: [
      { label: "Dom", points: 0 },
      { label: "Le grand qui nous sert des shots dans des tubes à essai", points: 0 },
      { label: "La meuf qui a lavé le vomi de Dono", points: 0 },
      { label: "La meuf qui est restée que un jour, qui a souri à Nathan et Seb a tout gâché", points: 0 },
    ]
  },

];

// -------------------------------------------------------
// SEUILS
//
// Le score est la somme brute des points (peut être négatif).
// Plus le score est négatif → TIGRE
// Plus le score est positif → GALACTIQUE
//
// Exemples avec 10 questions à ±3 pts (min -30 / max +30) :
//   score <= -8  → TIGRE
//   score >= +8  → GALACTIQUE
//   entre les deux → HYBRIDE
//
// Ajuste low et high selon la plage possible de tes questions.
// -------------------------------------------------------
const thresholds = {
  low:  0, // score <= low  → Tigre
  high:  3, // score >= high → Galactique
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
    emoji: "🐯 ",
    title: "TIGRE",
    desc:  "Bienvenue chez les tigres. Sois fier et rugis, fais trembler la jungle autour de toi. Tu es quelqu'un d'audacieux, tu agis à l'instinct et ça marche rarement. On peut compter sur toi pour le divertissement, moins pour l'efficacité en toute situation. 🔥",
    color: "#ff6b1a",
    theme: "theme-tiger",
    bg:    "bg-tiger",
  },
  GALAXY: {
    emoji: "🌌",
    title: "GALACTIQUE",
    desc:  "Bienvenue chez les galactiques. Tu es fier tout en restant humble. Tu es quelqu'un de réfléchi et discret. Tu préfères un combat gagné par stratégie que par un coup de chance. Tes coéquipiers t'apprécient pour ta sincérité, moins pour ton humour. Ton film préféré est Les petits mouchoirs. 🛸",
    color: "#00d4ff",
    theme: "theme-galaxy",
    bg:    "bg-galaxy",
  },
  HYBRID: {
    emoji: "🐯🚀",
    title: "LION D'ANDROMEDE",
    desc:  "Tu es un cas rarissime, tes réponses ne permettent pas de te classer. Tu as à la fois toutes les qualités et tous les défauts. Tu es libre de choisir ton équipe de coeur, à condition qu'ils t'acceptent. 🌿✨",
    color: "#00ff88",
    theme: "theme-hybrid",
    bg:    "bg-hybrid",
  },
};
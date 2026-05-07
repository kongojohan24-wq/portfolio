// DONNÉES PROJETS
const projects = [
  {
    title: "Tarification Sinistre Auto",
    desc: "Modélisation de la fréquence et du coût des sinistres automobiles sur 600 contrats. Modèles GLM Poisson et Gamma, calcul de primes pures, top 10 des contrats risqués.",
    tags: ["Actuariat", "Python", "GLM", "Poisson", "Gamma"],
    img: "projet1.jpeg",
    rapport: "rapport_sinistres_auto.html"
  },
  {
    title: "Score Risque Crédit",
    desc: "Construction d'un score de crédit pour prédire la probabilité de défaut d'un emprunteur.",
    tags: ["Machine Learning", "Python", "Credit Risk", "XGBoost"],
    img: "projet2.jpg",
    rapport: null
  }
];

// CARROUSEL
function scrollCarousel(dir) {
  const c = document.getElementById('carousel');
  c.scrollBy({ left: dir * 260, behavior: 'smooth' });
}

// MODAL
let currentProject = null;
let comments = JSON.parse(localStorage.getItem('kj_comments') || '{}');

function openModal(index) {
  const p = projects[index];
  currentProject = index;
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent  = p.desc;
  document.getElementById('modal-img').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('modal-tags').innerHTML =
    p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Bouton rapport
  const rapportBtn = document.getElementById('rapport-btn');
  if (p.rapport) {
    rapportBtn.style.display = 'inline-block';
    rapportBtn.onclick = () => openRapport(p.rapport, p.title);
  } else {
    rapportBtn.style.display = 'none';
  }

  renderComments();
  document.getElementById('modal').classList.add('open');
}

function openRapport(url, title) {
  document.getElementById('rapport-title').textContent = title;
  document.getElementById('rapport-frame').src = url;
  document.getElementById('rapport-overlay').classList.add('open');
}

function closeRapport() {
  document.getElementById('rapport-overlay').classList.remove('open');
  document.getElementById('rapport-frame').src = '';

}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('open');
    currentProject = null;
  }
}

function renderComments() {
  const list = document.getElementById('modal-comments');
  const c = comments[currentProject] || [];
  if (c.length === 0) {
    list.innerHTML = '<p class="no-comment">Aucun commentaire pour l\'instant.</p>';
    return;
  }
  list.innerHTML = c.map(cm => `
    <div class="comment-item">
      <div class="comment-author">${cm.name}</div>
      <div class="comment-text">${cm.text}</div>
    </div>
  `).join('');
}

function addModalComment() {
  const name = document.getElementById('modal-name').value.trim();
  const text = document.getElementById('modal-text').value.trim();
  if (!name || !text || currentProject === null) return;
  if (!comments[currentProject]) comments[currentProject] = [];
  comments[currentProject].push({ name, text });
  localStorage.setItem('kj_comments', JSON.stringify(comments));
  document.getElementById('modal-name').value = '';
  document.getElementById('modal-text').value = '';
  renderComments();
}
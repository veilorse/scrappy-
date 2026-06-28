const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const title = document.getElementById('pageTitle');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');

let pantry = [
  { name: 'Spinach', emoji: '🥬', expiry: 'today' },
  { name: 'Tomatoes', emoji: '🍅', expiry: 'tomorrow' },
  { name: 'Eggs', emoji: '🥚', expiry: 'week' },
  { name: 'Bread', emoji: '🍞', expiry: 'week' },
  { name: 'Yogurt', emoji: '🥣', expiry: 'today' }
];

const emojiMap = { spinach:'🥬', tomato:'🍅', tomatoes:'🍅', egg:'🥚', eggs:'🥚', bread:'🍞', yogurt:'🥣', cheese:'🧀', rice:'🍚', chicken:'🍗', onion:'🧅', banana:'🍌', apple:'🍎', potato:'🥔', pasta:'🍝', milk:'🥛', garlic:'🧄', lettuce:'🥬', carrot:'🥕' };
const pageTitles = { home:'Turn leftovers into meals', dashboard:'Your food-saving dashboard', pantry:'Manage your smart pantry', recipes:'Generate recipes from leftovers', scanner:'Scan your kitchen items', shopping:'Smart shopping list', profile:'Your Scrappy profile' };

function setPage(id){
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  navLinks.forEach(b => b.classList.toggle('active', b.dataset.page === id));
  title.textContent = pageTitles[id] || 'Scrappy';
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', e => {
  const target = e.target.closest('[data-page-target]');
  if(target) setPage(target.dataset.pageTarget);
});
navLinks.forEach(btn => btn.addEventListener('click', () => setPage(btn.dataset.page)));
menuBtn.addEventListener('click', () => sidebar.classList.toggle('open'));
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light mode' : '🌙 Dark mode';
});

function expiryLabel(value){ return value === 'today' ? 'expires today' : value === 'tomorrow' ? 'expires tomorrow' : value === 'week' ? 'this week' : 'later'; }
function getEmoji(name){ return emojiMap[name.toLowerCase().trim()] || '🥘'; }
function urgentItems(){ return pantry.filter(i => i.expiry === 'today' || i.expiry === 'tomorrow'); }

function renderAll(){ renderPantry(); renderPriority(); renderRecipes(); }
function renderPantry(){
  const wrap = document.getElementById('pantryList');
  wrap.innerHTML = pantry.map((item, index) => `<button class="pantry-item ${item.expiry === 'today' ? 'urgent' : ''}" onclick="removeItem(${index})"><span>${item.emoji} ${item.name}</span><small>${expiryLabel(item.expiry)}</small></button>`).join('');
}
function renderPriority(){
  const list = document.getElementById('priorityList');
  const items = urgentItems();
  list.innerHTML = items.length ? items.map(i => `<div class="priority-item urgent"><span>${i.emoji} ${i.name}</span><small>${expiryLabel(i.expiry)}</small></div>`).join('') : '<p>Nothing urgent today. Your kitchen is calm 🌱</p>';
  document.getElementById('dashboardRecipe').innerHTML = buildRecipeHTML(false);
}
function buildRecipeHTML(full=true){
  const base = urgentItems().length ? urgentItems() : pantry.slice(0,3);
  const names = base.map(i=>i.name).join(', ');
  const title = base.some(i=>i.name.toLowerCase().includes('tomato')) ? 'Rescue Toast with Tomato & Greens' : 'Zero-Waste Pantry Bowl';
  return `<div class="recipe-result"><h4>🍳 ${title}</h4><p>Best for using: <b>${names}</b></p>${full ? '<ul><li>Prep the expiring ingredients first.</li><li>Toast, sauté, or mix everything into one quick meal.</li><li>Scrappy prioritizes food that would be wasted soon.</li></ul>' : '<p>Ready in about 12 minutes and designed to save expiring ingredients.</p>'}</div>`;
}
function renderRecipes(){ document.getElementById('recipeResult').innerHTML = buildRecipeHTML(true); }
window.removeItem = function(index){ pantry.splice(index,1); renderAll(); };

document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('itemName');
  const expiry = document.getElementById('itemExpiry').value;
  const name = input.value.trim();
  if(!name) return;
  pantry.push({ name, emoji:getEmoji(name), expiry });
  input.value = '';
  renderAll();
});
document.getElementById('resetPantry').addEventListener('click', () => { pantry = [
  { name: 'Spinach', emoji: '🥬', expiry: 'today' }, { name: 'Tomatoes', emoji: '🍅', expiry: 'tomorrow' }, { name: 'Eggs', emoji: '🥚', expiry: 'week' }, { name: 'Bread', emoji: '🍞', expiry: 'week' }, { name: 'Yogurt', emoji: '🥣', expiry: 'today' }
]; renderAll(); });
document.getElementById('generateRecipe').addEventListener('click', renderRecipes);
document.getElementById('scanBtn').addEventListener('click', () => {
  const found = [{name:'Cheese',emoji:'🧀',expiry:'week'},{name:'Banana',emoji:'🍌',expiry:'tomorrow'},{name:'Rice',emoji:'🍚',expiry:'later'}];
  found.forEach(item => pantry.push(item));
  document.getElementById('scanOutput').innerHTML = found.map(i => `<div><span>${i.emoji} ${i.name}</span><small>${expiryLabel(i.expiry)}</small></div>`).join('');
  renderAll();
});
renderAll();

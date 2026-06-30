// Scrappy v3 roadmap integrated
const icons = {
  layout:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="8"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="15" width="7" height="6"/></svg>',
  box:'<svg viewBox="0 0 24 24"><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg>',
  camera:'<svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  chef:'<svg viewBox="0 0 24 24"><path d="M6 14h12v7H6z"/><path d="M7 14c-3-1-3-6 1-6 1-5 8-5 9 0 4 0 4 5 1 6"/></svg>',
  cart:'<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>',
  phone:'<svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  plate:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 3v18M16 3v18"/></svg>',
  clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  leaf:'<svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13C4 6 20 4 20 4s-2 16-9 16z"/><path d="M4 20c4-4 8-8 16-16"/></svg>',
  wallet:'<svg viewBox="0 0 24 24"><path d="M3 7h18v14H3z"/><path d="M16 11h6v6h-6z"/><path d="M3 7V5a2 2 0 0 1 2-2h14"/></svg>',
  help:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4"/><path d="M12 17h.01"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  spark:'<svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>',
  code:'<svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
  database:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 2 4 3 9 3s9-1 9-3V5"/><path d="M3 12c0 2 4 3 9 3s9-1 9-3"/></svg>'
};

document.querySelectorAll('[data-icon]').forEach(el => {
  el.innerHTML = icons[el.dataset.icon] || '';
});

const pantry = [
  {name:'Spinach', qty:'1 bag', category:'Fridge', days:1},
  {name:'Yogurt', qty:'2 cups', category:'Fridge', days:1},
  {name:'Eggs', qty:'8', category:'Fridge', days:1},
  {name:'Chicken', qty:'400g', category:'Freezer', days:9},
  {name:'Rice', qty:'1 kg', category:'Pantry', days:30},
  {name:'Cheese', qty:'1 block', category:'Fridge', days:5},
  {name:'Garlic', qty:'6 cloves', category:'Pantry', days:20},
  {name:'Tomatoes', qty:'4', category:'Fridge', days:2}
];

const recipeIdeas = [
  {name:'Spinach, Egg and Chicken Skillet', time:'18 minutes', match:'High', uses:['Spinach','Eggs','Chicken','Garlic'], steps:['Cook garlic lightly.','Add chicken until warmed through.','Add spinach until wilted.','Crack eggs on top and cover until set.']},
  {name:'Savory Yogurt Rice Bowl', time:'12 minutes', match:'Medium', uses:['Yogurt','Rice','Chicken','Garlic'], steps:['Warm cooked rice.','Mix yogurt with garlic and seasoning.','Add chicken on top.','Serve with herbs if available.']},
  {name:'Spinach Cheese Omelette', time:'10 minutes', match:'High', uses:['Spinach','Eggs','Cheese'], steps:['Beat eggs.','Cook spinach.','Add eggs and cheese.','Fold and serve.']}
];

function statusFor(days){
  if(days <= 1) return ['danger','Use first'];
  if(days <= 3) return ['warn','Soon'];
  return ['good','Fresh'];
}

function renderDashboard(){
  const expiry = document.getElementById('expiryList');
  const meals = document.getElementById('todayMeals');
  if(!expiry || !meals) return;

  expiry.innerHTML = pantry
    .filter(i => i.days <= 3)
    .sort((a,b)=>a.days-b.days)
    .map(item => {
      const [cls,label] = statusFor(item.days);
      return `<div class="expiry-card">
        <div><strong>${item.name}</strong><p>${item.qty} • ${item.category} • expires in ${item.days} day(s)</p></div>
        <span class="status ${cls}">${label}</span>
      </div>`;
    }).join('');

  meals.innerHTML = recipeIdeas.map(r => `<div class="meal-card">
    <div><strong>${r.name}</strong><p>${r.time} • Uses ${r.uses.join(', ')}</p></div>
    <span class="status good">${r.match}</span>
  </div>`).join('');
}

function renderPantry(){
  const grid = document.getElementById('pantryGrid');
  if(!grid) return;
  const q = (document.getElementById('pantrySearch')?.value || '').toLowerCase();
  const cat = document.getElementById('categoryFilter')?.value || 'all';

  grid.innerHTML = pantry
    .filter(i => i.name.toLowerCase().includes(q))
    .filter(i => cat === 'all' || i.category === cat)
    .map(item => {
      const [cls,label] = statusFor(item.days);
      return `<article class="pantry-card ${cls}">
        <h3>${item.name}</h3>
        <p class="muted">${item.qty}</p>
        <div class="pantry-meta">
          <span class="pill">${item.category}</span>
          <span class="pill">${item.days} day(s)</span>
          <span class="pill">${label}</span>
        </div>
      </article>`;
    }).join('');
}

function renderChoices(){
  const exp = document.getElementById('expiringChoices');
  const opt = document.getElementById('optionalChoices');
  if(!exp || !opt) return;

  exp.innerHTML = pantry.filter(i=>i.days<=2).map(i=>`
    <label class="choice"><input type="checkbox" class="recipe-check" value="${i.name}" checked> ${i.name} <span class="pill">${i.days} day(s)</span></label>
  `).join('');

  opt.innerHTML = pantry.filter(i=>i.days>2).map(i=>`
    <label class="choice"><input type="checkbox" class="recipe-check" value="${i.name}"> ${i.name} <span class="pill">${i.category}</span></label>
  `).join('');
}

function showToast(message){
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
}

document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.page).classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

document.querySelectorAll('[data-jump]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const target = btn.dataset.jump;
    document.querySelector(`.nav-btn[data-page="${target}"]`)?.click();
  });
});

document.getElementById('addItemForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  pantry.push({
    name: itemName.value.trim(),
    qty: itemQty.value.trim(),
    category: itemCategory.value,
    days: Number(itemDays.value)
  });
  e.target.reset();
  itemDays.value = 3;
  renderDashboard(); renderPantry(); renderChoices();
  showToast('Ingredient added to pantry');
});

document.getElementById('pantrySearch')?.addEventListener('input',renderPantry);
document.getElementById('categoryFilter')?.addEventListener('change',renderPantry);

document.getElementById('simulateScan')?.addEventListener('click',()=>{
  const status = document.getElementById('scanStatus');
  status.textContent = 'Scanning image... detecting ingredients and expiry dates';
  setTimeout(()=> status.textContent = 'Detected: Spinach, Yogurt, Eggs, Chicken. Pantry and recipes updated.', 1300);
  showToast('AI vision scan simulated');
});

document.getElementById('generateRecipe')?.addEventListener('click',()=>{
  const selected = [...document.querySelectorAll('.recipe-check:checked')].map(x=>x.value);
  const output = document.getElementById('recipeOutput');
  if(selected.length === 0){
    showToast('Select at least one ingredient');
    return;
  }
  const includesChicken = selected.includes('Chicken');
  const title = includesChicken ? 'Spinach Chicken Yogurt Bowl' : 'Use-First Spinach Egg Plate';
  output.classList.add('show');
  output.innerHTML = `
    <span class="eyebrow">Generated recipe</span>
    <h3>${title}</h3>
    <p>This recipe prioritizes expiring ingredients while allowing extra pantry items for a better meal.</p>
    <div class="recipe-ingredients">${selected.map(x=>`<span class="pill">${x}</span>`).join('')}</div>
    <ol class="clean-list">
      <li>Start with the ingredients expiring soon.</li>
      <li>Add selected pantry extras to improve flavor and protein.</li>
      <li>Cook as a balanced meal instead of forcing only near-expiry items.</li>
      <li>After cooking, mark used items so pantry stays accurate.</li>
    </ol>
  `;
});

renderDashboard();
renderPantry();
renderChoices();

// TODO: Implement Firebase Auth, Admin approval, AI Vision scanner.

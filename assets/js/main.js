// Velocity Funds main.js
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }

  // Pricing toggle (used by home plans module)
  const toggle = document.getElementById("billingToggle");
  if (toggle) { toggle.checked = true; }

  // Removed unused Evaluation Models tab logic (no matching DOM elements)
  // Home plans module
  const planStarterBtn = document.getElementById('planStarter');
  const planFundedBtn = document.getElementById('planFunded');
  const sizeRow = document.getElementById('sizeRow');
  const stageCard = document.getElementById('stageCard');
  const priceDisplay = document.getElementById('priceDisplay');
  const sizeSummary = document.querySelector('[data-summary="size"]');
  const capWrap = document.getElementById('capSelectWrap');
  const capHome = document.getElementById('capSelectHome');

  const kv = {
    target: document.querySelector('[data-kv="target"]'),
    mll: document.querySelector('[data-kv="mll"]'),
    daily: document.querySelector('[data-kv="daily"]'),
    days: document.querySelector('[data-kv="days"]'),
    consistency: document.querySelector('[data-kv="consistency"]'),
    contracts: document.querySelector('[data-kv="contracts"]'),
    cap: document.querySelector('[data-kv="cap"]'),
  };

  const data = {
    starter: {
      '25k': { target: 1750, mll: 1500, daily: '—', days: 3, consistency: '35%', contracts: 2, cap: '$5,000', price: { onetime: 125, monthly: 99 } },
      '50k': { target: 3000, mll: 2000, daily: '—', days: 3, consistency: '35%', contracts: 4, cap5k: '$5,000', cap1k: '$1,000', price: { onetime: 225, monthly: 179 }, monthly1k: 86 },
      '100k': { target: 6000, mll: 3000, daily: '—', days: 3, consistency: '35%', contracts: 6, cap: '$5,000', price: { onetime: 375, monthly: 299 } },
    },
    funded: {
      '25k': { mll: 1500, contracts: 2, split: '90%', price: 333 },
      '50k': { mll: 2000, contracts: 4, split: '90%', price: 499 },
      '100k': { mll: 3000, contracts: 6, split: '90%', price: 749 },
    },
  };

  let planType = 'starter';
  let size = '25k';

  function fmtUsd(n){ return '$' + Number(n).toLocaleString(); }
  function setActivePills(row, matchAttr, val){
    if (!row) return;
    row.querySelectorAll('.pill').forEach(btn => {
      const m = btn.getAttribute(matchAttr);
      if (m === val) btn.classList.add('active'); else btn.classList.remove('active');
    });
  }
  function updateUI(){
    if (!stageCard || !priceDisplay || !kv.target) return;
    if (sizeSummary) sizeSummary.textContent = size;
    if (planType === 'starter'){
      stageCard.innerHTML = '<div class="flex items-center justify-between"><div><div class="font-bold">Evaluation Stage <span class="muted">(Starter)</span></div><div class="muted text-sm mt-1">Reward Cycles: Every 5 trading days at 90% split</div></div><div class="hidden lg:block">&nbsp;</div></div>';
      const d = data.starter[size];
      kv.target.textContent = fmtUsd(d.target);
      kv.mll.textContent = fmtUsd(d.mll);
      kv.daily.textContent = d.daily;
      kv.days.textContent = d.days;
      kv.consistency.textContent = d.consistency;
      kv.contracts.textContent = d.contracts;
      kv.cap.textContent = size==='50k' && capHome ? (capHome.value==='1k' ? data.starter['50k'].cap1k : data.starter['50k'].cap5k) : (d.cap || '$5,000');
      // Price calc
      const monthlyBase = (size==='50k' && capHome && capHome.value==='1k') ? data.starter['50k'].monthly1k : d.price.monthly;
      const price = toggle && toggle.checked ? monthlyBase : d.price.onetime;
      priceDisplay.textContent = toggle && toggle.checked ? '$'+price+'/mth' : fmtUsd(price);
      // Reward cap visibility
      if (capWrap) capWrap.style.display = (size==='50k') ? 'block' : 'none';
    } else {
      stageCard.innerHTML = '<div class="flex items-center justify-between"><div><div class="font-bold">Master Stage <span class="muted">(Funded)</span></div><div class="muted text-sm mt-1">Reward Cycles: Every 5 trading days at 90% split</div></div><div class="hidden lg:block">&nbsp;</div></div>';
      const d = data.funded[size];
      kv.target.textContent = '—';
      kv.mll.textContent = fmtUsd(d.mll);
      kv.daily.textContent = '—';
      kv.days.textContent = '—';
      kv.consistency.textContent = '—';
      kv.contracts.textContent = d.contracts;
      kv.cap.textContent = 'Dynamic';
      priceDisplay.textContent = fmtUsd(d.price);
      if (capWrap) capWrap.style.display = 'none';
    }
  }

  // Wire events
  if (sizeRow){
    sizeRow.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        size = btn.getAttribute('data-size');
        setActivePills(sizeRow, 'data-size', size);
        updateUI();
      });
    });
  }
  if (planStarterBtn && planFundedBtn){
    planStarterBtn.addEventListener('click', () => { planType='starter'; planStarterBtn.classList.add('active'); planFundedBtn.classList.remove('active'); updateUI(); });
    planFundedBtn.addEventListener('click', () => { planType='funded'; planFundedBtn.classList.add('active'); planStarterBtn.classList.remove('active'); updateUI(); });
  }
  if (capHome) capHome.addEventListener('change', updateUI);
  if (toggle) toggle.addEventListener('change', updateUI);
  updateUI();
});



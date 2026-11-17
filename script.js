'use strict';
/* No network, dependency or build step. data.js remains the source of truth. */
const $ = id => document.getElementById(id);
const money = n => '৳' + Number(n).toLocaleString('en-BD', { maximumFractionDigits: 2 });
const number = n => Number(n).toLocaleString('en-BD', { maximumFractionDigits: 2 });
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byCode = new Map(PRODUCTS.map(p => [p.code, p]));
const categories = [...new Set(PRODUCTS.map(p => p.category))];
const categoryLabels = ['Health food', 'Food & beverage', 'Personal care', 'Skin & cosmetics', 'Home care'];
const quantities = Object.create(null);
const rowNodes = new Map();
const orderNodes = new Map();
const removals = new Map();
const animatedValues = new Map();
const animations = new Map();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let category = 'all';
let totals = { dp: 0, mrp: 0, profit: 0, pv: 0, sv: 0, qty: 0 };
let liveTimer, toastTimer, selectedFocusTimer;
let themeChoice = null;
const STORE = 'dxn-studio-order-v3';

function restartMotion(el, className) {
  if (!el || reducedMotion.matches) return;
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}
function storageStatus(ok) {
  $('saveStatus').textContent = ok ? 'Saved on this device' : 'Device storage unavailable · this session only';
}
function saveOrder() {
  try {
    localStorage.setItem(STORE, JSON.stringify({ quantities, customer: $('memberName').value }));
    storageStatus(true);
  } catch (_) { storageStatus(false); }
}
function restoreOrder() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) || 'null');
    if (raw && typeof raw === 'object') {
      for (const p of PRODUCTS) {
        const n = Number(raw.quantities?.[p.code]);
        if (Number.isFinite(n) && n > 0) quantities[p.code] = Math.min(99999, Math.trunc(n));
      }
      if (typeof raw.customer === 'string') $('memberName').value = raw.customer.slice(0, 120);
    }
    // file:// storage support varies; probe once without retaining an extra key.
    localStorage.setItem('dxn-storage-probe', '1');
    localStorage.removeItem('dxn-storage-probe');
    storageStatus(true);
  } catch (_) { storageStatus(false); }
}
function effectiveTheme() { return themeChoice || (systemTheme.matches ? 'dark' : 'light'); }
function applyTheme() {
  const theme = effectiveTheme();
  document.documentElement.dataset.theme = theme;
  $('themeIcon').textContent = theme === 'dark' ? '☀' : '☾';
  $('themeLabel').textContent = theme === 'dark' ? 'Light' : 'Dark';
  $('themeToggle').setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
  $('themeToggle').title = $('themeToggle').getAttribute('aria-label');
}
try { const t = localStorage.getItem('dxn-theme'); if (t === 'light' || t === 'dark') themeChoice = t; } catch (_) {}
applyTheme();
systemTheme.addEventListener('change', () => { if (!themeChoice) applyTheme(); });
$('themeToggle').addEventListener('click', () => {
  themeChoice = effectiveTheme() === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('dxn-theme', themeChoice); } catch (_) {}
  applyTheme();
});

function markup(p) { return (p.mrp - p.dp) / p.dp * 100; }
function tier(p) { const m = markup(p); return m < 15 ? 'low' : m <= 25 ? 'medium' : 'high'; }
function createRow(p, i) {
  const row = document.createElement('tr');
  row.className = 'product-row'; row.dataset.code = p.code;
  row.style.setProperty('--i', Math.min(i, 9));
  const level = tier(p);
  row.innerHTML = `<td><button class="product-name" data-add="1" aria-label="Add one ${esc(p.name)}">${esc(p.name)}</button><div class="product-meta"><span>${esc(p.code)}</span><span class="category-detail">${esc(p.category)}</span></div></td>
    <td><span class="cell-label">DP</span>${money(p.dp)}</td>
    <td class="mrp"><span class="cell-label">MRP</span>${money(p.mrp)}</td>
    <td><span class="gain">+${money(p.mrp - p.dp)}</span><span class="markup ${level}" title="${level} markup on cost">${markup(p).toFixed(1)}% · ${level}</span></td>
    <td><span class="cell-label">SV</span>${number(p.sv)}</td><td><span class="cell-label">PV</span>${number(p.pv)}</td>
    <td><div class="qty"><button type="button" data-step="-1" aria-label="Decrease ${esc(p.name)}">−</button><input data-qty="${esc(p.code)}" aria-label="Quantity for ${esc(p.name)}" type="number" inputmode="numeric" min="0" max="99999" step="1" value="0"><button type="button" data-step="1" aria-label="Increase ${esc(p.name)}">+</button></div><div class="quick-add"><button type="button" data-add="5" aria-label="Add five ${esc(p.name)}">+5</button><button type="button" data-add="10" aria-label="Add ten ${esc(p.name)}">+10</button></div></td>`;
  rowNodes.set(p.code, row); updateRow(p.code, false); return row;
}
function updateRow(code, animate = true) {
  const row = rowNodes.get(code); if (!row) return;
  const q = quantities[code] || 0;
  const input = row.querySelector('[data-qty]');
  // Keep this same input node, focus, and caret on every quantity update.
  input.value = q;
  row.querySelector('[data-step="-1"]').disabled = q === 0;
  row.classList.toggle('selected', q > 0);
  if (animate) restartMotion(input, 'pop');
}
function filtered() {
  const query = $('productSearch').value.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (p.name + ' ' + p.code).toLowerCase().includes(query)
    && (category === 'all' || p.category === category)
    && (!$('selectedOnly').checked || (quantities[p.code] || 0) > 0));
  const sorts = {
    profit: (a, b) => (b.mrp - b.dp) - (a.mrp - a.dp),
    priceAsc: (a, b) => a.mrp - b.mrp,
    priceDesc: (a, b) => b.mrp - a.mrp,
    pv: (a, b) => b.pv - a.pv,
    sv: (a, b) => b.sv - a.sv
  };
  if (sorts[$('sortFilter').value]) list.sort(sorts[$('sortFilter').value]);
  return list;
}
function updateResultCount() {
  const count = $('products').children.length;
  $('productCount').textContent = `${count} of ${PRODUCTS.length} products`;
  $('empty').hidden = count !== 0;
}
function renderResults() {
  const fragment = document.createDocumentFragment();
  filtered().forEach((p, i) => {
    const row = rowNodes.get(p.code);
    row.style.setProperty('--i', Math.min(i, 9));
    row.style.animation = 'none';
    fragment.appendChild(row);
  });
  $('products').replaceChildren(fragment);
  void $('products').offsetWidth;
  for (const row of $('products').children) row.style.animation = '';
  for (const chip of $('categoryChips').children) {
    const active = chip.dataset.category === category;
    chip.classList.toggle('active', active); chip.setAttribute('aria-pressed', active);
  }
  updateResultCount();
}
function calculateTotals() {
  const t = { dp: 0, mrp: 0, profit: 0, pv: 0, sv: 0, qty: 0 };
  for (const p of PRODUCTS) {
    const q = quantities[p.code] || 0;
    t.dp += p.dp * q; t.mrp += p.mrp * q; t.pv += p.pv * q; t.sv += p.sv * q; t.qty += q;
  }
  t.profit = t.mrp - t.dp;
  return t;
}
function animateNumber(id, target, formatter, animate = true) {
  const el = $(id);
  const from = animatedValues.get(id) || 0;
  if (animations.has(id)) cancelAnimationFrame(animations.get(id));
  animations.delete(id);
  const finish = () => { el.textContent = formatter(target); animatedValues.set(id, target); };
  if (!animate || reducedMotion.matches || from === target) { finish(); return; }
  // Set size once per change to preserve card height, including very large orders.
  const card = el.closest('.stat');
  if (card) {
    const len = formatter(target).length;
    el.style.fontSize = len > 12 ? 'clamp(16px,1.6vw,24px)' : len > 9 ? 'clamp(20px,2vw,30px)' : '';
    restartMotion(card, 'pulse');
  }
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / 500, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = from + (target - from) * eased;
    animatedValues.set(id, value);
    el.textContent = formatter(Math.round(value));
    if (progress < 1) animations.set(id, requestAnimationFrame(frame));
    else { finish(); animations.delete(id); }
  }
  animations.set(id, requestAnimationFrame(frame));
}
function createOrderItem(p) {
  const item = document.createElement('div');
  item.className = 'order-item entering'; item.dataset.code = p.code;
  item.innerHTML = `<div class="order-item-content"><span><strong>${esc(p.name)}</strong><small>${esc(p.code)}</small></span><span data-item-qty></span><span data-item-retail></span><span class="positive" data-item-profit></span></div>`;
  return item;
}
function syncOrderItems(animate = true) {
  for (const p of PRODUCTS) {
    const q = quantities[p.code] || 0;
    let node = orderNodes.get(p.code);
    if (q > 0) {
      if (removals.has(p.code)) { clearTimeout(removals.get(p.code)); removals.delete(p.code); node.classList.remove('removing'); node.style.height = ''; }
      if (!node) {
        node = createOrderItem(p); if (!animate) node.classList.remove('entering');
        orderNodes.set(p.code, node);
        // Preserve catalog order without detaching any existing summary item.
        const next = PRODUCTS.slice(PRODUCTS.indexOf(p) + 1).map(x => orderNodes.get(x.code)).find(Boolean);
        $('orderItems').insertBefore(node, next || null);
      }
      node.querySelector('[data-item-qty]').textContent = number(q);
      node.querySelector('[data-item-retail]').textContent = money(p.mrp * q);
      node.querySelector('[data-item-profit]').textContent = money((p.mrp - p.dp) * q);
    } else if (node && !removals.has(p.code)) {
      const remove = () => { node.remove(); orderNodes.delete(p.code); removals.delete(p.code); };
      if (!animate || reducedMotion.matches) remove();
      else {
        node.style.height = node.offsetHeight + 'px';
        void node.offsetHeight;
        node.classList.add('removing');
        removals.set(p.code, setTimeout(remove, 260));
      }
    }
  }
  $('orderEmpty').hidden = totals.qty > 0;
  document.querySelector('.order-table-head').hidden = totals.qty === 0;
}
function updateSummary(animate = true) {
  const oldProfit = totals.profit;
  totals = calculateTotals();
  for (const [id, value, format] of [
    ['totalDP', totals.dp, money], ['totalMRP', totals.mrp, money], ['totalProfit', totals.profit, money],
    ['totalPV', totals.pv, number], ['totalSV', totals.sv, number],
    ['receiptDP', totals.dp, money], ['receiptMRP', totals.mrp, money], ['receiptProfit', totals.profit, money]
  ]) animateNumber(id, value, format, animate);
  if (totals.profit > oldProfit && animate) restartMotion($('totalProfit'), 'increased');
  $('marginLabel').textContent = (totals.dp ? (totals.profit / totals.dp * 100).toFixed(2) : '0') + '% markup on cost';
  $('receiptPoints').textContent = `${number(totals.pv)} / ${number(totals.sv)}`;
  for (const id of ['totalQty', 'barQty', 'navCount', 'mobileCount']) $(id).textContent = number(totals.qty);
  $('barProfit').textContent = money(totals.profit);
  $('barProfit').style.fontSize = money(totals.profit).length > 10 ? '14px' : '';
  $('orderBar').setAttribute('aria-label', `${number(totals.qty)} units, gross profit ${money(totals.profit)}. Open order summary`);
  $('showName').textContent = $('memberName').value.trim() || 'Guest';
  syncOrderItems(animate);
  clearTimeout(liveTimer);
  liveTimer = setTimeout(() => { $('totalsLive').textContent = `${totals.qty} units. Purchase ${money(totals.dp)}. Retail ${money(totals.mrp)}. Gross profit ${money(totals.profit)}. PV ${number(totals.pv)}, SV ${number(totals.sv)}.`; }, animate ? 550 : 0);
}
function updateQty(code, raw) {
  if (!byCode.has(code)) return;
  const parsed = Number(raw);
  const q = Number.isFinite(parsed) ? Math.min(99999, Math.max(0, Math.trunc(parsed))) : 0;
  quantities[code] = q;
  updateRow(code);
  updateSummary();
  saveOrder();
  // In selected-only view remove just this row, after a short focus-safe delay.
  // No table render, row recreation or input replacement occurs on quantity changes.
  if ($('selectedOnly').checked && q === 0) {
    clearTimeout(selectedFocusTimer);
    selectedFocusTimer = setTimeout(() => {
      if (!$('selectedOnly').checked) return;
      for (const row of [...$('products').children]) {
        if (!(quantities[row.dataset.code] > 0)) {
          const hadFocus = row.contains(document.activeElement);
          row.remove();
          if (hadFocus) $('selectedOnly').focus({ preventScroll: true });
        }
      }
      updateResultCount();
    }, reducedMotion.matches ? 0 : 250);
  }
}
$('products').addEventListener('click', e => {
  const row = e.target.closest('tr[data-code]'); if (!row) return;
  const code = row.dataset.code;
  const control = e.target.closest('button');
  if (control && control.dataset.step) updateQty(code, (quantities[code] || 0) + Number(control.dataset.step));
  else if (control && control.dataset.add) updateQty(code, (quantities[code] || 0) + Number(control.dataset.add));
  else if (!e.target.closest('input, button, a, label') && !getSelection()?.toString()) updateQty(code, (quantities[code] || 0) + 1);
});
$('products').addEventListener('input', e => {
  if (e.target.matches('[data-qty]') && e.target.value !== '') updateQty(e.target.dataset.qty, e.target.value);
});
$('products').addEventListener('change', e => {
  if (e.target.matches('[data-qty]')) updateQty(e.target.dataset.qty, e.target.value);
});
$('categoryChips').innerHTML = ['all', ...categories].map((c, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-category="${esc(c)}" aria-pressed="${i === 0}" title="${i ? esc(c) : 'All products'}">${i ? categoryLabels[i - 1] || esc(c) : 'All essentials'}<span>${i ? PRODUCTS.filter(p => p.category === c).length : PRODUCTS.length}</span></button>`).join('');
$('categoryChips').addEventListener('click', e => { const chip = e.target.closest('[data-category]'); if (chip) { category = chip.dataset.category; renderResults(); } });
$('productSearch').addEventListener('input', renderResults);
$('sortFilter').addEventListener('change', renderResults);
$('selectedOnly').addEventListener('change', renderResults);
$('resetFilters').addEventListener('click', () => { category = 'all'; $('selectedOnly').checked = false; $('productSearch').value = ''; $('sortFilter').value = 'default'; renderResults(); $('productSearch').focus({ preventScroll: true }); });
document.addEventListener('keydown', e => {
  const editing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
  if (e.key === '/' && !editing && !e.ctrlKey && !e.metaKey && !e.altKey) { e.preventDefault(); $('productSearch').focus(); }
  if (e.key === 'Escape' && (document.activeElement === $('productSearch') || !editing)) {
    if ($('productSearch').value) { $('productSearch').value = ''; renderResults(); }
  }
});
$('memberName').addEventListener('input', () => { $('showName').textContent = $('memberName').value.trim() || 'Guest'; saveOrder(); });
function toast(message) {
  clearTimeout(toastTimer); $('toastText').textContent = message; $('toast').classList.add('show');
  toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2400);
}
$('resetBtn').addEventListener('click', () => {
  for (const code of Object.keys(quantities)) { delete quantities[code]; updateRow(code, false); }
  updateSummary(); saveOrder();
  if ($('selectedOnly').checked) { $('products').replaceChildren(); updateResultCount(); }
  toast('Order cleared');
});
// Export from exact underlying totals, never from numbers mid-count-up.
function summaryText() {
  const lines = ['DXN PRICE & PROFIT SUMMARY', 'Customer: ' + ($('memberName').value.trim() || 'Guest'), 'Date: ' + $('today').textContent, ''];
  for (const p of PRODUCTS.filter(p => quantities[p.code] > 0)) {
    const q = quantities[p.code];
    lines.push(`${p.name} (${p.code}) × ${q} | DP ${money(p.dp * q)} | MRP ${money(p.mrp * q)} | Profit ${money((p.mrp - p.dp) * q)}`);
  }
  lines.push('', `Total DP: ${money(totals.dp)}`, `Total MRP: ${money(totals.mrp)}`, `Gross Profit: ${money(totals.profit)}`, `PV: ${number(totals.pv)} | SV: ${number(totals.sv)}`, 'Gross profit before costs. Prices supplied by user.');
  return lines.join('\n');
}
function whatsappText() {
  const lines = ['*DXN PRICE & PROFIT SUMMARY*', 'Customer: ' + ($('memberName').value.trim() || 'Guest'), 'Date: ' + $('today').textContent, ''];
  for (const p of PRODUCTS.filter(p => quantities[p.code] > 0)) {
    const q = quantities[p.code];
    lines.push(`*${p.name}* (${p.code}) × ${q}`, `DP ${money(p.dp * q)} · MRP ${money(p.mrp * q)}`, `Profit ${money((p.mrp - p.dp) * q)}`, '');
  }
  lines.push(`*Total DP: ${money(totals.dp)}*`, `*Total MRP: ${money(totals.mrp)}*`, `*Gross Profit: ${money(totals.profit)}*`, `PV: ${number(totals.pv)} | SV: ${number(totals.sv)}`, '', 'Gross profit before costs. Prices supplied by user.');
  return lines.join('\n');
}
async function copyText(text) {
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (_) {}
  // Legacy fallback required for file:// browsers without Clipboard API access.
  const previous = document.activeElement;
  const area = document.createElement('textarea');
  area.value = text; area.setAttribute('readonly', ''); area.style.cssText = 'position:fixed;top:0;left:-10000px';
  document.body.appendChild(area); area.focus(); area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (_) {}
  area.remove(); previous?.focus({ preventScroll: true }); return ok;
}
for (const [id, format] of [['copyBtn', summaryText], ['whatsappBtn', whatsappText]]) {
  const button = $(id); const label = button.querySelector('span:nth-child(2)'); const original = label.textContent;
  let timer;
  button.addEventListener('click', async () => {
    const ok = await copyText(format());
    if (!ok) { toast('Copy unavailable. Use Print / Save PDF.'); return; }
    clearTimeout(timer); label.textContent = 'Copied'; button.classList.add('copied');
    toast(id === 'whatsappBtn' ? 'WhatsApp format copied' : 'Summary copied');
    timer = setTimeout(() => { button.classList.remove('copied'); label.textContent = original; }, 2000);
  });
}
function finishCounters() {
  for (const id of animations.keys()) cancelAnimationFrame(animations.get(id));
  animations.clear(); updateSummary(false);
}
$('printBtn').addEventListener('click', () => { finishCounters(); window.print(); });
window.addEventListener('beforeprint', finishCounters);
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) finishCounters(); });
function setNav(section) {
  for (const link of document.querySelectorAll('[data-nav]')) {
    const active = link.dataset.nav === section;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
  }
  document.querySelector('.nav-indicator').style.setProperty('--nav-y', section === 'summary' ? '58px' : '0px');
}
for (const link of document.querySelectorAll('[data-nav], #orderBar')) {
  link.addEventListener('click', () => { const section = link.getAttribute('href').slice(1); setNav(section); if (section === 'summary') $('summary').focus({ preventScroll: true }); });
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.target.id === 'summary') setNav(entry.isIntersecting ? 'summary' : 'catalog');
  }, { rootMargin: '-15% 0px -25% 0px', threshold: 0 });
  observer.observe($('summary'));
}
const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
$('today').textContent = date; $('orderDate').textContent = date;
// Development diagnostic only; supplied values are deliberately untouched.
const devMode = location.protocol === 'file:' || /(?:\?|&)debug=1(?:&|$)/.test(location.search);
for (const p of PRODUCTS) if (devMode && p.sv > p.mrp) console.warn(`[DXN data sanity] ${p.code}: SV ${p.sv} exceeds MRP ${p.mrp}. Original value retained.`);
restoreOrder();
PRODUCTS.forEach(createRow);
renderResults();
updateSummary(false);

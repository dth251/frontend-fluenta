// ========================================================
// RESULT PAGE LOGIC (result.js)
// Vẽ dạng sóng SVG với marker đánh số tại đúng thời điểm vấp.
// ========================================================
const RECORDING = {
  duration: 18.2, // giây
  events: [
    { t: 4.0, len: 0.42, word: 'Sáng', label: 'Nghẽn thanh quản (block)' },
    { t: 9.0, len: 0.35, word: 'trong', label: 'Kéo dài âm' },
    { t: 14.0, len: 0.37, word: 'bộ', label: 'Mím môi quá chặt' }
  ]
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const el = (name, attrs = {}, text) => {
  const node = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (text !== undefined) node.textContent = text;
  return node;
};

// Nhiễu giả ngẫu nhiên có hạt giống -> dạng sóng giống nhau mỗi lần tải
function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

function renderWaveform(svg, { duration, events }) {
  const W = 640, PAD = 16, TOP = 28, MID = 78, AMP = 40, AXIS = 136;
  const plotW = W - PAD * 2;
  const x = (t) => PAD + (t / duration) * plotW;
  const rand = seeded(42);

  // Vùng nghẽn (vẽ trước để nằm dưới cột sóng)
  events.forEach((e) => {
    svg.appendChild(el('rect', {
      class: 'wave-block-zone', x: x(e.t), y: TOP, width: Math.max(4, x(e.t + e.len) - x(e.t)), height: AMP * 2 + 20, rx: 3
    }));
  });

  // Cột sóng: âm lượng theo nhịp âm tiết, gần như im lặng trong vùng block
  const BAR = 3, GAP = 2;
  const count = Math.floor(plotW / (BAR + GAP));
  for (let i = 0; i < count; i++) {
    const t = (i / count) * duration;
    const syllable = 0.55 + 0.45 * Math.abs(Math.sin(t * 5.3));
    const inBlock = events.some((e) => e.label.includes('block') && t >= e.t && t <= e.t + e.len);
    const edge = t < 0.4 || t > duration - 0.4 ? 0.15 : 1;
    const amp = inBlock ? 0.06 : Math.max(0.08, syllable * (0.45 + rand() * 0.55) * edge);
    const h = Math.max(2, amp * AMP * 2);
    svg.appendChild(el('rect', { class: 'wave-bar', x: PAD + i * (BAR + GAP), y: MID - h / 2 + 10, width: BAR, height: h, rx: 1.5 }));
  }

  // Trục thời gian
  svg.appendChild(el('line', { class: 'wave-axis', x1: PAD, x2: W - PAD, y1: AXIS - 12, y2: AXIS - 12 }));
  for (let s = 0; s <= duration; s += 5) {
    svg.appendChild(el('text', { class: 'wave-tick', x: x(s), y: AXIS + 4, 'text-anchor': s === 0 ? 'start' : 'middle' }, `0:${String(s).padStart(2, '0')}`));
  }

  // Marker: vạch đứt + vòng tròn đánh số, có tooltip & focus bàn phím
  events.forEach((e, i) => {
    const cx = x(e.t);
    const g = el('g', { class: 'wave-marker', tabindex: '0' });
    g.appendChild(el('title', {}, `${i + 1}. 0:${String(Math.round(e.t)).padStart(2, '0')} — “${e.word}”: ${e.label}, ${String(e.len).replace('.', ',')} giây`));
    g.appendChild(el('line', { class: 'wave-marker-line', x1: cx, x2: cx, y1: 22, y2: AXIS - 12 }));
    g.appendChild(el('circle', { class: 'wave-marker-dot', cx, cy: 13, r: 11 }));
    g.appendChild(el('text', { class: 'wave-marker-num', x: cx, y: 17.5, 'text-anchor': 'middle' }, String(i + 1)));
    svg.appendChild(g);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('resultWaveform');
  if (svg) renderWaveform(svg, RECORDING);
});

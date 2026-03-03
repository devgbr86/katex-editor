// ── State ──────────────────────────────────────────────────
let autoRender = true;
let renderTimeout = null;

// ── DOM refs ───────────────────────────────────────────────
const editor   = document.getElementById('editor');
const preview  = document.getElementById('preview');
const toggle   = document.getElementById('autoToggle');

// ── Snippet templates ──────────────────────────────────────
const snippets = {
  frac:     '\\frac{a}{b}',
  sqrt:     '\\sqrt{x}',
  sum:      '\\sum_{i=0}^{n} i',
  int:      '\\int_{a}^{b} f(x)\\,dx',
  lim:      '\\lim_{x \\to \\infty}',
  matrix:   '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
  vec:      '\\vec{v} = \\langle x, y, z \\rangle',
  deriv:    '\\frac{d}{dx}\\left[f(x)\\right]',
};

// ── Insert snippet at cursor ───────────────────────────────
function insertSnippet(key) {
  const snippet = snippets[key];
  if (!snippet) return;

  const start = editor.selectionStart;
  const end   = editor.selectionEnd;
  const val   = editor.value;

  // Wrap selection inside the snippet or just insert
  const insertion = `$$${snippet}$$`;
  editor.value = val.slice(0, start) + insertion + val.slice(end);
  editor.selectionStart = editor.selectionEnd = start + insertion.length;
  editor.focus();

  if (autoRender) scheduleRender();
}

// ── Core render ────────────────────────────────────────────
function render() {
  const raw = editor.value.trim();

  if (!raw) {
    preview.innerHTML = '<p class="placeholder">// type a formula above and press Render</p>';
    return;
  }

  // Split on newlines to render line-by-line
  const lines = raw.split('\n');
  let html = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === '') {
      html += '<br>';
      continue;
    }

    // Display math: $$...$$
    const displayMatch = trimmed.match(/^\$\$(.+?)\$\$$/s);
    if (displayMatch) {
      html += renderBlock(displayMatch[1], true);
      continue;
    }

    // Inline math: $...$
    // Replace all $...$ occurrences inline
    const inlineRendered = trimmed.replace(/\$([^$]+?)\$/g, (_, expr) => {
      return renderInline(expr);
    });

    // If the line had inline math replaced
    if (inlineRendered !== trimmed) {
      html += `<p>${inlineRendered}</p>`;
    } else {
      // Plain text line
      html += `<p>${escapeHtml(trimmed)}</p>`;
    }
  }

  preview.innerHTML = html;
}

function renderBlock(expr, display) {
  try {
    const rendered = katex.renderToString(expr.trim(), {
      displayMode: display,
      throwOnError: true,
      output: 'html',
    });
    return `<div class="katex-display">${rendered}</div>`;
  } catch (e) {
    return `<div class="error-line">⚠ ${escapeHtml(e.message)}</div>`;
  }
}

function renderInline(expr) {
  try {
    return katex.renderToString(expr.trim(), {
      displayMode: false,
      throwOnError: true,
      output: 'html',
    });
  } catch (e) {
    return `<span class="error-line">⚠ ${escapeHtml(e.message)}</span>`;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Auto-render with debounce ──────────────────────────────
function scheduleRender() {
  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(render, 350);
}

editor.addEventListener('input', () => {
  if (autoRender) scheduleRender();
});

// ── Toggle auto-render ─────────────────────────────────────
function toggleAuto() {
  autoRender = !autoRender;
  toggle.classList.toggle('on', autoRender);
}

// ── Clear ──────────────────────────────────────────────────
function clearEditor() {
  editor.value = '';
  preview.innerHTML = '<p class="placeholder">// type a formula above and press Render</p>';
  editor.focus();
}

// ── Export PDF ─────────────────────────────────────────────
function exportPDF() {
  render();
  setTimeout(() => window.print(), 100);
}

// ── Initial render ─────────────────────────────────────────
render();
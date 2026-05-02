/* ============================================================
   FinanceLab — script.js
   Utilitários globais, navegação e helpers de UI
   ============================================================ */

'use strict';

/* ── Navegação mobile ─────────────────────────────────────── */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    }
  });
})();

/* ── Marca link ativo na nav ──────────────────────────────── */
(function markActiveNav() {
  const links = document.querySelectorAll('.site-nav__link');
  const path  = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normaliza caminhos para comparação
    const linkPath = new URL(href, window.location.href).pathname;

    if (
      linkPath === path ||
      (path.includes('/simuladores') && linkPath.includes('/simuladores')) ||
      (path.includes('/sobre')       && linkPath.includes('/sobre'))
    ) {
      link.classList.add('active');
    }
  });
})();

/* ── Formatadores de número ───────────────────────────────── */
const fmt = {
  /**
   * Formata número como moeda BRL
   * @param {number} value
   * @returns {string}
   */
  currency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },

  /**
   * Formata número como percentual
   * @param {number} value  — valor já em percentual (ex: 12.5 → "12,50%")
   * @param {number} decimals
   * @returns {string}
   */
  percent(value, decimals = 2) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value) + '%';
  },

  /**
   * Formata número inteiro com separador de milhar
   * @param {number} value
   * @returns {string}
   */
  number(value) {
    return new Intl.NumberFormat('pt-BR').format(Math.round(value));
  },
};

/* ── Helpers de DOM ───────────────────────────────────────── */
const dom = {
  /**
   * Retorna o valor numérico de um input, substituindo vírgula por ponto
   * @param {string} id
   * @returns {number}
   */
  getNum(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    const raw = el.value.replace(',', '.').trim();
    return parseFloat(raw) || 0;
  },

  /**
   * Retorna o valor de um select
   * @param {string} id
   * @returns {string}
   */
  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  },

  /**
   * Define o conteúdo textual de um elemento
   * @param {string} id
   * @param {string} text
   */
  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },

  /**
   * Exibe o card de resultado com animação
   * @param {string} id
   */
  showResult(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('visible');
    // Força reflow para reiniciar animação
    void el.offsetWidth;
    el.classList.add('visible');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },
};

/* ── Exporta utilitários globalmente ──────────────────────── */
window.FinanceLab = { fmt, dom };

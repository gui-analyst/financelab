/* ============================================================
   FinanceLab — simuladores.js
   Lógica financeira de todos os simuladores
   ============================================================ */

'use strict';

/* ── Aguarda o DOM estar pronto ───────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const { fmt, dom } = window.FinanceLab;

  /* ============================================================
     1. JUROS COMPOSTOS
     ============================================================ */
  const btnJuros = document.getElementById('btn-juros-compostos');
  if (btnJuros) {
    btnJuros.addEventListener('click', () => {
      const valorInicial  = dom.getNum('jc-valor-inicial');
      const aporteMensal  = dom.getNum('jc-aporte-mensal');
      const taxaInput     = dom.getNum('jc-taxa');
      const periodoTipo   = dom.getVal('jc-periodo-tipo');
      const prazoMeses    = dom.getNum('jc-prazo');
      const taxaTipo      = dom.getVal('jc-taxa-tipo');

      // Converte taxa para mensal
      let taxaMensal = taxaTipo === 'anual'
        ? Math.pow(1 + taxaInput / 100, 1 / 12) - 1
        : taxaInput / 100;

      // Converte prazo para meses
      const meses = periodoTipo === 'anos' ? prazoMeses * 12 : prazoMeses;

      if (meses <= 0 || taxaMensal < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      // Fórmula: M = PV*(1+i)^n + PMT * [((1+i)^n - 1) / i]
      const fator       = Math.pow(1 + taxaMensal, meses);
      const montante    = valorInicial * fator + aporteMensal * ((fator - 1) / taxaMensal);
      const totalInvest = valorInicial + aporteMensal * meses;
      const rendimento  = montante - totalInvest;
      const rentab      = totalInvest > 0 ? (rendimento / totalInvest) * 100 : 0;

      dom.setText('jc-result-montante',   fmt.currency(montante));
      dom.setText('jc-result-investido',  fmt.currency(totalInvest));
      dom.setText('jc-result-rendimento', fmt.currency(rendimento));
      dom.setText('jc-result-rentab',     fmt.percent(rentab, 1));

      // Insight
      const anos = (meses / 12).toFixed(1);
      dom.setText('jc-result-insight',
        `Em ${anos} ano(s), seu patrimônio crescerá de ${fmt.currency(valorInicial)} para ` +
        `${fmt.currency(montante)}, com ${fmt.currency(rendimento)} em rendimentos — ` +
        `equivalente a ${fmt.percent(rentab, 1)} de retorno sobre o capital investido.`
      );

      dom.showResult('jc-result');
    });
  }

  /* ============================================================
     2. APORTES MENSAIS
     ============================================================ */
  const btnAportes = document.getElementById('btn-aportes-mensais');
  if (btnAportes) {
    btnAportes.addEventListener('click', () => {
      const aporte    = dom.getNum('am-aporte');
      const taxaInput = dom.getNum('am-taxa');
      const taxaTipo  = dom.getVal('am-taxa-tipo');
      const prazo     = dom.getNum('am-prazo');
      const prazoTipo = dom.getVal('am-prazo-tipo');

      const taxaMensal = taxaTipo === 'anual'
        ? Math.pow(1 + taxaInput / 100, 1 / 12) - 1
        : taxaInput / 100;

      const meses = prazoTipo === 'anos' ? prazo * 12 : prazo;

      if (meses <= 0 || taxaMensal < 0 || aporte <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      const fator      = Math.pow(1 + taxaMensal, meses);
      const montante   = aporte * ((fator - 1) / taxaMensal);
      const totalAport = aporte * meses;
      const rendimento = montante - totalAport;

      dom.setText('am-result-montante',   fmt.currency(montante));
      dom.setText('am-result-aportado',   fmt.currency(totalAport));
      dom.setText('am-result-rendimento', fmt.currency(rendimento));

      // Tabela de evolução anual
      const tbody = document.getElementById('am-result-tabela');
      if (tbody) {
        tbody.innerHTML = '';
        const anosTotal = Math.ceil(meses / 12);
        const step = Math.max(1, Math.floor(anosTotal / 10)); // máx 10 linhas

        for (let m = step * 12; m <= meses; m += step * 12) {
          const f  = Math.pow(1 + taxaMensal, m);
          const mt = aporte * ((f - 1) / taxaMensal);
          const ta = aporte * m;
          const rd = mt - ta;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${(m / 12).toFixed(0)} ano(s)</td>
            <td>${fmt.currency(ta)}</td>
            <td>${fmt.currency(rd)}</td>
            <td><strong>${fmt.currency(mt)}</strong></td>
          `;
          tbody.appendChild(tr);
        }
      }

      dom.showResult('am-result');
    });
  }

  /* ============================================================
     3. PROJEÇÃO PATRIMONIAL
     ============================================================ */
  const btnPatrimonio = document.getElementById('btn-patrimonio');
  if (btnPatrimonio) {
    btnPatrimonio.addEventListener('click', () => {
      const patrimonioAtual = dom.getNum('pp-patrimonio');
      const aporte          = dom.getNum('pp-aporte');
      const taxaInput       = dom.getNum('pp-taxa');
      const taxaTipo        = dom.getVal('pp-taxa-tipo');
      const prazo           = dom.getNum('pp-prazo');

      const taxaMensal = taxaTipo === 'anual'
        ? Math.pow(1 + taxaInput / 100, 1 / 12) - 1
        : taxaInput / 100;

      const meses = prazo * 12;

      if (meses <= 0 || taxaMensal < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
      }

      const fator      = Math.pow(1 + taxaMensal, meses);
      const montante   = patrimonioAtual * fator + aporte * ((fator - 1) / taxaMensal);
      const totalInvest = patrimonioAtual + aporte * meses;
      const rendimento  = montante - totalInvest;
      const multiplicador = patrimonioAtual > 0 ? montante / patrimonioAtual : 0;

      dom.setText('pp-result-montante',      fmt.currency(montante));
      dom.setText('pp-result-investido',     fmt.currency(totalInvest));
      dom.setText('pp-result-rendimento',    fmt.currency(rendimento));
      dom.setText('pp-result-multiplicador', multiplicador.toFixed(1) + 'x');

      // Tabela de evolução
      const tbody = document.getElementById('pp-result-tabela');
      if (tbody) {
        tbody.innerHTML = '';
        for (let ano = 1; ano <= prazo; ano++) {
          const m  = ano * 12;
          const f  = Math.pow(1 + taxaMensal, m);
          const mt = patrimonioAtual * f + aporte * ((f - 1) / taxaMensal);
          const ta = patrimonioAtual + aporte * m;
          const rd = mt - ta;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>Ano ${ano}</td>
            <td>${fmt.currency(ta)}</td>
            <td>${fmt.currency(rd)}</td>
            <td><strong>${fmt.currency(mt)}</strong></td>
          `;
          tbody.appendChild(tr);
        }
      }

      dom.showResult('pp-result');
    });
  }

  /* ============================================================
     4. PERFIL DE INVESTIDOR
     ============================================================ */
  const btnPerfil = document.getElementById('btn-perfil');
  if (btnPerfil) {
    btnPerfil.addEventListener('click', () => {
      const perguntas = document.querySelectorAll('.quiz-question');
      let total = 0;
      let respondidas = 0;

      perguntas.forEach(q => {
        const selecionada = q.querySelector('input[type="radio"]:checked');
        if (selecionada) {
          total += parseInt(selecionada.value, 10);
          respondidas++;
        }
      });

      if (respondidas < perguntas.length) {
        alert('Por favor, responda todas as perguntas antes de calcular.');
        return;
      }

      // Pontuação máxima = 5 perguntas × 3 pontos = 15
      let perfil, descricao, recomendacao, cor;

      if (total <= 7) {
        perfil       = 'Conservador';
        cor          = 'conservador';
        descricao    = 'Você prioriza a segurança do capital acima de tudo. Prefere previsibilidade e evita oscilações, mesmo que isso signifique retornos menores.';
        recomendacao = 'Renda fixa (Tesouro Selic, CDBs, LCIs/LCAs) deve compor a maior parte da sua carteira — entre 80% e 100%. Considere uma pequena parcela em fundos multimercado de baixa volatilidade.';
      } else if (total <= 11) {
        perfil       = 'Moderado';
        cor          = 'moderado';
        descricao    = 'Você busca equilíbrio entre segurança e rentabilidade. Aceita alguma oscilação no curto prazo em troca de melhores retornos no longo prazo.';
        recomendacao = 'Uma carteira equilibrada pode ter 50–70% em renda fixa e 30–50% em renda variável (ações, FIIs, ETFs). Diversificação é sua maior aliada.';
      } else {
        perfil       = 'Arrojado';
        cor          = 'agressivo';
        descricao    = 'Você tem alta tolerância a risco e foco no longo prazo. Está disposto a suportar grandes oscilações em busca de retornos superiores.';
        recomendacao = 'Renda variável pode representar 60–80% da carteira (ações, ETFs, FIIs, BDRs). Mantenha uma reserva de emergência em renda fixa e diversifique globalmente.';
      }

      dom.setText('perfil-result-nome',        perfil);
      dom.setText('perfil-result-descricao',   descricao);
      dom.setText('perfil-result-recomendacao', recomendacao);
      dom.setText('perfil-result-pontuacao',   `Pontuação: ${total}/15`);

      const badge = document.getElementById('perfil-result-badge');
      if (badge) {
        badge.className = `profile-badge profile-badge--${cor}`;
        badge.textContent = perfil;
      }

      dom.showResult('perfil-result');
    });
  }

  /* ============================================================
     5. REBALANCEAMENTO DE CARTEIRA
     ============================================================ */
  const btnRebalance = document.getElementById('btn-rebalance');
  if (btnRebalance) {
    btnRebalance.addEventListener('click', () => {
      const patrimonio = dom.getNum('rb-patrimonio');

      // Coleta as linhas de ativos
      const rows = document.querySelectorAll('.rb-asset-row');
      const ativos = [];

      rows.forEach(row => {
        const nome   = row.querySelector('.rb-nome')?.value.trim() || '';
        const atual  = parseFloat(row.querySelector('.rb-atual')?.value) || 0;
        const alvo   = parseFloat(row.querySelector('.rb-alvo')?.value) || 0;
        if (nome) ativos.push({ nome, atual, alvo });
      });

      if (patrimonio <= 0) {
        alert('Informe o valor total da carteira.');
        return;
      }

      const somaAtual = ativos.reduce((s, a) => s + a.atual, 0);
      const somaAlvo  = ativos.reduce((s, a) => s + a.alvo, 0);

      if (Math.abs(somaAtual - 100) > 0.5) {
        alert(`A soma dos percentuais atuais deve ser 100%. Soma atual: ${somaAtual.toFixed(1)}%`);
        return;
      }
      if (Math.abs(somaAlvo - 100) > 0.5) {
        alert(`A soma dos percentuais alvo deve ser 100%. Soma atual: ${somaAlvo.toFixed(1)}%`);
        return;
      }

      const tbody = document.getElementById('rb-result-tbody');
      if (tbody) {
        tbody.innerHTML = '';
        ativos.forEach(a => {
          const valorAtual = (a.atual / 100) * patrimonio;
          const valorAlvo  = (a.alvo  / 100) * patrimonio;
          const ajuste     = valorAlvo - valorAtual;
          const acao       = ajuste > 0 ? 'Comprar' : ajuste < 0 ? 'Vender' : 'Manter';
          const cls        = ajuste > 0 ? 'text-green' : ajuste < 0 ? 'text-red' : 'text-muted';

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${a.nome}</td>
            <td>${a.atual.toFixed(1)}% — ${fmt.currency(valorAtual)}</td>
            <td>${a.alvo.toFixed(1)}% — ${fmt.currency(valorAlvo)}</td>
            <td class="${cls}">${acao} ${fmt.currency(Math.abs(ajuste))}</td>
          `;
          tbody.appendChild(tr);
        });
      }

      dom.showResult('rb-result');
    });
  }

  /* ============================================================
     6. RENDA FIXA vs RENDA VARIÁVEL
     ============================================================ */
  const btnRFRV = document.getElementById('btn-rfrv');
  if (btnRFRV) {
    btnRFRV.addEventListener('click', () => {
      const capital    = dom.getNum('rfrv-capital');
      const prazo      = dom.getNum('rfrv-prazo');
      const taxaRF     = dom.getNum('rfrv-taxa-rf');
      const taxaRV     = dom.getNum('rfrv-taxa-rv');
      const taxaRVPess = dom.getNum('rfrv-taxa-rv-pess');

      if (capital <= 0 || prazo <= 0) {
        alert('Preencha capital e prazo corretamente.');
        return;
      }

      const meses = prazo * 12;

      // Renda Fixa — taxa anual → mensal
      const taxaRFm  = Math.pow(1 + taxaRF / 100, 1 / 12) - 1;
      const montRF   = capital * Math.pow(1 + taxaRFm, meses);
      const rendRF   = montRF - capital;

      // Renda Variável — cenário otimista
      const taxaRVm  = Math.pow(1 + taxaRV / 100, 1 / 12) - 1;
      const montRVOt = capital * Math.pow(1 + taxaRVm, meses);
      const rendRVOt = montRVOt - capital;

      // Renda Variável — cenário pessimista
      const taxaRVPm  = Math.pow(1 + taxaRVPess / 100, 1 / 12) - 1;
      const montRVPs  = capital * Math.pow(1 + taxaRVPm, meses);
      const rendRVPs  = montRVPs - capital;

      dom.setText('rfrv-result-rf-montante',  fmt.currency(montRF));
      dom.setText('rfrv-result-rf-rendimento', fmt.currency(rendRF));
      dom.setText('rfrv-result-rv-ot-montante', fmt.currency(montRVOt));
      dom.setText('rfrv-result-rv-ot-rendimento', fmt.currency(rendRVOt));
      dom.setText('rfrv-result-rv-ps-montante', fmt.currency(montRVPs));
      dom.setText('rfrv-result-rv-ps-rendimento', fmt.currency(rendRVPs));

      // Barras comparativas (normaliza pelo maior valor)
      const maxVal = Math.max(montRF, montRVOt, Math.abs(montRVPs));
      setBar('bar-rf',    (montRF   / maxVal) * 100);
      setBar('bar-rv-ot', (montRVOt / maxVal) * 100);
      setBar('bar-rv-ps', (Math.max(montRVPs, 0) / maxVal) * 100);

      dom.showResult('rfrv-result');
    });
  }

  /* ============================================================
     7. COMPARADOR DE CENÁRIOS
     ============================================================ */
  const btnCenarios = document.getElementById('btn-cenarios');
  if (btnCenarios) {
    btnCenarios.addEventListener('click', () => {
      const capital     = dom.getNum('cen-capital');
      const aporte      = dom.getNum('cen-aporte');
      const prazo       = dom.getNum('cen-prazo');
      const taxaConserv = dom.getNum('cen-taxa-conserv');
      const taxaBase    = dom.getNum('cen-taxa-base');
      const taxaOtim    = dom.getNum('cen-taxa-otim');

      if (capital < 0 || prazo <= 0) {
        alert('Preencha os campos corretamente.');
        return;
      }

      const meses = prazo * 12;

      function calcMontante(taxaAnual) {
        const tm     = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
        const fator  = Math.pow(1 + tm, meses);
        return capital * fator + (tm > 0 ? aporte * ((fator - 1) / tm) : aporte * meses);
      }

      const mConserv = calcMontante(taxaConserv);
      const mBase    = calcMontante(taxaBase);
      const mOtim    = calcMontante(taxaOtim);
      const totalInv = capital + aporte * meses;

      dom.setText('cen-result-conserv',  fmt.currency(mConserv));
      dom.setText('cen-result-base',     fmt.currency(mBase));
      dom.setText('cen-result-otim',     fmt.currency(mOtim));
      dom.setText('cen-result-investido', fmt.currency(totalInv));
      dom.setText('cen-result-rend-conserv', fmt.currency(mConserv - totalInv));
      dom.setText('cen-result-rend-base',    fmt.currency(mBase    - totalInv));
      dom.setText('cen-result-rend-otim',    fmt.currency(mOtim    - totalInv));

      // Barras
      const maxC = Math.max(mConserv, mBase, mOtim);
      setBar('bar-cen-conserv', (mConserv / maxC) * 100);
      setBar('bar-cen-base',    (mBase    / maxC) * 100);
      setBar('bar-cen-otim',    (mOtim    / maxC) * 100);

      dom.showResult('cen-result');
    });
  }

  /* ── Helper: define largura de barra ──────────────────────── */
  function setBar(id, pct) {
    const el = document.getElementById(id);
    if (el) el.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }
});

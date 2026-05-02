# FinanceLab

> Simuladores financeiros práticos, gratuitos e sem complicação.

**FinanceLab** é uma plataforma de ferramentas financeiras construída com HTML, CSS e JavaScript puros — sem frameworks, sem dependências externas, pronta para hospedar no GitHub Pages.

---

## Estrutura do projeto

```
financelab/
├── index.html                          # Home — hub de simuladores
├── README.md
│
├── css/
│   └── style.css                       # Design system completo
│
├── js/
│   ├── script.js                       # Utilitários globais e navegação
│   └── simuladores.js                  # Lógica financeira de todos os simuladores
│
├── simuladores/
│   ├── juros-compostos.html            # Simulador de juros compostos
│   ├── aportes-mensais.html            # Simulador de aportes mensais
│   ├── projecao-patrimonial.html       # Projeção patrimonial com evolução anual
│   ├── perfil-investidor.html          # Quiz de perfil de investidor
│   ├── rebalanceamento.html            # Rebalanceamento de carteira
│   ├── renda-fixa-vs-renda-variavel.html  # Comparador RF vs RV
│   └── comparador-cenarios.html        # Comparador de 3 cenários simultâneos
│
├── sobre/
│   └── index.html                      # Página Sobre o projeto
│
└── assets/
    ├── images/                         # Imagens do projeto
    └── icons/                          # Ícones e favicons
```

---

## Simuladores disponíveis

### Grupo 1 — Crescimento Patrimonial
| Simulador | Descrição |
|-----------|-----------|
| Juros Compostos | Calcula montante final com capital inicial, aportes e taxa |
| Aportes Mensais | Projeta acúmulo de aportes fixos com evolução anual |
| Projeção Patrimonial | Evolução do patrimônio atual com aportes e taxa de retorno |

### Grupo 2 — Carteira e Alocação
| Simulador | Descrição |
|-----------|-----------|
| Perfil de Investidor | Quiz de 5 perguntas com resultado e recomendação de alocação |
| Rebalanceamento de Carteira | Calcula quanto comprar/vender em cada ativo para atingir a alocação alvo |

### Grupo 3 — Comparações
| Simulador | Descrição |
|-----------|-----------|
| Renda Fixa vs Renda Variável | Compara resultados de RF com cenários otimista e pessimista de RV |
| Comparador de Cenários | Projeta patrimônio em 3 cenários simultâneos (conservador, base, otimista) |

---

## Como usar

### Localmente
Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor local.

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça o upload de todos os arquivos
3. Vá em **Settings → Pages**
4. Selecione a branch `main` e a pasta raiz `/`
5. Aguarde alguns minutos — o site estará disponível em `https://seu-usuario.github.io/nome-do-repo`

---

## Tecnologia

- **HTML5** — semântico e acessível
- **CSS3** — design system com variáveis CSS, responsivo, sem frameworks
- **JavaScript ES6+** — lógica financeira pura, sem dependências externas

---

## Como expandir

O projeto foi construído para ser fácil de manter e expandir:

- **Novo simulador:** crie um novo arquivo em `/simuladores/`, adicione um card na `index.html` e implemente a lógica em `simuladores.js`
- **Novo estilo:** todas as variáveis de design estão no topo de `style.css` — altere cores, fontes e espaçamentos em um só lugar
- **Nova seção:** a estrutura modular permite adicionar seções de conteúdo, artigos ou dashboards sem quebrar o existente

---

## Expansões futuras planejadas

- [ ] Novos simuladores (IPCA, dividendos, previdência)
- [ ] Área de conteúdo e artigos
- [ ] Relatório exportável em PDF
- [ ] Modo escuro
- [ ] Integração com captura de leads
- [ ] Dashboards interativos

---

## Licença

Uso livre para fins pessoais e educacionais.

---

*Feito para ajudar, não para vender.*

// ════════════════════════════════════════════════════════════
//  BIBLIOTECA DE ESCALAS — CLÍNICA JARDEL SANTIAGO
//  Cada escala tem: id, nome, categoria, instrucoes, perguntas
//  e função de interpretacao para insights clínicos
// ════════════════════════════════════════════════════════════

export const CATEGORIAS = [
  { id: 'rastreio',    nome: 'Rastreio inicial',         icone: '◈', ordem: 1 },
  { id: 'depressao',   nome: 'Depressão',                icone: '◐', ordem: 2 },
  { id: 'ansiedade',   nome: 'Ansiedade',                icone: '◑', ordem: 3 },
  { id: 'tcc',         nome: 'TCC específico',           icone: '◍', ordem: 4 },
  { id: 'esquemas',    nome: 'Esquemas e personalidade', icone: '◉', ordem: 5 },
  { id: 'mindfulness', nome: 'Mindfulness e ACT',        icone: '◎', ordem: 6 },
  { id: 'regulacao',   nome: 'Regulação emocional',      icone: '◌', ordem: 7 },
  { id: 'alianca',     nome: 'Aliança terapêutica',      icone: '◇', ordem: 8 },
  { id: 'sessao',      nome: 'Monitoramento de sessão',  icone: '◆', ordem: 9 },
  { id: 'qualidade',   nome: 'Qualidade de vida',        icone: '○', ordem: 10 },
  { id: 'sono',        nome: 'Sono',                     icone: '☾', ordem: 11 },
  { id: 'substancias', nome: 'Uso de substâncias',       icone: '◊', ordem: 12 },
];

// ───── OPÇÕES PADRÃO REUTILIZÁVEIS ─────
const FREQ_4 = ['Nenhuma vez','Vários dias','Mais da metade dos dias','Quase todos os dias'];
const FREQ_5 = ['Nunca','Raramente','Às vezes','Frequentemente','Quase sempre'];
const CONCORD_5 = ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'];
const CONCORD_7 = ['Discordo totalmente','Discordo','Discordo um pouco','Neutro','Concordo um pouco','Concordo','Concordo totalmente'];
const SIM_NAO = ['Não','Sim'];

// ───── HELPERS ─────
const construirLikert = textos => textos.map(t => ({ texto: t, tipo: 'likert', opcoes: FREQ_4 }));

// ════════════════════════════════════════════════════════════
//  ESCALAS
// ════════════════════════════════════════════════════════════

export const ESCALAS = [

  // ═══ RASTREIO INICIAL ═══
  {
    id: 'phq9', categoria: 'rastreio', nome: 'PHQ-9',
    descCurta: 'Rastreio de depressão — 9 itens',
    instrucoes: 'Durante as últimas 2 semanas, com que frequência você foi incomodado(a) por algum dos problemas a seguir?',
    perguntas: construirLikert([
      'Pouco interesse ou prazer em fazer as coisas',
      'Se sentir "pra baixo", deprimido(a) ou sem perspectiva',
      'Dificuldade para adormecer ou permanecer dormindo, ou dormir mais do que de costume',
      'Se sentir cansado(a) ou com pouca energia',
      'Falta de apetite ou comer demais',
      'Se sentir mal consigo mesmo(a), ou achar que é um fracasso ou que decepcionou sua família',
      'Dificuldade para se concentrar nas coisas, como ler um jornal ou ver televisão',
      'Lentidão para se movimentar ou falar, ou ao contrário, estar tão agitado(a) que você fica andando de um lado para o outro',
      'Pensamentos de que seria melhor estar morto(a) ou de se machucar de alguma forma',
    ]),
    interpretar: (resp, pontos) => {
      let nivel, cor, alerta = null;
      if (pontos <= 4)       { nivel = 'Sintomas mínimos';      cor = 'green'; }
      else if (pontos <= 9)  { nivel = 'Depressão leve';        cor = 'amber'; }
      else if (pontos <= 14) { nivel = 'Depressão moderada';    cor = 'amber'; }
      else if (pontos <= 19) { nivel = 'Depressão mod. grave';  cor = 'red'; }
      else                   { nivel = 'Depressão grave';       cor = 'red'; }
      // Alerta para ideação suicida (item 9)
      if (parseInt(resp[8]) >= 1) alerta = 'Atenção: paciente endossou item de ideação suicida ou autolesão.';
      return { nivel, cor, pontos, max: 27, alerta };
    }
  },

  {
    id: 'gad7', categoria: 'rastreio', nome: 'GAD-7',
    descCurta: 'Rastreio de ansiedade — 7 itens',
    instrucoes: 'Durante as últimas 2 semanas, com que frequência você foi incomodado(a) pelos problemas a seguir?',
    perguntas: construirLikert([
      'Se sentir nervoso(a), ansioso(a) ou no limite',
      'Não conseguir parar ou controlar as preocupações',
      'Se preocupar muito com diversas coisas',
      'Dificuldade para relaxar',
      'Ficar tão agitado(a) que é difícil ficar parado(a)',
      'Ficar facilmente aborrecido(a) ou irritado(a)',
      'Sentir medo como se algo horrível fosse acontecer',
    ]),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 4)       { nivel = 'Sintomas mínimos';   cor = 'green'; }
      else if (pontos <= 9)  { nivel = 'Ansiedade leve';     cor = 'amber'; }
      else if (pontos <= 14) { nivel = 'Ansiedade moderada'; cor = 'amber'; }
      else                   { nivel = 'Ansiedade grave';    cor = 'red'; }
      return { nivel, cor, pontos, max: 21 };
    }
  },

  {
    id: 'dass21', categoria: 'rastreio', nome: 'DASS-21',
    descCurta: 'Depressão, Ansiedade e Estresse — 21 itens',
    instrucoes: 'Leia cada afirmação e indique o quanto se aplicou a você durante a última semana. Não há respostas certas ou erradas.',
    perguntas: ([
      // D=Depressão, A=Ansiedade, E=Estresse
      ['E','Achei difícil me acalmar'],
      ['A','Senti minha boca seca'],
      ['D','Não consegui vivenciar nenhum sentimento positivo'],
      ['A','Tive dificuldade em respirar (respiração rápida, falta de ar sem ter feito esforço físico)'],
      ['D','Achei difícil ter iniciativa para fazer as coisas'],
      ['E','Tive uma tendência a reagir de forma exagerada às situações'],
      ['A','Senti tremores (ex: nas mãos)'],
      ['E','Senti que estava utilizando muita energia nervosa'],
      ['A','Preocupei-me com situações em que pudesse entrar em pânico ou fazer papel ridículo'],
      ['D','Senti que não tinha nada a aguardar com expectativa'],
      ['E','Senti que ficava agitado(a)'],
      ['E','Achei difícil relaxar'],
      ['D','Senti-me depressivo(a) e sem ânimo'],
      ['E','Fui intolerante com qualquer coisa que me impedisse de continuar o que estava fazendo'],
      ['A','Senti que estava prestes a entrar em pânico'],
      ['D','Não consegui me entusiasmar com nada'],
      ['D','Senti que não tinha valor como pessoa'],
      ['E','Senti que era um tanto sensível'],
      ['A','Percebi as ações do meu coração mesmo sem ter feito esforço físico (sentia o coração acelerado)'],
      ['A','Senti medo sem motivo'],
      ['D','Senti que a vida não tinha sentido'],
    ]).map(([grp, txt]) => ({ texto: txt, tipo: 'likert', grupo: grp,
      opcoes: ['Não se aplicou de maneira alguma','Aplicou-se em algum grau, ou por pouco de tempo','Aplicou-se em um grau considerável, ou por uma boa parte do tempo','Aplicou-se muito, ou na maioria do tempo'] })),
    interpretar: (resp, pontos, escala) => {
      const grupos = { D: 0, A: 0, E: 0 };
      escala.perguntas.forEach((p, i) => { grupos[p.grupo] += parseInt(resp[i]) * 2; });
      const niveisD = [[9,'Normal','green'],[13,'Leve','amber'],[20,'Moderada','amber'],[27,'Grave','red'],[999,'Extremamente grave','red']];
      const niveisA = [[7,'Normal','green'],[9,'Leve','amber'],[14,'Moderada','amber'],[19,'Grave','red'],[999,'Extremamente grave','red']];
      const niveisE = [[14,'Normal','green'],[18,'Leve','amber'],[25,'Moderada','amber'],[33,'Grave','red'],[999,'Extremamente grave','red']];
      const classificar = (v, n) => n.find(x => v <= x[0]);
      const [_, nivelD, corD] = classificar(grupos.D, niveisD);
      const [__, nivelA, corA] = classificar(grupos.A, niveisA);
      const [___, nivelE, corE] = classificar(grupos.E, niveisE);
      const pior = [corD, corA, corE].includes('red') ? 'red' : ([corD, corA, corE].includes('amber') ? 'amber' : 'green');
      return { nivel: `D: ${nivelD} · A: ${nivelA} · E: ${nivelE}`, cor: pior, subscores: { Depressão: grupos.D, Ansiedade: grupos.A, Estresse: grupos.E }, pontos, max: 126 };
    }
  },

  {
    id: 'bai', categoria: 'rastreio', nome: 'BAI',
    descCurta: 'Inventário de Ansiedade de Beck — 21 itens',
    instrucoes: 'Abaixo está uma lista de sintomas comuns de ansiedade. Indique o quanto você tem sido incomodado(a) por cada sintoma durante a última semana, incluindo hoje.',
    perguntas: [
      'Dormência ou formigamento','Sensação de calor','Tremores nas pernas','Incapaz de relaxar',
      'Medo que aconteça o pior','Atordoado ou tonto','Palpitação ou aceleração do coração','Sem equilíbrio',
      'Aterrorizado','Nervoso','Sensação de sufocação','Tremores nas mãos','Trêmulo','Medo de perder o controle',
      'Dificuldade de respirar','Medo de morrer','Assustado','Indigestão ou desconforto no abdômen',
      'Sensação de desmaio','Rosto afogueado','Suor (não devido ao calor)'
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Absolutamente não','Levemente — não me incomodou muito','Moderadamente — foi muito desagradável, mas pude suportar','Gravemente — dificilmente pude suportar'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 10)      { nivel = 'Ansiedade mínima';    cor = 'green'; }
      else if (pontos <= 19) { nivel = 'Ansiedade leve';      cor = 'amber'; }
      else if (pontos <= 30) { nivel = 'Ansiedade moderada';  cor = 'amber'; }
      else                   { nivel = 'Ansiedade grave';     cor = 'red'; }
      return { nivel, cor, pontos, max: 63 };
    }
  },

  // ═══ DEPRESSÃO ═══
  {
    id: 'bdi2', categoria: 'depressao', nome: 'BDI-II',
    descCurta: 'Inventário de Depressão de Beck — versão completa (21 itens)',
    instrucoes: 'Cada grupo contém 4 afirmações. Leia cada grupo e escolha a afirmação que melhor descreve como você tem se sentido nas ÚLTIMAS DUAS SEMANAS, incluindo hoje.',
    perguntas: [
      ['Tristeza', ['Não me sinto triste','Sinto-me triste a maior parte do tempo','Estou sempre triste','Estou tão triste ou infeliz que não consigo suportar']],
      ['Pessimismo', ['Não estou desanimado quanto ao meu futuro','Sinto-me mais desanimado quanto ao meu futuro do que costumava','Não espero que as coisas se resolvam para mim','Sinto que não há esperança para meu futuro e que ele só pode piorar']],
      ['Sentimento de fracasso', ['Não me sinto um fracasso','Tenho fracassado mais do que deveria','Quando analiso o passado, vejo uma porção de fracassos','Sinto-me um fracasso total como pessoa']],
      ['Perda de prazer', ['Tenho tanto prazer como antes nas coisas que aprecio','Não tenho tanto prazer com as coisas como costumava ter','Tenho muito pouco prazer com as coisas que costumava apreciar','Não consigo ter prazer algum com as coisas que costumava apreciar']],
      ['Sentimento de culpa', ['Não me sinto particularmente culpado','Sinto-me culpado por várias coisas que fiz ou deveria ter feito','Sinto-me culpado a maior parte do tempo','Sinto-me culpado o tempo todo']],
      ['Sentimento de punição', ['Não sinto que esteja sendo punido','Sinto que talvez seja punido','Sinto que devo ser punido','Sinto que estou sendo punido']],
      ['Autoestima', ['Sinto a mesma coisa por mim mesmo de sempre','Perdi a confiança em mim','Estou decepcionado comigo mesmo','Não gosto de mim']],
      ['Autocrítica', ['Não me critico ou me culpo mais do que de costume','Estou mais crítico comigo mesmo do que costumava ser','Critico-me por todas as minhas falhas','Culpo-me por tudo de mau que acontece']],
      ['Pensamentos suicidas', ['Não tenho pensamentos de me matar','Tenho pensamentos de me matar, mas não os levaria a cabo','Gostaria de me matar','Eu me mataria se tivesse oportunidade']],
      ['Choro', ['Não choro mais do que costumava','Choro mais do que costumava','Choro por qualquer coisinha','Tenho vontade de chorar, mas não consigo']],
      ['Agitação', ['Não estou mais inquieto do que de costume','Sinto-me mais inquieto do que de costume','Estou tão inquieto que é difícil ficar parado','Estou tão inquieto que tenho que ficar me movimentando ou fazendo algo']],
      ['Perda de interesse', ['Não perdi o interesse pelas pessoas ou atividades','Estou menos interessado pelas pessoas ou coisas','Perdi a maior parte do meu interesse pelas pessoas ou coisas','É difícil interessar-me por qualquer coisa']],
      ['Indecisão', ['Tomo decisões tão bem quanto antes','Tenho mais dificuldade que de costume em tomar decisões','Tenho muito mais dificuldade em tomar decisões do que costumava','Tenho dificuldade em tomar quaisquer decisões']],
      ['Desvalorização', ['Não me sinto sem valor','Não me considero tão valioso e útil como costumava me considerar','Sinto-me sem valor quando me comparo a outras pessoas','Sinto-me completamente sem valor']],
      ['Perda de energia', ['Tenho tanta energia como antes','Tenho menos energia do que costumava ter','Não tenho energia suficiente para fazer muita coisa','Não tenho energia para fazer nada']],
      ['Alterações no sono', ['Não tenho experimentado mudança no meu padrão de sono','Durmo um pouco mais (ou menos) que de costume','Durmo bastante mais (ou menos) que de costume','Durmo a maior parte do dia (ou acordo 1-2h mais cedo e não consigo voltar a dormir)']],
      ['Irritabilidade', ['Não tenho ficado mais irritado do que de costume','Tenho ficado mais irritado do que de costume','Tenho ficado bastante mais irritado do que de costume','Sinto-me irritado o tempo todo']],
      ['Alterações no apetite', ['Não tenho experimentado mudança no meu apetite','Meu apetite está um pouco diminuído (ou aumentado)','Meu apetite está bastante diminuído (ou aumentado)','Não tenho apetite algum (ou tenho ânsia de comer o tempo todo)']],
      ['Dificuldade de concentração', ['Concentro-me tão bem quanto antes','Não consigo me concentrar tão bem como de costume','É difícil manter o pensamento em qualquer coisa por muito tempo','Não consigo me concentrar em nada']],
      ['Cansaço ou fadiga', ['Não estou mais cansado ou fatigado do que de costume','Fico cansado ou fatigado mais facilmente que de costume','Estou cansado demais para fazer muitas coisas que costumava fazer','Estou cansado demais para fazer a maioria das coisas que costumava fazer']],
      ['Perda de interesse por sexo', ['Não tenho percebido nenhuma mudança recente no meu interesse por sexo','Estou menos interessado por sexo do que costumava','Estou bem menos interessado por sexo agora','Perdi completamente o interesse por sexo']],
    ].map(([_, opcoes]) => ({ texto: '', tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor, alerta = null;
      if (pontos <= 13)      { nivel = 'Depressão mínima';  cor = 'green'; }
      else if (pontos <= 19) { nivel = 'Depressão leve';    cor = 'amber'; }
      else if (pontos <= 28) { nivel = 'Depressão moderada'; cor = 'amber'; }
      else                   { nivel = 'Depressão grave';   cor = 'red'; }
      if (parseInt(resp[8]) >= 1) alerta = 'Atenção: paciente endossou item de pensamentos suicidas.';
      return { nivel, cor, pontos, max: 63, alerta };
    }
  },

  {
    id: 'hamd', categoria: 'depressao', nome: 'HAM-D',
    descCurta: 'Escala de Hamilton para Depressão — autoaplicada adaptada',
    instrucoes: 'Selecione a opção que melhor descreve como você tem se sentido na ÚLTIMA SEMANA.',
    perguntas: [
      ['Humor deprimido', ['Ausente','Sentimentos relatados apenas quando questionado','Sentimentos relatados espontaneamente','Comunica os sentimentos não-verbalmente','Comunica quase exclusivamente esses sentimentos']],
      ['Sentimentos de culpa', ['Ausente','Auto-recriminação','Ideias de culpa','Doença atual é um castigo','Ouve vozes de acusação']],
      ['Suicídio', ['Ausente','Acha que não vale a pena viver','Desejaria estar morto','Ideias ou gestos suicidas','Tentativa de suicídio']],
      ['Insônia inicial', ['Sem dificuldades','Queixa-se de dificuldade ocasional','Queixa-se de dificuldade todas as noites']],
      ['Insônia intermediária', ['Sem dificuldades','Inquieto, perturbado durante a noite','Acorda durante a noite']],
      ['Insônia final', ['Sem dificuldades','Acorda de madrugada e volta a dormir','Acorda de madrugada e não volta a dormir']],
      ['Trabalho e atividades', ['Sem dificuldade','Pensamentos de incapacidade','Perda de interesse','Diminuição do tempo gasto','Parou de trabalhar pela doença']],
      ['Retardo motor', ['Pensamento normal','Leve retardo na entrevista','Retardo evidente na entrevista','Entrevista difícil','Estupor completo']],
      ['Agitação', ['Nenhuma','Inquietude','Brinca com mãos, cabelo etc.','Movimenta-se, não consegue ficar sentado','Torce as mãos, rói unhas, puxa cabelos']],
      ['Ansiedade psíquica', ['Sem dificuldade','Tensão e irritabilidade subjetivas','Preocupação com pequenas coisas','Atitude apreensiva','Medos expressos espontaneamente']],
      ['Sintomas somáticos gastrointestinais', ['Nenhum','Perda de apetite, mas come sem incentivo','Dificuldade em comer sem insistência']],
      ['Sintomas somáticos gerais', ['Nenhum','Peso nos membros, dores musculares','Qualquer sintoma bem caracterizado']],
    ].map(([_, opcoes]) => ({ texto: '', tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 7)       { nivel = 'Normal';            cor = 'green'; }
      else if (pontos <= 13) { nivel = 'Depressão leve';    cor = 'amber'; }
      else if (pontos <= 18) { nivel = 'Depressão moderada'; cor = 'amber'; }
      else if (pontos <= 22) { nivel = 'Depressão grave';   cor = 'red'; }
      else                   { nivel = 'Depressão muito grave'; cor = 'red'; }
      return { nivel, cor, pontos, max: 52 };
    }
  },

  // ═══ ANSIEDADE ═══
  {
    id: 'hama', categoria: 'ansiedade', nome: 'HAM-A',
    descCurta: 'Escala de Hamilton para Ansiedade — autoaplicada',
    instrucoes: 'Para cada item, escolha a opção que melhor descreve a gravidade dos sintomas que você experimentou na última semana.',
    perguntas: [
      'Humor ansioso (preocupação, antecipação do pior, irritabilidade)',
      'Tensão (sentimentos de tensão, fatigabilidade, sobressaltos)',
      'Medos (de escuro, de estranhos, de ficar sozinho, de animais, de trânsito, de multidões)',
      'Insônia (dificuldade em adormecer, sono interrompido, sono insatisfatório, pesadelos)',
      'Funções intelectuais (dificuldade de concentração, falhas de memória)',
      'Humor deprimido (perda de interesses, falta de prazer, depressão, insônia)',
      'Sintomas somáticos musculares (dores musculares, rigidez, tremores)',
      'Sintomas somáticos sensoriais (zumbidos, visão borrada, ondas de frio ou calor)',
      'Sintomas cardiovasculares (taquicardia, palpitações, dor no peito)',
      'Sintomas respiratórios (pressão no peito, sensação de sufoco, dispneia)',
      'Sintomas gastrointestinais (dificuldade de engolir, gases, dor abdominal, náusea)',
      'Sintomas genitais e urinários (frequência, urgência, perda da libido)',
      'Sintomas neurovegetativos (boca seca, rubor, palidez, tonteira, sudorese)',
      'Comportamento na entrevista (inquietação, tremores, respiração rápida)',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Ausente','Leve','Moderado','Grave','Muito grave'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 17)      { nivel = 'Ansiedade leve';     cor = 'green'; }
      else if (pontos <= 24) { nivel = 'Ansiedade moderada'; cor = 'amber'; }
      else                   { nivel = 'Ansiedade grave';    cor = 'red'; }
      return { nivel, cor, pontos, max: 56 };
    }
  },

  {
    id: 'spin', categoria: 'ansiedade', nome: 'SPIN',
    descCurta: 'Social Phobia Inventory — fobia social — 17 itens',
    instrucoes: 'Por favor, indique o quanto cada uma das frases descreve seu sentimento nos últimos 7 dias.',
    perguntas: [
      'Tenho medo de pessoas em posição de autoridade',
      'Fico incomodado(a) com o rubor (vermelhidão) diante de outras pessoas',
      'Festas e eventos sociais me assustam',
      'Evito falar com pessoas que não conheço',
      'Ser criticado(a) me assusta muito',
      'O medo de me sentir constrangido(a) faz com que eu evite fazer coisas ou falar com pessoas',
      'Suar na frente de pessoas me incomoda',
      'Evito festas',
      'Evito atividades nas quais eu seja o centro das atenções',
      'Falar com estranhos me assusta',
      'Evito ter que fazer discursos',
      'Faria qualquer coisa para evitar ser criticado(a)',
      'A palpitação me incomoda quando estou perto de pessoas',
      'Tenho medo de fazer coisas com outras pessoas observando',
      'Sentir-me constrangido(a) ou parecer estúpido(a) estão entre meus piores medos',
      'Evito falar com qualquer pessoa em posição de autoridade',
      'Tremer ou agitar-me na frente das outras pessoas me incomoda',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['De forma alguma','Um pouco','Razoavelmente','Muito','Extremamente'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos < 21)       { nivel = 'Nada/mínima fobia social'; cor = 'green'; }
      else if (pontos <= 30) { nivel = 'Fobia social leve';         cor = 'amber'; }
      else if (pontos <= 40) { nivel = 'Fobia social moderada';     cor = 'amber'; }
      else if (pontos <= 50) { nivel = 'Fobia social grave';        cor = 'red'; }
      else                   { nivel = 'Fobia social muito grave';  cor = 'red'; }
      return { nivel, cor, pontos, max: 68 };
    }
  },

  {
    id: 'pcl5', categoria: 'ansiedade', nome: 'PCL-5',
    descCurta: 'Lista de Verificação de TEPT — DSM-5 — 20 itens',
    instrucoes: 'Abaixo estão problemas que pessoas às vezes têm em resposta a uma experiência muito estressante. Indique o quanto cada problema o(a) incomodou no último mês.',
    perguntas: [
      'Memórias repetidas, perturbadoras e indesejadas da experiência estressante',
      'Sonhos repetidos e perturbadores da experiência estressante',
      'Sentir ou agir de repente como se a experiência estressante estivesse realmente acontecendo novamente',
      'Sentir-se muito chateado(a) quando algo o(a) lembrava da experiência estressante',
      'Reações físicas fortes quando algo o(a) lembrava da experiência estressante',
      'Evitar memórias, pensamentos ou sentimentos relacionados à experiência estressante',
      'Evitar lembretes externos da experiência estressante (pessoas, lugares, conversas, atividades, objetos)',
      'Dificuldade para lembrar partes importantes da experiência estressante',
      'Crenças negativas fortes sobre si mesmo, outras pessoas ou o mundo',
      'Culpar a si mesmo ou outra pessoa pela experiência estressante ou pelo que aconteceu depois',
      'Ter sentimentos negativos fortes como medo, horror, raiva, culpa ou vergonha',
      'Perda de interesse em atividades que você costumava gostar',
      'Sentir-se distante ou afastado(a) de outras pessoas',
      'Dificuldade em vivenciar sentimentos positivos',
      'Comportamento irritável, explosões de raiva ou agir agressivamente',
      'Assumir muitos riscos ou fazer coisas que poderiam causar danos a si próprio',
      'Estar "superalerta", vigilante ou em guarda',
      'Sentir-se sobressaltado ou assustado facilmente',
      'Dificuldade de concentração',
      'Problemas para adormecer ou permanecer dormindo',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Nem um pouco','Um pouco','Moderadamente','Bastante','Extremamente'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor, alerta = null;
      if (pontos < 31)       { nivel = 'TEPT improvável';   cor = 'green'; }
      else if (pontos < 33)  { nivel = 'TEPT provável (limiar)'; cor = 'amber'; }
      else                   { nivel = 'Sintomas compatíveis com TEPT'; cor = 'red'; }
      if (pontos >= 33) alerta = 'Pontuação ≥ 33 sugere provável TEPT. Avaliação clínica diagnóstica indicada.';
      return { nivel, cor, pontos, max: 80, alerta };
    }
  },

  {
    id: 'ybocs', categoria: 'ansiedade', nome: 'Y-BOCS',
    descCurta: 'Yale-Brown — Escala de TOC — 10 itens',
    instrucoes: 'Pense nas suas obsessões (pensamentos intrusivos) e compulsões (rituais) da ÚLTIMA SEMANA e responda cada item.',
    perguntas: [
      ['Tempo gasto com obsessões', ['Nenhum','Leve (menos de 1h/dia)','Moderado (1-3h/dia)','Grave (3-8h/dia)','Extremo (mais de 8h/dia)']],
      ['Interferência das obsessões', ['Nenhuma','Leve','Moderada','Grave','Extrema (incapacitante)']],
      ['Sofrimento causado pelas obsessões', ['Nenhum','Leve','Moderado','Grave','Extremo']],
      ['Resistência às obsessões', ['Sempre resisto','Resisto a maior parte do tempo','Resisto às vezes','Resisto pouco','Cedo totalmente']],
      ['Controle sobre as obsessões', ['Controle completo','Bom controle','Algum controle','Pouco controle','Nenhum controle']],
      ['Tempo gasto com compulsões', ['Nenhum','Leve (menos de 1h/dia)','Moderado (1-3h/dia)','Grave (3-8h/dia)','Extremo (mais de 8h/dia)']],
      ['Interferência das compulsões', ['Nenhuma','Leve','Moderada','Grave','Extrema']],
      ['Sofrimento se impedido de realizar compulsões', ['Nenhum','Leve','Moderado','Grave','Extremo']],
      ['Resistência às compulsões', ['Sempre resisto','Resisto a maior parte do tempo','Resisto às vezes','Resisto pouco','Cedo totalmente']],
      ['Controle sobre as compulsões', ['Controle completo','Bom controle','Algum controle','Pouco controle','Nenhum controle']],
    ].map(([_, opcoes]) => ({ texto: '', tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 7)       { nivel = 'TOC subclínico';   cor = 'green'; }
      else if (pontos <= 15) { nivel = 'TOC leve';         cor = 'amber'; }
      else if (pontos <= 23) { nivel = 'TOC moderado';     cor = 'amber'; }
      else if (pontos <= 31) { nivel = 'TOC grave';        cor = 'red'; }
      else                   { nivel = 'TOC extremo';      cor = 'red'; }
      return { nivel, cor, pontos, max: 40 };
    }
  },

  // ═══ TCC ESPECÍFICO ═══
  {
    id: 'das', categoria: 'tcc', nome: 'DAS',
    descCurta: 'Escala de Atitudes Disfuncionais — 20 itens',
    instrucoes: 'Esta escala mede atitudes e crenças. Não há respostas certas ou erradas. Indique o quanto cada afirmação descreve sua maneira de pensar.',
    perguntas: [
      'Para ser uma boa pessoa, devo ser amado(a) por todas as pessoas que conheço',
      'Sou nada se as pessoas que amo não me amam',
      'Para ser feliz, preciso ter sucesso em tudo que faço',
      'Se não consigo fazer algo bem, não vale a pena fazer',
      'Preciso da aprovação dos outros para me sentir bem comigo mesmo(a)',
      'Cometer erros significa que sou estúpido(a)',
      'Se outra pessoa discordar de mim, isso significa que ela não gosta de mim',
      'Para ser feliz, devo sempre manter o controle',
      'Se eu falhar parcialmente, é tão ruim quanto falhar totalmente',
      'Se eu for criticado(a), serei diminuído(a) aos olhos das pessoas',
      'Devo me sentir constantemente útil para os outros',
      'Sou inferior se alguém é melhor que eu em qualquer coisa',
      'É vergonhoso demonstrar fraqueza ou insegurança',
      'Não posso ser feliz a menos que a maioria das pessoas que conheço me admire',
      'Se cometo um erro grave, vou perder a estima dos outros',
      'Minha felicidade depende mais dos outros do que de mim',
      'Não consigo confiar em mim mesmo(a) para tomar boas decisões',
      'Se outros não me aprovam, não posso ser feliz',
      'Preciso ser perfeito(a) para que as pessoas gostem de mim',
      'Pessoas que tem boas ideias têm mais valor do que aquelas que não tem',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: CONCORD_7 })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 50)       { nivel = 'Atitudes funcionais';                cor = 'green'; }
      else if (pontos <= 80)  { nivel = 'Atitudes levemente disfuncionais';   cor = 'amber'; }
      else if (pontos <= 110) { nivel = 'Atitudes moderadamente disfuncionais'; cor = 'amber'; }
      else                    { nivel = 'Atitudes altamente disfuncionais';   cor = 'red'; }
      return { nivel, cor, pontos, max: 140 };
    }
  },

  {
    id: 'atq', categoria: 'tcc', nome: 'ATQ',
    descCurta: 'Questionário de Pensamentos Automáticos — 30 itens',
    instrucoes: 'Abaixo está uma lista de pensamentos que às vezes passam pela cabeça das pessoas. Indique com que frequência esse pensamento ocorreu com você durante a ÚLTIMA SEMANA.',
    perguntas: [
      'Sinto que estou enfrentando o mundo','Sou um(a) fracassado(a)','Nada de bom acontece comigo','Me odeio',
      'Eu nunca vou conseguir','Eu sou tão fraco(a)','Minha vida não está indo do jeito que eu quero',
      'Estou tão desapontado(a) comigo mesmo(a)','Nada parece valer a pena','Não aguento mais',
      'Não consigo continuar','Não consigo fazer nada certo','O que há de errado comigo',
      'Eu queria estar em outro lugar','Eu não consigo me organizar','Eu odeio a mim mesmo(a)',
      'Eu não tenho valor','Eu queria poder simplesmente desaparecer','O que há de errado comigo',
      'Eu sou um(a) perdedor(a)','Minha vida é uma bagunça','Eu sou um(a) fracassado(a)',
      'Eu nunca vou conseguir o que quero','Eu sou tão impotente','Algo precisa mudar',
      'Deve haver algo errado comigo','Meu futuro é sombrio','Não vale a pena',
      'Eu nunca posso terminar nada','Eu não posso suportar isso por mais tempo',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Nunca','Às vezes','Moderadamente frequente','Frequentemente','O tempo todo'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 45)      { nivel = 'Baixa frequência de pensamentos automáticos negativos';   cor = 'green'; }
      else if (pontos <= 75) { nivel = 'Frequência moderada de pensamentos automáticos negativos'; cor = 'amber'; }
      else                   { nivel = 'Alta frequência de pensamentos automáticos negativos';    cor = 'red'; }
      return { nivel, cor, pontos, max: 150 };
    }
  },

  {
    id: 'mcq30', categoria: 'tcc', nome: 'MCQ-30',
    descCurta: 'Questionário de Metacognições — 30 itens',
    instrucoes: 'Indique o quanto você concorda com cada afirmação. Não há respostas certas ou erradas.',
    perguntas: [
      'A preocupação me ajuda a evitar problemas no futuro','A preocupação é perigosa para mim',
      'Penso muito sobre meus pensamentos','Eu poderia me deixar adoecer com a preocupação',
      'Tenho consciência do funcionamento da minha mente quando estou pensando em um problema',
      'Se eu não controlasse um pensamento preocupante e ele acontecesse, seria minha culpa',
      'Preciso me preocupar para permanecer organizado(a)','Tenho pouca confiança em minha memória para palavras e nomes',
      'Meus pensamentos preocupantes persistem, não importa como tente pará-los','A preocupação me ajuda a resolver as coisas em minha cabeça',
      'Não posso ignorar meus pensamentos preocupantes','Eu monitoro meus pensamentos',
      'Eu deveria estar no controle dos meus pensamentos o tempo todo','Minha memória pode me enganar às vezes',
      'Minha preocupação poderia me fazer enlouquecer','Estou constantemente ciente do meu pensamento',
      'Tenho uma memória ruim','Presto muita atenção em como minha mente funciona',
      'A preocupação me ajuda a lidar','Não confiar em minha memória poderia me colocar em problemas',
      'Meus pensamentos preocupantes estão fora do meu controle','É bom para mim me preocupar',
      'Meu pensamento poderia me fazer adoecer','Minha preocupação poderia me prejudicar',
      'Examino meus pensamentos atentamente','Se eu não controlar meus pensamentos, não vou funcionar',
      'Preciso me preocupar para fazer meu trabalho','Eu tenho pouca confiança em minha memória de lugares',
      'Meus pensamentos preocupantes não vão embora, não importa o que eu faça','É bom pensar sobre meus pensamentos',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Discordo','Concordo um pouco','Concordo moderadamente','Concordo muito'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 60)      { nivel = 'Crenças metacognitivas adaptativas';   cor = 'green'; }
      else if (pontos <= 80) { nivel = 'Crenças metacognitivas moderadas';     cor = 'amber'; }
      else                   { nivel = 'Crenças metacognitivas disfuncionais'; cor = 'red'; }
      return { nivel, cor, pontos, max: 120 };
    }
  },

  // ═══ ESQUEMAS E PERSONALIDADE ═══
  {
    id: 'ysq', categoria: 'esquemas', nome: 'YSQ-S3',
    descCurta: 'Young Schema Questionnaire (forma breve) — esquemas iniciais desadaptativos',
    instrucoes: 'Listei abaixo afirmações que uma pessoa pode usar para descrever a si mesma. Leia cada uma e indique o quanto ela descreve você.',
    perguntas: [
      'Eu me preocupo que as pessoas que amo morram em breve, mesmo que haja pouca razão médica',
      'Eu me sinto totalmente perdido(a) sem outra pessoa para me ajudar nas decisões importantes',
      'Eu sinto que as pessoas vão me machucar, me trair ou me usar',
      'Eu não me encaixo','Ninguém que eu deseje me amaria de verdade ao me conhecer profundamente',
      'Quase nada do que eu faço no trabalho/escola é tão bom quanto outras pessoas conseguem fazer',
      'Eu não consigo cuidar de mim mesmo(a)','Não consigo escapar do sentimento de que algo ruim está prestes a acontecer',
      'Eu não consegui me separar dos meus pais como outras pessoas da minha idade conseguiram',
      'Acho que se eu fizer o que quero, vou ter problemas','Sou eu quem geralmente acaba cuidando das pessoas perto de mim',
      'Sinto que tenho que estar perfeito o tempo todo','Tenho muita dificuldade em aceitar "não" como resposta',
      'Tenho dificuldade em fazer coisas chatas sem distrações constantes','Quando me sinto bem, fico esperando que algo ruim aconteça',
      'Eu mereço atenção e privilégios especiais','Sou propenso a explosões raivosas se não consigo o que quero',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Não me descreve em absoluto','Em sua maior parte não me descreve','Descreve-me moderadamente','Descreve-me bem','Descreve-me muito bem','Descreve-me perfeitamente'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      const altos = resp.filter(r => parseInt(r) >= 4).length;
      if (altos <= 2)      { nivel = `${altos} itens com pontuação alta`;  cor = 'green'; }
      else if (altos <= 6) { nivel = `${altos} itens com pontuação alta — esquemas presentes`; cor = 'amber'; }
      else                 { nivel = `${altos} itens com pontuação alta — múltiplos esquemas ativos`; cor = 'red'; }
      return { nivel, cor, pontos, max: resp.length * 5 };
    }
  },

  {
    id: 'bpq', categoria: 'esquemas', nome: 'BPQ',
    descCurta: 'Questionário de Traços Borderline — 15 itens',
    instrucoes: 'Indique se cada afirmação se aplica a você, considerando como você tem se sentido recentemente.',
    perguntas: [
      'Tenho problemas com minha identidade','Meu humor pode mudar rapidamente',
      'Minha vida está vazia','Tenho relações intensas que mudam rapidamente entre amor e ódio',
      'Faço coisas impulsivas que me prejudicam (gastos, sexo, comida, drogas)',
      'Já me machuquei deliberadamente ou pensei em suicídio',
      'Faço esforços frenéticos para evitar abandono',
      'Tenho explosões de raiva que são difíceis de controlar',
      'Em momentos de estresse, sinto-me desconectado(a) da realidade ou de mim mesmo(a)',
      'Sinto-me cronicamente vazio(a)','Tenho dificuldade em estar sozinho(a)',
      'Costumo ser indeciso(a) sobre quem sou','Idealizo e depois desvalorizo pessoas próximas',
      'Sinto que as pessoas vão me abandonar','Tenho problemas para controlar impulsos',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: SIM_NAO })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 4)       { nivel = 'Baixa presença de traços'; cor = 'green'; }
      else if (pontos <= 7)  { nivel = 'Traços moderados'; cor = 'amber'; }
      else                   { nivel = 'Alta presença de traços borderline'; cor = 'red'; }
      return { nivel, cor, pontos, max: 15 };
    }
  },

  // ═══ MINDFULNESS E ACT ═══
  {
    id: 'scs', categoria: 'mindfulness', nome: 'SCS-SF',
    descCurta: 'Escala de Autocompaixão (forma breve) — 12 itens',
    instrucoes: 'Leia cada afirmação com cuidado e indique a frequência com que você se comporta dessa maneira em direção a si mesmo(a).',
    perguntas: [
      ['Quando falho em algo importante, sou consumido(a) por sentimentos de inadequação', true],
      ['Tento ser compreensivo(a) e paciente com aspectos da minha personalidade que não gosto', false],
      ['Quando algo doloroso acontece, tento ter uma visão equilibrada da situação', false],
      ['Quando estou pra baixo, tendo a sentir que a maioria das pessoas é mais feliz que eu', true],
      ['Tento ver meus fracassos como parte da condição humana', false],
      ['Quando estou passando por dificuldades, dou a mim mesmo(a) o cuidado e o carinho que preciso', false],
      ['Quando algo me chateia, tento manter minhas emoções em equilíbrio', false],
      ['Quando falho em algo que é importante, tendo a me sentir sozinho(a) no meu fracasso', true],
      ['Quando estou pra baixo, tendo a obsedar e me fixar em tudo que está errado', true],
      ['Quando me sinto inadequado(a) tento me lembrar que estes sentimentos são compartilhados pela maioria', false],
      ['Sou desaprovador(a) e crítico(a) de minhas próprias falhas e inadequações', true],
      ['Sou intolerante e impaciente com aspectos da minha personalidade que não gosto', true],
    ].map(([t, _]) => ({ texto: t, tipo: 'likert', opcoes: FREQ_5 })),
    interpretar: (resp, pontos, escala) => {
      // Itens negativos (reverter): 0, 3, 7, 8, 10, 11
      const reverso = [0, 3, 7, 8, 10, 11];
      let total = 0;
      escala.perguntas.forEach((_, i) => {
        const v = parseInt(resp[i]);
        total += reverso.includes(i) ? (4 - v) : v;
      });
      const media = (total / 12).toFixed(2);
      let nivel, cor;
      if (media < 2)       { nivel = `Baixa autocompaixão (média ${media})`;     cor = 'red'; }
      else if (media < 3)  { nivel = `Autocompaixão moderada (média ${media})`;  cor = 'amber'; }
      else                 { nivel = `Alta autocompaixão (média ${media})`;      cor = 'green'; }
      return { nivel, cor, pontos: total, max: 48 };
    }
  },

  {
    id: 'maas', categoria: 'mindfulness', nome: 'MAAS',
    descCurta: 'Mindful Attention Awareness Scale — 15 itens',
    instrucoes: 'Indique com que frequência você tem cada experiência. Responda de acordo com o que realmente reflete sua experiência, e não com o que você pensa que sua experiência deveria ser.',
    perguntas: [
      'Posso experimentar uma emoção e não estar consciente dela até algum tempo depois',
      'Quebro ou derramo coisas por causa de descuido, por não prestar atenção ou por estar pensando em outra coisa',
      'Acho difícil ficar concentrado(a) no que está acontecendo no presente',
      'Tendo a caminhar rapidamente para chegar onde estou indo sem prestar atenção ao que experimento no caminho',
      'Tendo a não notar sensações de tensão física ou desconforto até que elas realmente capturem minha atenção',
      'Esqueço o nome de uma pessoa quase tão logo eu o ouvi pela primeira vez',
      'Pareço estar "funcionando no piloto automático" sem muita consciência do que estou fazendo',
      'Apresso atividades sem realmente estar atento(a) a elas',
      'Fico tão focado(a) no objetivo que quero alcançar que perco o contato com o que estou fazendo agora',
      'Faço trabalhos ou tarefas automaticamente, sem estar consciente do que estou fazendo',
      'Eu me pego ouvindo alguém com um ouvido, fazendo outra coisa ao mesmo tempo',
      'Dirijo no piloto automático e então me pergunto por que eu fui para lá',
      'Eu me pego preocupado(a) com o futuro ou o passado',
      'Eu me pego fazendo as coisas sem prestar atenção',
      'Eu como sem perceber que estou comendo',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Quase sempre','Muito frequentemente','Algo frequentemente','Algo infrequentemente','Muito infrequentemente','Quase nunca'] })),
    interpretar: (resp, pontos) => {
      const media = (pontos / 15).toFixed(2);
      let nivel, cor;
      if (media < 3)       { nivel = `Baixo mindfulness (média ${media})`;     cor = 'red'; }
      else if (media < 4)  { nivel = `Mindfulness moderado (média ${media})`;  cor = 'amber'; }
      else                 { nivel = `Alto mindfulness (média ${media})`;      cor = 'green'; }
      return { nivel, cor, pontos, max: 75 };
    }
  },

  {
    id: 'aaq2', categoria: 'mindfulness', nome: 'AAQ-II',
    descCurta: 'Aceitação e Ação — flexibilidade psicológica — 7 itens',
    instrucoes: 'Avalie o quanto cada afirmação é verdadeira para você.',
    perguntas: [
      'Minhas experiências dolorosas e memórias tornam difícil para mim viver a vida que valorizaria',
      'Eu tenho medo dos meus sentimentos','Eu me preocupo em não ser capaz de controlar minhas preocupações e sentimentos',
      'Minhas memórias dolorosas me impedem de ter uma vida plena',
      'Emoções causam problemas em minha vida','Parece que a maioria das pessoas está lidando melhor com a vida do que eu',
      'Preocupações atrapalham meu sucesso',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Nunca verdade','Muito raramente verdade','Raramente verdade','Às vezes verdade','Frequentemente verdade','Quase sempre verdade','Sempre verdade'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 24)      { nivel = 'Flexibilidade psicológica adequada';     cor = 'green'; }
      else if (pontos <= 28) { nivel = 'Inflexibilidade psicológica moderada';   cor = 'amber'; }
      else                   { nivel = 'Inflexibilidade psicológica significativa (esquiva experiencial)'; cor = 'red'; }
      return { nivel, cor, pontos, max: 49 };
    }
  },

  // ═══ REGULAÇÃO EMOCIONAL ═══
  {
    id: 'ders', categoria: 'regulacao', nome: 'DERS-16',
    descCurta: 'Dificuldades de Regulação Emocional (forma breve) — 16 itens',
    instrucoes: 'Indique com que frequência cada afirmação se aplica a você.',
    perguntas: [
      'Tenho dificuldade em entender meus sentimentos','Fico confuso(a) sobre como me sinto',
      'Quando estou chateado(a), tenho dificuldade em fazer meu trabalho',
      'Quando estou chateado(a), perco o controle','Quando estou chateado(a), acredito que ficarei assim por um longo tempo',
      'Quando estou chateado(a), acredito que vou acabar muito deprimido(a)',
      'Quando estou chateado(a), tenho dificuldade em focar em outras coisas',
      'Quando estou chateado(a), sinto-me fora de controle',
      'Quando estou chateado(a), envergonho-me por me sentir assim',
      'Quando estou chateado(a), sinto-me fraco(a)',
      'Quando estou chateado(a), tenho dificuldade em controlar meus comportamentos',
      'Quando estou chateado(a), acredito que não há nada a fazer para me sentir melhor',
      'Quando estou chateado(a), fico irritado(a) comigo por me sentir assim',
      'Quando estou chateado(a), começo a me sentir muito mal comigo mesmo(a)',
      'Quando estou chateado(a), tenho dificuldade em pensar em outra coisa',
      'Quando estou chateado(a), minhas emoções parecem opressoras',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Quase nunca (0-10%)','Às vezes (11-35%)','Cerca de metade do tempo (36-65%)','A maior parte do tempo (66-90%)','Quase sempre (91-100%)'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 32)      { nivel = 'Baixa dificuldade de regulação emocional';     cor = 'green'; }
      else if (pontos <= 48) { nivel = 'Dificuldade moderada de regulação emocional';  cor = 'amber'; }
      else                   { nivel = 'Alta dificuldade de regulação emocional';      cor = 'red'; }
      return { nivel, cor, pontos, max: 80 };
    }
  },

  {
    id: 'erq', categoria: 'regulacao', nome: 'ERQ',
    descCurta: 'Questionário de Regulação Emocional — 10 itens',
    instrucoes: 'Gostaríamos de fazer algumas perguntas sobre sua vida emocional, especialmente sobre como você controla (regula e gerencia) suas emoções.',
    perguntas: [
      ['REA','Quando quero sentir mais emoção positiva, mudo a maneira como estou pensando sobre a situação'],
      ['SE','Eu mantenho minhas emoções para mim mesmo'],
      ['REA','Quando quero sentir menos emoção negativa, mudo a maneira como estou pensando sobre a situação'],
      ['SE','Quando estou sentindo emoções positivas, sou cuidadoso(a) para não expressá-las'],
      ['REA','Quando estou enfrentando uma situação estressante, eu me forço a pensar sobre ela de uma maneira que me ajude a permanecer calmo(a)'],
      ['SE','Eu controlo minhas emoções não as expressando'],
      ['REA','Quando quero sentir mais emoção positiva, mudo a maneira como estou pensando sobre a situação'],
      ['REA','Eu controlo minhas emoções mudando a maneira como penso sobre a situação em que estou'],
      ['SE','Quando estou sentindo emoções negativas, certifico-me de não expressá-las'],
      ['SE','Quando quero sentir menos emoção negativa sobre algo, mudo a maneira como penso sobre isso'],
    ].map(([grp, t]) => ({ texto: t, tipo: 'likert', grupo: grp, opcoes: CONCORD_7 })),
    interpretar: (resp, pontos, escala) => {
      let rea = 0, se = 0, nrea = 0, nse = 0;
      escala.perguntas.forEach((p, i) => {
        const v = parseInt(resp[i]);
        if (p.grupo === 'REA') { rea += v; nrea++; } else { se += v; nse++; }
      });
      const mRea = (rea / nrea).toFixed(2);
      const mSe = (se / nse).toFixed(2);
      const cor = mSe > 5 ? 'red' : (mSe > 4 ? 'amber' : 'green');
      return { nivel: `Reavaliação cognitiva: ${mRea}/7 · Supressão expressiva: ${mSe}/7`, cor, subscores: { 'Reavaliação': rea, 'Supressão': se }, pontos, max: 70 };
    }
  },

  // ═══ ALIANÇA TERAPÊUTICA ═══
  {
    id: 'wai', categoria: 'alianca', nome: 'WAI-SR',
    descCurta: 'Inventário de Aliança Terapêutica (forma breve) — 12 itens',
    instrucoes: 'Pensando na sua relação com seu(sua) terapeuta, indique o quanto cada afirmação é verdadeira para você.',
    perguntas: [
      ['Minha(meu) terapeuta e eu concordamos sobre os passos a serem tomados para melhorar minha situação'],
      ['Acredito que o que estamos fazendo nas sessões me ajudará a alcançar as mudanças que desejo'],
      ['Acredito que minha(meu) terapeuta gosta de mim'],
      ['Concordo com minha(meu) terapeuta sobre o que é importante para eu trabalhar'],
      ['Minha(meu) terapeuta e eu nos respeitamos'],
      ['Minha(meu) terapeuta e eu estamos trabalhando em direção a objetivos mutuamente acordados'],
      ['Sinto que minha(meu) terapeuta aprecia quem eu sou'],
      ['Concordamos sobre o que é importante para eu trabalhar'],
      ['Minha(meu) terapeuta e eu confiamos um no outro'],
      ['Minha(meu) terapeuta e eu temos diferentes ideias sobre quais são meus problemas reais'],
      ['Minha(meu) terapeuta e eu temos um entendimento comum sobre as mudanças que seriam boas para mim'],
      ['Acredito que a maneira como estamos trabalhando juntos com meus problemas é correta'],
    ].map(([t]) => ({ texto: t, tipo: 'likert', opcoes: ['Raramente','Ocasionalmente','Às vezes','Frequentemente','Muito frequentemente'] })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      const media = (pontos / 12).toFixed(2);
      if (media >= 4)      { nivel = `Aliança terapêutica forte (média ${media}/5)`;   cor = 'green'; }
      else if (media >= 3) { nivel = `Aliança terapêutica moderada (média ${media}/5)`; cor = 'amber'; }
      else                 { nivel = `Aliança terapêutica fragilizada (média ${media}/5)`; cor = 'red'; }
      return { nivel, cor, pontos, max: 60 };
    }
  },

  // ═══ MONITORAMENTO DE SESSÃO ═══
  {
    id: 'srs', categoria: 'sessao', nome: 'SRS',
    descCurta: 'Avaliação da Sessão — feedback rápido (4 itens)',
    instrucoes: 'Pense na sessão de hoje e avalie cada item de 0 (muito ruim) a 10 (excelente).',
    perguntas: [
      ['Relação: Eu me senti compreendido(a), respeitado(a) e ouvido(a)'],
      ['Objetivos e tópicos: Trabalhamos e conversamos sobre o que eu queria trabalhar e conversar'],
      ['Abordagem ou método: A abordagem da(o) terapeuta é a certa para mim'],
      ['Geral: No geral, a sessão de hoje foi boa para mim'],
    ].map(([t]) => ({ texto: t, tipo: 'numero' })),
    interpretar: (resp, pontos) => {
      const media = (pontos / 4).toFixed(1);
      let nivel, cor;
      if (media >= 9)      { nivel = `Sessão muito positiva (média ${media}/10)`;  cor = 'green'; }
      else if (media >= 7) { nivel = `Sessão boa (média ${media}/10)`;             cor = 'green'; }
      else if (media >= 5) { nivel = `Sessão regular (média ${media}/10)`;         cor = 'amber'; }
      else                 { nivel = `Sessão insatisfatória (média ${media}/10)`;  cor = 'red'; }
      return { nivel, cor, pontos, max: 40 };
    }
  },

  {
    id: 'ors', categoria: 'sessao', nome: 'ORS',
    descCurta: 'Avaliação de Resultados — bem-estar geral (4 itens)',
    instrucoes: 'Pensando na sua semana, incluindo hoje, avalie cada área de 0 (muito mal) a 10 (muito bem).',
    perguntas: [
      ['Individual: Bem-estar pessoal'],
      ['Interpessoal: Família, relacionamentos próximos'],
      ['Social: Trabalho, escola, amizades'],
      ['Geral: Sensação geral de bem-estar'],
    ].map(([t]) => ({ texto: t, tipo: 'numero' })),
    interpretar: (resp, pontos) => {
      const media = (pontos / 4).toFixed(1);
      let nivel, cor;
      if (media >= 7)      { nivel = `Bem-estar elevado (média ${media}/10)`;     cor = 'green'; }
      else if (media >= 5) { nivel = `Bem-estar moderado (média ${media}/10)`;    cor = 'amber'; }
      else                 { nivel = `Bem-estar reduzido (média ${media}/10) — sofrimento clínico significativo`; cor = 'red'; }
      return { nivel, cor, pontos, max: 40 };
    }
  },

  // ═══ QUALIDADE DE VIDA ═══
  {
    id: 'whoqol', categoria: 'qualidade', nome: 'WHOQOL-Bref',
    descCurta: 'Qualidade de vida — OMS — 26 itens',
    instrucoes: 'Estas questões são sobre como você se sente a respeito de sua qualidade de vida nas duas últimas semanas.',
    perguntas: [
      'Como você avaliaria sua qualidade de vida?',
      'Quão satisfeito(a) você está com a sua saúde?',
      'Em que medida você acha que sua dor física impede de fazer o que precisa?',
      'O quanto você precisa de algum tratamento médico para levar sua vida diária?',
      'O quanto você aproveita a vida?',
      'Em que medida você acha que a sua vida tem sentido?',
      'O quanto você consegue se concentrar?',
      'Quão seguro(a) você se sente em sua vida diária?',
      'Quão saudável é o seu ambiente físico (clima, barulho, poluição)?',
      'Você tem energia suficiente para seu dia-a-dia?',
      'Você é capaz de aceitar sua aparência física?',
      'Você tem dinheiro suficiente para satisfazer suas necessidades?',
      'Quão disponíveis para você estão as informações que precisa no dia-a-dia?',
      'Em que medida você tem oportunidades de atividade de lazer?',
      'Quão bem você é capaz de se locomover?',
      'Quão satisfeito(a) você está com o seu sono?',
      'Quão satisfeito(a) você está com sua capacidade de desempenhar as atividades do dia-a-dia?',
      'Quão satisfeito(a) você está com sua capacidade para o trabalho?',
      'Quão satisfeito(a) você está consigo mesmo(a)?',
      'Quão satisfeito(a) você está com suas relações pessoais?',
      'Quão satisfeito(a) você está com sua vida sexual?',
      'Quão satisfeito(a) você está com o apoio que recebe dos seus amigos?',
      'Quão satisfeito(a) você está com as condições do local onde mora?',
      'Quão satisfeito(a) você está com seu acesso aos serviços de saúde?',
      'Quão satisfeito(a) você está com o seu meio de transporte?',
      'Com que frequência você tem sentimentos negativos (mau humor, desespero, ansiedade, depressão)?',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Muito ruim/Muito insatisfeito','Ruim/Insatisfeito','Nem ruim nem boa/Nem satisfeito','Boa/Satisfeito','Muito boa/Muito satisfeito'] })),
    interpretar: (resp, pontos) => {
      const media = (pontos / 26).toFixed(2);
      let nivel, cor;
      if (media >= 3.5)      { nivel = `Qualidade de vida boa (média ${media}/5)`;     cor = 'green'; }
      else if (media >= 2.5) { nivel = `Qualidade de vida moderada (média ${media}/5)`; cor = 'amber'; }
      else                   { nivel = `Qualidade de vida prejudicada (média ${media}/5)`; cor = 'red'; }
      return { nivel, cor, pontos, max: 130 };
    }
  },

  {
    id: 'pss', categoria: 'qualidade', nome: 'PSS-10',
    descCurta: 'Escala de Estresse Percebido — 10 itens',
    instrucoes: 'No último mês, com que frequência você...',
    perguntas: [
      ['Sentiu-se chateado(a) por causa de algo que aconteceu inesperadamente?', false],
      ['Sentiu-se incapaz de controlar as coisas importantes na sua vida?', false],
      ['Sentiu-se nervoso(a) e estressado(a)?', false],
      ['Sentiu confiança em sua capacidade de resolver seus problemas pessoais?', true],
      ['Sentiu que as coisas estavam indo a seu favor?', true],
      ['Achou que não conseguia lidar com tudo que você tinha de fazer?', false],
      ['Foi capaz de controlar as irritações em sua vida?', true],
      ['Sentiu que estava no controle das coisas?', true],
      ['Ficou irritado(a) com coisas fora do seu controle?', false],
      ['Sentiu que as dificuldades se acumulavam tanto que não conseguiria superá-las?', false],
    ].map(([t, _]) => ({ texto: t, tipo: 'likert', opcoes: ['Nunca','Quase nunca','Às vezes','Quase sempre','Sempre'] })),
    interpretar: (resp, pontos, escala) => {
      // Itens positivos reversos: 3, 4, 6, 7 (índices 0-based)
      const reverso = [3, 4, 6, 7];
      let total = 0;
      escala.perguntas.forEach((_, i) => {
        const v = parseInt(resp[i]);
        total += reverso.includes(i) ? (4 - v) : v;
      });
      let nivel, cor;
      if (total <= 13)      { nivel = 'Estresse baixo';     cor = 'green'; }
      else if (total <= 26) { nivel = 'Estresse moderado';  cor = 'amber'; }
      else                  { nivel = 'Estresse elevado';   cor = 'red'; }
      return { nivel, cor, pontos: total, max: 40 };
    }
  },

  // ═══ SONO ═══
  {
    id: 'isi', categoria: 'sono', nome: 'ISI',
    descCurta: 'Índice de Gravidade da Insônia — 7 itens',
    instrucoes: 'Avalie a gravidade dos seus problemas de sono nas ÚLTIMAS DUAS SEMANAS.',
    perguntas: [
      ['Dificuldade em adormecer', ['Nenhuma','Leve','Moderada','Grave','Muito grave']],
      ['Dificuldade em permanecer dormindo', ['Nenhuma','Leve','Moderada','Grave','Muito grave']],
      ['Problemas em acordar muito cedo', ['Nenhum','Leve','Moderado','Grave','Muito grave']],
      ['O quanto está SATISFEITO(A) com seu padrão atual de sono?', ['Muito satisfeito','Satisfeito','Neutro','Insatisfeito','Muito insatisfeito']],
      ['Quanto seu problema de sono interfere no seu funcionamento diário?', ['Nada','Um pouco','Algo','Muito','Muitíssimo']],
      ['O quanto seu problema de sono é perceptível para outras pessoas?', ['Nada','Um pouco','Algo','Muito','Muitíssimo']],
      ['Quão preocupado(a)/aflito(a) você está com seu problema de sono?', ['Nada','Um pouco','Algo','Muito','Muitíssimo']],
    ].map(([t, opcoes]) => ({ texto: t, tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 7)       { nivel = 'Sem insônia clínica';        cor = 'green'; }
      else if (pontos <= 14) { nivel = 'Insônia subliminar';         cor = 'amber'; }
      else if (pontos <= 21) { nivel = 'Insônia clínica moderada';   cor = 'amber'; }
      else                   { nivel = 'Insônia clínica grave';      cor = 'red'; }
      return { nivel, cor, pontos, max: 28 };
    }
  },

  {
    id: 'psqi', categoria: 'sono', nome: 'PSQI (resumido)',
    descCurta: 'Pittsburgh Sleep Quality Index — 9 itens',
    instrucoes: 'As perguntas referem-se aos seus hábitos de sono no ÚLTIMO MÊS.',
    perguntas: [
      ['Como você avaliaria a qualidade do seu sono no último mês?', ['Muito boa','Boa','Ruim','Muito ruim']],
      ['Quanto tempo (em minutos) você levou para dormir cada noite?', ['≤ 15 min','16-30 min','31-60 min','> 60 min']],
      ['Quantas horas de sono efetivo você teve por noite?', ['> 7 horas','6-7 horas','5-6 horas','< 5 horas']],
      ['Com que frequência teve dificuldade em adormecer em 30 minutos?', ['Nenhuma vez','Menos de 1x/semana','1-2x/semana','3 ou mais x/semana']],
      ['Com que frequência acordou no meio da noite ou de madrugada?', ['Nenhuma vez','Menos de 1x/semana','1-2x/semana','3 ou mais x/semana']],
      ['Com que frequência se sentiu muito quente ou muito frio?', ['Nenhuma vez','Menos de 1x/semana','1-2x/semana','3 ou mais x/semana']],
      ['Com que frequência teve dificuldade em ficar acordado(a) durante o dia?', ['Nenhuma vez','Menos de 1x/semana','1-2x/semana','3 ou mais x/semana']],
      ['Quão problemático foi manter entusiasmo para fazer suas atividades?', ['Nenhum problema','Um pouco','Considerável','Muito grande']],
      ['Com que frequência tomou medicamentos para dormir?', ['Nenhuma vez','Menos de 1x/semana','1-2x/semana','3 ou mais x/semana']],
    ].map(([t, opcoes]) => ({ texto: t, tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 5)       { nivel = 'Boa qualidade de sono';      cor = 'green'; }
      else if (pontos <= 10) { nivel = 'Qualidade de sono ruim';     cor = 'amber'; }
      else                   { nivel = 'Distúrbio importante do sono'; cor = 'red'; }
      return { nivel, cor, pontos, max: 27 };
    }
  },

  // ═══ USO DE SUBSTÂNCIAS ═══
  {
    id: 'audit', categoria: 'substancias', nome: 'AUDIT',
    descCurta: 'Identificação de uso problemático de álcool — 10 itens (OMS)',
    instrucoes: 'As perguntas a seguir são sobre seu uso de bebidas alcoólicas no ÚLTIMO ANO.',
    perguntas: [
      ['Com que frequência você consome bebidas alcoólicas?', ['Nunca','Mensal ou menos','2-4 vezes/mês','2-3 vezes/semana','4+ vezes/semana']],
      ['Em um dia típico em que bebe, quantas doses consome?', ['1 ou 2','3 ou 4','5 ou 6','7 a 9','10 ou mais']],
      ['Com que frequência consome 6 ou mais doses em uma ocasião?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Quantas vezes notou que não conseguiu parar de beber depois de começar?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Quantas vezes não conseguiu fazer o que era esperado por causa da bebida?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Quantas vezes precisou beber pela manhã para se sentir melhor?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Quantas vezes sentiu culpa ou remorso após beber?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Quantas vezes não conseguiu lembrar o que aconteceu na noite anterior?', ['Nunca','Menos de mensalmente','Mensalmente','Semanalmente','Diariamente']],
      ['Você ou outra pessoa já se machucou por causa da sua bebida?', ['Não','Sim, mas não no último ano','','','Sim, no último ano']],
      ['Algum parente/amigo/médico se preocupou com sua bebida ou sugeriu que parasse?', ['Não','Sim, mas não no último ano','','','Sim, no último ano']],
    ].map(([t, opcoes]) => ({ texto: t, tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos <= 7)       { nivel = 'Baixo risco / consumo de baixo risco';   cor = 'green'; }
      else if (pontos <= 15) { nivel = 'Consumo de risco';                       cor = 'amber'; }
      else if (pontos <= 19) { nivel = 'Consumo nocivo';                         cor = 'red'; }
      else                   { nivel = 'Provável dependência alcoólica';         cor = 'red'; }
      return { nivel, cor, pontos, max: 40 };
    }
  },

  {
    id: 'cage', categoria: 'substancias', nome: 'CAGE',
    descCurta: 'Rastreio rápido de dependência alcoólica — 4 itens',
    instrucoes: 'Responda sim ou não para cada pergunta.',
    perguntas: [
      'Você já sentiu que deveria DIMINUIR a quantidade de bebida (Cut down)?',
      'As pessoas o(a) ABORRECEM porque criticam seu modo de beber (Annoyed)?',
      'Você se sente CULPADO(A) pela maneira como costuma beber (Guilty)?',
      'Você costuma beber pela MANHÃ para diminuir o nervosismo ou ressaca (Eye-opener)?',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: SIM_NAO })),
    interpretar: (resp, pontos) => {
      let nivel, cor;
      if (pontos === 0)      { nivel = 'Triagem negativa'; cor = 'green'; }
      else if (pontos === 1) { nivel = 'Atenção necessária (1 resposta positiva)'; cor = 'amber'; }
      else                   { nivel = 'Triagem positiva para problemas com álcool (≥ 2 respostas positivas)'; cor = 'red'; }
      return { nivel, cor, pontos, max: 4 };
    }
  },
];

// ────────────────────────────────────────
// Helper: obter escala por id (incluindo customizadas do Firestore)
export function getEscalaById(id, escalasCustom = []) {
  return ESCALAS.find(e => e.id === id) || escalasCustom.find(e => e.id === id);
}

// Helper: escalas por categoria
export function escalasPorCategoria() {
  const grupos = {};
  CATEGORIAS.forEach(c => { grupos[c.id] = { ...c, escalas: [] }; });
  ESCALAS.forEach(e => { if (grupos[e.categoria]) grupos[e.categoria].escalas.push(e); });
  return Object.values(grupos).sort((a, b) => a.ordem - b.ordem);
}

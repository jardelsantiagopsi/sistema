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
  { id: 'substancias',        nome: 'Uso de substâncias',       icone: '◊', ordem: 12 },
  { id: 'autoconhecimento',   nome: 'Autoconhecimento',         icone: '◎', ordem: 13 },
  { id: 'projeto-vida',       nome: 'Projeto de vida',          icone: '◈', ordem: 14 },
  { id: 'neurodesenvolvimento', nome: 'Neurodesenvolvimento',   icone: '◉', ordem: 15 },
  { id: 'alimentar',          nome: 'Comportamento alimentar',  icone: '◇', ordem: 16 },
  { id: 'trabalho',           nome: 'Trabalho e burnout',       icone: '◆', ordem: 17 },
  { id: 'relacionamentos',    nome: 'Relacionamentos',          icone: '◑', ordem: 18 },
  { id: 'trauma',             nome: 'Trauma',                   icone: '◐', ordem: 19 },
  { id: 'somatizacao',        nome: 'Somatização',              icone: '◒', ordem: 20 },
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
      ['REA','Quando quero sentir mais emoções positivas, penso em algo diferente'],
      ['REA','Eu controlo minhas emoções mudando a maneira como penso sobre a situação em que estou'],
      ['SE','Quando estou sentindo emoções negativas, certifico-me de não expressá-las'],
      ['REA','Quando quero sentir menos emoção negativa sobre algo, penso nisso de outra maneira'],
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
      ['Você ou outra pessoa já se machucou por causa da sua bebida?', ['Não','Sim, mas não no último ano','Sim, no último ano']],
      ['Algum parente/amigo/médico se preocupou com sua bebida ou sugeriu que parasse?', ['Não','Sim, mas não no último ano','Sim, no último ano']],
    ].map(([t, opcoes]) => ({ texto: t, tipo: 'multipla', opcoes })),
    interpretar: (resp, pontos) => {
      // Q1-Q8: score 0-4 (index); Q9-Q10: score 0/2/4 (index × 2)
      let total = 0;
      resp.forEach((v, i) => { total += i >= 8 ? v * 2 : v; });
      let nivel, cor;
      if (total <= 7)       { nivel = 'Baixo risco / consumo de baixo risco';   cor = 'green'; }
      else if (total <= 15) { nivel = 'Consumo de risco';                       cor = 'amber'; }
      else if (total <= 19) { nivel = 'Consumo nocivo';                         cor = 'red'; }
      else                  { nivel = 'Provável dependência alcoólica';         cor = 'red'; }
      return { nivel, cor, pontos: total, max: 40 };
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

  // ═══ AUTOCONHECIMENTO ═══
  {
    id: 'bfi20', categoria: 'autoconhecimento', nome: 'BFI-20',
    descCurta: 'Inventário de Personalidade Big Five — 20 itens',
    instrucoes: 'Indique em que medida cada afirmação o(a) descreve. Eu me vejo como alguém que...',
    perguntas: [
      { texto: 'É comunicativo(a), falante', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'E' },
      { texto: 'Tende a encontrar defeitos nos outros', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'A', invertido: true },
      { texto: 'Faz um trabalho minucioso', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'C' },
      { texto: 'Fica deprimido(a), triste com facilidade', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'N' },
      { texto: 'É original, tem novas ideias', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'O' },
      { texto: 'É reservado(a)', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'E', invertido: true },
      { texto: 'É prestativo(a) e não egoísta', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'A' },
      { texto: 'Pode ser um tanto descuidado(a)', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'C', invertido: true },
      { texto: 'É calmo(a), lida bem com o estresse', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'N', invertido: true },
      { texto: 'É curioso(a) sobre muitas coisas', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'O' },
      { texto: 'É cheio(a) de energia', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'E' },
      { texto: 'Inicia conflitos com os outros', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'A', invertido: true },
      { texto: 'É um(a) trabalhador(a) de confiança', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'C' },
      { texto: 'Pode ficar tenso(a)', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'N' },
      { texto: 'É engenhoso(a), pensador(a) profundo(a)', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'O' },
      { texto: 'Gera muito entusiasmo', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'E' },
      { texto: 'Tem um coração bondoso', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'A' },
      { texto: 'Tende a ser desorganizado(a)', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'C', invertido: true },
      { texto: 'Se preocupa muito', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'N' },
      { texto: 'Tem uma imaginação ativa', tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Neutro','Concordo','Concordo totalmente'], grupo: 'O' },
    ],
    interpretar: (resp) => {
      const grupos = { E: [], A: [], C: [], N: [], O: [] };
      const perguntas = [
        {g:'E',inv:false},{g:'A',inv:true},{g:'C',inv:false},{g:'N',inv:false},{g:'O',inv:false},
        {g:'E',inv:true},{g:'A',inv:false},{g:'C',inv:true},{g:'N',inv:true},{g:'O',inv:false},
        {g:'E',inv:false},{g:'A',inv:true},{g:'C',inv:false},{g:'N',inv:false},{g:'O',inv:false},
        {g:'E',inv:false},{g:'A',inv:false},{g:'C',inv:true},{g:'N',inv:false},{g:'O',inv:false},
      ];
      perguntas.forEach((p, i) => {
        const v = (resp[i] ?? 2) + 1;
        grupos[p.g].push(p.inv ? 6 - v : v);
      });
      const scores = {};
      const nomes = { E:'Extroversão', A:'Amabilidade', C:'Conscienciosidade', N:'Neuroticismo', O:'Abertura' };
      Object.entries(grupos).forEach(([k, vals]) => { scores[nomes[k]] = vals.reduce((a,b)=>a+b,0); });
      const nivel = Object.entries(scores).map(([k,v]) => `${k}: ${v<=9?'Baixo':v<=14?'Médio':'Alto'}`).join(' · ');
      const n = scores[nomes['N']];
      const cor = n >= 15 ? 'red' : n >= 10 ? 'amber' : 'green';
      return { nivel, cor, pontos: Object.values(scores).reduce((a,b)=>a+b,0), max: 100, subscores: scores };
    }
  },

  {
    id: 'via24', categoria: 'autoconhecimento', nome: 'VIA-24',
    descCurta: 'Inventário de Forças de Caráter — 24 itens',
    instrucoes: 'Avalie o quanto cada afirmação descreve você:',
    perguntas: [
      { texto: 'Sempre encontro maneiras novas e originais de fazer as coisas', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Criatividade' },
      { texto: 'Exploro tudo que me chama a atenção, mesmo sem motivo prático', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Curiosidade' },
      { texto: 'Analiso situações sob diferentes ângulos antes de concluir', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Abertura mental' },
      { texto: 'Adoro aprender coisas novas, mesmo fora da escola ou trabalho', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Amor ao aprendizado' },
      { texto: 'As pessoas me procuram por meus conselhos e ponto de vista', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Perspectiva' },
      { texto: 'Defendo o que acredito mesmo que não seja popular', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Bravura' },
      { texto: 'Termino o que começo, mesmo diante de dificuldades', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Persistência' },
      { texto: 'Sou autêntico(a) e digo o que penso de forma honesta', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Integridade' },
      { texto: 'Abordo a vida com energia e entusiasmo', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Vitalidade' },
      { texto: 'Relacionamentos próximos são muito importantes para mim', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Amor' },
      { texto: 'Faço favores e atos de bondade para as pessoas ao meu redor', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Gentileza' },
      { texto: 'Sei como me portar em diferentes situações sociais', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Inteligência social' },
      { texto: 'Me dedico ao bem do grupo, não só ao individual', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Trabalho em equipe' },
      { texto: 'Trato as pessoas igualmente, sem deixar emoções pessoais influenciar', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Imparcialidade' },
      { texto: 'Organizo atividades e me asseguro que as coisas sejam feitas', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Liderança' },
      { texto: 'Perdoo pessoas que me magoaram e dou novas chances', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Perdão' },
      { texto: 'Deixo que minhas conquistas falem por si mesmas', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Humildade' },
      { texto: 'Penso antes de agir e evito riscos desnecessários', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Prudência' },
      { texto: 'Controlo minhas emoções e impulsos quando preciso', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Autorregulação' },
      { texto: 'Me emociono com a beleza da natureza, arte ou ciência', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Apreciação da beleza' },
      { texto: 'Sou grato(a) pelas coisas boas da minha vida e expresso isso', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Gratidão' },
      { texto: 'Espero o melhor e trabalho para que aconteça', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Esperança' },
      { texto: 'Ri e brinco facilmente, levando alegria aos outros', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Humor' },
      { texto: 'Tenho crenças sobre um propósito maior que dão sentido à minha vida', tipo: 'likert', opcoes: ['Não me descreve nada','Descreve pouco','Às vezes me descreve','Descreve bem','Descreve muito bem'], grupo: 'Espiritualidade' },
    ],
    interpretar: (resp) => {
      const forcas = ['Criatividade','Curiosidade','Abertura mental','Amor ao aprendizado','Perspectiva','Bravura','Persistência','Integridade','Vitalidade','Amor','Gentileza','Inteligência social','Trabalho em equipe','Imparcialidade','Liderança','Perdão','Humildade','Prudência','Autorregulação','Apreciação da beleza','Gratidão','Esperança','Humor','Espiritualidade'];
      const scores = {};
      forcas.forEach((f, i) => { scores[f] = (resp[i] ?? 0) + 1; });
      const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
      const top5 = sorted.slice(0,5).map(([k])=>k).join(', ');
      const total = Object.values(scores).reduce((a,b)=>a+b,0);
      return { nivel: `Forças principais: ${top5}`, cor: 'green', pontos: total, max: 120, subscores: scores };
    }
  },

  {
    id: 'rses', categoria: 'autoconhecimento', nome: 'RSES',
    descCurta: 'Escala de Autoestima de Rosenberg — 10 itens',
    instrucoes: 'Indique sua concordância com cada afirmação abaixo:',
    perguntas: [
      { texto: 'Sinto que sou uma pessoa de valor, pelo menos tanto quanto outras', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'] },
      { texto: 'Sinto que tenho várias qualidades boas', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'] },
      { texto: 'No geral, sou inclinado(a) a achar que sou um fracasso', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'], invertido: true },
      { texto: 'Sou capaz de fazer as coisas tão bem quanto a maioria das pessoas', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'] },
      { texto: 'Sinto que não tenho muito do que me orgulhar', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'], invertido: true },
      { texto: 'Tenho uma atitude positiva em relação a mim mesmo(a)', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'] },
      { texto: 'No geral, estou satisfeito(a) comigo mesmo(a)', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'] },
      { texto: 'Gostaria de ter mais respeito por mim mesmo(a)', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'], invertido: true },
      { texto: 'Às vezes me sinto inútil', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'], invertido: true },
      { texto: 'Às vezes penso que não presto para nada', tipo: 'likert', opcoes: ['Concordo totalmente','Concordo','Discordo','Discordo totalmente'], invertido: true },
    ],
    interpretar: (resp, pontos) => {
      const inv = [false,false,true,false,true,false,false,true,true,true];
      let total = 0;
      inv.forEach((isInv, i) => {
        const v = resp[i] ?? 0;
        total += isInv ? v : (3 - v);
      });
      let nivel, cor;
      if (total < 15)      { nivel = 'Baixa autoestima';  cor = 'red'; }
      else if (total <= 25) { nivel = 'Autoestima média';  cor = 'amber'; }
      else                  { nivel = 'Autoestima elevada'; cor = 'green'; }
      return { nivel, cor, pontos: total, max: 30 };
    }
  },

  {
    id: 'eag', categoria: 'autoconhecimento', nome: 'EAG',
    descCurta: 'Escala de Autoeficácia Geral — 10 itens',
    instrucoes: 'Indique o quanto cada afirmação é verdadeira para você:',
    perguntas: [
      'Consigo sempre resolver problemas difíceis se me esforçar',
      'Se alguém se opõe a mim, consigo encontrar meios de conseguir o que quero',
      'É fácil para mim agarrar a objetivos e alcançá-los',
      'Estou confiante na minha capacidade de lidar de forma eficiente com eventos inesperados',
      'Graças ao meu engenho, sei como lidar com situações imprevistas',
      'Consigo resolver a maioria dos problemas se investir esforço necessário',
      'Mantenho a calma ao enfrentar dificuldades porque posso contar com as minhas capacidades',
      'Quando enfrento um problema, normalmente consigo encontrar várias soluções',
      'Se estou com problemas, normalmente encontro uma saída',
      'Consigo lidar com qualquer coisa que apareça',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Não é verdade','Às vezes é verdade','Bastante verdadeiro','Totalmente verdadeiro'] })),
    interpretar: (resp, pontos) => {
      const total = resp.reduce((a,v)=>a+(v+1),0);
      let nivel, cor;
      if (total <= 20)      { nivel = 'Autoeficácia baixa';     cor = 'red'; }
      else if (total <= 30) { nivel = 'Autoeficácia moderada';  cor = 'amber'; }
      else                  { nivel = 'Autoeficácia elevada';   cor = 'green'; }
      return { nivel, cor, pontos: total, max: 40 };
    }
  },

  // ═══ PROJETO DE VIDA ═══
  {
    id: 'riasec', categoria: 'projeto-vida', nome: 'RIASEC',
    descCurta: 'Inventário de Interesses Vocacionais (Holland) — 36 itens',
    instrucoes: 'Avalie o quanto cada atividade lhe interessa:',
    perguntas: [
      {texto:'Trabalhar com ferramentas, máquinas ou equipamentos',grupo:'R'},{texto:'Consertar coisas mecânicas, elétricas ou eletrônicas',grupo:'R'},{texto:'Construir ou fabricar objetos com as próprias mãos',grupo:'R'},{texto:'Trabalhar com computadores, robótica ou automação',grupo:'R'},{texto:'Realizar atividades físicas ou ao ar livre',grupo:'R'},{texto:'Operar veículos, equipamentos pesados ou sistemas',grupo:'R'},
      {texto:'Fazer pesquisas científicas ou análises',grupo:'I'},{texto:'Resolver problemas complexos com lógica e raciocínio',grupo:'I'},{texto:'Estudar matemática, ciências ou tecnologia',grupo:'I'},{texto:'Investigar causas e efeitos de fenômenos',grupo:'I'},{texto:'Trabalhar com dados, estatísticas ou modelos',grupo:'I'},{texto:'Ler sobre descobertas científicas e inovações',grupo:'I'},
      {texto:'Criar obras artísticas, musicais ou literárias',grupo:'A'},{texto:'Expressar ideias e emoções de forma criativa',grupo:'A'},{texto:'Trabalhar com design, moda, publicidade ou decoração',grupo:'A'},{texto:'Escrever histórias, roteiros ou conteúdos criativos',grupo:'A'},{texto:'Atuar, dançar, cantar ou se apresentar',grupo:'A'},{texto:'Fotografar, filmar ou produzir conteúdo visual',grupo:'A'},
      {texto:'Ensinar, instruir ou orientar pessoas',grupo:'S'},{texto:'Ajudar pessoas com problemas emocionais ou sociais',grupo:'S'},{texto:'Trabalhar em equipe e colaborar com outros',grupo:'S'},{texto:'Cuidar de pessoas (saúde, educação, assistência)',grupo:'S'},{texto:'Comunicar-me com muitas pessoas diferentes',grupo:'S'},{texto:'Participar de projetos sociais ou comunitários',grupo:'S'},
      {texto:'Liderar e motivar equipes',grupo:'E'},{texto:'Vender produtos, serviços ou ideias',grupo:'E'},{texto:'Iniciar, gerir ou expandir negócios',grupo:'E'},{texto:'Tomar decisões importantes e influenciar pessoas',grupo:'E'},{texto:'Competir e superar desafios profissionais',grupo:'E'},{texto:'Negociar, persuadir e fechar acordos',grupo:'E'},
      {texto:'Organizar documentos, arquivos ou registros',grupo:'C'},{texto:'Seguir procedimentos e normas com precisão',grupo:'C'},{texto:'Trabalhar com planilhas, contabilidade ou finanças',grupo:'C'},{texto:'Manter registros detalhados e exatos',grupo:'C'},{texto:'Trabalhar em ambiente estruturado e previsível',grupo:'C'},{texto:'Classificar, categorizar e sistematizar informações',grupo:'C'},
    ].map(p => ({ ...p, tipo: 'likert', opcoes: ['Não me interessa nada','Interessa pouco','Indiferente','Interessa','Interessa muito'] })),
    interpretar: (resp) => {
      const grupos = { R:0, I:0, A:0, S:0, E:0, C:0 };
      const ordem = ['R','R','R','R','R','R','I','I','I','I','I','I','A','A','A','A','A','A','S','S','S','S','S','S','E','E','E','E','E','E','C','C','C','C','C','C'];
      ordem.forEach((g, i) => { grupos[g] += (resp[i] ?? 0) + 1; });
      const sorted = Object.entries(grupos).sort((a,b)=>b[1]-a[1]);
      const nomes = { R:'Realista', I:'Investigativo', A:'Artístico', S:'Social', E:'Empreendedor', C:'Convencional' };
      const perfil = sorted.slice(0,3).map(([k])=>k).join('');
      const sub = {}; sorted.forEach(([k,v])=>{ sub[nomes[k]]=v; });
      return { nivel: `Perfil Holland: ${perfil}`, cor: 'green', pontos: Object.values(grupos).reduce((a,b)=>a+b,0), max: 180, subscores: sub };
    }
  },

  {
    id: 'ancoras', categoria: 'projeto-vida', nome: 'Âncoras de Carreira',
    descCurta: 'Inventário de Âncoras de Carreira (Schein) — 24 itens',
    instrucoes: 'Indique com que frequência cada afirmação é verdadeira para você:',
    perguntas: [
      {texto:'Prefiro ser especialista em minha área a gestor generalista',grupo:'CT'},{texto:'Sinto satisfação quando domino uma habilidade técnica com profundidade',grupo:'CT'},{texto:'Prefiro me tornar referência na minha especialidade a assumir cargos de gestão',grupo:'CT'},
      {texto:'Tenho motivação para liderar equipes e integrar diferentes áreas da organização',grupo:'GG'},{texto:'Sinto que meu potencial é melhor aproveitado quando coordeno pessoas e recursos',grupo:'GG'},{texto:'Quero alcançar posições de alta liderança onde possa influenciar a organização',grupo:'GG'},
      {texto:'Prefiro um emprego estável a oportunidades incertas, mesmo que mais lucrativas',grupo:'SE'},{texto:'A segurança de longo prazo e a estabilidade são essenciais para minha carreira',grupo:'SE'},{texto:'Prefiro saber o que vou ganhar amanhã a correr riscos por maior recompensa',grupo:'SE'},
      {texto:'Sinto frustração quando preciso seguir regras e horários impostos por outros',grupo:'AU'},{texto:'Preciso de liberdade para organizar meu trabalho do meu jeito',grupo:'AU'},{texto:'Prefiro trabalhar por conta própria a ter um chefe que me controle',grupo:'AU'},
      {texto:'Sinto necessidade de criar meu próprio negócio ou produto',grupo:'EM'},{texto:'Meu maior objetivo é construir algo que seja meu',grupo:'EM'},{texto:'Preciso criar e empreender; trabalhar para outros não me satisfaz plenamente',grupo:'EM'},
      {texto:'Gosto de resolver problemas difíceis que parecem impossíveis',grupo:'DP'},{texto:'Sinto-me mais motivado(a) quando enfrento desafios extremamente complexos',grupo:'DP'},{texto:'Competir e superar obstáculos difíceis me dá energia',grupo:'DP'},
      {texto:'Quero fazer uma contribuição real para a sociedade por meio do meu trabalho',grupo:'SD'},{texto:'É importante que meu trabalho ajude a melhorar a vida das pessoas',grupo:'SD'},{texto:'Prefiro um trabalho com impacto social a um trabalho bem remunerado sem propósito',grupo:'SD'},
      {texto:'Quero equilibrar minha vida profissional, familiar e pessoal de forma integrada',grupo:'EV'},{texto:'Não abriria mão da qualidade de vida por avanços na carreira',grupo:'EV'},{texto:'Meu trabalho deve se encaixar no estilo de vida que quero para mim',grupo:'EV'},
    ].map(p => ({ ...p, tipo: 'likert', opcoes: ['Nunca verdadeiro','Raramente verdadeiro','Às vezes verdadeiro','Frequentemente verdadeiro','Quase sempre verdadeiro','Sempre verdadeiro'] })),
    interpretar: (resp) => {
      const map = { CT:[0,1,2], GG:[3,4,5], SE:[6,7,8], AU:[9,10,11], EM:[12,13,14], DP:[15,16,17], SD:[18,19,20], EV:[21,22,23] };
      const nomes = { CT:'Comp. Técnica', GG:'Gestão Geral', SE:'Segurança', AU:'Autonomia', EM:'Empreendedorismo', DP:'Desafio Puro', SD:'Serviço', EV:'Estilo de Vida' };
      const scores = {};
      Object.entries(map).forEach(([k, idxs]) => { scores[nomes[k]] = idxs.reduce((a,i)=>a+(resp[i]??0)+1,0); });
      const principal = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
      const top3 = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k])=>k).join(', ');
      return { nivel: `Âncora principal: ${principal[0]}`, cor: 'green', pontos: Object.values(scores).reduce((a,b)=>a+b,0), max: 144, subscores: scores };
    }
  },

  {
    id: 'mlq', categoria: 'projeto-vida', nome: 'MLQ',
    descCurta: 'Questionário de Sentido de Vida — 10 itens',
    instrucoes: 'Indique o quanto cada afirmação é verdadeira para você:',
    perguntas: [
      {texto:'Compreendo o significado e o propósito da minha vida',grupo:'P'},
      {texto:'Estou buscando um propósito que faça minha vida ter sentido',grupo:'B'},
      {texto:'Estou sempre procurando pelo propósito da minha vida',grupo:'B'},
      {texto:'Minha vida tem um propósito claro',grupo:'P'},
      {texto:'Minha vida tem sentido',grupo:'P'},
      {texto:'Descobri um propósito satisfatório para a minha vida',grupo:'P'},
      {texto:'Estou sempre buscando algo que faça minha vida parecer significativa',grupo:'B'},
      {texto:'Estou buscando um propósito ou missão para minha vida',grupo:'B'},
      {texto:'Minha vida não tem um propósito claro',grupo:'P',invertido:true},
      {texto:'Estou buscando o sentido da minha vida',grupo:'B'},
    ].map(p => ({ ...p, tipo: 'likert', opcoes: ['Absolutamente falso','Geralmente falso','Predominantemente falso','Não sei','Predominantemente verdadeiro','Geralmente verdadeiro','Absolutamente verdadeiro'] })),
    interpretar: (resp) => {
      const pIdx = [0,3,4,5,8]; const bIdx = [1,2,6,7,9];
      let presenca = 0;
      pIdx.forEach(i => { const v = (resp[i]??3)+1; presenca += i===8 ? (8-v) : v; });
      let busca = 0;
      bIdx.forEach(i => { busca += (resp[i]??3)+1; });
      let nivel, cor;
      if (presenca <= 15)      { nivel = `Baixa presença de sentido (${presenca}) · Busca: ${busca}`; cor = 'red'; }
      else if (presenca <= 24) { nivel = `Sentido em construção (${presenca}) · Busca: ${busca}`; cor = 'amber'; }
      else                     { nivel = `Sentido de vida presente (${presenca}) · Busca: ${busca}`; cor = 'green'; }
      return { nivel, cor, pontos: presenca, max: 35, subscores: { 'Presença de sentido': presenca, 'Busca de sentido': busca } };
    }
  },

  {
    id: 'caas', categoria: 'projeto-vida', nome: 'CAAS',
    descCurta: 'Escala de Adaptabilidade de Carreira — 24 itens',
    instrucoes: 'Indique o quanto você desenvolveu cada capacidade:',
    perguntas: [
      {texto:'Pensar em como será minha vida no futuro',grupo:'PC'},{texto:'Compreender que as escolhas de hoje moldam meu futuro',grupo:'PC'},{texto:'Preparar-me para o meu futuro',grupo:'PC'},{texto:'Estar ciente das escolhas educacionais e profissionais que precisarei fazer',grupo:'PC'},{texto:'Planejar como atingir meus objetivos',grupo:'PC'},{texto:'Preocupar-me com minha carreira futura',grupo:'PC'},
      {texto:'Manter o ânimo para estudar ou trabalhar',grupo:'CO'},{texto:'Tomar decisões por conta própria',grupo:'CO'},{texto:'Assumir a responsabilidade pelas minhas ações',grupo:'CO'},{texto:'Defender minhas crenças e convicções',grupo:'CO'},{texto:'Contar comigo mesmo(a) para realizar as coisas',grupo:'CO'},{texto:'Fazer o que é certo para mim',grupo:'CO'},
      {texto:'Explorar o ambiente ao meu redor',grupo:'CU'},{texto:'Buscar oportunidades de me desenvolver como pessoa',grupo:'CU'},{texto:'Imaginar-me em diferentes carreiras',grupo:'CU'},{texto:'Explorar meus interesses',grupo:'CU'},{texto:'Desenvolver meus talentos e habilidades',grupo:'CU'},{texto:'Descobrir o que procuro na minha vida profissional',grupo:'CU'},
      {texto:'Realizar tarefas de forma eficiente',grupo:'CF'},{texto:'Resolver problemas de forma satisfatória',grupo:'CF'},{texto:'Aprender uma nova habilidade',grupo:'CF'},{texto:'Dar o melhor de mim em tudo que faço',grupo:'CF'},{texto:'Superar obstáculos que encontro',grupo:'CF'},{texto:'Viver a vida do jeito que quero',grupo:'CF'},
    ].map(p => ({ ...p, tipo: 'likert', opcoes: ['Nenhuma','Pouca','Alguma','Muita','Muitíssima'] })),
    interpretar: (resp) => {
      const map = { PC:[0,1,2,3,4,5], CO:[6,7,8,9,10,11], CU:[12,13,14,15,16,17], CF:[18,19,20,21,22,23] };
      const nomes = { PC:'Preocupação', CO:'Controle', CU:'Curiosidade', CF:'Confiança' };
      const scores = {};
      Object.entries(map).forEach(([k,idxs]) => { scores[nomes[k]] = idxs.reduce((a,i)=>a+(resp[i]??0)+1,0); });
      const total = Object.values(scores).reduce((a,b)=>a+b,0);
      const baixa = Object.entries(scores).sort((a,b)=>a[1]-b[1])[0];
      let nivel, cor;
      if (total <= 60)      { nivel = `Adaptabilidade baixa — ${baixa[0]} mais deficitária`; cor = 'red'; }
      else if (total <= 90) { nivel = `Adaptabilidade moderada — ${baixa[0]} a desenvolver`; cor = 'amber'; }
      else                  { nivel = `Adaptabilidade elevada`; cor = 'green'; }
      return { nivel, cor, pontos: total, max: 120, subscores: scores };
    }
  },

  // ═══ RASTREIO (adições) ═══
  {
    id: 'mdq', categoria: 'rastreio', nome: 'MDQ',
    descCurta: 'Rastreio de Transtorno do Humor Bipolar — 15 itens',
    instrucoes: 'Por favor, leia cada pergunta com atenção e marque sua resposta.',
    perguntas: [
      { texto: 'Você já teve um período em que não estava se sentindo do jeito normal — tão animado(a) ou cheio(a) de energia que outras pessoas percebiam que você estava diferente, ou teve tantos problemas para dormir?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você já esteve tão animado(a) que falava mais rápido que o normal?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você já teve pensamentos acelerados, difíceis de desacelerar?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você já foi tão mais capaz de fazer coisas do que o normal que passou a fazer planos ou projetos que normalmente não faria?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você ficou muito mais ativo(a) ou fez muito mais coisas do que o normal?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você ficou muito mais sociável ou extrovertido(a) do que o normal?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você ficou muito mais interessado(a) em sexo do que o normal?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você fez coisas incomuns para você ou que outras pessoas podem achar inapropriadas ou arriscadas?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Gastar dinheiro causou problemas para você ou sua família?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você estava tão irritado(a) que gritou, brigou ou começou brigas?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você teve dificuldade de se concentrar em qualquer coisa que não fosse o que estava pensando?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você consumiu mais álcool ou usou outras drogas do que o normal?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Você teve tão pouca necessidade de dormir que precisou de menos horas sem sentir que faltou sono?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Alguns desses problemas ocorreram ao mesmo tempo (no mesmo período)?', tipo: 'multipla', opcoes: ['Não','Sim'] },
      { texto: 'Qual o grau de problema que essas ocorrências causaram?', tipo: 'multipla', opcoes: ['Nenhum problema','Problema menor','Problema moderado','Problema grave'] },
    ],
    interpretar: (resp, pontos) => {
      const sintomas = resp.slice(0,13).filter(v=>v===1).length;
      const simultaneo = resp[13] === 1;
      const impacto = resp[14] ?? 0;
      const positivo = sintomas >= 7 && simultaneo && impacto >= 2;
      let nivel, cor;
      if (sintomas < 7)   { nivel = `Rastreio negativo (${sintomas} sintomas)`; cor = 'green'; }
      else if (!positivo) { nivel = `Atenção — ${sintomas} sintomas (critérios incompletos)`; cor = 'amber'; }
      else                { nivel = `Rastreio positivo para humor bipolar (${sintomas} sintomas)`; cor = 'red'; }
      return { nivel, cor, pontos: sintomas, max: 13 };
    }
  },

  // ═══ QUALIDADE DE VIDA (adições) ═══
  {
    id: 'swls', categoria: 'qualidade', nome: 'SWLS',
    descCurta: 'Escala de Satisfação com a Vida — 5 itens',
    instrucoes: 'Avalie em que grau concorda com cada afirmação sobre sua vida:',
    perguntas: [
      'Em muitos aspectos, minha vida está próxima do meu ideal',
      'As condições da minha vida são excelentes',
      'Estou satisfeito(a) com a minha vida',
      'Até agora consegui as coisas importantes que quero na vida',
      'Se pudesse recomeçar, não mudaria quase nada na minha vida',
    ].map(t => ({ texto: t, tipo: 'likert', opcoes: ['Discordo totalmente','Discordo','Discordo um pouco','Neutro','Concordo um pouco','Concordo','Concordo totalmente'] })),
    interpretar: (resp, pontos) => {
      const total = resp.reduce((a,v)=>a+(v+1),0);
      let nivel, cor;
      if (total <= 14)      { nivel = 'Insatisfação com a vida'; cor = 'red'; }
      else if (total <= 24) { nivel = 'Satisfação moderada'; cor = 'amber'; }
      else                  { nivel = 'Satisfação elevada com a vida'; cor = 'green'; }
      return { nivel, cor, pontos: total, max: 35 };
    }
  },

  {
    id: 'perma', categoria: 'qualidade', nome: 'PERMA-Profiler',
    descCurta: 'Perfil de Bem-Estar (Seligman) — 23 itens',
    instrucoes: 'Responda sobre como você tem se sentido e se comportado nas últimas 2 semanas. Use a escala de 0 (Nunca/Nada) a 10 (Sempre/Totalmente).',
    perguntas: [
      {texto:'Com que frequência você sente emoções positivas?',grupo:'P'},{texto:'Com que frequência você se sente alegre?',grupo:'P'},{texto:'Em geral, com que frequência você se sente bem?',grupo:'P'},
      {texto:'Com que frequência você se absorve completamente no que está fazendo?',grupo:'E'},{texto:'Com que frequência você sente que está totalmente envolvido(a) no que faz?',grupo:'E'},{texto:'Com que frequência você se engaja com entusiasmo em suas atividades?',grupo:'E'},
      {texto:'Com que frequência você recebe apoio das pessoas ao seu redor quando precisa?',grupo:'R'},{texto:'Com que frequência você se sente amado(a)?',grupo:'R'},{texto:'Com que frequência você sente que tem relacionamentos satisfatórios?',grupo:'R'},
      {texto:'Em geral, você sente que o que faz na sua vida tem valor?',grupo:'M'},{texto:'Em geral, você sente que o que faz tem propósito?',grupo:'M'},{texto:'Com que frequência você sente que sua vida tem direção?',grupo:'M'},
      {texto:'Com que frequência você atinge os objetivos que definiu para si mesmo(a)?',grupo:'A'},{texto:'Com que frequência você consegue realizar coisas que valem a pena?',grupo:'A'},{texto:'Com que frequência você se sente capaz de lidar com suas responsabilidades?',grupo:'A'},
      {texto:'Com que frequência você se sente ansioso(a)?',grupo:'N'},{texto:'Com que frequência você se sente deprimido(a)?',grupo:'N'},{texto:'Com que frequência você se sente com raiva?',grupo:'N'},
      {texto:'Em geral, quão solitário(a) você se sente na sua vida?',grupo:'Sol'},{texto:'Com que frequência você se sente excluído(a)?',grupo:'Sol'},{texto:'Com que frequência você se sente só?',grupo:'Sol'},
      {texto:'De modo geral, como está sua saúde física? (0=Muito ruim, 10=Excelente)',grupo:'S'},
      {texto:'Considerando todos os aspectos, como você avaliaria sua qualidade de vida? (0=Péssima, 10=Excelente)',grupo:'G'},
    ].map(p => ({ ...p, tipo: 'multipla', opcoes: ['0','1','2','3','4','5','6','7','8','9','10'] })),
    interpretar: (resp) => {
      const media = (idxs) => { const s = idxs.reduce((a,i)=>a+(resp[i]??5),0); return Math.round(s/idxs.length*10)/10; };
      const P=media([0,1,2]),E=media([3,4,5]),R=media([6,7,8]),M=media([9,10,11]),A=media([12,13,14]);
      const N=Math.round((10-media([15,16,17]))*10)/10;
      const permaScore = Math.round((P+E+R+M+A)/5*10)/10;
      let cor;
      if (permaScore < 5) cor='red'; else if (permaScore < 7) cor='amber'; else cor='green';
      return {
        nivel: `Bem-estar: ${permaScore}/10`,
        cor, pontos: Math.round(permaScore*10), max: 100,
        subscores: {'Emoções Positivas':P,'Engajamento':E,'Relacionamentos':R,'Sentido':M,'Conquistas':A,'Emoções Neg. (inv.)':N}
      };
    }
  },

  // ═══ REGULAÇÃO EMOCIONAL (adição) ═══
  {
    id: 'staxi2', categoria: 'regulacao', nome: 'STAXI-2',
    descCurta: 'Inventário de Raiva Estado-Traço — 25 itens',
    instrucoes: 'Parte 1 — Como você se sente AGORA MESMO (itens 1–10). Parte 2 — Como você geralmente se sente (itens 11–25).',
    perguntas: [
      {texto:'Estou com raiva',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Estou irritado(a)',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Estou furioso(a)',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Sinto vontade de bater em alguém',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Sinto vontade de xingar',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Estou com raiva de mim mesmo(a)',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Sinto vontade de bater em coisas',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Estou mal-humorado(a)',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Tenho raiva mas me controlo',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Sinto vontade de dizer palavrões',tipo:'multipla',opcoes:['Não, de modo algum','Um pouco','Moderadamente','Muito']},
      {texto:'Fico irritado(a) quando algo dá errado',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Fico com raiva quando sou criticado(a) na frente dos outros',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Fico furioso(a) quando cometo erros',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Fico com raiva quando não recebo reconhecimento por um bom trabalho',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Sou uma pessoa temperamental',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Fico com raiva quando fico sem fazer coisas por causa de erros dos outros',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, demonstro',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, saio batendo a porta',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, fico por dentro',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, digo palavrões',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, me controlo',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, faço coisas que depois me arrependo',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, ninguém percebe',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, expresso em palavras',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
      {texto:'Quando fico com raiva, consigo me acalmar rapidamente',tipo:'multipla',opcoes:['Quase nunca','Às vezes','Com frequência','Quase sempre']},
    ],
    interpretar: (resp) => {
      const estado = resp.slice(0,10).reduce((a,v)=>a+(v+1),0);
      const traco = resp.slice(10,25).reduce((a,v)=>a+(v+1),0);
      const corE = estado >= 30 ? 'red' : estado >= 19 ? 'amber' : 'green';
      const corT = traco >= 37 ? 'red' : traco >= 23 ? 'amber' : 'green';
      const cor = [corE,corT].includes('red') ? 'red' : [corE,corT].includes('amber') ? 'amber' : 'green';
      return { nivel: `Estado: ${estado} · Traço: ${traco}`, cor, pontos: estado+traco, max: 100, subscores: {'Estado de Raiva':estado,'Traço de Raiva':traco} };
    }
  },

  // ═══ ANSIEDADE (adições) ═══
  {
    id: 'pdss', categoria: 'ansiedade', nome: 'PDSS',
    descCurta: 'Escala de Gravidade do Transtorno do Pânico — 7 itens',
    instrucoes: 'Responda sobre como você se sentiu NA ÚLTIMA SEMANA.',
    perguntas: [
      { texto: 'Com que frequência você teve ataques de pânico ou ansiedade intensa?', tipo: 'multipla', opcoes: ['Nenhum','1–2 ataques leves','Entre 1 por semana e 1 por dia','Mais de 1 por dia, maioria leve','Ataques frequentes, maioria graves'] },
      { texto: 'Seus ataques de pânico foram graves?', tipo: 'multipla', opcoes: ['Sem pânico','Sintomas físicos/psicológicos leves','Sintomas marcantes, controle possível','Grave, dificuldade de controle','Sintomas incapacitantes'] },
      { texto: 'O quanto você sofreu com a antecipação de novos ataques?', tipo: 'multipla', opcoes: ['Sem antecipação','Leve e passageira','Moderada, perturbadora','Grave, muito perturbadora','Extrema, quase constante'] },
      { texto: 'Você evitou lugares ou situações por causa do pânico?', tipo: 'multipla', opcoes: ['Sem evitação','Evitação leve','Evitação moderada, ajustei a vida','Evitação grave, mudei significativamente','Evitação generalizada, incapacitante'] },
      { texto: 'Você evitou sensações físicas que causam medo (coração acelerado, tontura)?', tipo: 'multipla', opcoes: ['Sem evitação','Leve','Moderada','Acentuada','Extrema'] },
      { texto: 'O quanto o pânico atrapalhou seu trabalho ou atividades?', tipo: 'multipla', opcoes: ['Sem atrapalhar','Levemente','Significativamente','Muito, dificuldade para qualquer coisa','Incapacitante'] },
      { texto: 'O quanto o pânico atrapalhou sua vida social?', tipo: 'multipla', opcoes: ['Sem atrapalhar','Levemente','Moderadamente','Acentuadamente','Incapacitante'] },
    ],
    interpretar: (resp, pontos) => {
      const total = resp.reduce((a,v)=>a+v,0);
      let nivel, cor;
      if (total <= 4)       { nivel = 'Pânico mínimo';    cor = 'green'; }
      else if (total <= 11) { nivel = 'Pânico leve';      cor = 'amber'; }
      else if (total <= 18) { nivel = 'Pânico moderado';  cor = 'amber'; }
      else if (total <= 24) { nivel = 'Pânico grave';     cor = 'red'; }
      else                  { nivel = 'Pânico extremo';   cor = 'red'; }
      return { nivel, cor, pontos: total, max: 28 };
    }
  },

  {
    id: 'fq', categoria: 'ansiedade', nome: 'FQ',
    descCurta: 'Questionário de Medos (Fear Questionnaire) — 15 itens',
    instrucoes: 'Indique o quanto você EVITARIA cada situação por causa do medo. Use 0 (nunca evito) a 8 (sempre evito).',
    perguntas: [
      {texto:'Lugares longe de casa (lojas, supermercados, espaços abertos)',grupo:'AG'},{texto:'Hospitais ou serviços de saúde',grupo:'BI'},{texto:'Comer ou beber com outras pessoas em público',grupo:'SP'},
      {texto:'Viagens de ônibus, metrô, trem ou avião',grupo:'AG'},{texto:'Locais com muito sangue ou ferimentos',grupo:'BI'},{texto:'Ser observado(a) por outras pessoas',grupo:'SP'},
      {texto:'Andar sozinho(a) em locais movimentados',grupo:'AG'},{texto:'Ser picado(a) ou receber injeção',grupo:'BI'},{texto:'Situações sociais que me deixam em evidência',grupo:'SP'},
      {texto:'Lugares altos, escadas rolantes, elevadores',grupo:'AG'},{texto:'Ver uma pessoa ferida ou morta',grupo:'BI'},{texto:'Falar com pessoas de autoridade',grupo:'SP'},
      {texto:'Ficar sozinho(a) em casa',grupo:'AG'},{texto:'Ver sangue ou ferida grave',grupo:'BI'},{texto:'Fazer algo enquanto é observado(a)',grupo:'SP'},
    ].map(p => ({ ...p, tipo: 'multipla', opcoes: ['0','1','2','3','4','5','6','7','8'] })),
    interpretar: (resp) => {
      const ag=[0,3,6,9,12], bi=[1,4,7,10,13], sp=[2,5,8,11,14];
      const s = (idxs) => idxs.reduce((a,i)=>a+(resp[i]??0),0);
      const agS=s(ag), biS=s(bi), spS=s(sp), total=agS+biS+spS;
      let nivel, cor;
      if (total < 24)      { nivel = `Medos leves`; cor = 'green'; }
      else if (total < 49) { nivel = `Medos moderados`; cor = 'amber'; }
      else                 { nivel = `Medos acentuados`; cor = 'red'; }
      return { nivel, cor, pontos: total, max: 120, subscores: { Agorafobia: agS, 'Sangue/Ferimento': biS, 'Fobia Social': spS } };
    }
  },

  {
    id: 'lsas', categoria: 'ansiedade', nome: 'LSAS',
    descCurta: 'Escala de Ansiedade Social de Liebowitz — 24 situações',
    instrucoes: 'Para cada situação, avalie o MEDO (0=Nenhum a 3=Grave) e a ESQUIVA (0=Nunca a 3=Geralmente). Os itens aparecem em pares: primeiro o medo, depois a esquiva da mesma situação.',
    perguntas: (() => {
      const sits = [
        'Telefonar para uma empresa ou repartição','Participar de grupos pequenos','Comer em lugares públicos','Beber em lugares públicos',
        'Conversar com alguém de autoridade','Atuar, se apresentar ou discursar em frente ao público','Ir a uma festa','Trabalhar enquanto está sendo observado(a)',
        'Escrever enquanto está sendo observado(a)','Ligar para alguém que não conhece bem','Conversar com pessoas que não conhece bem','Encontrar estranhos',
        'Urinar em banheiro público','Entrar em uma sala com pessoas já sentadas','Ser o centro das atenções','Levantar-se e fazer discurso em uma reunião',
        'Fazer um teste de habilidade ou competência','Expressar discordância a alguém','Olhar nos olhos de pessoas que não conhece bem','Apresentar um relatório para um grupo',
        'Tentar conquistar alguém','Devolver mercadoria em uma loja','Dar uma festa','Resistir a um vendedor insistente',
      ];
      const pergs = [];
      sits.forEach(s => {
        pergs.push({ texto: `[MEDO] ${s}`, tipo: 'multipla', opcoes: ['Nenhum (0)','Leve (1)','Moderado (2)','Grave (3)'] });
        pergs.push({ texto: `[ESQUIVA] ${s}`, tipo: 'multipla', opcoes: ['Nunca (0%)','Raramente (1–33%)','Frequentemente (33–67%)','Geralmente (67–100%)'] });
      });
      return pergs;
    })(),
    interpretar: (resp) => {
      let medo=0, esquiva=0;
      for (let i=0;i<resp.length;i+=2){ medo+=(resp[i]??0); esquiva+=(resp[i+1]??0); }
      const total=medo+esquiva;
      let nivel, cor;
      if (total < 30)       { nivel = `Ansiedade social mínima`; cor = 'green'; }
      else if (total < 60)  { nivel = `Ansiedade social leve`; cor = 'amber'; }
      else if (total < 90)  { nivel = `Ansiedade social moderada`; cor = 'amber'; }
      else if (total < 120) { nivel = `Ansiedade social acentuada`; cor = 'red'; }
      else                  { nivel = `Ansiedade social grave`; cor = 'red'; }
      return { nivel, cor, pontos: total, max: 144, subscores: { 'Medo Total': medo, 'Esquiva Total': esquiva } };
    }
  },

  // ═══ NEURODESENVOLVIMENTO ═══
  {
    id: 'asrs', categoria: 'neurodesenvolvimento', nome: 'ASRS-v1.1',
    descCurta: 'Rastreio de TDAH em Adultos (OMS) — 18 itens',
    instrucoes: 'Com que frequência você experienciou o seguinte no último mês?',
    perguntas: [
      'Com que frequência você comete erros por falta de atenção em projetos de trabalho ou em outras atividades?',
      'Com que frequência você tem dificuldade em manter a atenção ao realizar tarefas chatas ou repetitivas?',
      'Com que frequência você tem dificuldade de se concentrar no que as pessoas dizem, mesmo quando falam diretamente com você?',
      'Com que frequência você deixa um projeto pela metade depois que as partes mais difíceis estão concluídas?',
      'Com que frequência você tem dificuldade em organizar tarefas que requerem organização?',
      'Quando precisa fazer algo que requer muita concentração, com que frequência você evita ou adia o início?',
      'Com que frequência você perde ou tem dificuldade de encontrar coisas em casa ou no trabalho?',
      'Com que frequência você se distrai com atividades ou barulhos ao redor?',
      'Com que frequência você tem dificuldade de se lembrar de compromissos ou obrigações?',
      'Com que frequência você se mexe ou se contorce na cadeira quando precisa ficar sentado por muito tempo?',
      'Com que frequência você se sente agitado(a) ou inquieto(a)?',
      'Com que frequência você se sente ativo(a) demais, como se estivesse "com o motor ligado"?',
      'Com que frequência você fala demais em situações sociais?',
      'Com que frequência você completa a frase das pessoas antes delas terminarem?',
      'Com que frequência você tem dificuldade de esperar sua vez em situações que requerem esperar?',
      'Com que frequência você interrompe as atividades ou conversas de outras pessoas?',
      'Com que frequência você age de forma impulsiva, dizendo coisas sem pensar?',
      'Com que frequência você toma decisões impulsivas que depois se arrepende?',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Nunca','Raramente','Às vezes','Frequentemente','Muito frequentemente'] })),
    interpretar: (resp) => {
      const parteA = resp.slice(0,6).reduce((a,v)=>a+v,0);
      const parteB = resp.slice(6,18).reduce((a,v)=>a+v,0);
      let nivel, cor;
      if (parteA < 14)      { nivel = `TDAH improvável (Parte A: ${parteA}/24)`; cor = 'green'; }
      else if (parteA < 18) { nivel = `Possível TDAH — avaliar (Parte A: ${parteA}/24)`; cor = 'amber'; }
      else                  { nivel = `Provável TDAH (Parte A: ${parteA}/24)`; cor = 'red'; }
      return { nivel, cor, pontos: parteA+parteB, max: 72, subscores: { 'Parte A (Triagem)': parteA, 'Parte B (Complementar)': parteB } };
    }
  },

  // ═══ COMPORTAMENTO ALIMENTAR ═══
  {
    id: 'eat26', categoria: 'alimentar', nome: 'EAT-26',
    descCurta: 'Inventário de Atitudes Alimentares — 26 itens',
    instrucoes: 'Marque a alternativa que melhor descreve seu comportamento em relação à alimentação:',
    perguntas: [
      {texto:'Fico apavorado(a) com a ideia de estar acima do peso',inv:false},
      {texto:'Evito comer quando estou com fome',inv:false},
      {texto:'Minha cabeça está ocupada com pensamentos sobre comida',inv:false},
      {texto:'Já comi exageradamente e tive a sensação de que não poderia parar',inv:false},
      {texto:'Corto meu alimento em pedaços pequenos',inv:false},
      {texto:'Estou ciente do valor calórico dos alimentos que como',inv:false},
      {texto:'Evito comer alimentos ricos em carboidratos (pão, arroz, batata)',inv:false},
      {texto:'Sinto que os outros gostariam que eu comesse mais',inv:false},
      {texto:'Vomito depois de comer',inv:false},
      {texto:'Me sinto muito culpado(a) depois de comer',inv:false},
      {texto:'Me preocupo em querer ser mais magro(a)',inv:false},
      {texto:'Penso em queimar calorias quando me exercito',inv:false},
      {texto:'As pessoas ao meu redor acham que estou muito magro(a)',inv:false},
      {texto:'Fico preocupado(a) com a ideia de ter gordura no corpo',inv:false},
      {texto:'Demoro mais tempo que os outros para terminar minhas refeições',inv:false},
      {texto:'Evito alimentos que contêm açúcar',inv:false},
      {texto:'Como alimentos dietéticos',inv:false},
      {texto:'Sinto que a comida controla minha vida',inv:false},
      {texto:'Demonstro autocontrole diante dos alimentos',inv:false},
      {texto:'Sinto que os outros me pressionam para comer',inv:false},
      {texto:'Passo muito tempo pensando em comida',inv:false},
      {texto:'Não me sinto à vontade depois de comer doces',inv:false},
      {texto:'Faço dieta frequentemente',inv:false},
      {texto:'Gosto de sentir meu estômago vazio',inv:false},
      {texto:'Após as refeições, tenho o impulso de vomitar',inv:false},
      {texto:'Gosto de experimentar novas comidas saborosas',inv:true},
    ].map(p => ({ ...p, tipo: 'multipla', opcoes: ['Sempre','Muitas vezes','Às vezes','Poucas vezes','Raramente','Nunca'] })),
    interpretar: (resp) => {
      let total = 0;
      resp.forEach((v, i) => {
        const isInv = i === 25;
        if (isInv) { total += v <= 2 ? 0 : v === 3 ? 1 : v === 4 ? 2 : 3; }
        else { total += v <= 2 ? 3-v : 0; }
      });
      let nivel, cor;
      if (total < 20)      { nivel = 'Sem indicativo de transtorno alimentar'; cor = 'green'; }
      else if (total < 35) { nivel = 'Atenção — atitudes alimentares alteradas'; cor = 'amber'; }
      else                 { nivel = 'Alto risco — transtorno alimentar provável'; cor = 'red'; }
      return { nivel, cor, pontos: total, max: 78 };
    }
  },

  {
    id: 'bite', categoria: 'alimentar', nome: 'BITE',
    descCurta: 'Teste de Investigação Bulímica de Edinburgh — 33 itens',
    instrucoes: 'Itens 1–28: responda Sim ou Não. Itens 29–33: indique a frequência dos comportamentos.',
    perguntas: [
      ...[
        'Você segue uma dieta estrita e controlada?','Você tenta seguir uma dieta, mas frequentemente a quebra com grandes episódios de comer?',
        'Você acredita que come demais?','Você se sente culpado(a) depois de comer?','Você se preocupa com o desejo de comer?',
        'Você deseja poder controlar melhor o que come?','Você já perdeu o controle do que comeu?','Você tem estado preocupado(a) com o peso do seu corpo?',
        'Você se sente muito culpado(a) depois de comer muito?','A ideia de engordar te apavora?',
        'Você come em segredo?','Você se sente fisicamente mal depois de comer muito?','Você se envolve em episódios de comer compulsivo?',
        'Você come demais quando está perturbado(a) emocionalmente?','A comida domina sua vida?',
        'Você passa da dieta para comer exageradamente?','Você come muito a ponto de sentir dor no estômago?',
        'Você se sente infeliz com seu hábito alimentar?','Você está preocupado(a) com pouco controle sobre a quantidade que ingere?',
        'Você já recorreu a vômito, laxantes ou diuréticos para controlar seu peso?',
        'Outras pessoas ficariam horrorizadas ao saber sobre seus hábitos alimentares?',
        'Você já abusou de laxantes para controlar seu peso?','Você já comeu escondido(a)?',
        'Você sente que foi vencido(a) pela comida?','Você come moderadamente na frente dos outros, mas exagera quando está sozinho(a)?',
        'Você já vomitou depois de comer para controlar seu peso?','Seus hábitos alimentares causam sofrimento?','Os alimentos controlam sua vida?',
      ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Não','Sim'] })),
      { texto: 'Com que frequência você tem episódios de comer compulsivo?', tipo: 'multipla', opcoes: ['Nunca','Às vezes','2x semana','3x semana','Diariamente'] },
      { texto: 'Com que frequência você provoca vômito?', tipo: 'multipla', opcoes: ['Nunca','Às vezes','2x semana','3x semana','Diariamente'] },
      { texto: 'Com que frequência você usa laxantes?', tipo: 'multipla', opcoes: ['Nunca','Às vezes','2x semana','3x semana','Diariamente'] },
      { texto: 'Com que frequência você faz jejuns rigorosos?', tipo: 'multipla', opcoes: ['Nunca','Às vezes','2x semana','3x semana','Diariamente'] },
      { texto: 'Com que frequência você usa diuréticos?', tipo: 'multipla', opcoes: ['Nunca','Às vezes','2x semana','3x semana','Diariamente'] },
    ],
    interpretar: (resp) => {
      const sintomas = resp.slice(0,28).reduce((a,v)=>a+v,0);
      const gravidade = resp.slice(28,33).reduce((a,v)=>a+v*2,0);
      let nivel, cor;
      if (sintomas < 10)      { nivel = 'Sem indicativo de bulimia'; cor = 'green'; }
      else if (sintomas < 20) { nivel = 'Comportamentos bulímicos sugestivos'; cor = 'amber'; }
      else                    { nivel = 'Indicativo elevado de bulimia'; cor = 'red'; }
      return { nivel, cor, pontos: sintomas+gravidade, max: 68, subscores: { 'Sintomas': sintomas, 'Gravidade/Frequência': gravidade } };
    }
  },

  // ═══ TRABALHO E BURNOUT ═══
  {
    id: 'mbigs', categoria: 'trabalho', nome: 'MBI-GS',
    descCurta: 'Inventário de Burnout de Maslach (Geral) — 16 itens',
    instrucoes: 'Com que frequência você experiencia o seguinte em relação ao seu trabalho?',
    perguntas: [
      {texto:'Estou emocionalmente esgotado(a) pelo meu trabalho',grupo:'EX'},{texto:'Estou desgastado(a) ao fim de um dia de trabalho',grupo:'EX'},{texto:'Estou cansado(a) quando me levanto e tenho que enfrentar mais um dia de trabalho',grupo:'EX'},{texto:'Trabalhar o dia inteiro é realmente um esforço para mim',grupo:'EX'},
      {texto:'Sinto que estou dando uma contribuição efetiva para o que a organização faz',grupo:'EP'},{texto:'Sou eficiente e capaz no meu trabalho',grupo:'EP'},{texto:'Estou confiante de que consigo fazer as coisas no trabalho',grupo:'EP'},
      {texto:'Tenho me tornado menos entusiasmado(a) com o meu trabalho',grupo:'CI'},{texto:'Tenho me tornado menos envolvido(a) com o meu trabalho',grupo:'CI'},
      {texto:'Sou bom(boa) no meu trabalho',grupo:'EP'},{texto:'Estou satisfeito(a) quando consigo algo no trabalho',grupo:'EP'},
      {texto:'Duvido do valor e da utilidade do meu trabalho',grupo:'CI'},{texto:'O meu trabalho não contribui muito para a minha organização',grupo:'CI'},
      {texto:'Fico calmo(a) quando lido com problemas emocionais no trabalho',grupo:'EP'},{texto:'Aprendi muitas coisas interessantes no decorrer do meu trabalho',grupo:'EP'},
      {texto:'Sinto que trabalho demais no meu emprego',grupo:'EX'},
    ].map(p => ({ ...p, tipo: 'multipla', opcoes: ['Nunca','Raramente','Às vezes','Regularmente','Frequentemente','Quase sempre','Todo dia'] })),
    interpretar: (resp) => {
      const exIdx=[0,1,2,3,15], epIdx=[4,5,6,9,10,13,14], ciIdx=[7,8,11,12];
      const media = (idxs) => idxs.length ? Math.round(idxs.reduce((a,i)=>a+(resp[i]??0),0)/idxs.length*10)/10 : 0;
      const ex=media(exIdx), ep=media(epIdx), ci=media(ciIdx);
      const cor = (ex>=4||ci>=4) ? 'red' : (ex>=3||ci>=3) ? 'amber' : 'green';
      return { nivel: `Exaustão: ${ex} · Cinismo: ${ci} · Eficácia: ${ep}`, cor, pontos: Math.round((ex+ci)*10), max: 120, subscores: { 'Exaustão': ex, 'Cinismo': ci, 'Eficácia Profissional': ep } };
    }
  },

  {
    id: 'cbi', categoria: 'trabalho', nome: 'CBI',
    descCurta: 'Inventário de Burnout de Copenhague — 19 itens',
    instrucoes: 'As perguntas a seguir são sobre como você se sente em relação ao seu trabalho. Itens 1–6: frequência. Itens 7–19: grau.',
    perguntas: [
      ...[
        'Com que frequência você se sente cansado(a)?','Com que frequência você se sente fisicamente esgotado(a)?',
        'Com que frequência você se sente emocionalmente esgotado(a)?','Com que frequência você pensa: "Não aguento mais"?',
        'Com que frequência você se sente acabado(a)?','Com que frequência você se sente fraco(a) e propenso(a) a adoecer?',
      ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Sempre','Frequentemente','Às vezes','Raramente','Nunca / quase nunca'], grupo: 'PB' })),
      ...[
        'Seu trabalho é emocionalmente esgotante?','Você se sente esgotado(a) por causa do seu trabalho?','Seu trabalho deixa você frustrado(a)?',
        'Você se sente gasto(a) ao fim de um dia de trabalho?','É desgastante trabalhar com pessoas?','Seu trabalho consome sua energia?','Seu trabalho é frustrante?',
      ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Em muito alto grau','Em alto grau','Em algum grau','Em baixo grau','Em muito baixo grau / nunca'], grupo: 'TB' })),
      ...[
        'Você acha desgastante trabalhar com seus clientes/pacientes?','Você fica esgotado(a) trabalhando com seus clientes/pacientes?',
        'É frustrante trabalhar com seus clientes/pacientes?','Você investe muito esforço em trabalhar com seus clientes/pacientes?',
        'Às vezes você se pergunta por quanto tempo mais vai conseguir trabalhar com seus clientes/pacientes?','Trabalhar com seus clientes/pacientes consome sua energia?',
      ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Em muito alto grau','Em alto grau','Em algum grau','Em baixo grau','Em muito baixo grau / nunca'], grupo: 'CB' })),
    ],
    interpretar: (resp) => {
      const vals = [100,75,50,25,0];
      const pb = resp.slice(0,6).reduce((a,v)=>a+vals[v??4],0)/6;
      const tb = resp.slice(6,13).reduce((a,v)=>a+vals[v??4],0)/7;
      const cb = resp.slice(13,19).reduce((a,v)=>a+vals[v??4],0)/6;
      const max3 = Math.max(pb,tb,cb);
      const cor = max3>=75?'red':max3>=50?'amber':'green';
      const scores = {'Burnout Pessoal':Math.round(pb),'Burnout no Trabalho':Math.round(tb),'Burnout com Clientes':Math.round(cb)};
      return { nivel: `BP:${Math.round(pb)} · BT:${Math.round(tb)} · BC:${Math.round(cb)}`, cor, pontos: Math.round((pb+tb+cb)/3), max: 100, subscores: scores };
    }
  },

  // ═══ RELACIONAMENTOS ═══
  {
    id: 'das7', categoria: 'relacionamentos', nome: 'DAS-7',
    descCurta: 'Escala de Ajustamento Diádico (breve) — 7 itens',
    instrucoes: 'Responda sobre seu relacionamento atual:',
    perguntas: [
      { texto: 'Indique o grau de felicidade no seu relacionamento atual', tipo: 'multipla', opcoes: ['Extremamente infeliz','Bastante infeliz','Um pouco infeliz','Feliz','Muito feliz','Extremamente feliz','Perfeitamente feliz'] },
      { texto: 'Com que frequência você e seu(sua) parceiro(a) concordam em assuntos financeiros?', tipo: 'multipla', opcoes: ['Nunca concordam','Quase nunca concordam','Raramente concordam','Às vezes concordam','Quase sempre concordam','Sempre concordam'] },
      { texto: 'Com que frequência você e seu(sua) parceiro(a) concordam em demonstrações de afeto?', tipo: 'multipla', opcoes: ['Nunca concordam','Quase nunca concordam','Raramente concordam','Às vezes concordam','Quase sempre concordam','Sempre concordam'] },
      { texto: 'Com que frequência vocês têm estimulação de ideias interessantes entre si?', tipo: 'multipla', opcoes: ['Raramente','Às vezes','Frequentemente'] },
      { texto: 'Com que frequência vocês trabalham juntos em projetos?', tipo: 'multipla', opcoes: ['Raramente','Às vezes','Frequentemente'] },
      { texto: 'Você já considerou o divórcio, separação ou término do relacionamento?', tipo: 'multipla', opcoes: ['Com mais frequência','Às vezes','Quase nunca','Nunca'] },
      { texto: 'Você se confessa ao(à) seu(sua) parceiro(a)?', tipo: 'multipla', opcoes: ['Nunca','Raramente','Às vezes','Quase sempre'] },
    ],
    interpretar: (resp) => {
      const pesos = [[0,1,2,3,4,5,6],[0,1,2,3,4,5],[0,1,2,3,4,5],[0,1,2],[0,1,2],[3,2,1,0],[0,1,2,3]];
      const total = resp.reduce((a,v,i)=>a+(pesos[i][v]??0),0);
      let nivel, cor;
      if (total <= 14)      { nivel = 'Relacionamento em sofrimento'; cor = 'red'; }
      else if (total <= 19) { nivel = 'Insatisfação moderada'; cor = 'amber'; }
      else                  { nivel = 'Relacionamento satisfatório'; cor = 'green'; }
      return { nivel, cor, pontos: total, max: 26 };
    }
  },

  {
    id: 'ecrr', categoria: 'relacionamentos', nome: 'ECR-R',
    descCurta: 'Estilos de Apego em Relacionamentos Próximos — 36 itens',
    instrucoes: 'As afirmações se referem a como você geralmente se sente em relacionamentos românticos. Responda pensando em seus relacionamentos de forma geral.',
    perguntas: (() => {
      const evitacao = [
        {t:'Prefiro não mostrar ao(à) meu(minha) parceiro(a) como me sinto no fundo',inv:false},
        {t:'Fico desconfortável ao me aproximar emocionalmente de outras pessoas',inv:false},
        {t:'Me desconforto em depender de outras pessoas',inv:false},
        {t:'Me sinto confortável sem precisar tanto de intimidade emocional',inv:false},
        {t:'Fico desconfortável quando alguém quer que eu seja muito íntimo(a)',inv:false},
        {t:'Não me sinto confortável abrindo meu coração para os outros',inv:false},
        {t:'Prefiro não ser muito próximo(a) de pessoas',inv:false},
        {t:'Fico nervoso(a) quando alguém se aproxima muito de mim',inv:false},
        {t:'Me sinto confortável compartilhando pensamentos e sentimentos com meu(minha) parceiro(a)',inv:true},
        {t:'Posso me abrir facilmente com meu(minha) parceiro(a)',inv:true},
        {t:'Não me incomoda que meu(minha) parceiro(a) passe tempo afastado(a) de mim',inv:false},
        {t:'Acho relativamente fácil me aproximar de meu(minha) parceiro(a)',inv:true},
        {t:'Prefiro não depender emocionalmente de outras pessoas',inv:false},
        {t:'Evito ser próximo(a) das pessoas',inv:false},
        {t:'Me sinto bem dependendo de outras pessoas',inv:true},
        {t:'Me sinto confortável dependendo de meu(minha) parceiro(a)',inv:true},
        {t:'Acho relativamente fácil ser próximo(a) de meu(minha) parceiro(a)',inv:true},
        {t:'Não me preocupo muito com meus relacionamentos',inv:false},
      ];
      const ansiedade = [
        {t:'Me preocupo com a ideia de ser abandonado(a)',inv:false},
        {t:'Quero muita intimidade emocional com meu(minha) parceiro(a)',inv:false},
        {t:'Me preocupo que meu(minha) parceiro(a) não goste de mim tanto quanto eu gosto dele(a)',inv:false},
        {t:'Me preocupo bastante com meus relacionamentos',inv:false},
        {t:'Me preocupo que meu(minha) parceiro(a) me abandone',inv:false},
        {t:'Às vezes me preocupo que meu(minha) parceiro(a) não queira ficar comigo',inv:false},
        {t:'Às vezes sinto que forço meu(minha) parceiro(a) a demonstrar mais sentimentos',inv:false},
        {t:'Fico frustrado(a) se meu(minha) parceiro(a) não está disponível quando preciso',inv:false},
        {t:'Me irrito quando meu(minha) parceiro(a) não me presta atenção',inv:false},
        {t:'Fico impaciente quando meu(minha) parceiro(a) não me presta atenção',inv:false},
        {t:'Não me preocupo quando meu(minha) parceiro(a) fica longe de mim',inv:true},
        {t:'Me preocupo em não ser suficientemente importante para meu(minha) parceiro(a)',inv:false},
        {t:'Raramente me preocupo em ser abandonado(a)',inv:true},
        {t:'Não me incomoda que meu(minha) parceiro(a) passe tempo afastado(a) de mim',inv:true},
        {t:'Quero me fundir completamente com meu(minha) parceiro(a)',inv:false},
        {t:'Quando estou sem meu(minha) parceiro(a) me sinto incompleto(a)',inv:false},
        {t:'Realmente gosto da proximidade com meu(minha) parceiro(a)',inv:false},
        {t:'Preciso muito de apoio e afirmação do(a) meu(minha) parceiro(a)',inv:false},
      ];
      const opcoes = ['Discordo totalmente','Discordo','Discordo um pouco','Neutro','Concordo um pouco','Concordo','Concordo totalmente'];
      return [
        ...evitacao.map(p=>({texto:p.t,tipo:'likert',opcoes,grupo:'EV',invertido:p.inv})),
        ...ansiedade.map(p=>({texto:p.t,tipo:'likert',opcoes,grupo:'AN',invertido:p.inv})),
      ];
    })(),
    interpretar: (resp) => {
      const calcMedia = (idxs, itens) => {
        const sum = idxs.reduce((a,i)=>{
          const v = (resp[i]??3)+1;
          return a + (itens[i-idxs[0]]?.invertido ? 8-v : v);
        },0);
        return Math.round(sum/idxs.length*10)/10;
      };
      const evIdx = Array.from({length:18},(_,i)=>i);
      const anIdx = Array.from({length:18},(_,i)=>i+18);
      const evPergs = [{},{},{},{},{},{},{},{},{inv:true},{inv:true},{},{inv:true},{},{},{inv:true},{inv:true},{inv:true},{}];
      const anPergs = [{},{},{},{},{},{},{},{},{},{},{inv:true},{},{inv:true},{inv:true},{},{},{},{}];
      const evScore = evIdx.reduce((a,i)=>{ const v=(resp[i]??3)+1; return a+(evPergs[i]?.inv?8-v:v); },0)/18;
      const anScore = anIdx.reduce((a,i)=>{ const v=(resp[i]??3)+1; return a+(anPergs[i-18]?.inv?8-v:v); },0)/18;
      const evR=Math.round(evScore*10)/10, anR=Math.round(anScore*10)/10;
      const seguro = evR<4 && anR<4, ansioso = anR>=4 && evR<4, evitativo = evR>=4 && anR<4;
      const perfil = seguro ? 'Apego Seguro' : ansioso ? 'Apego Ansioso' : evitativo ? 'Apego Evitativo' : 'Apego Desorganizado';
      const cor = seguro ? 'green' : (ansioso||evitativo) ? 'amber' : 'red';
      return { nivel: perfil, cor, pontos: Math.round((evR+anR)*10), max: 140, subscores: { 'Ansiedade de Apego': anR, 'Evitação de Apego': evR } };
    }
  },

  // ═══ TRAUMA ═══
  {
    id: 'ctqsf', categoria: 'trauma', nome: 'CTQ-SF',
    descCurta: 'Questionário de Trauma na Infância (breve) — 28 itens',
    instrucoes: 'As afirmações são sobre experiências que você pode ter tido durante sua infância e adolescência (até os 18 anos):',
    perguntas: [
      {texto:'Não tinha o suficiente para comer',grupo:'NF',inv:false},
      {texto:'Sabia que havia alguém que se preocupava comigo',grupo:'NE',inv:true},
      {texto:'As pessoas na minha família me chamavam de "burro(a)", "preguiçoso(a)" ou "feio(a)"',grupo:'EA',inv:false},
      {texto:'Meus pais eram bêbados ou se drogavam',grupo:'NF',inv:false},
      {texto:'Havia alguém na minha família que me ajudava a sentir que era importante ou especial',grupo:'NE',inv:true},
      {texto:'Fui obrigado(a) a fazer coisas sexuais que não devia ou que não queria',grupo:'AS',inv:false},
      {texto:'Minha família era fonte de força e apoio',grupo:'NE',inv:true},
      {texto:'Alguém na minha família me batia tanto que eu ficava com marcas ou machucos',grupo:'AF',inv:false},
      {texto:'Acho que fui abusado(a) emocionalmente',grupo:'EA',inv:false},
      {texto:'Não havia nada que quisesse mudar na minha família',grupo:'NE',inv:true},
      {texto:'As pessoas na minha família me batiam tão forte que isso ficou marcado no meu corpo',grupo:'AF',inv:false},
      {texto:'Fui castigado(a) com cinto, corda, tábua ou outro objeto duro',grupo:'AF',inv:false},
      {texto:'As pessoas na minha família cuidavam umas das outras',grupo:'NE',inv:true},
      {texto:'Acho que fui abusado(a) sexualmente',grupo:'AS',inv:false},
      {texto:'Havia alguém para me levar ao médico se precisava',grupo:'NF',inv:true},
      {texto:'Fui tocado(a) sexualmente ou obrigado(a) a tocar alguém de forma sexual',grupo:'AS',inv:false},
      {texto:'Tive a melhor família do mundo',grupo:'NE',inv:true},
      {texto:'Fui ameaçado(a) por alguém que queria fazer coisas sexuais comigo',grupo:'AS',inv:false},
      {texto:'Minha família me deu força e apoio',grupo:'NE',inv:true},
      {texto:'Alguém tentou me fazer fazer coisas sexuais ou me assistir',grupo:'AS',inv:false},
      {texto:'Fui deixado(a) sem cuidados e sozinho(a) com frequência',grupo:'NF',inv:false},
      {texto:'Minha família era unida',grupo:'NE',inv:true},
      {texto:'Acho que fui agredido(a) fisicamente',grupo:'AF',inv:false},
      {texto:'Minha infância foi perfeita',grupo:'NE',inv:true},
      {texto:'Havia coisas más acontecendo na minha família',grupo:'EA',inv:false},
      {texto:'Há amor e carinho na minha família',grupo:'NE',inv:true},
      {texto:'Tive uma boa infância',grupo:'NE',inv:true},
      {texto:'Fui exposto(a) a violência familiar',grupo:'NF',inv:false},
    ].map(p => ({ ...p, tipo: 'multipla', opcoes: ['Nunca','Raramente','Às vezes','Frequentemente','Sempre'] })),
    interpretar: (resp) => {
      const grupos = { EA:[], AF:[], AS:[], NE:[], NF:[] };
      const conf = [
        {g:'NF',inv:false},{g:'NE',inv:true},{g:'EA',inv:false},{g:'NF',inv:false},{g:'NE',inv:true},
        {g:'AS',inv:false},{g:'NE',inv:true},{g:'AF',inv:false},{g:'EA',inv:false},{g:'NE',inv:true},
        {g:'AF',inv:false},{g:'AF',inv:false},{g:'NE',inv:true},{g:'AS',inv:false},{g:'NF',inv:true},
        {g:'AS',inv:false},{g:'NE',inv:true},{g:'AS',inv:false},{g:'NE',inv:true},{g:'AS',inv:false},
        {g:'NF',inv:false},{g:'NE',inv:true},{g:'AF',inv:false},{g:'NE',inv:true},{g:'EA',inv:false},
        {g:'NE',inv:true},{g:'NE',inv:true},{g:'NF',inv:false},
      ];
      conf.forEach((c,i)=>{ const v=(resp[i]??0)+1; grupos[c.g].push(c.inv?6-v:v); });
      const scores={};
      const nomes={EA:'Abuso Emocional',AF:'Abuso Físico',AS:'Abuso Sexual',NE:'Negligência Emocional',NF:'Negligência Física'};
      Object.entries(grupos).forEach(([k,vals])=>{ scores[nomes[k]]=vals.reduce((a,b)=>a+b,0); });
      const maxScore=Math.max(...Object.values(scores));
      const cor=maxScore>=13?'red':maxScore>=9?'amber':'green';
      const piorNome=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
      return { nivel: maxScore>=9?`Trauma significativo — ${piorNome}`:'Sem indicativo de trauma significativo', cor, pontos:Object.values(scores).reduce((a,b)=>a+b,0), max:125, subscores:scores };
    }
  },

  {
    id: 'des2', categoria: 'trauma', nome: 'DES-II',
    descCurta: 'Escala de Experiências Dissociativas — 28 itens',
    instrucoes: 'Para cada experiência abaixo, marque a porcentagem de vezes que ela acontece com você (quando não está sob efeito de álcool ou drogas). Use 0% (nunca) a 100% (sempre).',
    perguntas: [
      'Dirigir ou ir de um lugar para outro e perceber que não se lembra de parte ou de toda a viagem',
      'Não se lembrar do que aconteceu durante algum evento ou situação em sua vida',
      'Se ver em algum lugar sem saber como chegou lá',
      'Encontrar roupas que não se lembra de ter colocado ou objetos perto de você que não lembra de ter colocado',
      'Encontrar novas coisas entre suas posses que não se lembra de ter comprado',
      'Ser chamado(a) por outro nome ou receber afirmação de que conhece alguém que não reconhece',
      'Sentir que está parado(a) ao lado de si mesmo(a) ou se vendo fazer algo',
      'Ser dito(a) que às vezes se comporta de forma muito diferente do habitual',
      'Não se lembrar de eventos importantes da sua vida',
      'Ser acusado(a) de mentir quando não acredita estar mentindo',
      'Ouvir vozes dentro da sua cabeça que lhe dizem para fazer coisas ou comentam o que faz',
      'Sentir que outras pessoas, objetos e o mundo ao redor não são reais',
      'Sentir que seu corpo não pertence a você',
      'Lembrar de forma tão vívida de um evento passado que parece estar revivendo aquele evento',
      'Não ter certeza se coisas que lembra realmente aconteceram ou se apenas sonhou com elas',
      'Estar em um lugar familiar mas ele parecer estranho e desconhecido',
      'Estar tão absorto(a) em uma fantasia ou devaneio que parece estar realmente acontecendo',
      'Ficar tão concentrado(a) em uma coisa que perde a noção do que está acontecendo ao redor',
      'Ficar sentado(a) olhando para nada, sem pensar em nada, e não perceber o tempo passar',
      'Ouvir coisas que não existem',
      'Andar em sonambulismo ou acordar em lugares diferentes de onde adormeceu',
      'Fazer coisas incomuns e não conseguir entender por que as fez',
      'Sentir que assiste de longe a si mesmo(a) realizando atividades',
      'Conseguir ignorar a dor',
      'Sentir que não conhece as pessoas que estão ao seu redor',
      'A voz de uma pessoa parecer tão diferente que se pergunta se é a mesma pessoa',
      'Quando está sozinho(a), ouvir uma voz falar seus pensamentos em voz alta',
      'Não conseguir entender por que não se lembra de coisas que outras pessoas afirmam que você fez',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%','100%'] })),
    interpretar: (resp) => {
      const media = Math.round(resp.reduce((a,v)=>a+(v??0)*10,0)/resp.length);
      let nivel, cor;
      if (media <= 10)      { nivel = 'Dissociação normal'; cor = 'green'; }
      else if (media <= 20) { nivel = 'Dissociação leve'; cor = 'amber'; }
      else if (media <= 30) { nivel = 'Dissociação moderada'; cor = 'red'; }
      else                  { nivel = 'Dissociação elevada — investigar TDI'; cor = 'red'; }
      return { nivel, cor, pontos: media, max: 100 };
    }
  },

  // ═══ SOMATIZAÇÃO ═══
  {
    id: 'phq15', categoria: 'somatizacao', nome: 'PHQ-15',
    descCurta: 'Escala de Sintomas Somáticos — 15 itens',
    instrucoes: 'Durante as últimas 4 semanas, o quanto você foi incomodado(a) por algum dos seguintes problemas?',
    perguntas: [
      'Dores de estômago','Dores nas costas','Dor nos braços, pernas ou articulações',
      'Cólicas menstruais ou outros problemas menstruais (se aplicável)',
      'Dores de cabeça','Dor no peito','Tontura','Desmaios',
      'Palpitações ou sensação de coração acelerado','Falta de ar',
      'Relações sexuais dolorosas (se aplicável)','Constipação, fezes soltas ou diarreia',
      'Náusea, gases ou indigestão','Cansaço ou falta de energia','Dificuldade para dormir',
    ].map(t => ({ texto: t, tipo: 'multipla', opcoes: ['Não me incomodou','Incomodou pouco','Incomodou muito'] })),
    interpretar: (resp, pontos) => {
      const total = resp.reduce((a,v)=>a+v,0);
      let nivel, cor;
      if (total <= 4)       { nivel = 'Sintomas somáticos mínimos'; cor = 'green'; }
      else if (total <= 9)  { nivel = 'Sintomas somáticos leves'; cor = 'amber'; }
      else if (total <= 14) { nivel = 'Sintomas somáticos moderados'; cor = 'red'; }
      else                  { nivel = 'Sintomas somáticos graves'; cor = 'red'; }
      return { nivel, cor, pontos: total, max: 30 };
    }
  },

  {
    id: 'hai', categoria: 'somatizacao', nome: 'HAI',
    descCurta: 'Inventário de Ansiedade de Saúde — 18 itens',
    instrucoes: 'Para cada grupo, escolha a afirmação que melhor descreve como você se sente atualmente:',
    perguntas: [
      { texto: 'Preocupação com saúde geral', tipo: 'multipla', opcoes: ['Não me preocupo com a saúde','Me preocupo com saúde às vezes','Frequentemente me preocupo com saúde','Praticamente só penso em saúde'] },
      { texto: 'Experiências de dor', tipo: 'multipla', opcoes: ['Não tenho dor','Sinto dor às vezes, não me preocupo','A dor me preocupa — algo grave?','Tenho dor frequente e acredito ser grave'] },
      { texto: 'Sensações corporais estranhas', tipo: 'multipla', opcoes: ['Não percebo sensações estranhas','Às vezes tenho, não me preocupo','Frequentemente tenho, me preocupo muito','Sempre tenho, convicto de doença grave'] },
      { texto: 'Medo de doenças graves', tipo: 'multipla', opcoes: ['Não tenho medo de doenças graves','Às vezes temo doenças graves','Frequentemente temo doenças graves','Estou convicto que tenho doença grave'] },
      { texto: 'Reação ao ouvir sobre doenças', tipo: 'multipla', opcoes: ['Se ouvir sobre doença, não me preocupo','Às vezes me preocupo brevemente','Me preocupo por algum tempo','Fico muito ansioso e me preocupo longamente'] },
      { texto: 'Pensamentos sobre doença grave', tipo: 'multipla', opcoes: ['Não penso em ter doença grave','Às vezes penso que posso ter','Frequentemente penso que tenho doença grave','Estou convicto que tenho doença grave'] },
      { texto: 'Dificuldade de concentração fora da saúde', tipo: 'multipla', opcoes: ['Consigo pensar em outras coisas','Com esforço consigo pensar em outra coisa','Muito difícil pensar em outra coisa','Não consigo pensar em outra coisa'] },
      { texto: 'Imagens de estar doente', tipo: 'multipla', opcoes: ['Não tenho imagens de estar doente','Às vezes tenho imagens de estar doente','Frequentemente tenho imagens de estar doente','Tenho imagens vívidas de estar doente'] },
      { texto: 'Interpretação de sintomas', tipo: 'multipla', opcoes: ['Se tenho sintoma, não penso ser doença grave','Às vezes me preocupo ser doença grave','Frequentemente me preocupo ser doença grave','Imediatamente penso que é doença grave'] },
      { texto: 'Evitação por medo de doença', tipo: 'multipla', opcoes: ['Não evito coisas por medo de doença','Às vezes evito algumas coisas','Frequentemente evito situações','Evito muita coisa por medo de adoecer'] },
      { texto: 'Busca de reasseguramento', tipo: 'multipla', opcoes: ['Não busco reasseguramento sobre saúde','Às vezes busco reasseguramento','Frequentemente busco reasseguramento','Busco reasseguramento constantemente'] },
      { texto: 'Controle de pensamentos sobre doença', tipo: 'multipla', opcoes: ['Consigo ignorar pensamentos sobre doença','Tenho alguma dificuldade','Tenho muita dificuldade','Não consigo ignorar esses pensamentos'] },
      { texto: 'Percepção externa', tipo: 'multipla', opcoes: ['Família/amigos não me chamam de hipocondríaco','Às vezes me chamam','Frequentemente me chamam','Sempre me chamam de hipocondríaco'] },
      { texto: 'Resposta ao diagnóstico médico', tipo: 'multipla', opcoes: ['Se médico diz que estou bem, acredito','Acredito por pouco tempo','Duvido mas acabo acreditando','Não acredito, procuro outro médico'] },
      { texto: 'Medo de morte iminente', tipo: 'multipla', opcoes: ['Não tenho medo de morrer em breve','Às vezes temo morrer em breve','Frequentemente temo morrer em breve','Estou convicto que vou morrer em breve'] },
      { texto: 'Perturbação com pensamentos sobre doença', tipo: 'multipla', opcoes: ['Não fico perturbado com pensamentos sobre doença','Fico levemente perturbado','Fico moderadamente perturbado','Fico extremamente perturbado'] },
      { texto: 'Impacto na família', tipo: 'multipla', opcoes: ['Minha família não sofre com minha preocupação','Às vezes sofre um pouco','Frequentemente sofre','Sempre sofre muito'] },
      { texto: 'Impacto nas tarefas diárias', tipo: 'multipla', opcoes: ['Não tenho dificuldade nas tarefas','Às vezes tenho alguma dificuldade','Frequentemente tenho dificuldade','Não consigo realizar tarefas pela preocupação'] },
    ],
    interpretar: (resp, pontos) => {
      const total = resp.reduce((a,v)=>a+v,0);
      let nivel, cor;
      if (total <= 17)      { nivel = 'Ansiedade de saúde normal'; cor = 'green'; }
      else if (total <= 34) { nivel = 'Ansiedade de saúde elevada'; cor = 'amber'; }
      else                  { nivel = 'Hipocondria severa'; cor = 'red'; }
      return { nivel, cor, pontos: total, max: 54 };
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

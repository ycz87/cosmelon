import type { Messages } from '../types';

/** Traduções em português (Brasil) */
export const pt: Messages = {
  // App
  appName: 'Relógio Melancia',
  appNameShort: 'Melancia',

  // Timer phases
  phaseWork: '🍉 Foco',
  phaseShortBreak: '☕ Pausa',

  // Timer controls
  abandon: 'Desistir',
  quickTimeHint: 'Toque para ajustar a duração',
  toggleTimerMode: 'Toque para alternar crescente/decrescente',

  // Task input
  taskPlaceholder: 'No que você está trabalhando?',
  clearTask: 'Limpar',

  // Task list
  emptyTitle: 'Pronto para começar?',
  emptySubtitle: 'Comece sua primeira sessão de foco 🍉',
  todayRecords: 'Sessões de hoje',
  unnamed: 'Sem título',
  editHint: 'Toque para editar',
  deleteConfirm: 'Tem certeza?',

  // Today stats
  todayHarvest: 'Colheita de hoje',
  totalFocus: (time: string) => `Total: ${time}`,

  // Notifications
  workComplete: (emoji: string) => `${emoji} Sessão concluída!`,
  skipComplete: (emoji: string) => `${emoji} Concluída manualmente`,
  breakOver: '☕ Pausa encerrada',
  breakOverBody: 'Pronto para a próxima sessão?',

  // Celebration
  celebrationRipe: ['Incrível! 🎉', 'Muito bem! ✨', 'Foco perfeito! 🔥', 'Continue assim! 💪'],
  celebrationShort: ['Legal! 👍', 'Feito! ✨', 'Bom começo! 🌱'],

  // Per-stage celebration text (v0.7.1)
  celebrateSeed: [
    'Cada broto guarda um campo de melancias 🌱',
    'Um pequeno começo, uma grande possibilidade ✨',
    'O broto está nas suas mãos',
    'Seu primeiro passo de foco, dado 🌱',
    'Um pequeno broto, esperando florescer',
  ],
  celebrateSprout: [
    'Um broto emerge — seu foco está criando raízes 🌿',
    'Olha, seu esforço está brotando',
    'Continue, vai se tornar algo incrível 🌿',
    'Cada minuto de foco é sol e chuva',
    'O broto está aqui, coisas boas vêm por aí 🌿',
  ],
  celebrateBloom: [
    'Uma flor se abre — o fruto pode estar longe? 🌼',
    'Não é só uma flor que desabrocha, é seu foco também',
    'Flores abertas, coisas boas a caminho 🌼',
    'Mais um pouco e o fruto virá',
    'Seu foco está florescendo 🌼',
  ],
  celebrateGreen: [
    'A melancia está se formando — a colheita está perto 🍈',
    'Tão perto de uma melancia perfeita!',
    'Seu foco deu frutos 🍈',
    'Mais um pouco na próxima vez e será enorme!',
    'O fruto do seu foco está aparecendo 🍈',
  ],
  celebrateRipe: [
    'Uma melancia perfeita! Você é incrível 🍉🎉',
    'Essa melancia é o fruto mais doce do foco',
    'Hora da colheita! Você merece essa comemoração 🍉',
    '25 minutos de foco para a recompensa mais doce 🎉',
    'Grande colheita! Esse é o poder do foco 🍉',
  ],
  celebrateLegendary: [
    'A lendária Melancia Dourada! Você é um mestre do foco 👑',
    'Glória dourada! A maior honra é sua 👑✨',
    'A Melancia Dourada desce! Salve o rei do foco 🏆',
    '90 minutos de foco profundo para uma recompensa lendária 👑',
    'Melancia Dourada! O mundo inteiro te aplaude 🎉👑',
  ],

  // Warehouse & Synthesis
  warehouseTitle: '🏠 Meu Galpão de Melancias',
  warehouseTabShed: '🍉 Galpão',
  warehouseTabBackpack: '🎒 Mochila',
  warehouseTotal: 'Total coletado',
  warehouseHighest: 'Nível mais alto',
  warehouseLocked: '🔒',
  warehouseLockedName: '???',
  synthesisTitle: '⚗️ Síntese',
  synthesisYouHave: (n) => `Você tem ${n}`,
  synthesisCanMake: (n, name) => `Pode fazer ${n} ${name}`,
  synthesisNotEnough: 'Não é suficiente',
  synthesisSynthesize: 'Sintetizar',
  synthesisSynthesizeAll: 'Sintetizar tudo',
  synthesisSuccess: (name) => `Sucesso! Você obteve ${name}`,
  warehouseEmpty: 'Seu galpão está vazio — comece a focar! 🍉',
  stageNameSeed: 'Broto',
  stageNameSprout: 'Muda',
  stageNameBloom: 'Florzinha',
  stageNameGreen: 'Melancia verde',
  stageNameRipe: 'Melancia',
  stageNameLegendary: 'Melancia Dourada',
  legendaryUnlocked: 'Desbloqueado',

  // Anti-AFK & Health
  overtimeNoReward: 'Tempo extra demais — sem recompensa desta vez ⏰',
  healthReminder: 'Sessões longas não mudam automaticamente para pausa — lembre-se de descansar quando o tempo acabar 🧘',

  // Settings
  settings: 'Configurações',
  timerRunningHint: '⏳ O timer está rodando — ajuste depois que parar',
  workDuration: 'Foco',
  shortBreak: 'Pausa',
  autoStartBreak: 'Iniciar pausa automaticamente',
  autoStartWork: 'Iniciar foco automaticamente',

  // Alert sound
  alertSound: 'Som de alerta',
  alertRepeatCount: 'Repetições',
  alertVolume: 'Volume do alerta',
  alertCustomize: 'Personalizar',
  repeatTimes: (n: number) => n === 0 ? 'Loop' : `${n}×`,

  // Ambience
  focusAmbience: 'Ambiente de foco',
  ambienceVolume: 'Volume do ambiente',
  ambienceCustomize: 'Personalizar',
  ambienceOff: 'Desligado',
  ambienceCategoryNature: '🌧️ Natureza',
  ambienceCategoryEnvironment: '🏠 Ambiente',
  ambienceCategoryNoise: '🎵 Ruído',
  ambienceCategoryClock: '🕐 Relógio',

  // Ambience sound names
  ambienceNames: {
    rain: 'Chuva',
    thunderstorm: 'Tempestade',
    ocean: 'Ondas do mar',
    stream: 'Riacho',
    birds: 'Pássaros',
    wind: 'Vento',
    crickets: 'Grilos',
    cafe: 'Cafeteria',
    fireplace: 'Lareira',
    keyboard: 'Teclado',
    library: 'Biblioteca',
    whiteNoise: 'Ruído branco',
    pinkNoise: 'Ruído rosa',
    brownNoise: 'Ruído marrom',
    binauralBeats: 'Batidas binaurais',
    tickClassic: 'Pêndulo clássico',
    tickSoft: 'Tique suave',
    tickMechanical: 'Mecânico',
    tickWooden: 'De madeira',
    tickGrandfather: 'Relógio de pêndulo',
    tickPocketWatch: 'Relógio de bolso',
    tickMetronome: 'Metrônomo',
    tickWaterDrop: 'Gota d\'água',
    campfire: 'Fogueira',
    softPiano: 'Piano suave',
    catPurr: 'Ronronar de gato',
    night: 'Noite',
    train: 'Trem',
    underwater: 'Subaquático',
  },

  // Alert sound names
  alertNames: {
    chime: '🎵 Carrilhão',
    bell: '🔔 Sino',
    nature: '🌿 Natureza',
    xylophone: '🎶 Xilofone',
    piano: '🎹 Piano',
    electronic: '⚡ Eletrônico',
    waterdrop: '💧 Gota d\'água',
    birdsong: '🐦 Canto de pássaro',
    marimba: '🪘 Marimba',
    gong: '🔊 Gong',
  },

  // Modal
  modalClose: 'Fechar',
  modalDone: 'Pronto',

  theme: 'Tema',
  language: 'Idioma',
  exportData: '📦 Exportar dados',
  minutes: 'min',
  seconds: 's',

  // Theme names
  themeDark: 'Escuro',
  themeLight: 'Claro',
  themeForest: 'Floresta',
  themeOcean: 'Oceano',
  themeWarm: 'Quente',

  // Growth stages
  stageSeed: 'Broto',
  stageSprout: 'Muda',
  stageBloom: 'Flor',
  stageGreen: 'Verde',
  stageRipe: 'Madura',

  // Guide
  guideTitle: '🍉 Como usar',
  guidePomodoro: 'Técnica Pomodoro',
  guidePomodoroDesc: 'O Relógio Melancia usa a Técnica Pomodoro para ajudar você a manter o foco. Foco → Pausa → Foco → Pausa, um ciclo simples.',
  guideBasic: 'Primeiros passos',
  guideBasicItems: [
    'Toque em play para começar a focar',
    'Pause, conclua antes ou saia a qualquer momento',
    'As pausas começam automaticamente após cada sessão',
    'Toque nos dígitos do timer para ajustar rapidamente a duração',
  ],
  guideGrowth: '🌱 Crescimento da melancia',
  guideGrowthDesc: 'Quanto mais você foca, maior sua melancia cresce:',
  guideGrowthStages: ['5–15 min · Broto', '16–25 min · Muda', '26–45 min · Florzinha', '46–60 min · Verde', '61–90 min · Madura'],
  guideSettings: '⚙️ Configurações',
  guideSettingsDesc: 'Personalize a duração de foco/pausa, início automático, sons de alerta, mixer de ambiente, temas e exporte seus dados pelo ícone de engrenagem.',
  guideStart: 'Começar',

  // Install prompt
  installTitle: 'Instalar app',
  installDesc: 'Use como um app nativo',
  installButton: 'Instalar',

  // History panel
  historyTab: '📅 Histórico',
  statsTab: '📊 Estatísticas',
  streakBanner: (days: number) => `🔥 Sequência de ${days} dias`,
  noRecords: 'Sem sessões neste dia',
  today: 'Hoje',
  yesterday: 'Ontem',
  dateFormat: (m: number, d: number) => `${d}/${m}`,

  // Stats
  currentStreak: 'Sequência atual',
  longestStreak: 'Maior sequência',
  focusTrend: 'Tendência de foco',
  thisWeek: 'Esta semana',
  thisMonth: 'Este mês',
  totalTime: 'Todo o tempo',
  totalCount: 'Total de sessões',
  countUnit: (n: number) => `${n}`,

  // Time formatting
  formatMinutes: (mins: number) => {
    if (mins < 60) return `${mins}min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  },

  // Weekdays (Mon-Sun)
  weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],

  // Month nav
  monthFormat: (year: number, month: number) => `${month}/${year}`,

  // ─── Project mode ───
  modePomodoro: 'Pomodoro',
  modeProject: 'Projeto',

  // Setup
  projectNamePlaceholder: 'Nome do projeto',
  projectTasks: 'Tarefas',
  projectTaskPlaceholder: 'Nome da tarefa',
  projectAddTask: 'Adicionar tarefa',
  projectEstimatedTotal: 'Total estimado',
  projectBreakTotal: 'pausas',
  projectCancel: 'Cancelar',
  projectStart: 'Iniciar',

  // Execution
  projectCurrentTask: 'Tarefa',
  projectBreakTime: 'Hora da pausa',
  projectOvertime: 'Hora extra',
  projectEstimated: 'Est.',
  projectContinue: 'Continuar',
  projectMarkDone: 'Concluído',
  projectPause: 'Pausar',
  projectResume: 'Retomar',
  projectTaskList: 'Tarefas',
  projectInsertTask: 'Inserir tarefa',
  projectInsert: 'Inserir',
  projectAbandon: 'Abandonar projeto',
  projectAbandonConfirm: 'Abandonar? O progresso será perdido.',
  projectAbandonYes: 'Confirmar',

  // Summary
  projectComplete: 'Projeto concluído!',
  projectTotalEstimated: 'Estimado',
  projectTotalActual: 'Real',
  projectAheadOfSchedule: 'Adiantado por',
  projectBehindSchedule: 'Atrasado por',
  projectTaskBreakdown: 'Detalhamento das tarefas',
  projectCompleted: 'concluída',
  projectSkipped: 'pulada',
  projectDone: 'Pronto',

  // Confirm modal
  confirmExitTitle: 'Sair desta sessão?',
  confirmExitMessage: 'O progresso será marcado como incompleto',
  confirm: 'Sair',
  cancel: 'Cancelar',

  // Default task name
  defaultTaskName: (n: number) => `Foco #${n}`,

  // Project exit modal
  projectExitConfirmTitle: 'Sair da tarefa atual?',
  projectExitConfirm: 'Sair da tarefa',
  projectExitAll: 'Sair do projeto inteiro',
  projectExitChooseTitle: 'O que fazer agora?',
  projectExitRestart: 'Reiniciar esta tarefa',
  projectExitNext: 'Próxima tarefa',
  projectExitPrevious: 'Voltar à anterior (Hora extra)',
  projectExitFinish: 'Finalizar projeto',
  projectAbandoned: 'abandonada',
  projectOvertimeContinued: 'hora extra',

  // Recovery
  projectRecoveryTitle: 'Projeto inacabado encontrado',
  projectRecoveryDesc: 'Você tem um projeto inacabado. Retomar?',
  projectRecoveryResume: 'Retomar',
  projectRecoveryDiscard: 'Começar do zero',

  // History
  projectHistory: 'Projetos',
  projectHistoryEstimated: 'Est.',
  projectHistoryActual: 'Real',

  // Settings section headers
  sectionTimer: '⏱ TIMER',
  sectionAlerts: '🔔 ALERTAS',
  sectionAppearance: '🎨 APARÊNCIA',
  sectionGeneral: '⚙ GERAL',

  // Empty state
  emptyTodayHint: 'Sem registros hoje ainda',

  // Guide in settings
  settingsGuide: 'Guia de uso',

  // Encouragement banner
  encourageEmpty: [
    'Cultive sua melancia, cultive seu foco 🍉',
    'Pronto para plantar sua primeira melancia? 🌱',
    'Seu campo de melancias te espera 🍉',
  ],
  encourageFirst: [
    'Sua melancia está crescendo 🌱',
    'Primeira melancia plantada, continue assim!',
    'Foque e deixe amadurecer 🍉',
  ],
  encourageSecond: [
    'Continue assim! 2 melancias colhidas',
    'Segunda melancia pronta, show 👍',
    'Seu campo de melancias está crescendo 🍉',
  ],
  encourageThird: [
    'A melancia de hoje está extra doce! 🍉',
    '3 melancias, que colheita!',
    'Seu campo de melancias está prosperando 🌱',
  ],
  encourageMany: [
    '{n} melancias colhidas — você está arrasando!',
    '{n} melancias, que dia! 🔥',
    '{n} melancias, colheita imparável! 🍉',
  ],
  encourageBeatYesterday: (count, diff) => `${count} feitas, ${diff} a mais que ontem 💪`,
  encourageTiedYesterday: (count) => `${count} feitas, igual a ontem`,
  streakShort: (days) => `🔥 Sequência de ${days} dias`,
  streakMedium: (days) => `🔥 Sequência de ${days} dias, criando um hábito`,
  streakLong: (days) => `🔥 Sequência de ${days} dias! Incrível!`,

  // Week trend chart
  weekTrend: 'Esta semana',
  weekTotal: (time) => `Total: ${time}`,

  // Long-press buttons
  holdToFinish: 'Segure para concluir antes',
  holdToGiveUp: 'Segure para desistir',

  // Auth
  authTitle: 'Entrar',
  authEmailPlaceholder: 'Digite seu email',
  authSendCode: 'Enviar código',
  authSendFailed: 'Falha ao enviar, tente novamente',
  authVerifyFailed: 'Código inválido ou expirado',
  authOr: 'ou',
  authGoogle: 'Continuar com Google',
  authMicrosoft: 'Continuar com Microsoft',
  authLoginToSync: 'Entre para sincronizar seus dados',
  authLogout: 'Sair',

  // Profile editing
  profileEditName: 'Editar nome',
  profileSaving: 'Salvando...',
  profileUploadAvatar: 'Trocar avatar',

  // Achievements (v0.17.0)
  achievementsTitle: '🏆 Achievements',
  achievementsButton: '🏆 Achievements',
  achievementsProgress: (unlocked: number, total: number) => `Unlocked ${unlocked} / ${total}`,
  achievementsSeriesProgress: (unlocked: number, total: number) => `${unlocked} / ${total}`,
  achievementsUnlocked: 'Unlocked',
  achievementsLocked: 'Locked',
  achievementsHiddenLocked: '???',
  achievementsHiddenHint: 'This is a hidden achievement — keep exploring...',
  achievementsComingSoon: 'Coming Soon',
  achievementsUnlockedAt: (date: string) => `Unlocked on ${date}`,
  achievementsCondition: 'Condition',
  achievementsCurrentProgress: 'Progress',
  achievementsCelebrationTitle: 'Achievement Unlocked!',
  achievementsSeriesStreak: '⭐️ Streak',
  achievementsSeriesFocus: '⏱️ Focus',
  achievementsSeriesHouse: '🏠 Melon Shed',
  achievementsSeriesFarm: '🌱 Farm',
  achievementsSeriesHidden: '🌟 Hidden',

  // Slicing system
  sliceHint: 'Deslize para cortar a melancia 🔪',
  slicePerfect: '✨ Corte perfeito!',
  sliceResult: '🍉 Resultado do corte',
  sliceGoldResult: '👑 Resultado melancia dourada',
  sliceSeedsObtained: (n) => `Sementes misteriosas ×${n}`,
  slicePerfectBonus: '+1 Bônus perfeito',
  sliceRare: 'Raro',
  sliceCollect: 'Coletar',
  sliceContinue: '🔪 Cortar próxima',
  sliceButton: '🔪 Cortar',
  itemName: (id) => ({
    'starlight-fertilizer': '⚡ Fertilizante estelar',
    'supernova-bottle': '☀️ Garrafa supernova',
    'alien-flare': '🛸 Sinalizador alienígena',
    'thief-trap': '🪤 Armadilha para ladrões',
    'star-telescope': '🔮 Telescópio estelar',
    'moonlight-dew': '🌙 Orvalho lunar',
    'circus-tent': '🎪 Tenda circo melancia',
    'gene-modifier': '🧬 Modificador genético',
    'lullaby-record': '🎵 Canção de ninar melancia',
  }[id] ?? id),
  itemFlavor: (id) => ({
    'starlight-fertilizer': 'Fertilizante misterioso de uma galáxia distante — cheira a poeira estelar',
    'supernova-bottle': 'Contém a energia explosiva de uma micro supernova',
    'alien-flare': 'Grite "Tem melancia aqui!" para o cosmos e torça por visitantes amigáveis',
    'thief-trap': 'Parece uma melancia normal, mas na verdade é uma gaiola',
    'star-telescope': 'Dizem ser uma relíquia de um observatório alienígena',
    'moonlight-dew': 'Gotas de orvalho misteriosas que só se formam na lua cheia',
    'circus-tent': 'Deixado por um circo alienígena de passagem',
    'gene-modifier': 'Coleção particular do Dr. Mutação',
    'lullaby-record': 'Uma canção de ninar alienígena que faz melancias crescerem rápido',
  }[id] ?? ''),
  shedSeedsTitle: '🌰 Sementes misteriosas',
  shedSeedsCount: (n) => `×${n}`,
  shedGoFarm: 'Ir para fazenda',
  shedFarmComingSoon: 'Fazenda em breve',
  shedItemsTitle: '🎒 Itens',
  shedNoItems: 'Sem itens ainda — corte melancias!',
  shedSliceSection: '🔪 Cortar',
  shedTotalSliced: 'Total cortado',
  seedQualityLabel: (q) => ({ normal: 'Normal', epic: 'Épico', legendary: 'Lendário' }[q] ?? q),
  comboExpert: '🔪 Especialista em corte!',
  comboGod: '⚡ Deus melancia!',

  tabFocus: 'Foco',
  tabWarehouse: 'Galpão',
  tabFarm: 'Fazenda',

  farmPlotsTab: 'Canteiros',
  farmCollectionTab: 'Coleção',
  farmTodayFocus: (m) => `Hoje: ${m} min focado`,
  farmPlant: 'Plantar',
  farmHarvest: 'Colher',
  farmWithered: 'Murcha',
  farmClear: 'Limpar',
  farmSelectGalaxy: 'Escolher galáxia',
  farmSelectSeed: 'Escolher semente',
  farmSeedHint: 'Maior qualidade = mais chance de variedades raras',
  farmNoSeeds: 'Ainda sem sementes. Corte melancias para conseguir!',
  farmGoSlice: 'Ir cortar 🔪',
  farmReveal: 'Din! É—',
  farmNewVariety: 'Nova variedade!',
  farmNewFlash: 'NEW',
  farmAlreadyCollected: 'Já coletada',
  farmStage: (s) => ({ seed: 'Semente', sprout: 'Broto', leaf: 'Folha', flower: 'Flor', fruit: 'Fruto' }[s] ?? s),
  farmGoFarm: 'Ir para fazenda 🌱',
  farmUnlockHint: (n) => `Colete ${n} variedades para desbloquear`,

  starJourneyTitle: '🚀 Jornada Estelar',
  collectionProgress: (c, t) => `${c}/${t} coletadas`,
  collectionLocked: 'Bloqueado',
  collectionUnlockHint: (id) => ({
    'thick-earth': 'Desbloqueada por padrão',
    fire: 'Colete 5 variedades de Terra Densa para desbloquear',
    water: 'Colete 5 variedades de Fogo para desbloquear',
    wood: 'Colete 5 variedades de Água para desbloquear',
    metal: 'Colete 5 variedades de Madeira para desbloquear',
    rainbow: 'Em breve',
    'dark-matter': 'Em breve',
  }[id] ?? 'Em breve'),
  galaxyName: (id) => ({
    'thick-earth': 'Terra Densa',
    fire: 'Fogo',
    water: 'Água',
    wood: 'Madeira',
    metal: 'Metal',
    'rainbow': 'Arco-íris',
    'dark-matter': 'Matéria Escura',
  }[id] ?? id),
  varietyName: (id) => ({
    'jade-stripe': 'Listra de Jade',
    'black-pearl': 'Pérola Negra',
    'honey-bomb': 'Bomba de Mel',
    'mini-round': 'Mini Redonda',
    'star-moon': 'Estrela-Lua',
    'golden-heart': 'Coração Dourado',
    'ice-sugar-snow': 'Neve Açucarada',
    'cube-melon': 'Melão Cubo',
    'lava-melon': 'Melão de Lava',
    'caramel-crack': 'Fenda de Caramelo',
    'charcoal-roast': 'Melão na Brasa',
    'flame-pattern': 'Padrão de Chama',
    'molten-core': 'Núcleo Fundido',
    'sun-stone': 'Pedra do Sol',
    'ash-rebirth': 'Renascimento das Cinzas',
    'phoenix-nirvana': 'Fênix Nirvana',
    'snow-velvet': 'Veludo de Neve',
    'ice-crystal': 'Cristal de Gelo',
    'tidal-melon': 'Melão de Maré',
    'aurora-melon': 'Melão Aurora',
    'moonlight-melon': 'Melão ao Luar',
    'diamond-melon': 'Melão Diamante',
    'abyss-melon': 'Melão Abissal',
    permafrost: 'Melão Permafrost',
    'vine-melon': 'Melão Trepadeira',
    'moss-melon': 'Melão Musgo',
    'mycelium-melon': 'Melão Micélio',
    'flower-whisper': 'Sussurro Floral',
    'tree-ring': 'Anel da Árvore',
    'world-tree': 'Melão Árvore-Mundo',
    'spirit-root': 'Raiz Espiritual',
    'all-spirit': 'Melão Todo-Espírito',
    'golden-armor': 'Armadura Dourada',
    'copper-patina': 'Pátina de Cobre',
    'tinfoil-melon': 'Melão de Estanho',
    'galaxy-stripe': 'Listra Galáctica',
    'mercury-melon': 'Melão de Mercúrio',
    'meteorite-melon': 'Melão Meteorito',
    'alloy-melon': 'Melão de Liga',
    'eternal-melon': 'Melão Eterno',
  }[id] ?? id),
  varietyStory: (id) => ({
    'jade-stripe': 'Primeiro broto após a explosão, com as marcas brancas do melão primordial.',
    'black-pearl': 'Cresce em solo negro profundo e guarda a essência do planeta.',
    'honey-bomb': 'Trava todo o açúcar do sol e explode em doçura.',
    'mini-round': 'A gravidade equatorial molda uma esfera pequena e perfeita.',
    'star-moon': 'Duas luas desenham estrelas e lua sobre a casca à noite.',
    'golden-heart': 'Raízes em veios de ouro tingem a polpa de dourado brilhante.',
    'ice-sugar-snow': 'Só a neve polar milenar gera este fruto branco que derrete.',
    'cube-melon': 'Fragmento cúbico primordial, único em genética em todo o cosmos.',
    'lava-melon': 'Cresce na borda da cratera com polpa laranja fluida.',
    'caramel-crack': 'O calor racha a casca e libera xarope doce cor de caramelo.',
    'charcoal-roast': 'Assa naturalmente perto de fendas geotérmicas e ganha aroma defumado leve.',
    'flame-pattern': 'Frutifica em tempestades de fogo com listras de chama congelada.',
    'molten-core': 'Um núcleo brilhante armazena energia puxada do coração planetário.',
    'sun-stone': 'Absorveu estilhaços estelares e brilha mesmo na escuridão total.',
    'ash-rebirth': 'Só brota em cinza vulcânica e renasce após a destruição.',
    'phoenix-nirvana': 'A lenda diz que o fogo da fênix deixou sementes eternas.',
    'snow-velvet': 'Uma camada de geada cobre a casca e deixa toque gelado.',
    'ice-crystal': 'Em fendas glaciais, a casca translúcida revela polpa azulada.',
    'tidal-melon': 'Seus veios se movem no ritmo das marés sob o gelo.',
    'aurora-melon': 'O magnetismo polar pinta a casca com cores de aurora.',
    'moonlight-melon': 'Amadurece na noite polar e brilha prateado como luar.',
    'diamond-melon': 'A pressão extrema cria cristais naturais mais raros que diamantes.',
    'abyss-melon': 'Do mar gelado mais profundo, emite um brilho azul frio.',
    permafrost: 'Mesmo a menos 200 graus, este descendente não congela por completo.',
    'vine-melon': 'Suas trepadeiras vivas crescem sozinhas e se enrolam nos suportes.',
    'moss-melon': 'Musgo denso camufla o fruto perfeitamente na sombra da floresta.',
    'mycelium-melon': 'As raízes ligam-se ao micélio e sentem toda a floresta.',
    'flower-whisper': 'O perfume das flores envia mensagens sobre seu humor.',
    'tree-ring': 'Cada anel da polpa registra a história de uma estação.',
    'world-tree': 'Só amadurece na copa mais alta da Árvore-Mundo.',
    'spirit-root': 'Raízes profundas bebem vida planetária e cada mordida ecoa o pulso da terra.',
    'all-spirit': 'Semente de um fragmento de madeira primordial que faz ouvir toda vida.',
    'golden-armor': 'Sua casca blindada exige uma lâmina especial de liga.',
    'copper-patina': 'A pátina esverdeada imita minério antigo em vez de envelhecer.',
    'tinfoil-melon': 'A casca fina como folha de estanho é dura e soa metálica.',
    'galaxy-stripe': 'Espirais galácticas são gravadas pelo campo magnético do planeta.',
    'mercury-melon': 'A polpa flui como mercúrio e depois se reúne sozinha.',
    'meteorite-melon': 'Cresce em crateras e absorve calor metálico do espaço.',
    'alloy-melon': 'Traços de metais raros a tornam alimento valioso para mineradores.',
    'eternal-melon': 'Forjado por eras no núcleo, jamais apodrece.',
  }[id] ?? ''),
  varietyDetailTitle: 'Detalhes da variedade',
  varietyDetailFirstObtained: 'Primeira obtenção',
  varietyDetailHarvestCount: (count) => `Colhida ${count} vezes`,
  varietyDetailClose: 'Fechar',
};

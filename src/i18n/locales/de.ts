import type { Messages } from '../types';

/** Deutsche Übersetzungen */
export const de: Messages = {
  // App
  appName: 'Wassermelonen-Uhr',
  appNameShort: 'WM-Uhr',

  // Timer phases
  phaseWork: '🍉 Fokus',
  phaseShortBreak: '☕ Pause',

  // Timer controls
  abandon: 'Aufgeben',
  quickTimeHint: 'Tippen, um die Dauer anzupassen',
  toggleTimerMode: 'Tippen, um hoch-/runterzählen umzuschalten',

  // Task input
  taskPlaceholder: 'Woran arbeitest du?',
  clearTask: 'Löschen',

  // Task list
  emptyTitle: 'Bereit loszulegen?',
  emptySubtitle: 'Starte deine erste Fokus-Session 🍉',
  todayRecords: 'Heutige Sessions',
  unnamed: 'Ohne Titel',
  editHint: 'Tippen zum Bearbeiten',
  deleteConfirm: 'Sicher?',

  // Today stats
  todayHarvest: 'Heutige Ernte',
  totalFocus: (time: string) => `Gesamt: ${time}`,

  // Notifications
  workComplete: (emoji: string) => `${emoji} Session abgeschlossen!`,
  skipComplete: (emoji: string) => `${emoji} Manuell abgeschlossen`,
  breakOver: '☕ Pause vorbei',
  breakOverBody: 'Bereit für die nächste Session?',

  // Celebration
  celebrationRipe: ['Fantastisch! 🎉', 'Gut gemacht! ✨', 'Perfekter Fokus! 🔥', 'Weiter so! 💪'],
  celebrationShort: ['Gut! 👍', 'Fertig! ✨', 'Guter Anfang! 🌱'],

  // Per-stage celebration text (v0.7.1)
  celebrateSeed: [
    'Jeder Keimling birgt ein Melonenfeld 🌱',
    'Ein kleiner Anfang, eine große Möglichkeit ✨',
    'Der Keimling liegt in deinen Händen',
    'Dein erster Schritt zum Fokus, getan 🌱',
    'Ein kleiner Keimling, bereit zu erblühen',
  ],
  celebrateSprout: [
    'Ein Spross bricht durch — dein Fokus schlägt Wurzeln 🌿',
    'Schau, deine Mühe sprießt',
    'Mach weiter, es wird etwas Großartiges 🌿',
    'Jede Minute Fokus ist Sonnenschein und Regen',
    'Der Spross ist da, Gutes kommt 🌿',
  ],
  celebrateBloom: [
    'Eine Blüte öffnet sich — kann die Frucht weit sein? 🌼',
    'Nicht nur eine Blume blüht, auch dein Fokus',
    'Blüten offen, Gutes kommt 🌼',
    'Noch ein bisschen, dann kommt die Frucht',
    'Dein Fokus blüht auf 🌼',
  ],
  celebrateGreen: [
    'Die Melone formt sich — die Ernte naht 🍈',
    'So nah an einer perfekten Wassermelone!',
    'Dein Fokus hat Früchte getragen 🍈',
    'Noch etwas mehr beim nächsten Mal, und sie wird riesig!',
    'Die Frucht deines Fokus zeigt sich 🍈',
  ],
  celebrateRipe: [
    'Eine perfekte Wassermelone! Du bist großartig 🍉🎉',
    'Diese Melone ist die süßeste Frucht des Fokus',
    'Erntezeit! Du verdienst diese Feier 🍉',
    '25 Minuten Fokus für die süßeste Belohnung 🎉',
    'Große Ernte! Das ist die Kraft des Fokus 🍉',
  ],
  celebrateLegendary: [
    'Die legendäre Goldene Wassermelone! Du bist ein Fokus-Meister 👑',
    'Goldener Ruhm! Die höchste Ehre gehört dir 👑✨',
    'Die Goldene Wassermelone erscheint! Huldigt dem Fokus-König 🏆',
    '90 Minuten tiefer Fokus für eine legendäre Belohnung 👑',
    'Goldene Wassermelone! Die ganze Welt applaudiert dir 🎉👑',
  ],

  // Warehouse & Synthesis
  warehouseTitle: '🏠 Mein Melonenschuppen',
  warehouseTotal: 'Gesamt gesammelt',
  warehouseHighest: 'Höchste Stufe',
  warehouseLocked: '🔒',
  warehouseLockedName: '???',
  synthesisTitle: '⚗️ Synthese',
  synthesisYouHave: (n) => `Du hast ${n}`,
  synthesisCanMake: (n, name) => `Kann ${n} ${name} herstellen`,
  synthesisNotEnough: 'Nicht genug',
  synthesisSynthesize: 'Synthetisieren',
  synthesisSynthesizeAll: 'Alle synthetisieren',
  synthesisSuccess: (name) => `Erfolg! Du hast ${name} erhalten`,
  warehouseEmpty: 'Dein Schuppen ist leer — fang an, dich zu fokussieren! 🍉',
  stageNameSeed: 'Keimling',
  stageNameSprout: 'Spross',
  stageNameBloom: 'Blümchen',
  stageNameGreen: 'Unreife Melone',
  stageNameRipe: 'Wassermelone',
  stageNameLegendary: 'Goldene Melone',
  legendaryUnlocked: 'Freigeschaltet',

  // Anti-AFK & Health
  overtimeNoReward: 'Zu lange Überstunden — diesmal keine Belohnung ⏰',
  healthReminder: 'Längere Fokus-Sessions wechseln nicht automatisch zur Pause — denk daran, dich auszuruhen, wenn die Zeit um ist 🧘',

  // Settings
  settings: 'Einstellungen',
  timerRunningHint: '⏳ Timer läuft — nach dem Stopp anpassen',
  workDuration: 'Fokus',
  shortBreak: 'Pause',
  autoStartBreak: 'Pause automatisch starten',
  autoStartWork: 'Fokus automatisch starten',

  // Alert sound
  alertSound: 'Alarmton',
  alertRepeatCount: 'Wiederholungen',
  alertVolume: 'Alarm-Lautstärke',
  alertCustomize: 'Anpassen',
  repeatTimes: (n: number) => n === 0 ? 'Schleife' : `${n}×`,

  // Ambience
  focusAmbience: 'Fokus-Ambiente',
  ambienceVolume: 'Ambiente-Lautstärke',
  ambienceCustomize: 'Anpassen',
  ambienceOff: 'Aus',
  ambienceCategoryNature: '🌧️ Natur',
  ambienceCategoryEnvironment: '🏠 Umgebung',
  ambienceCategoryNoise: '🎵 Rauschen',
  ambienceCategoryClock: '🕐 Uhr',

  // Ambience sound names
  ambienceNames: {
    rain: 'Regen',
    thunderstorm: 'Gewitter',
    ocean: 'Meereswellen',
    stream: 'Bach',
    birds: 'Vögel',
    wind: 'Wind',
    crickets: 'Grillen',
    cafe: 'Café',
    fireplace: 'Kamin',
    keyboard: 'Tastatur',
    library: 'Bibliothek',
    whiteNoise: 'Weißes Rauschen',
    pinkNoise: 'Rosa Rauschen',
    brownNoise: 'Braunes Rauschen',
    binauralBeats: 'Binaurale Beats',
    tickClassic: 'Klassisches Pendel',
    tickSoft: 'Sanftes Ticken',
    tickMechanical: 'Mechanisch',
    tickWooden: 'Holz',
    tickGrandfather: 'Standuhr',
    tickPocketWatch: 'Taschenuhr',
    tickMetronome: 'Metronom',
    tickWaterDrop: 'Wassertropfen',
    campfire: 'Lagerfeuer',
    softPiano: 'Sanftes Klavier',
    catPurr: 'Katzenschnurren',
    night: 'Nacht',
    train: 'Zug',
    underwater: 'Unterwasser',
  },

  // Alert sound names
  alertNames: {
    chime: '🎵 Glockenspiel',
    bell: '🔔 Glocke',
    nature: '🌿 Natur',
    xylophone: '🎶 Xylophon',
    piano: '🎹 Klavier',
    electronic: '⚡ Elektronisch',
    waterdrop: '💧 Wassertropfen',
    birdsong: '🐦 Vogelgesang',
    marimba: '🪘 Marimba',
    gong: '🔊 Gong',
  },

  // Modal
  modalClose: 'Schließen',
  modalDone: 'Fertig',

  theme: 'Design',
  language: 'Sprache',
  exportData: '📦 Daten exportieren',
  minutes: 'Min',
  seconds: 's',

  // Theme names
  themeDark: 'Dunkel',
  themeLight: 'Hell',
  themeForest: 'Wald',
  themeOcean: 'Ozean',
  themeWarm: 'Warm',

  // Growth stages
  stageSeed: 'Keimling',
  stageSprout: 'Spross',
  stageBloom: 'Blüte',
  stageGreen: 'Unreif',
  stageRipe: 'Reif',

  // Guide
  guideTitle: '🍉 Anleitung',
  guidePomodoro: 'Pomodoro-Technik',
  guidePomodoroDesc: 'Die Wassermelonen-Uhr nutzt die Pomodoro-Technik, um dir beim Fokussieren zu helfen. Fokus → Pause → Fokus → Pause, ein einfacher Zyklus.',
  guideBasic: 'Erste Schritte',
  guideBasicItems: [
    'Tippe auf Play, um mit dem Fokussieren zu beginnen',
    'Pausiere, beende früher oder verlasse jederzeit',
    'Pausen starten automatisch nach jeder Session',
    'Tippe auf die Timer-Ziffern, um die Dauer schnell anzupassen',
  ],
  guideGrowth: '🌱 Wassermelonen-Wachstum',
  guideGrowthDesc: 'Je länger du fokussierst, desto größer wächst deine Wassermelone:',
  guideGrowthStages: ['5–15 Min · Keimling', '16–25 Min · Spross', '26–45 Min · Blümchen', '46–60 Min · Unreif', '61–90 Min · Reif'],
  guideSettings: '⚙️ Einstellungen',
  guideSettingsDesc: 'Passe Fokus-/Pausendauer, Autostart, Alarmtöne, Ambiente-Mixer, Designs an und exportiere deine Daten über das Zahnrad-Symbol.',
  guideStart: 'Loslegen',

  // Install prompt
  installTitle: 'App installieren',
  installDesc: 'Nutze sie wie eine native App',
  installButton: 'Installieren',

  // History panel
  historyTab: '📅 Verlauf',
  statsTab: '📊 Statistiken',
  streakBanner: (days: number) => `🔥 ${days}-Tage-Serie`,
  noRecords: 'Keine Sessions an diesem Tag',
  today: 'Heute',
  yesterday: 'Gestern',
  dateFormat: (m: number, d: number) => `${d}.${m}.`,

  // Stats
  currentStreak: 'Aktuelle Serie',
  longestStreak: 'Längste Serie',
  focusTrend: 'Fokus-Trend',
  thisWeek: 'Diese Woche',
  thisMonth: 'Dieser Monat',
  totalTime: 'Gesamtzeit',
  totalCount: 'Gesamt-Sessions',
  countUnit: (n: number) => `${n}`,

  // Time formatting
  formatMinutes: (mins: number) => {
    if (mins < 60) return `${mins}Min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}Std ${m}Min` : `${h}Std`;
  },

  // Weekdays (Mon-Sun)
  weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],

  // Month nav
  monthFormat: (year: number, month: number) => `${month}/${year}`,

  // ─── Project mode ───
  modePomodoro: 'Pomodoro',
  modeProject: 'Projekt',

  // Setup
  projectNamePlaceholder: 'Projektname',
  projectTasks: 'Aufgaben',
  projectTaskPlaceholder: 'Aufgabenname',
  projectAddTask: 'Aufgabe hinzufügen',
  projectEstimatedTotal: 'Geschätzte Gesamtzeit',
  projectBreakTotal: 'Pausen',
  projectCancel: 'Abbrechen',
  projectStart: 'Starten',

  // Execution
  projectCurrentTask: 'Aufgabe',
  projectBreakTime: 'Pausenzeit',
  projectOvertime: 'Überstunden',
  projectEstimated: 'Gesch.',
  projectContinue: 'Weiter',
  projectMarkDone: 'Fertig',
  projectPause: 'Pause',
  projectResume: 'Fortsetzen',
  projectTaskList: 'Aufgaben',
  projectInsertTask: 'Aufgabe einfügen',
  projectInsert: 'Einfügen',
  projectAbandon: 'Projekt aufgeben',
  projectAbandonConfirm: 'Aufgeben? Der Fortschritt geht verloren.',
  projectAbandonYes: 'Bestätigen',

  // Summary
  projectComplete: 'Projekt abgeschlossen!',
  projectTotalEstimated: 'Geschätzt',
  projectTotalActual: 'Tatsächlich',
  projectAheadOfSchedule: 'Voraus um',
  projectBehindSchedule: 'Verspätet um',
  projectTaskBreakdown: 'Aufgabenübersicht',
  projectCompleted: 'abgeschlossen',
  projectSkipped: 'übersprungen',
  projectDone: 'Fertig',

  // Confirm modal
  confirmExitTitle: 'Diese Session verlassen?',
  confirmExitMessage: 'Der Fortschritt wird als unvollständig markiert',
  confirm: 'Verlassen',
  cancel: 'Abbrechen',

  // Default task name
  defaultTaskName: (n: number) => `Fokus #${n}`,

  // Project exit modal
  projectExitConfirmTitle: 'Aktuelle Aufgabe verlassen?',
  projectExitConfirm: 'Aufgabe verlassen',
  projectExitAll: 'Gesamtes Projekt verlassen',
  projectExitChooseTitle: 'Was als Nächstes?',
  projectExitRestart: 'Diese Aufgabe neu starten',
  projectExitNext: 'Nächste Aufgabe',
  projectExitPrevious: 'Zurück zur vorherigen (Überstunden)',
  projectExitFinish: 'Projekt beenden',
  projectAbandoned: 'aufgegeben',
  projectOvertimeContinued: 'Überstunden',

  // Recovery
  projectRecoveryTitle: 'Unvollendetes Projekt gefunden',
  projectRecoveryDesc: 'Du hast ein unvollendetes Projekt. Fortsetzen?',
  projectRecoveryResume: 'Fortsetzen',
  projectRecoveryDiscard: 'Neu beginnen',

  // History
  projectHistory: 'Projekte',
  projectHistoryEstimated: 'Gesch.',
  projectHistoryActual: 'Tatsächl.',

  // Settings section headers
  sectionTimer: '⏱ TIMER',
  sectionAlerts: '🔔 ALARME',
  sectionAppearance: '🎨 DARSTELLUNG',
  sectionGeneral: '⚙ ALLGEMEIN',

  // Empty state
  emptyTodayHint: 'Noch keine Einträge heute',

  // Guide in settings
  settingsGuide: 'Benutzerhandbuch',

  // Encouragement banner
  encourageEmpty: [
    'Lass deine Wassermelone wachsen, lass deinen Fokus wachsen 🍉',
    'Bereit, deine erste Melone zu pflanzen? 🌱',
    'Dein Melonenfeld wartet 🍉',
  ],
  encourageFirst: [
    'Deine Wassermelone wächst 🌱',
    'Erste Melone gepflanzt, weiter so!',
    'Fokussiere dich und lass sie reifen 🍉',
  ],
  encourageSecond: [
    'Weiter so! 2 Melonen geerntet',
    'Zweite Melone fertig, super 👍',
    'Dein Melonenfeld wächst 🍉',
  ],
  encourageThird: [
    'Die heutige Melone schmeckt besonders süß! 🍉',
    '3 Melonen, was für eine Ernte!',
    'Dein Melonenfeld gedeiht 🌱',
  ],
  encourageMany: [
    '{n} Melonen geerntet — du bist unaufhaltsam!',
    '{n} Melonen, was für ein Tag! 🔥',
    '{n} Melonen, unaufhaltsame Ernte! 🍉',
  ],
  encourageBeatYesterday: (count, diff) => `${count} geschafft, ${diff} mehr als gestern 💪`,
  encourageTiedYesterday: (count) => `${count} geschafft, wie gestern`,
  streakShort: (days) => `🔥 ${days}-Tage-Serie`,
  streakMedium: (days) => `🔥 ${days}-Tage-Serie, eine Gewohnheit entsteht`,
  streakLong: (days) => `🔥 ${days}-Tage-Serie! Unglaublich!`,

  // Week trend chart
  weekTrend: 'Diese Woche',
  weekTotal: (time) => `Gesamt: ${time}`,

  // Long-press buttons
  holdToFinish: 'Gedrückt halten zum Beenden',
  holdToGiveUp: 'Gedrückt halten zum Aufgeben',

  // Auth
  authTitle: 'Anmelden',
  authEmailPlaceholder: 'E-Mail eingeben',
  authSendCode: 'Code senden',
  authSendFailed: 'Senden fehlgeschlagen, bitte erneut versuchen',
  authVerifyFailed: 'Ungültiger oder abgelaufener Code',
  authOr: 'oder',
  authGoogle: 'Weiter mit Google',
  authMicrosoft: 'Weiter mit Microsoft',
  authLoginToSync: 'Anmelden, um Daten zu synchronisieren',
  authLogout: 'Abmelden',

  // Profile editing
  profileEditName: 'Name bearbeiten',
  profileSaving: 'Speichern...',
  profileUploadAvatar: 'Avatar ändern',

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
  sliceHint: 'Wische, um die Melone zu schneiden 🔪',
  slicePerfect: '✨ Perfekter Schnitt!',
  sliceResult: '🍉 Schneide-Ergebnis',
  sliceGoldResult: '👑 Goldmelonen-Ergebnis',
  sliceSeedsObtained: (n) => `Geheimnisvolle Samen ×${n}`,
  slicePerfectBonus: '+1 Perfekt-Bonus',
  sliceRare: 'Selten',
  sliceCollect: 'Einsammeln',
  sliceContinue: '🔪 Nächste schneiden',
  sliceButton: '🔪 Schneiden',
  itemName: (id) => ({
    'starlight-fertilizer': '⚡ Sternenlicht-Dünger',
    'supernova-bottle': '☀️ Supernova-Flasche',
    'alien-flare': '🛸 Alien-Signalrakete',
    'thief-trap': '🪤 Diebfalle',
    'star-telescope': '🔮 Sternenteleskop',
    'moonlight-dew': '🌙 Mondlichttau',
    'circus-tent': '🎪 Melonen-Zirkuszelt',
    'gene-modifier': '🧬 Genmodifikator',
    'lullaby-record': '🎵 Melonen-Schlaflied',
  }[id] ?? id),
  itemFlavor: (id) => ({
    'starlight-fertilizer': 'Mysteriöser Dünger aus einer fernen Galaxie — riecht nach Sternenstaub',
    'supernova-bottle': 'Enthält die explosive Energie einer Mikro-Supernova',
    'alien-flare': 'Rufe "Hier gibt es Melonen!" ins All und hoffe auf freundliche Besucher',
    'thief-trap': 'Sieht aus wie eine normale Melone, ist aber ein Käfig',
    'star-telescope': 'Angeblich ein Relikt eines Alien-Observatoriums',
    'moonlight-dew': 'Geheimnisvolle Tautropfen, die nur bei Vollmond entstehen',
    'circus-tent': 'Von einem vorbeiziehenden Alien-Zirkus hinterlassen',
    'gene-modifier': 'Dr. Mutations Privatsammlung',
    'lullaby-record': 'Ein Alien-Schlaflied, das Melonen extra schnell wachsen lässt',
  }[id] ?? ''),
  shedSeedsTitle: '🌰 Geheimnisvolle Samen',
  shedSeedsCount: (n) => `×${n}`,
  shedGoFarm: 'Zur Farm',
  shedFarmComingSoon: 'Farm kommt bald',
  shedItemsTitle: '🎒 Gegenstände',
  shedNoItems: 'Noch keine Gegenstände — schneide Melonen!',
  shedSliceSection: '🔪 Schneiden',
  shedTotalSliced: 'Gesamt geschnitten',
  seedQualityLabel: (q) => ({ normal: 'Normal', epic: 'Episch', legendary: 'Legendär' }[q] ?? q),
  comboExpert: '🔪 Schneide-Experte!',
  comboGod: '⚡ Melonengott!',

  tabFocus: 'Fokus',
  tabWarehouse: 'Schuppen',
  tabFarm: 'Farm',
  farmComingSoon: 'Demnächst',
};

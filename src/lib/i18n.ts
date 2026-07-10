export type Lang = "fr" | "en";

export interface Strings {
  appName: string;
  version: string;
  historyBtn: string;
  langBtn: string;
  badge: string;
  heroTitle: string;
  modeReformulateTitle: string;
  modeReformulateDesc: string;
  modeReplyTitle: string;
  modeReplyDesc: string;
  chooseTone: string;
  chooseIntensity: string;
  inputLabelReformulate: string;
  inputLabelReply: string;
  inputPlaceholderReformulate: string;
  inputPlaceholderReply: string;
  outputLabel: string;
  charCount: string;
  submitBtn: string;
  submitBtnLoading: string;
  micStart: string;
  micStop: string;
  copyBtn: string;
  copiedBtn: string;
  historyTitle: string;
  historyEmpty: string;
  historyClear: string;
  historyClose: string;
  historyDeleteItem: string;
  errorEmptyText: string;
  errorGeneric: string;
  micUnsupported: string;
  resetBtn: string;
}

export const STRINGS: Record<Lang, Strings> = {
  fr: {
    appName: "Diplomatico",
    version: "v1.0",
    historyBtn: "Historique",
    langBtn: "EN",
    badge: "Nouveau",
    heroTitle: "Balance tes scuds, je fournis les silencieux.",
    modeReformulateTitle: "Reformuler",
    modeReformulateDesc: "J'ai un scud à envoyer",
    modeReplyTitle: "Répondre",
    modeReplyDesc: "J'ai eu un mail agaçant",
    chooseTone: "Choisis tes tonalités",
    chooseIntensity: "Intensité",
    inputLabelReformulate: "Ton message",
    inputLabelReply: "Le message que tu as reçu",
    inputPlaceholderReformulate: "Écris ou dicte ce que tu as vraiment envie de dire…",
    inputPlaceholderReply: "Colle ici le message agaçant que tu as reçu…",
    outputLabel: "Ma proposition",
    charCount: "caractères",
    submitBtn: "Civiliser",
    submitBtnLoading: "Civilisation en cours…",
    micStart: "Dicter",
    micStop: "Arrêter",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    historyTitle: "Historique",
    historyEmpty: "Rien pour l'instant. Ta première reformulation apparaîtra ici.",
    historyClear: "Vider tout",
    historyClose: "Fermer",
    historyDeleteItem: "Supprimer cet élément",
    errorEmptyText: "Écris ou dicte d'abord ce que tu veux reformuler.",
    errorGeneric: "Une erreur est survenue. Réessaie.",
    micUnsupported: "La dictée vocale n'est pas prise en charge par ce navigateur.",
    resetBtn: "Réinitialiser",
  },
  en: {
    appName: "Diplomatico",
    version: "v1.0",
    historyBtn: "History",
    langBtn: "FR",
    badge: "New",
    heroTitle: "Say what you think. Phrased to be heard.",
    modeReformulateTitle: "Rephrase",
    modeReformulateDesc: "I have something to say (raw mode) → acceptable version",
    modeReplyTitle: "Reply",
    modeReplyDesc: "I received an annoying message → composed reply",
    chooseTone: "Choose your tones",
    chooseIntensity: "Intensity",
    inputLabelReformulate: "What you really want to say",
    inputLabelReply: "The message you received",
    inputPlaceholderReformulate: "Type or dictate what you really want to say…",
    inputPlaceholderReply: "Paste the annoying message you received here…",
    outputLabel: "Civilized version",
    charCount: "characters",
    submitBtn: "Civilize",
    submitBtnLoading: "Civilizing…",
    micStart: "Dictate",
    micStop: "Stop",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    historyTitle: "History",
    historyEmpty: "Nothing yet. Your first rephrasing will show up here.",
    historyClear: "Clear all",
    historyClose: "Close",
    historyDeleteItem: "Delete this item",
    errorEmptyText: "Write or dictate what you want to rephrase first.",
    errorGeneric: "Something went wrong. Try again.",
    micUnsupported: "Voice dictation isn't supported by this browser.",
    resetBtn: "Reset",
  },
};

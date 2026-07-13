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
  modeCorrectTitle: string;
  chooseTone: string;
  chooseIntensity: string;
  inputLabelReformulate: string;
  inputLabelReply: string;
  inputLabelCorrect: string;
  inputPlaceholderReformulate: string;
  inputPlaceholderReply: string;
  inputPlaceholderCorrect: string;
  outputLabel: string;
  outputLabelCorrect: string;
  errorTooLong: string;
  submitBtn: string;
  submitBtnLoading: string;
  submitBtnCorrect: string;
  submitBtnLoadingCorrect: string;
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
  errorNoTone: string;
  errorNoAudience: string;
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
    modeReformulateTitle: "DÉGAINER",
    modeReformulateDesc: "J'ai un scud à envoyer",
    modeReplyTitle: "RIPOSTER",
    modeReplyDesc: "J'ai eu un mail agaçant",
    modeCorrectTitle: "CORRIGER",
    chooseTone: "Tonalité",
    chooseIntensity: "Intensité",
    inputLabelReformulate: "Ton message",
    inputLabelReply: "Le message que tu as reçu",
    inputLabelCorrect: "Texte à corriger",
    inputPlaceholderReformulate: "Écris ou dicte ce que tu as vraiment envie de dire…",
    inputPlaceholderReply: "Colle ici le message agaçant que tu as reçu…",
    inputPlaceholderCorrect: "Colle ou écris le texte que tu veux corriger…",
    outputLabel: "Ma proposition",
    outputLabelCorrect: "Texte corrigé",
    errorTooLong: "Ton message dépasse la limite de 4000 caractères.",
    submitBtn: "Civiliser",
    submitBtnLoading: "Lancement du scud…",
    submitBtnCorrect: "Corriger",
    submitBtnLoadingCorrect: "Correction en cours…",
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
    errorNoTone: "Choisis au moins une tonalité.",
    errorNoAudience: "Choisis un destinataire.",
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
    modeCorrectTitle: "Proofread",
    chooseTone: "Tone",
    chooseIntensity: "Intensity",
    inputLabelReformulate: "What you really want to say",
    inputLabelReply: "The message you received",
    inputLabelCorrect: "Text to correct",
    inputPlaceholderReformulate: "Type or dictate what you really want to say…",
    inputPlaceholderReply: "Paste the annoying message you received here…",
    inputPlaceholderCorrect: "Paste or write the text you want corrected…",
    outputLabel: "Civilized version",
    outputLabelCorrect: "Corrected text",
    errorTooLong: "Your message exceeds the 4000 character limit.",
    submitBtn: "Civilize",
    submitBtnLoading: "Civilizing…",
    submitBtnCorrect: "Correct",
    submitBtnLoadingCorrect: "Correcting…",
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
    errorNoTone: "Choose at least one tone.",
    errorNoAudience: "Choose a recipient.",
    errorGeneric: "Something went wrong. Try again.",
    micUnsupported: "Voice dictation isn't supported by this browser.",
    resetBtn: "Reset",
  },
};

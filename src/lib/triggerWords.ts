export interface TriggerWord {
  match: string;
  pattern: RegExp;
  reason: string;
}

export const TRIGGER_WORDS: TriggerWord[] = [
  {
    match: "nul",
    pattern: /\bnul(le?)?s?\b/i,
    reason: "Jugement de valeur direct : perçu comme une attaque personnelle plutôt qu'un retour sur le travail.",
  },
  {
    match: "incompétent",
    pattern: /\bincompétente?s?\b/i,
    reason: "Remet en cause les compétences de la personne, ce qui braque immédiatement et bloque le dialogue.",
  },
  {
    match: "votre faute",
    pattern: /\b(c'|c’)?est (ta|votre) faute\b/i,
    reason: "Accusation frontale qui pousse à la défense plutôt qu'à la recherche de solution.",
  },
  {
    match: "jamais",
    pattern: /\bjamais\b/i,
    reason: "Généralisation excessive qui exagère le reproche et invite à la contestation plutôt qu'à l'écoute.",
  },
  {
    match: "toujours",
    pattern: /\btoujours\b/i,
    reason: "Généralisation excessive qui enferme l'autre dans un défaut permanent.",
  },
  {
    match: "n'importe quoi",
    pattern: /\bn['’]importe quoi\b/i,
    reason: "Disqualifie totalement le travail ou le propos de l'autre sans nuance.",
  },
  {
    match: "ridicule",
    pattern: /\bridicules?\b/i,
    reason: "Tourne l'autre en dérision, ce qui blesse l'ego et ferme la discussion.",
  },
  {
    match: "scandaleux",
    pattern: /\bscandaleux(se)?\b/i,
    reason: "Dramatise excessivement la situation, ce qui peut sembler disproportionné.",
  },
  {
    match: "inadmissible",
    pattern: /\binadmissibles?\b/i,
    reason: "Ton d'ultimatum qui laisse peu de place à la discussion.",
  },
  {
    match: "je m'en fous",
    pattern: /\bje m['’]en (fous|fiche)\b/i,
    reason: "Signale un désengagement total, perçu comme un manque de respect envers l'interlocuteur.",
  },
];

export function detectTriggerWords(text: string): TriggerWord[] {
  return TRIGGER_WORDS.filter((word) => word.pattern.test(text));
}

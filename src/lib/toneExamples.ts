import type { ToneId } from "./tones";

export const EXAMPLE_SCUD =
  "Ton travail est nul, tu ne comprends jamais rien et c'est toujours la même chose avec toi.";

export const TONE_EXAMPLES_APPUYE: Record<ToneId, string> = {
  serieux:
    "Ce travail ne répond pas aux attentes. J'observe une récurrence de ces mêmes erreurs et je ne peux plus l'accepter en l'état.",
  drole:
    "Alors là, chapeau, on a battu notre propre record d'erreurs ! Bon, sérieusement, il faut qu'on revoie ça ensemble, et vite.",
  sarcastique:
    "Magnifique performance, comme d'habitude. À ce niveau de régularité dans les mêmes erreurs, on pourrait presque parler de talent.",
  chirurgical: "Ce travail est insuffisant. Les mêmes erreurs reviennent. À corriger immédiatement.",
  decale:
    "On dirait que ce dossier a pris un malin plaisir à rejouer les mêmes couacs en boucle. Il est temps de changer de disque.",
  journalistique:
    "Le livrable présente des anomalies répétées, identiques à celles déjà signalées à plusieurs reprises. Une correction rapide est requise.",
  passif_agressif_elegant:
    "C'est intéressant de retrouver, une fois de plus, exactement les mêmes erreurs que la dernière fois. Je suis certain que la prochaine version sera enfin différente.",
  trumpette:
    "Ce travail, très franchement, c'est un désastre. Le pire que j'ai vu. Les mêmes erreurs, encore et encore. Personne ne fait pire, croyez-moi. Il faut que ça change, et vite, believe me.",
  crise_contractuel:
    "Ce livrable présente des non-conformités récurrentes par rapport aux exigences convenues. Ces éléments doivent être corrigés sans délai, sans quoi les engagements associés ne pourront être considérés comme remplis.",
  cadrage_pmo:
    "Ce livrable comporte des écarts récurrents par rapport aux critères de qualité attendus, ce qui impacte directement le planning. Je souhaite un plan de correction précis dès aujourd'hui.",
};

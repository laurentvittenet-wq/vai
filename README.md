# Diplomatico

Diplomatico reformule le fond de ta pensée en une version plus acceptable, sans jamais trahir ton propos ni le dénaturer.

## Fonctionnalités

- **Deux modes** : *Reformuler* (ce que tu veux vraiment dire) et *Répondre* (réponse posée à un message agaçant reçu).
- **Six tonalités** : Sérieux, Drôle, Sarcastique, Chirurgical, Décalé, Journalistique.
- **Saisie texte ou vocale** (reconnaissance vocale du navigateur).
- **Historique local** des reformulations (stocké dans le navigateur).
- Interface FR/EN.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Configuration requise

La reformulation appelle l'API Anthropic (Claude) côté serveur. Copie `.env.example` en `.env.local` et renseigne ta clé :

```bash
cp .env.example .env.local
```

```
ANTHROPIC_API_KEY=sk-ant-...
```

Sans cette clé, l'application fonctionne mais renvoie une erreur explicite lors de la génération.

## Stack technique

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Appel direct à l'API Messages d'Anthropic depuis une Route Handler (`src/app/api/civilize/route.ts`)

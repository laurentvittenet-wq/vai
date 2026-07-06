"use client";

import { TONES, type ToneId } from "@/lib/tones";
import type { Lang } from "@/lib/i18n";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
  lang: Lang;
}

export function ToneSelector({ value, onChange, lang }: ToneSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {TONES.map((tone) => {
        const active = tone.id === value;
        return (
          <button
            key={tone.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={tone.description[lang]}
            onClick={() => onChange(tone.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
            }`}
          >
            {tone.label[lang]}
          </button>
        );
      })}
    </div>
  );
}

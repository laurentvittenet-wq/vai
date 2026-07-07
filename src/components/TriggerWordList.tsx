"use client";

import { detectTriggerWords } from "@/lib/triggerWords";

interface TriggerWordListProps {
  text: string;
}

export function TriggerWordList({ text }: TriggerWordListProps) {
  const matches = detectTriggerWords(text);
  if (matches.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {matches.map((word) => (
        <span
          key={word.match}
          title={word.reason}
          className="inline-flex cursor-help items-center gap-1 rounded-[var(--radius-chip)] border px-2 py-0.5 text-[10px]"
          style={{ borderColor: "var(--danger-soft)", background: "var(--danger-soft)", color: "var(--danger)" }}
        >
          ⚠ {word.match}
        </span>
      ))}
    </div>
  );
}

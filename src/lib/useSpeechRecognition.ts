"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | undefined {
  if (typeof window === "undefined") return undefined;
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

function subscribeNoop() {
  return () => {};
}

function getSupportSnapshot() {
  return Boolean(getSpeechRecognitionCtor());
}

function getSupportServerSnapshot() {
  return false;
}

export function useSpeechRecognition(lang: string) {
  const [isListening, setIsListening] = useState(false);
  const isSupported = useSyncExternalStore(
    subscribeNoop,
    getSupportSnapshot,
    getSupportServerSnapshot
  );
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const start = useCallback(
    (onResult: (transcript: string) => void) => {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) return;

      const recognition = new Ctor();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = Array.from({ length: event.results.length })
          .map((_, i) => event.results[i][0].transcript)
          .join(" ");
        onResult(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    },
    [lang]
  );

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, isSupported, start, stop };
}

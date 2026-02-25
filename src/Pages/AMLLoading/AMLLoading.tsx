// Pages/AMLLoading/AMLLoading.tsx
"use client";

import { useEffect, useState } from "react";
import "./AMLLoading.css";

const STEPS = [
  "Инициализация защищенного соединения...",
  "Сбор данных из блокчейн-узлов...",
  "Анализ истории транзакций по базам санкций...",
  "Проверка связи с миксерами и даркнет-площадками...",
  "Расчет индекса риска (Risk Score)...",
  "Формирование итогового отчета...",
];

const TOTAL_DURATION = 22000; // 22 секунди
const STEP_DURATION = TOTAL_DURATION / STEPS.length;

interface AMLLoadingProps {
  onComplete?: () => void;
}

export function AMLLoading({ onComplete }: AMLLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    // Прогрес-бар — оновлюємо кожні 100мс
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => onComplete?.(), 500);
      }
    }, 100);

    // Текст — міняємо кожен STEP_DURATION
    const stepInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setStepIndex((prev) => {
          const next = prev + 1;
          if (next >= STEPS.length) {
            clearInterval(stepInterval);
            return prev;
          }
          return next;
        });
        setFadeIn(true);
      }, 300);
    }, STEP_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  return (
    <div className="AMLLoading">
      {/* Фонові частинки */}
      {/* <div className="AMLLoading-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{ "--i": i } as any} />
        ))}
      </div> */}

      <div className="AMLLoading-content">
        {/* Іконка щита */}
        <div className="AMLLoading-shield">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 4L8 14v18c0 13.3 10.3 25.7 24 29 13.7-3.3 24-15.7 24-29V14L32 4z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="shield-path"
            />
            <path
              d="M22 32l7 7 13-13"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shield-check"
            />
          </svg>
          <div className="AMLLoading-shield-ring" />
          <div className="AMLLoading-shield-ring ring-2" />
        </div>

        <h2 className="AMLLoading-title">AML Проверка</h2>

        {/* Прогрес-бар */}
        <div className="AMLLoading-bar-wrapper">
          <div className="AMLLoading-bar-track">
            <div
              className="AMLLoading-bar-fill"
              style={{ width: `${progress}%` }}
            />
            {/* Блискуча крапля */}
            <div
              className="AMLLoading-bar-glow"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="AMLLoading-bar-percent">{Math.floor(progress)}%</div>
        </div>

        {/* Текст кроку */}
        <div className={`AMLLoading-step ${fadeIn ? "fade-in" : "fade-out"}`}>
          <span className="AMLLoading-step-dot" />
          {STEPS[stepIndex]}
        </div>

        {/* Лічильник кроків */}
        <div className="AMLLoading-counter">
          {stepIndex + 1} / {STEPS.length}
        </div>
      </div>
    </div>
  );
}

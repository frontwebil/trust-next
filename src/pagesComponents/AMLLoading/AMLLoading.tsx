"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AMLLoading.css";
import { RootState } from "@/Redux/store";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";

const STEPS = [
  "Инициализация защищенного соединения...",
  "Сбор данных из блокчейн-узлов...",
  "Анализ истории транзакций по базам санкций...",
  "Проверка связи с миксерами и даркнет-площадками...",
  "Расчет индекса риска (Risk Score)...",
  "Формирование итогового отчета...",
];

const TOTAL_DURATION = 22000;
const STEP_DURATION = TOTAL_DURATION / STEPS.length;

export function AMLLoading() {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((store: RootState) => store.main);

  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          dispatch(setCurrentStep(currentStep + 1));
        }, 2000);
      }
    }, 100);

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
  }, [dispatch, currentStep]);

  return (
    <div className="AMLLoading">
      <div className="AMLLoading-content">
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

        <div className="AMLLoading-bar-wrapper">
          <div className="AMLLoading-bar-track">
            <div
              className="AMLLoading-bar-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="AMLLoading-bar-glow"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="AMLLoading-bar-percent">{Math.floor(progress)}%</div>
        </div>

        <div className={`AMLLoading-step ${fadeIn ? "fade-in" : "fade-out"}`}>
          <span className="AMLLoading-step-dot" />
          {STEPS[stepIndex]}
        </div>

        <div className="AMLLoading-counter">
          {stepIndex + 1} / {STEPS.length}
        </div>
      </div>
    </div>
  );
}

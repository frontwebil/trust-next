"use client";

import { useDispatch, useSelector } from "react-redux";
import "./AMLResaults.css";
import { RootState } from "@/Redux/store";
import { setCurrentStep } from "@/Redux/Slice/MainSlice";
import { useEffect } from "react";

const getRiskLevel = (score: number) => {
  if (score <= 30) return { label: "Low Risk", color: "green" };
  if (score <= 65) return { label: "Medium Risk", color: "yellow" };
  return { label: "High Risk", color: "red" };
};

export function AMLResult({ onRepeat }: { onRepeat: () => void }) {
  const dispatch = useDispatch();

  const { walletAddress, currentStep } = useSelector(
    (store: RootState) => store.main,
  );

  if (!walletAddress) return null;

  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  const randomPercent = () => Math.floor(Math.random() * 85) + 1;

  const riskScore = randomPercent();
  const risk = getRiskLevel(riskScore);

  const exchangeLinks = randomPercent();
  const mixerLinks = randomPercent();
  const staking = Math.random() > 0.5;
  const walletAge = `${Math.floor(Math.random() * 3) + 1} года ${Math.floor(Math.random() * 11) + 1} мес.`;

  useEffect(() => {
    if (!walletAddress) {
      dispatch(setCurrentStep(currentStep - 2));
    }
  }, [walletAddress, currentStep, dispatch]);

  return (
    <div className="AMLResult">
      <div className="AMLResult-card">
        <div className="AMLResult-status">
          <span className="AMLResult-status-dot" />
          Проверка завершена успешно
        </div>

        <div className="AMLResult-address-block">
          <span className="AMLResult-label">Адрес кошелька</span>
          <span className="AMLResult-address">{shortAddress}</span>
        </div>

        <div className="AMLResult-score-block">
          <div className="AMLResult-score-top">
            <span className="AMLResult-label">Общий риск-скор</span>
            <span className={`AMLResult-risk-badge risk-${risk.color}`}>
              {risk.label}
            </span>
          </div>
          <div className="AMLResult-score-number">{riskScore}%</div>
          <div className="AMLResult-score-bar-track">
            <div
              className={`AMLResult-score-bar-fill fill-${risk.color}`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        <div className="AMLResult-details">
          <div className="AMLResult-details-title">Детализация</div>

          <div className="AMLResult-row">
            <span className="AMLResult-row-label">Связь с биржами</span>
            <div className="AMLResult-row-right">
              <div className="AMLResult-mini-bar-track">
                <div
                  className="AMLResult-mini-bar-fill fill-green"
                  style={{ width: `${exchangeLinks}%` }}
                />
              </div>
              <span className="AMLResult-row-value">{exchangeLinks}%</span>
            </div>
          </div>

          <div className="AMLResult-row">
            <span className="AMLResult-row-label">Связь с миксерами</span>
            <div className="AMLResult-row-right">
              <div className="AMLResult-mini-bar-track">
                <div
                  className={`AMLResult-mini-bar-fill fill-${mixerLinks > 50 ? "red" : "green"}`}
                  style={{ width: `${mixerLinks}%` }}
                />
              </div>
              <span className="AMLResult-row-value">{mixerLinks}%</span>
            </div>
          </div>

          <div className="AMLResult-row">
            <span className="AMLResult-row-label">Участие в стейкинге</span>
            <span
              className={`AMLResult-row-tag ${staking ? "tag-yes" : "tag-no"}`}
            >
              {staking ? "Да" : "Нет"}
            </span>
          </div>

          <div className="AMLResult-row">
            <span className="AMLResult-row-label">Возраст кошелька</span>
            <span className="AMLResult-row-value">{walletAge}</span>
          </div>
        </div>

        <button className="AMLResult-button second-color-bg" onClick={onRepeat}>
          Повторить проверку
        </button>
      </div>
    </div>
  );
}

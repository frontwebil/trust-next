/* eslint-disable react-hooks/purity */
// Pages/AMLResult/AMLResult.tsx
"use client";

import "./AMLResaults.css";

interface AMLResultProps {
  address: string;
  riskScore: number;
  onRepeat: () => void;
}

const getRiskLevel = (score: number) => {
  if (score <= 30) return { label: "Low Risk", color: "green" };
  if (score <= 65) return { label: "Medium Risk", color: "yellow" };
  return { label: "High Risk", color: "red" };
};

export function AMLResult({ address, riskScore, onRepeat }: AMLResultProps) {
  const risk = getRiskLevel(riskScore);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "0x00...0000";

  const exchangeLinks = Math.floor(Math.random() * 40) + 60; // 60–99%
  const mixerLinks = riskScore > 65 ? Math.floor(Math.random() * 30) + 10 : 0;
  const staking = Math.random() > 0.4;
  const walletAge = `${Math.floor(Math.random() * 3) + 1} года ${Math.floor(Math.random() * 11) + 1} мес.`;

  return (
    <div className="AMLResult">
      <div className="AMLResult-card">
        {/* Статус */}
        <div className="AMLResult-status">
          <span className="AMLResult-status-dot" />
          Проверка завершена успешно
        </div>

        {/* Адреса */}
        <div className="AMLResult-address-block">
          <span className="AMLResult-label">Адрес кошелька</span>
          <span className="AMLResult-address">{shortAddress}</span>
        </div>

        {/* Ризик скор */}
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

        {/* Деталізація */}
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
                  className={`AMLResult-mini-bar-fill fill-${mixerLinks > 0 ? "red" : "green"}`}
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

        {/* Кнопка */}
        <button className="AMLResult-button second-color-bg" onClick={onRepeat}>
          Повторить проверку
        </button>
      </div>
    </div>
  );
}

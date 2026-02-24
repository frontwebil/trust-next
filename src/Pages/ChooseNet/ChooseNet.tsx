import { useState } from "react";
import { Back } from "../../Components/Back";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import "./ChooseNet.css";

export function ChooseNet() {
  const isDark = usePrefersDark();
  const [choosedNet, setChoosedNet] = useState<null | string>(null);

  return (
    <section className="ChooseNet">
      <div className="ChooseNet-left ChooseNet-left-bg">
        <div className="ChooseNet-left-container">
          <img
            src={isDark ? "/logo.svg" : "/logo-white.svg"}
            alt=""
            className="ChooseNet-left-logo"
          />
          <Back />
          <h3 className="ChooseNet-left-title">Выберите сеть для проверки</h3>
          <img src="/save.svg" alt="" className="ChooseNet-left-save-logo" />
        </div>
      </div>
      <div className="ChooseNet-right">
        <div className="ChooseNet-right-title">Выберите из вариантов:</div>
        <div className="network-cards">
          <div
            className={`card ${choosedNet === "TRX" ? "active" : ""} ChooseNet-rightCard`}
            onClick={() => setChoosedNet("TRX")}
          >
            <img
              src="tron-trx-logo.svg"
              alt="TRON Logo"
              className="card-logo"
            />
            <span className="card-title">TRON (TRX)</span>
          </div>

          <div
            className={`card ${choosedNet === "ETH" ? "active" : ""} ChooseNet-rightCard`}
            onClick={() => setChoosedNet("ETH")}
          >
            <img
              src="ethereum-eth-logo.svg"
              alt="Ethereum Logo"
              className="card-logo"
            />
            <span className="card-title">Ethereum (ETH)</span>
          </div>
        </div>
        <button className={`ChooseNet__button second-color-bg`}>
          Продолжить
        </button>
      </div>
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import SignClient from "@walletconnect/sign-client";
import { Back } from "../../Components/Back";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import "./ChooseNet.css";

const PROJECT_ID = "YOUR_PROJECT_ID"; // з cloud.walletconnect.com

type Net = "TRX" | "ETH";

type AMLResult = {
  address: string;
  risk: "low" | "medium" | "high";
  score: number;
};

let signClient: SignClient | null = null;

export function ChooseNet() {
  const isDark = usePrefersDark();
  const [choosedNet, setChoosedNet] = useState<null | Net>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amlResult, setAmlResult] = useState<AMLResult | null>(null);

  // Ініціалізуємо SignClient один раз при монтуванні
  useEffect(() => {
    SignClient.init({
      projectId: PROJECT_ID,
      metadata: {
        name: "AML Checker",
        description: "AML wallet checker",
        url: window.location.origin,
        icons: [`${window.location.origin}/favicon.ico`],
      },
    }).then((client) => {
      signClient = client;
    });
  }, []);

  const connectAndCheck = async () => {
    if (!choosedNet) return;
    if (!signClient) {
      setError("WalletConnect ще не ініціалізований, спробуй ще раз");
      return;
    }

    setLoading(true);
    setError(null);
    setAmlResult(null);
    setWalletAddress("");

    try {
      // Налаштовуємо namespace залежно від вибраної мережі
      const requiredNamespaces: Record<
        string,
        { methods: string[]; chains: string[]; events: string[] }
      > =
        choosedNet === "ETH"
          ? {
              eip155: {
                methods: ["eth_accounts"],
                chains: ["eip155:1"],
                events: ["accountsChanged"],
              },
            }
          : {
              tron: {
                methods: ["tron_signMessage"],
                chains: ["tron:0x2b6653dc"],
                events: [],
              },
            };

      const { uri, approval } = await signClient.connect({
        requiredNamespaces,
      });

      if (uri) {
        // Deep link до Trust Wallet — відкривається автоматично на мобільному
        const deepLink = `trust://wc?uri=${encodeURIComponent(uri)}`;
        window.location.href = deepLink;
      }

      // Чекаємо поки юзер підтвердить в Trust Wallet
      const session = await approval();

      // Дістаємо адресу з сесії
      let address = "";
      if (choosedNet === "ETH") {
        const accounts = session.namespaces.eip155?.accounts;
        // Формат: "eip155:1:0xABC..."
        address = accounts?.[0]?.split(":")?.[2] ?? "";
      } else {
        const accounts = session.namespaces.tron?.accounts;
        // Формат: "tron:0x2b6653dc:TAddr..."
        address = accounts?.[0]?.split(":")?.[2] ?? "";
      }

      if (!address) throw new Error("Не вдалось отримати адресу");

      setWalletAddress(address);

      // AML перевірка
      const res = await fetch("/api/aml-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, chain: choosedNet }),
      });

      if (!res.ok) throw new Error("Помилка AML перевірки");

      const result = await res.json();
      setAmlResult(result);
    } catch (err: any) {
      setError(err.message ?? "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  const riskColor = {
    low: "#22c55e",
    medium: "#f59e0b",
    high: "#ef4444",
  };

  const riskLabel = {
    low: "Низький ризик ✅",
    medium: "Середній ризик ⚠️",
    high: "Високий ризик 🚨",
  };

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
            onClick={() => !loading && setChoosedNet("TRX")}
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
            onClick={() => !loading && setChoosedNet("ETH")}
          >
            <img
              src="ethereum-eth-logo.svg"
              alt="Ethereum Logo"
              className="card-logo"
            />
            <span className="card-title">Ethereum (ETH)</span>
          </div>
        </div>

        <button
          className="ChooseNet__button second-color-bg"
          onClick={connectAndCheck}
          disabled={!choosedNet || loading}
          style={{ opacity: !choosedNet || loading ? 0.5 : 1 }}
        >
          {loading ? "Підключення до Trust Wallet..." : "Продолжить"}
        </button>

        {/* Помилка */}
        {error && <div className="ChooseNet-error">❌ {error}</div>}

        {/* Результат */}
        {amlResult && (
          <div className="ChooseNet-result">
            <div className="ChooseNet-result-address">
              <span className="label">Адреса:</span>
              <span className="mono">
                {amlResult.address.slice(0, 6)}...{amlResult.address.slice(-4)}
              </span>
            </div>

            <div
              className="ChooseNet-result-risk"
              style={{ color: riskColor[amlResult.risk] }}
            >
              {riskLabel[amlResult.risk]}
            </div>

            <div className="ChooseNet-result-score">
              <div className="score-bar-bg">
                <div
                  className="score-bar-fill"
                  style={{
                    width: `${amlResult.score}%`,
                    background: riskColor[amlResult.risk],
                  }}
                />
              </div>
              <span>AML Score: {amlResult.score}/100</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

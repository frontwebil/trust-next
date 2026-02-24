import { useState, useEffect } from "react";
import { Back } from "../../Components/Back";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import { SignClient } from "@walletconnect/sign-client";
import "./ChooseNet.css";

export function ChooseNet() {
  const isDark = usePrefersDark();
  const [choosedNet, setChoosedNet] = useState<null | string>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Обробка callback після редіректу Trust Wallet
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wcUri = params.get("wc_uri");
    if (wcUri) {
      setLoading(true);
      (async () => {
        try {
          const signClient = await SignClient.init({
            projectId: "bdf3e4b5da9ce6a2561b8ae870822374",
          });

          const { approval } = await signClient.connect({ uri: wcUri });
          const session = await approval();
          const account = session.namespaces.eip155.accounts[0];
          const wallet = account.split(":")[2];

          setWalletAddress(wallet);
          setLoading(false);

          // Очищуємо URL
          window.history.replaceState({}, document.title, "/choose-net");
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      })();
    }
  }, []);

  const connectWallet = async () => {
    if (!choosedNet) {
      alert("Выберите сеть");
      return;
    }

    try {
      setLoading(true);

      const signClient = await SignClient.init({
        projectId: "bdf3e4b5da9ce6a2561b8ae870822374",
        metadata: {
          name: "AML Checker",
          description: "Wallet AML Check",
          url: window.location.origin,
          icons: ["https://yourdomain.com/logo.png"],
        },
      });

      const { uri } = await signClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign"],
            chains: ["eip155:1"], // Ethereum Mainnet
            events: ["accountsChanged", "chainChanged"],
          },
        },
      });

      if (uri) {
        const callbackUrl = `${window.location.origin}/choose-net?wc_uri=${encodeURIComponent(uri)}`;
        const deepLink = `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(callbackUrl)}`;
        window.location.href = deepLink;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
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

        {walletAddress && (
          <div className="mb-4 text-green-600 font-bold">
            Кошелек підключено: {walletAddress}
          </div>
        )}

        <button
          className={`ChooseNet__button second-color-bg`}
          onClick={connectWallet}
          disabled={loading || !choosedNet}
        >
          {loading ? "Підключення..." : "Продолжить"}
        </button>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center">
              <div className="loader mb-4"></div>
              <span className="font-semibold text-gray-700">
                Підключення...
              </span>
            </div>
          </div>
        )}

        <style>{`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #4ade80;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Back } from "../../Components/Back";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import "./ChooseNet.css";
import { SignClient } from "@walletconnect/sign-client";

export function ChooseNet() {
  const isDark = usePrefersDark();
  const [choosedNet, setChoosedNet] = useState<null | string>(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Обробка callback з Trust Wallet
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const wcUri = params.get("wc_uri");
    if (!wcUri) return;

    setLoading(true);
    (async () => {
      try {
        const signClient = await SignClient.init({
          projectId: "bdf3e4b5da9ce6a2561b8ae870822374",
        });

        const { approval } = await signClient.connect({ uri: wcUri });
        const session = await approval();

        let wallet = "";
        if (session.namespaces.eip155) {
          wallet = session.namespaces.eip155.accounts[0].split(":")[2];
        } else if (session.namespaces.tron) {
          wallet = session.namespaces.tron.accounts[0].split(":")[2];
        }

        setWalletAddress(wallet);
        setLoading(false);

        // Очищаємо URL
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    })();
  }, []);

  // Підключення до обраної мережі
  const connectWallet = async () => {
    if (!choosedNet) return alert("Выберите сеть");

    setLoading(true);
    try {
      const signClient = await SignClient.init({
        projectId: "bdf3e4b5da9ce6a2561b8ae870822374",
        metadata: {
          name: "AML Checker",
          description: "Wallet AML Check",
          url: window.location.origin,
          icons: ["https://yourdomain.com/logo.png"],
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let requiredNamespaces: any = {};
      let coinId = 60; // за замовчуванням ETH

      if (choosedNet === "ETH") {
        requiredNamespaces = {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign"],
            chains: ["eip155:1"],
            events: ["accountsChanged", "chainChanged"],
          },
        };
        coinId = 60;
      } else if (choosedNet === "TRX") {
        requiredNamespaces = {
          tron: {
            methods: ["tron_signTransaction", "tron_signMessage"],
            chains: ["tron:1"], // TRON mainnet
            events: ["accountsChanged"],
          },
        };
        coinId = 195;
      }

      const { uri } = await signClient.connect({ requiredNamespaces });

      if (uri) {
        const callbackUrl = `${window.location.origin}?wc_uri=${encodeURIComponent(uri)}`;
        const deepLink = `https://link.trustwallet.com/open_url?coin_id=${coinId}&url=${encodeURIComponent(callbackUrl)}`;
        window.location.href = deepLink;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className="ChooseNet">
      <div className="">{loading ? "Загрузка..." : walletAddress}</div>

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

        <button
          className="ChooseNet__button second-color-bg"
          onClick={connectWallet}
        >
          Продолжить
        </button>
      </div>
    </section>
  );
}

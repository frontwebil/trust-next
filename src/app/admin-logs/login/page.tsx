"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./style.css";

export default function AdminLogin() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      router.push("/admin-logs");
    } else {
      setError("ACCESS DENIED");
    }
  };

  return (
    <div className="admin-root">
      <div className="grid-bg" />
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div className="login-wrap">
        <div className="login-card">
          <h2 className="login-title">ADMIN LOGIN</h2>
          <p className="login-sub"></p>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-input"
              placeholder="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="login-btn">
              login
            </button>

            {error && <p className="login-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

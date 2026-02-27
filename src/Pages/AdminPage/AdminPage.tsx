"use client";
import Image from "next/image";
import "./AdminPage.css";
import { useState, useEffect } from "react";

type IpLog = {
  id: string | number;
  createdAt: string | Date;
  ip?: string;
  country?: string;
  region: string;
  city?: string;
};

type HashAddress = {
  id: string | number;
  createdAt: string | Date;
  hash?: string;
  netCrypto?: string;
};

type Props = {
  ipLogs: IpLog[];
  hashes: HashAddress[];
};

const formatDate = (d: string | Date) =>
  new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(d));

export default function AdminPage({ ipLogs, hashes }: Props) {
  const [tab, setTab] = useState<"logs" | "hashes">("logs");
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLogs = ipLogs.filter((l) =>
    search
      ? Object.values(l).some((v) =>
          String(v).toLowerCase().includes(search.toLowerCase()),
        )
      : true,
  );

  const filteredHashes = hashes.filter((h) =>
    search
      ? Object.values(h).some((v) =>
          String(v).toLowerCase().includes(search.toLowerCase()),
        )
      : true,
  );

  return (
    <>
      <div className="admin-root">
        <div className="grid-bg" />
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />

        <div className="admin-wrap">
          <div className="admin-header">
            {/* TOP */}
            <div className="header-top">
              <div className="brand">
                <div className="brand-icon">
                  <Image
                    src={"/favicon.png"}
                    width={24}
                    height={24}
                    alt="logo"
                  />
                </div>
                <div className="brand-text">
                  <h1>Admin Dashboard</h1>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">IP Logs</div>
                <div className="stat-value">{ipLogs.length}</div>
                <div className="stat-sub">total records</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Hash Addresses</div>
                <div className="stat-value">{hashes.length}</div>
                <div className="stat-sub">total records</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Latest Log</div>
                <div
                  className="stat-value"
                  style={{ fontSize: 16, marginTop: 6 }}
                >
                  {ipLogs[0] ? formatDate(ipLogs[0].createdAt) : "—"}
                </div>
                <div className="stat-sub">most recent entry</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Latest Hash</div>
                <div
                  className="stat-value"
                  style={{ fontSize: 16, marginTop: 6 }}
                >
                  {hashes[0] ? formatDate(hashes[0].createdAt) : "—"}
                </div>
                <div className="stat-sub">most recent entry</div>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="controls-row">
              <div className="tab-switcher">
                <button
                  className={`tab-btn ${tab === "logs" ? "active" : ""}`}
                  onClick={() => {
                    setTab("logs");
                    setSearch("");
                  }}
                >
                  <span className="tab-icon">🌐</span>
                  IP Logs
                  <span className="count-badge">{ipLogs.length}</span>
                </button>
                <button
                  className={`tab-btn ${tab === "hashes" ? "active" : ""}`}
                  onClick={() => {
                    setTab("hashes");
                    setSearch("");
                  }}
                >
                  <span className="tab-icon">🔑</span>
                  Hashes
                  <span className="count-badge">{hashes.length}</span>
                </button>
              </div>

              <div className="search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  className="search-input"
                  placeholder={`Search ${tab === "logs" ? "logs" : "hashes"}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          {tab === "logs" && (
            <div className="table-card">
              <div className="table-header-row">
                <span className="table-title">IP Geo Logs</span>
                <span className="table-count">
                  {filteredLogs.length} records
                </span>
              </div>
              {filteredLogs.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>No records found</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>IP</th>
                        <th>Country</th>
                        <th>Region</th>
                        <th>City</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log, i) => (
                        <tr
                          key={log.id}
                          style={{ animationDelay: `${i * 0.03}s` }}
                        >
                          <td className="cell-ip">{log.ip ?? "—"}</td>
                          <td>{log.country ?? "—"}</td>
                          <td>{log.region ?? "—"}</td>
                          <td>{log.city ?? "—"}</td>
                          <td className="cell-date">
                            {formatDate(log.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === "hashes" && (
            <div className="table-card">
              <div className="table-header-row">
                <span className="table-title">Hash Addresses</span>
                <span className="table-count">
                  {filteredHashes.length} records
                </span>
              </div>
              {filteredHashes.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>No records found</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Hash</th>
                        <th>Net / Crypto</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHashes.map((h, i) => (
                        <tr
                          key={h.id}
                          style={{ animationDelay: `${i * 0.03}s` }}
                        >
                          <td>
                            <div
                              className="cell-hash"
                              title={String(h.hash ?? "")}
                            >
                              {h.hash ?? "—"}
                            </div>
                          </td>
                          <td>
                            <span className="cell-badge">
                              {h.netCrypto ?? "—"}
                            </span>
                          </td>
                          <td className="cell-date">
                            {formatDate(h.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

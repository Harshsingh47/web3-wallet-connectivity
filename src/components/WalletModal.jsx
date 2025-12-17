import { useConnect, useAccount } from "wagmi";
import { useEffect } from "react";

export default function WalletModal({ onClose }) {
  const { connect, connectors, isPending, error } = useConnect();
  const { isConnected } = useAccount();

  // ✅ Auto-close modal after successful connection
  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Connect Wallet</h3>

        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            disabled={isPending}
            style={walletBtn}
          >
            {formatWalletName(connector.name)}
          </button>
        ))}

        {error && <p style={{ color: "red" }}>{error.message}</p>}

        <button onClick={onClose} style={closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

function formatWalletName(name) {
  if (name === "WalletConnect") {
    return "Trust / Binance / Mobile Wallets";
  }
  return name;
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  padding: 24,
  borderRadius: 10,
  minWidth: 320,
};

const walletBtn = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  cursor: "pointer",
};

const closeBtn = {
  marginTop: 10,
};

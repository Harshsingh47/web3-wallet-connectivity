import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import WalletModal from "./WalletModal";
import { useWalletInfo } from "../hooks/useWalletInfo";
import { useSepoliaGuard } from "../hooks/useSepoliaGuard";
import TokenBalance from "./TokenBalance";
import SendToken from "./SendToken";
import WalletCard from "./WalletCard";

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { walletName } = useWalletInfo();
  const { isSepolia, switchToSepolia, isSwitching } = useSepoliaGuard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("INFO"); // INFO | SEND

  /* ===============================
     1️⃣ WALLET NOT CONNECTED
  =============================== */
  if (!isConnected) {
    return (
      <WalletCard>
        <h4 className="text-center mb-4">
          Web3 Wallet
        </h4>

        <button
          className="btn btn-primary w-100"
          onClick={() => setIsModalOpen(true)}
        >
          Connect Wallet
        </button>

        {isModalOpen && (
          <WalletModal onClose={() => setIsModalOpen(false)} />
        )}
      </WalletCard>
    );
  }

  /* ===============================
     2️⃣ WRONG NETWORK
  =============================== */
  if (!isSepolia) {
    return (
      <WalletCard>
        <p className="text-danger text-center mb-3">
          Wrong Network (Switch to Sepolia)
        </p>

        <button
          className="btn btn-warning w-100 mb-2"
          onClick={switchToSepolia}
          disabled={isSwitching}
        >
          {isSwitching ? "Switching..." : "Switch Network"}
        </button>

        <button
          className="btn btn-outline-secondary w-100"
          onClick={disconnect}
        >
          Disconnect
        </button>
      </WalletCard>
    );
  }

  /* ===============================
     3️⃣ CONNECTED + SEPOLIA
  =============================== */
  return (
    <WalletCard>
      {view === "INFO" && (
        <>
          <h5 className="mb-3">Wallet Info</h5>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Wallet:</strong> {walletName}
            </li>
            <li className="list-group-item">
              <strong>Address:</strong>{" "}
              {address.slice(0, 6)}...{address.slice(-4)}
            </li>
            <li className="list-group-item text-success">
              <strong>Network:</strong> Sepolia
            </li>
          </ul>

          <div className="mb-3">
            <TokenBalance />
          </div>

          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => setView("SEND")}
          >
            Send Token
          </button>

          <button
            className="btn btn-outline-danger w-100"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      )}

      {view === "SEND" && (
        <>
          <button
            className="btn btn-link mb-3 px-0"
            onClick={() => setView("INFO")}
          >
            ← Back
          </button>

          <SendToken />

          <button
            className="btn btn-outline-danger w-100 mt-3"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      )}
    </WalletCard>
  );
}

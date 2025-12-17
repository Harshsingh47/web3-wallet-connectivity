import { useAccount } from "wagmi";

export function useWalletInfo() {
  const { connector } = useAccount();

  if (!connector) {
    return {
      walletName: null,
      walletType: null,
    };
  }

  switch (connector.id) {
    case "metaMask":
      return {
        walletName: "MetaMask",
        walletType: "METAMASK",
      };

    case "coinbaseWallet":
      return {
        walletName: "Coinbase Wallet",
        walletType: "COINBASE",
      };

    case "walletConnect":
      return {
        walletName: "WalletConnect",
        walletType: "WALLETCONNECT",
      };

    default:
      return {
        walletName: connector.name,
        walletType: "UNKNOWN",
      };
  }
}

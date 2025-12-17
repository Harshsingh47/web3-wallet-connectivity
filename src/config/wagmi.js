import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "Wallet Connect DApp",
    }),
    walletConnect({
      projectId: "b19c9ee09adfcdd6dcf1b701ea80d29c",
      showQrModal: true,
    }),
  ],
  transports: {
    [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/IAbHPV5JZZuVNx_ahR8ldXcSHBR_8uVk"),
  },
});

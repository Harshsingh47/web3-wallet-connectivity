import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

export function useSepoliaGuard() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();

  const isSepolia = chainId === sepolia.id;

  const switchToSepolia = async () => {
    try {
      await switchChainAsync({ chainId: sepolia.id });
    } catch (err) {
      // fallback for wallets where chain is not added
      await addSepoliaChain();
    }
  };

  const addSepoliaChain = async () => {
    if (!window.ethereum) return;

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xaa36a7", // 11155111
          chainName: "Sepolia",
          nativeCurrency: {
            name: "Sepolia ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://rpc.sepolia.org"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        },
      ],
    });

    // try switching again
    await switchChainAsync({ chainId: sepolia.id });
  };

  return {
    isConnected,
    isSepolia,
    switchToSepolia,
    isSwitching: isPending,
  };
}

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import abi from "../abi/TestToken.json";
import { TOKEN_ADDRESS, TOKEN_DECIMALS } from "../config/token";

export function useTokenBalance() {
  const { address, isConnected, chainId } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: TOKEN_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: 11155111, // 👈 FORCE SEPOLIA
    enabled: Boolean(isConnected && address),
  });

  return {
    balance: data ? formatUnits(data, TOKEN_DECIMALS) : "0",
    isLoading,
    error,
  };
}

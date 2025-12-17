import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, isAddress } from "viem";
import abi from "../abi/TestToken.json";
import { TOKEN_ADDRESS, TOKEN_DECIMALS } from "../config/token";

export function useSendToken() {
  const {
    writeContract,
    data: txHash,
    isPending,
    error,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash,
    });

  const sendToken = (to, amount) => {
    if (!isAddress(to)) {
      throw new Error("Invalid recipient address");
    }

    writeContract({
      address: TOKEN_ADDRESS,
      abi,
      functionName: "transfer",
      args: [
        to,
        parseUnits(amount, TOKEN_DECIMALS),
      ],
      chainId: 11155111, // Sepolia
    });
  };

  return {
    sendToken,
    isPending,
    isConfirming,
    isSuccess,
    txHash,
    error,
  };
}

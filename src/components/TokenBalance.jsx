import { useTokenBalance } from "../hooks/useTokenBalance";
import { TOKEN_SYMBOL } from "../config/token";

export default function TokenBalance() {
  const { balance, isLoading, error } = useTokenBalance();

  if (error) {
    console.error("Balance error:", error);
    return <p style={{ color: "red" }}>Failed to load token balance</p>;
  }

  if (isLoading) {
    return <p>Loading balance...</p>;
  }

  return (
    <p>
      Token Balance: <b>{balance} {TOKEN_SYMBOL}</b>
    </p>
  );
}

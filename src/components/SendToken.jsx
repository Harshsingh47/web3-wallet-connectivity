import { useState } from "react";
import { isAddress } from "viem";
import { useSendToken } from "../hooks/useSendToken";

export default function SendToken() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [inputError, setInputError] = useState("");

  const {
    sendToken,
    isPending,
    isConfirming,
    isSuccess,
    txHash,
    error,
  } = useSendToken();

  const handleSend = () => {
    if (!isAddress(to)) {
      setInputError("Invalid recipient address");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setInputError("Enter a valid amount");
      return;
    }

    setInputError("");
    sendToken(to, amount);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Send Token</h4>

      <input
        type="text"
        placeholder="Recipient address (0x...)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
      />

      <br /><br />

      <button
        onClick={handleSend}
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Token"}
      </button>

      {inputError && (
        <p style={{ color: "red" }}>{inputError}</p>
      )}

      {isConfirming && (
        <p>Confirming transaction...</p>
      )}

      {isSuccess && (
        <p style={{ color: "green" }}>
          ✅ Transaction successful!
          <br />
          Hash: {txHash}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          ❌ {error.shortMessage || error.message}
        </p>
      )}
    </div>
  );
}

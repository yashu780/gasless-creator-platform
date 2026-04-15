"use client";

import { useState } from "react";
import { buyContentGasless } from "../lib/buyContent";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleBuy = async () => {
    try {
      setStatus("Processing...");

      const receipt = await buyContentGasless(1);

      setStatus("Success: " + receipt.transactionHash);
    } catch (err) {
      console.error(err);
      setStatus("Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Premium Content</h1>
      <button onClick={handleBuy}>
        Unlock (Gasless 🔥)
      </button>
      <p>{status}</p>
    </div>
  );
}
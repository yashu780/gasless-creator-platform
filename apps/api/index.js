import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const relayer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = process.env.CONTRACT;
const ABI = [
  "function buyContent(uint contentId) payable"
];

app.post("/buy", async (req, res) => {
  try {
    const { contentId, value } = req.body;

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, relayer);

    const tx = await contract.buyContent(contentId, {
      value: ethers.parseEther(value)
    });

    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log("API running"));
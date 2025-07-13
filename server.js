const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");


const app = express();
app.use(cors());
app.use(bodyParser.json());


// 🚀 1. Receive message → Send to n8n POST webhook
app.post("/send", async (req, res) => {
 const { message } = req.body;


 try {
   await axios.post(
     "https://nitisha12.app.n8n.cloud/webhook/af6cd5c8-5bd3-4820-9660-e0ec648db9e3",
     { message }
   );


   res.json({ status: "Message sent", data: { message } });
 } catch (err) {
   console.error("❌ Failed to send to n8n:", err.message);
   console.error("Full error:", err.response?.data || err);
   res.status(500).json({ error: "n8n POST failed" });
 }
});


// 📤 2. Frontend will call this to fetch all messages
app.get("/all-messages", async (req, res) => {
 try {
   const response = await axios.get(
     "https://nitisha12.app.n8n.cloud/webhook/88c4581c-01e6-43f8-a1f0-a62cfc374e5d"
   );
   res.json({ messages: response.data });
 } catch (err) {
   console.error("❌ Failed to fetch messages:", err.message);
   res.status(500).json({ error: "n8n GET failed" });
 }
});


// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`🚀 Server running at http://localhost:${PORT}`);
});

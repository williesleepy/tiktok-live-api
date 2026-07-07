import express from "express";
import { TikTokLiveConnection } from "tiktok-live-connector";

const app = express();

app.get("/live/:username", async (req, res) => {
  const username = req.params.username.replace(/^@/, "");

  const connection = new TikTokLiveConnection(username, {
    processInitialData: false,
    fetchRoomInfoOnConnect: false,
  });

  try {
    const isLive = await connection.fetchIsLive();

    res.json({
      username,
      isLive,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
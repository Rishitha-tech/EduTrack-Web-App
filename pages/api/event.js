import clientPromise from "../../lib/mongo.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("edutrack");
    const events = db.collection("events");

    const { videoId, eventType, videoTime, sessionId } = req.body || {};
    if (!videoId || !eventType || videoTime === undefined) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await events.insertOne({
      videoId,
      eventType,
      videoTime: Number(videoTime),
      sessionId: sessionId || null,
      createdAt: new Date(),
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

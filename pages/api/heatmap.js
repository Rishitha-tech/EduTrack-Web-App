import clientPromise from "../../lib/mongo.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const client = await clientPromise;
    const db = client.db("edutrack");
    const events = db.collection("events");

    const { videoId, bin = "10" } = req.query;
    const binSize = parseInt(bin, 10) || 10;
    if (!videoId) return res.status(400).json({ error: "videoId required" });

    const cursor = events.find({ videoId });
    const buckets = {};
    for await (const e of cursor) {
      const b = Math.floor(Number(e.videoTime) / binSize) * binSize;
      buckets[b] = (buckets[b] || 0) + 1;
    }
    const data = Object.keys(buckets)
      .map(k => ({ t: Number(k), count: buckets[k] }))
      .sort((a, b) => a.t - b.t);

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}

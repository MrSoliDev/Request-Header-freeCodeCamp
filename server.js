import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.set("trust proxy", true);

// Root
app.get("/", (req, res) => {
  res.send(`
    <h1>Request Header Parser Microservice</h1>
    <p>Use <a href="/api/whoami">/api/whoami</a> to see your headers info.</p>
  `);
});

// API route
app.get("/api/whoami", (req, res) => {
  let ip = req.ip;
  if (ip && ip.startsWith("::ffff:")) ip = ip.substring(7);
  if (ip === "::1") ip = "127.0.0.1";

  res.json({
    ipaddress: ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));

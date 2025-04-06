const express = require("express");
const oauth1a = require("oauth-1.0a");
const crypto = require("crypto");
const qs = require("querystring");

const app = express();
const port = process.env.PORT || 3000;

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_SECRET,
} = process.env;

if (!CONSUMER_KEY || !CONSUMER_SECRET || !ACCESS_TOKEN || !ACCESS_SECRET) {
  console.error("❌ Fehlende Umgebungsvariablen. Bitte setze CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_SECRET");
  process.exit(1);
}

const getOAuthHeader = (url, method, bodyParams = {}) => {
  const oauth = oauth1a({
    consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto.createHmac("sha1", key).update(base_string).digest("base64");
    },
  });

  const request_data = {
    url,
    method,
    data: bodyParams,
  };

  const token = {
    key: ACCESS_TOKEN,
    secret: ACCESS_SECRET,
  };

  return oauth.toHeader(oauth.authorize(request_data, token));
};

app.get("/sign", (req, res) => {
  const { url, method, body } = req.query;
  if (!url || !method) {
    return res.status(400).json({ error: "Fehlender Parameter: url oder method" });
  }

  let bodyParams = {};
  if (body) {
    bodyParams = qs.parse(body);
  }

  const authHeader = getOAuthHeader(url, method, bodyParams);
  res.json(authHeader);
});

app.get("/", (req, res) => {
  res.send("✅ Twitter OAuth 1.0a Signatur-Service läuft mit Body-Unterstützung.");
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf Port ${port}`);
});

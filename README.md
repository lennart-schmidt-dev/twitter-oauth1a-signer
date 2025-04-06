# Twitter OAuth 1.0a Signer für Make

Kleiner Express-Webservice zur Erstellung gültiger Authorization-Header für die Twitter API (v1.1/v2) mit OAuth 1.0a.

## Endpunkt

`GET /sign?url=https://api.twitter.com/2/tweets&method=POST`

Antwort:
```json
{
  "Authorization": "OAuth ..."
}
```

## Umgebungsvariablen

- `CONSUMER_KEY`
- `CONSUMER_SECRET`
- `ACCESS_TOKEN`
- `ACCESS_SECRET`

## Deployment

Empfohlen: [Render.com](https://render.com)

# gender-classify-api

# HNG Stage 0 - Name Classification API

A simple backend service that integrates with the Genderize API to classify names and provide data insights.

## API Specification

**Endpoint:** `GET /api/classify?name=<name>`

### Example Request
`GET https://your-app-url.vercel.app/api/classify?name=peter`

### Example Response (200 OK)
```json
{
  "status": "success",
  "data": {
    "name": "peter",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 165452,
    "is_confident": true,
    "processed_at": "2026-04-16T21:45:00.000Z"
  }
}

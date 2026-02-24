# Armenian Anki API Documentation

Complete API reference for Armenian Anki backend endpoints.

## Base URL

```
https://yourdomain.com/api
```

For local development:
```
http://localhost:3000/api
```

## Authentication

All endpoints require valid NextAuth session. Include session cookie in requests (automatically handled by browsers).

To check authentication status:
```
GET /auth/session
```

## Endpoints

### Decks Management

#### List User's Decks

```
GET /decks
```

**Description**: Fetch all decks owned by authenticated user.

**Response** (200 OK):
```json
{
  "decks": [
    {
      "id": "deck_uuid_1",
      "title": "Armenian Beginner",
      "slug": "armenian-beginner",
      "description": null,
      "ownerId": "user_uuid",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z",
      "cardCount": 150,
      "masteredCount": 42,
      "dueTodayCount": 8
    }
  ]
}
```

**Error Responses**:
- 401: Not authenticated

---

#### Create New Deck

```
POST /decks
```

**Description**: Create empty deck for later population.

**Request Body**:
```json
{
  "title": "My English Vocab",
  "description": "Learning English words"
}
```

**Response** (201 Created):
```json
{
  "id": "deck_uuid_2",
  "title": "My English Vocab",
  "slug": "my-english-vocab",
  "description": "Learning English words",
  "ownerId": "user_uuid",
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

**Error Responses**:
- 400: Invalid input (missing required fields)
- 401: Not authenticated

---

### CSV Import/Export

#### Import CSV

```
POST /decks/import
Content-Type: multipart/form-data
```

**Description**: Import vocabulary from CSV file into new or existing deck.

**Form Parameters**:
- `file`: CSV file (required)
- `mode`: "new_deck" or "update_deck" (required)
  - `new_deck`: Create fresh deck with all cards from CSV
  - `update_deck`: Upsert cards into existing deck (preserve data)
- `deckTitle`: Name for new deck (required if mode=new_deck)
- `deckId`: ID of existing deck (required if mode=update_deck)

**CSV Format** (8 columns):
```
difficulty,Armenian Script,Translit.,English Meaning,Example Sentence + [Translation],Grammar (Root/Infinitive + Imperative),Cheat Phrase (Mnemonic),Topic/Tag
3,Մեծ,mets,Big,"Սա մեծ տուն է։ [This is a big house.]","Adjective. Root: մեծ (mets).",A *met*eorite is *big* in the sky.,Adjectives & Characteristics
```

**Response** (200 OK):
```json
{
  "success": true,
  "deckId": "deck_uuid_1",
  "demandedRecordsCount": 150,
  "rowsInserted": 145,
  "rowsUpdated": 5,
  "rowsSkipped": 0,
  "errors": []
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "errors": [
    {
      "rowNumber": 5,
      "message": "Invalid CSV format: missing 'Armenian Script' column"
    }
  ]
}
```

**Important Notes**:
- CSV must be UTF-8 encoded for Armenian text
- First row is always treated as headers
- Quotes around cells with commas/newlines: `"Text, with comma"`
- `difficulty` field is metadata only—user progress tracked separately
- Import is idempotent: re-importing same file with mode=update_deck doesn't duplicate

---

#### Export Deck as CSV

```
GET /decks/{deckId}/export
```

**Description**: Download deck as CSV file.

**Query Parameters**:
- `deckId`: Deck ID (in URL path)

**Response** (200 OK):
- Content-Type: text/csv
- Content-Disposition: attachment; filename="deck-title.csv"
- Body: CSV content matching import format

**Example**:
```bash
curl -O https://yourdomain.com/api/decks/deck_uuid_1/export
```

**Error Responses**:
- 401: Not authenticated
- 404: Deck not found or user doesn't own deck

---

### Study/Review

#### Get Next Card to Review

```
GET /study/next
```

**Description**: Fetch next card due for review with optional filters.

**Query Parameters**:
- `deckId`: Deck ID (required)
- `topic`: Filter by topic tag (optional)
- `reverse`: "true"/"false" to study English→Armenian (optional, default: false)

**Response** (200 OK):
```json
{
  "card": {
    "id": "card_uuid_123",
    "armenianText": "Մեծ",
    "transliteration": "mets",
    "englishMeaning": "Big",
    "exampleSentence": "Սա մեծ տուն է։",
    "exampleTranslation": "This is a big house.",
    "grammar": "Adjective. Root: մեծ (mets)",
    "cheatPhrase": "A *met*eorite is *big* in the sky.",
    "topic": "Adjectives & Characteristics",
    "cardStateId": "state_uuid_456"
  },
  "cardsRemainingToday": 7,
  "masteredCount": 42,
  "totalCards": 150
}
```

**Response** (204 No Content):
- No cards due for review (all caught up!)

**Error Responses**:
- 400: Missing required deckId parameter
- 401: Not authenticated
- 404: Deck not found or user doesn't own deck

---

#### Submit Review Grade

```
POST /study/review
```

**Description**: Submit grade for card and update FSRS scheduling.

**Request Body**:
```json
{
  "cardStateId": "state_uuid_456",
  "cardId": "card_uuid_123",
  "direction": "forward",
  "grade": 2,
  "responseTime": 15000
}
```

**Parameters**:
- `cardStateId`: User's card state ID (from next endpoint)
- `cardId`: Card ID
- `direction`: "forward" (Armenian→English) or "reverse" (English→Armenian)
- `grade`: 0-4 scale:
  - 0 = Again (incorrect)
  - 1 = Hard (correct, took effort)
  - 2 = Good (correct, confident)
  - 3 = Easy (perfect recall)
  - 4 = Perfect (perfect, no hesitation)
- `responseTime`: Response time in milliseconds (optional)

**Response** (200 OK):
```json
{
  "cardState": {
    "id": "state_uuid_456",
    "cardId": "card_uuid_123",
    "userId": "user_uuid",
    "easeFactor": 2.35,
    "interval": 7,
    "repetitions": 5,
    "lapses": 0,
    "nextDue": "2024-01-23T10:30:00Z",
    "masteredForward": true,
    "masteredReverse": false
  },
  "reviewLog": {
    "id": "log_uuid",
    "cardStateId": "state_uuid_456",
    "grade": 2,
    "direction": "forward",
    "responseTime": 15000,
    "reviewedAt": "2024-01-16T10:30:00Z"
  }
}
```

**Error Responses**:
- 400: Invalid grade (not 0-4) or missing parameters
- 401: Not authenticated
- 404: Card state not found

---

#### Get Study Stats

```
GET /study/stats
```

**Description**: Fetch learning statistics for user (optional endpoint, implement as needed).

**Response** (200 OK):
```json
{
  "totalCardsLearned": 245,
  "totalReviews": 1250,
  "reviewsToday": 42,
  "masteredCards": 120,
  "totalTime": 28800,
  "averageResponseTime": 18500,
  "decks": [
    {
      "deckId": "deck_uuid_1",
      "title": "Armenian Beginner",
      "cardsLearned": 120,
      "cardsDue": 8,
      "masteredCount": 42
    }
  ]
}
```

---

## Error Handling

All endpoints return JSON errors:

```json
{
  "error": "Error message describing what went wrong",
  "statusCode": 400
}
```

### Common Status Codes

- `200 OK`: Request successful
- `201 Created`: Resource created
- `204 No Content`: Request successful, no content to return
- `400 Bad Request`: Invalid input/parameters
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: Resource doesn't exist
- `500 Internal Server Error`: Server error (check logs)

---

## Rate Limiting

Currently no rate limiting. For production, implement:
- 60 requests/minute per user for Study endpoints
- 10 requests/minute per user for Import endpoint
- 20 requests/minute per user for all other endpoints

---

## Examples

### Import CSV via cURL

```bash
curl -X POST https://yourdomain.com/api/decks/import \
  -H "Content-Type: multipart/form-data" \
  -F "file=@vocab.csv" \
  -F "mode=new_deck" \
  -F "deckTitle=My Vocabulary" \
  --cookie "sessionid=your_session_cookie"
```

### Study flow in JavaScript

```javascript
// 1. Get next card
const response = await fetch('/api/study/next?deckId=deck_123');
const { card } = await response.json();

// 2. User studies and grades the card
const grade = 2; // "Good"
const direction = "forward";

// 3. Submit grade
const reviewResponse = await fetch('/api/study/review', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cardStateId: card.cardStateId,
    cardId: card.id,
    direction,
    grade,
    responseTime: 15000
  })
});

const { cardState } = await reviewResponse.json();
console.log(`Next due: ${cardState.nextDue}`);
```

### List decks in React

```javascript
import { useEffect, useState } from 'react';

export function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch('/api/decks')
      .then(r => r.json())
      .then(data => setDecks(data.decks));
  }, []);

  return (
    <ul>
      {decks.map(deck => (
        <li key={deck.id}>
          {deck.title} ({deck.cardCount} cards)
        </li>
      ))}
    </ul>
  );
}
```

---

## FSRS Scheduling Algorithm Reference

After submitting a review, card state is updated based on FSRS algorithm:

**Ease Factor** (determines interval growth rate):
- Range: 1.3 to 2.5
- Increases when grade ≥ 2
- Decreases when grade < 2 or lapse occurs
- Formula: `ef += 0.1 - (5 - grade) × 0.08`

**Interval** (days until next review):
- First review: 1 day
- Second review: 3 days
- Subsequent: `interval = interval × easeFactor`
- Lapse (forgot): reset to 1 day, increase lapses counter

**Mastery**:
- Forward mastered: grade ≥ 2 in forward direction + previous successful reviews
- Reverse mastered: grade ≥ 2 in reverse direction + previous successful reviews
- Card removed from queue only when both directions mastered

---

## Testing

### Postman Collection

Import this into Postman for testing:

```json
{
  "info": {
    "name": "Armenian Anki API",
    "description": "Test Armenian Anki endpoints"
  },
  "item": [
    {
      "name": "List Decks",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/decks"
      }
    },
    {
      "name": "Get Next Card",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/study/next?deckId={{deckId}}"
      }
    }
  ]
}
```

---

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Decks CRUD
- CSV import/export
- FSRS study endpoints

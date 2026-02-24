# Armenian Anki - Spaced Repetition Flashcard App

Learn Armenian vocabulary with a modern, AI-powered spaced repetition system using FSRS (Free Spaced Repetition Scheduler) algorithm. Track your personal progress with multi-user support and CSV-based deck management.

## Features

✨ **Spaced Repetition (FSRS)**: Scientifically-proven scheduling algorithm that adapts to your learning pace
🎯 **Bidirectional Learning**: Learn both Armenian → English and English → Armenian
📊 **Personal Progress Tracking**: Each user has independent progress with Prisma ORM persistence
📁 **CSV Import/Export**: Easily import vocabulary lists and export progress as CSV
🔐 **Google OAuth**: Simple authentication via Google
📱 **Responsive Design**: Works on desktop and mobile with Tailwind CSS
🏷️ **Topic/Tag Filtering**: Organize cards by topic and study specific categories

## Tech Stack

- **Frontend**: Next.js 16 (React 19) with TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (server actions & handlers)
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: NextAuth.js v4 with Google OAuth
- **Scheduling**: Custom FSRS algorithm implementation
- **CSV**: PapaParse for robust CSV handling

## Demo CSV Structure

The app expects CSV files with these 8 columns:

```
difficulty,Armenian Script,Translit.,English Meaning,Example Sentence + [Translation],Grammar (Root/Infinitive + Imperative),Cheat Phrase (Mnemonic),Topic/Tag
3,Մեծ,mets,Big,"Սա մեծ տուն է։ [This is a big house.]","Adjective. Root: մեծ (mets).",A *met*eorite is *big* in the sky.,Adjectives & Characteristics
```

Download sample CSV: [vocab-import-sample.csv](../public/samples/vocab-import-sample.csv)

## Quick Start

### Prerequisites

- Node.js 20+ with npm
- PostgreSQL 14+ running locally or remote
- Google OAuth credentials (Client ID & Secret)

### Environment Setup

1. **Clone & Install**
   ```bash
   cd /Users/7smd7/Desktop/armenian-anki
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your values:
   ```env
   # PostgreSQL connection
   DATABASE_URL="postgresql://user:password@localhost:5432/armenian_anki?schema=public"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-strong-random-secret-here"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-google-secret"
   ```

3. **Generate Prisma Client & Migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Prerequisites for Production

- PostgreSQL database (managed service recommended: Railway, Vercel Postgres, AWS RDS)
- Application hosting (Vercel, Railway, Render, or self-hosted VPS)
- Custom domain with HTTPS support

### Option 1: Vercel (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Set environment variables in Vercel project settings dashboard.

### Option 2: Self-Hosted (VPS/Docker)

This project is configured to run with a bundled PostgreSQL service via `docker-compose.yml` (no separate PostgreSQL install required).
The app defaults to port `3001` (not `3000`) for easier coexistence with other services.

1. **Build Docker Image**
   ```bash
   docker build -t armenian-anki .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Set up Nginx Reverse Proxy**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;

       location / {
            proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

4. **Database Migration**
   ```bash
   npx prisma migrate deploy
   ```

## Usage Guide

### 1. Authentication
- Click "Sign In with Google"
- Authorize app access to your Google account
- Redirected to deck management

### 2. Create/Import Decks

**Create Empty Deck**:
- Enter deck title
- Click "Create Deck"

**Import CSV**:
- Choose "Import Vocabulary" section
- Select import mode:
  - **New Deck**: Creates fresh deck with imported cards (data from CSV file is used)
  - **Update Deck**: Upserts cards into existing deck (missing rows stay unchanged)
- Select CSV file matching the format below
- Click "Import CSV"

**CSV Format Requirements**:
```
difficulty,Armenian Script,Translit.,English Meaning,Example Sentence + [Translation],Grammar (Root/Infinitive + Imperative),Cheat Phrase (Mnemonic),Topic/Tag
```

**Important**: 
- `difficulty` field is CSV metadata only—user progress is tracked separately per deck
- All columns except difficulty should have content
- Use quotes for cells containing commas or newlines: `"Text, with, commas"`

### 3. Study
- Click "Study" on a deck
- Card shows Armenian text on front
- Click to reveal English meaning + example + grammar on back
- Grade your recall (0-4):
  - 🔴 **Again** (0): Incorrect, need to relearn
  - 🟠 **Hard** (1): Remembered but took effort
  - 🟡 **Good** (2): Correct and confident
  - 🟢 **Easy** (3): Perfect recall
  - 💫 **Perfect** (4): Perfect without hesitation
- **Reverse Mode**: Toggle to study English → Armenian
- **Topic Filter**: Study only cards in a specific category

### 4. Progress Tracking
- Cards learned in both directions are "mastered"
- FSRS automatically schedules reviews based on difficulty
- Study only cards due for review (past due date)
- Personal progress isolated per user account

### 5. Export Deck
- Click manage/export icon on deck
- Download as CSV with your current cards
- Re-import updated version into new deck or overwrite existing one

## FSRS Algorithm Details

Cards have state tracked independently for each user:
- **Ease Factor**: (1.3–2.5) controls interval growth
- **Interval**: Days until next review
- **Repetitions**: Total correct reviews
- **Lapses**: Times forgotten (1+ incorrect grades)

Scoring:
- Grade 0 or 1 → interval reset to 1 day, ease decreases
- Grade 2+ → interval grows by ease factor, ease improves slightly
- After 2+ correct: intervals follow 1 → 3 → 7 → 21 → ...

### Mastery Gate
Card is "learned" when:
- ✅ Successfully recalled Armenian → English (grade ≥ 2)
- ✅ Successfully recalled English → Armenian (grade ≥ 2)

Both conditions must be met for card to stop appearing in study queue.

## API Reference

### Study Endpoints

**GET /api/study/next**
- Query params: `deckId`, `topic` (optional), `reverse` (true/false)
- Returns: next card to review + remaining count

**POST /api/study/review**
- Body: `{ cardStateId, cardId, direction, grade, responseTime }`
- Returns: updated card state with new due date

### Deck Endpoints

**GET /api/decks** - List user's decks
**POST /api/decks** - Create new deck
**GET /api/decks/[deckId]/export** - Download deck as CSV
**POST /api/decks/import** - Import CSV (new or update mode)

## Data Model

```
User
├── Deck (title, slug, source checksum)
│   ├── Card (Armenian, English, example, grammar, topic)
│   │   └── UserCardState (ease, interval, reps, due date, mastery flags)
│   │       └── ReviewLog (grade, direction, timestamps)
```

## Troubleshooting

### "DATABASE_URL is not set"
- Verify `.env` file exists in project root
- Check database connection string format: `postgresql://user:pass@host:5432/db`
- Test connection: `psql $DATABASE_URL -c "SELECT 1"`

### Google OAuth not working
- Confirm Client ID & Secret in `.env` match Google Cloud Console
- Verify NEXTAUTH_URL matches deployment domain (e.g., `https://yourdomain.com`)
- Check OAuth redirect URI in Google Console: `https://yourdomain.com/api/auth/callback/google`

### Build fails with Prisma errors
- Clear cache: `rm -rf node_modules/.prisma .next`
- Regenerate: `npx prisma generate`
- Run migrations: `npx prisma migrate deploy`

### CSV import shows errors
- Download sample CSV and compare formatting
- Ensure UTF-8 encoding for Armenian text
- Check no trailing/leading spaces in headers

## Development

### Run TypeScript check
```bash
npm run build
```

### Format code
```bash
npx prettier --write "src/**/*.ts{,x}"
```

### Reset database (dev only)
```bash
npx prisma migrate reset
```

### View database in UI
```bash
npx prisma studio
```

## Deployment Checklist

- [ ] PostgreSQL database provisioned
- [ ] Database migrations applied (`npx prisma migrate deploy`)
- [ ] Google OAuth credentials created in Cloud Console
- [ ] Environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_URL` (production domain)
  - [ ] `NEXTAUTH_SECRET` (strong random string, 32+ chars)
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
- [ ] HTTPS/SSL certificate installed (reverse proxy or managed)
- [ ] Google OAuth redirect URI added: `https://yourdomain.com/api/auth/callback/google`
- [ ] Test Google login flow end-to-end
- [ ] Backup strategy in place for PostgreSQL
- [ ] Monitor error logs and uptime

## Future Enhancements

- MongoDB support
- Shared public decks with configurable permissions
- Offline sync with PWA
- Spaced repetition statistics dashboard
- Audio pronunciation for cards
- Batch review (many cards at once)
- Deck categories/tags
- Progress badges and milestones
- API for third-party integrations

## License

MIT

## Support

For issues, feature requests, or questions:
- Check [troubleshooting](#troubleshooting) section
- Review sample CSV format in app
- Inspect browser console for client-side errors
- Check `.next/` build output for server errors

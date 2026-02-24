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

## Quick Start

### Prerequisites

- Node.js 20+ with npm
- PostgreSQL 14+ running
- Google OAuth credentials (Client ID & Secret)

### Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your database credentials and Google OAuth keys

# 3. Setup database
npx prisma migrate dev --name init

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for complete production setup instructions including:
- PostgreSQL configuration
- Google OAuth setup
- Nginx reverse proxy
- SSL certificates (Let's Encrypt)
- Systemd service management
- Database backups
- Monitoring and updates

Quick deployment with Docker:
```bash
docker-compose up -d
```

### Coolify (Build on Your Server)

This project is ready for Coolify using `docker-compose.yml`:
- App runs on port `3001` by default (not `3000`)
- PostgreSQL is included as a service (`postgres`) so no separate DB install is required

Set these environment variables in Coolify:
```env
APP_PORT=3001
DB_USER=anki_user
DB_PASSWORD=changeMe123!
DB_NAME=armenian_anki
DATABASE_URL=postgresql://anki_user:changeMe123!@postgres:5432/armenian_anki
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=production
```

Google OAuth callback URL:
`https://yourdomain.com/api/auth/callback/google`

## Usage Guide

### Import Vocabulary
1. Go to **Decks** page
2. Choose **New Deck** or **Update Existing**
3. Select CSV file (see format below)
4. Click **Import CSV**

### Study
1. Click **Study** on a deck
2. Reveal answer by clicking card
3. Grade your recall (0-4 scale)
4. Toggle **Reverse Mode** to practice English → Armenian
5. Filter by **Topic** to focus on specific categories

### Export
- Click deck options → **Export CSV**
- Save progress and re-import into new deck

## CSV Format

Download sample: [vocab-import-sample.csv](public/samples/vocab-import-sample.csv)

Header row required:
```
difficulty,Armenian Script,Translit.,English Meaning,Example Sentence + [Translation],Grammar (Root/Infinitive + Imperative),Cheat Phrase (Mnemonic),Topic/Tag
```

Example:
```
3,Մեծ,mets,Big,"Սա մեծ տուն է։ [This is a big house.]","Adjective. Root: մեծ (mets).",A *met*eorite is *big* in the sky.,Adjectives & Characteristics
```

## FSRS Algorithm

Cards are scheduled intelligently:
- **Ease Factor** (1.3–2.5): Controls how fast intervals grow
- **Interval**: Days until next review
- **Lapses**: Times card was forgotten (triggers recovery cycle)

Grading Scale:
- 🔴 **Again** (0): Incorrect
- 🟠 **Hard** (1): Correct but took effort
- 🟡 **Good** (2): Correct and confident
- 🟢 **Easy** (3): Perfect recall
- 💫 **Perfect** (4): Perfect without hesitation

Mastery: Card is "learned" when both Armenian→English and English→Armenian are recalled correctly (grade ≥ 2).

## API Routes

- `GET /api/decks` - List user's decks
- `POST /api/decks` - Create new deck
- `GET /api/decks/[deckId]/export` - Export deck as CSV
- `POST /api/decks/import` - Import CSV (new or update mode)
- `GET /api/study/next` - Get next card to study
- `POST /api/study/review` - Submit grade and update schedule

## Development

### Build production version
```bash
npm run build
```

### Type checking
```bash
npm run build
```

### Reset database (dev only)
```bash
npx prisma migrate reset
```

### View database UI
```bash
npx prisma studio
```

## Database Schema

- **User**: Google OAuth accounts
- **Deck**: User's vocabulary collections
- **Card**: Individual vocabulary items (Armenian/English pairs)
- **UserCardState**: Per-user progress (ease factor, due date, mastery flags)
- **ReviewLog**: Immutable event log of all reviews
- **ImportJob**: Track CSV imports with checksums

## Troubleshooting

### Database connection error
```bash
# Test connection
PGPASSWORD='your_password' psql -h localhost -U anki_user -d armenian_anki -c "SELECT 1;"
```

### Google login fails
- Verify `NEXTAUTH_URL` in `.env` matches your domain
- Check redirect URI in Google Cloud Console: `https://yourdomain.com/api/auth/callback/google`

### CSV import errors
- Download sample CSV and compare format
- Ensure UTF-8 encoding: `file -i YourFile.csv`
- No trailing spaces in headers

See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md#troubleshooting) for more troubleshooting.

## Future Enhancements

- Shared public decks
- PWA offline sync
- Statistics dashboard
- Audio pronunciation
- Batch review mode
- Progress badges

## License

MIT

## Support

- Full deployment instructions: [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
- API reference: [API_REFERENCE.md](docs/API_REFERENCE.md)
- API route source: `src/app/api/`
- Schema reference: `prisma/schema.prisma`

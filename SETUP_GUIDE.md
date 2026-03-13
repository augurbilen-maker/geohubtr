# B2B Marketplace - Complete Setup Guide

## Project Overview

This is a production-ready White-Label B2B Marketplace Engine built with:
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **PostgreSQL** database
- **Prisma ORM** for database management
- **NextAuth.js v5** for authentication
- **Tailwind CSS** + **shadcn/ui** for beautiful UI
- **AWS S3** integration for file uploads

## File Structure

```
b2b-marketplace/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Auth group layout
│   │   │   ├── login/page.tsx         # Login page
│   │   │   └── register/page.tsx      # Registration page
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── register/          # User registration endpoint
│   │   │       └── [...nextauth]/     # NextAuth handlers
│   │   ├── dashboard/page.tsx         # Protected dashboard
│   │   ├── layout.tsx                 # Root layout with fonts
│   │   ├── page.tsx                   # Beautiful homepage
│   │   └── globals.css                # Global styles & theme
│   ├── components/
│   │   └── ui/                        # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── separator.tsx
│   ├── lib/
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── prisma.ts                  # Prisma singleton
│   │   └── utils.ts                   # Utility functions
│   ├── types/
│   │   └── next-auth.d.ts             # TypeScript types
│   └── middleware.ts                  # Route protection
├── prisma/
│   ├── schema.prisma                  # Database schema
│   └── seed.ts                        # Seed data
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── tailwind.config.ts                 # Tailwind config
├── postcss.config.js                  # PostCSS config
├── next.config.js                     # Next.js config
├── .env.local                         # Environment variables
├── .eslintrc.json                     # ESLint config
├── .gitignore                         # Git ignore
└── README.md                          # Documentation
```

## Database Schema

### Models

1. **User** - Authentication & user profiles
   - Supports multiple roles: ADMIN, COMPANY_OWNER, INDIVIDUAL
   - Email verification and password hashing with bcryptjs
   - Linked to accounts (OAuth) and sessions (JWT)

2. **Company** - Business profiles
   - Ownership model with nullable ownerId
   - Subscription tiers: FREE, PRO, PREMIUM
   - Claim requests for company ownership verification
   - Integration with listings, projects, and jobs

3. **Category** - Product/service categories
   - Hierarchical structure (parent-child relationships)
   - Type classification: EQUIPMENT, SERVICE, SOFTWARE
   - JSON schema for dynamic custom fields per category
   - Example: Laser Scanners category with Range, Accuracy, Brand fields

4. **Listing** - Products/services for sale or rent
   - Types: SALE_NEW, SALE_USED, RENT, SERVICE
   - Dynamic attributes stored as JSON (based on category schema)
   - Price in any currency (defaults to USD)
   - View and click tracking
   - Multiple image storage (URLs array)

5. **Project** - Company portfolio projects
   - Images and technologies stored as JSON
   - Completion date tracking

6. **Job** - Job postings
   - Types: FULL_TIME, PART_TIME, CONTRACT, REMOTE
   - Status: ACTIVE, CLOSED
   - Optional expiration date

7. **KnowledgeBase** - Articles/tutorials
   - Author and optional sponsor relationships
   - Publish workflow: DRAFT → PUBLISHED
   - Sponsorship support for monetization

8. **ClaimRequest** - Company ownership claims
   - Workflow: PENDING → APPROVED/REJECTED
   - Reviewer tracking
   - Message/notes field

## Installation Steps

### 1. Prerequisites

```bash
# Verify Node.js version (18+)
node --version

# Install PostgreSQL (if not already installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from https://www.postgresql.org/download/windows/
```

### 2. Initialize Database

```bash
# Start PostgreSQL service
# macOS: brew services start postgresql
# Ubuntu: sudo systemctl start postgresql

# Create database
createdb b2b_marketplace

# Or using psql:
psql postgres
CREATE DATABASE b2b_marketplace;
\q
```

### 3. Configure Environment

Update `.env.local` with your database URL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/b2b_marketplace"
AUTH_SECRET="generate-a-secure-32-char-minimum-string"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

This creates the Prisma client and types from schema.prisma.

### 5. Push Schema to Database

```bash
npm run prisma:push
```

This syncs the Prisma schema with PostgreSQL and creates all tables.

### 6. Seed Sample Data

```bash
npm run prisma:seed
```

This runs `prisma/seed.ts` which creates:
- Admin user (admin@b2bconnect.com / Admin123!)
- 2 categories: Laser Scanners, Survey Software
- 5 sample companies
- 5 sample listings with dynamic attributes

### 7. Install Dependencies

```bash
npm install
```

### 8. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Key Features

### Authentication Flow

1. **User Registration** (`/auth/register`)
   - Creates new user with hashed password
   - Stores in users table
   - Redirects to login

2. **User Login** (`/auth/login`)
   - Credentials provider with bcryptjs validation
   - JWT session token generation
   - Stores session in database

3. **Protected Routes**
   - Middleware checks authentication
   - `/dashboard` requires login
   - `/admin` requires ADMIN role
   - Auth routes redirect if already logged in

### Dynamic Listings

Categories define custom field schemas as JSON:

```json
[
  {
    "name": "Range",
    "type": "number",
    "unit": "m",
    "min": 0,
    "max": 1000
  },
  {
    "name": "Brand",
    "type": "select",
    "options": ["Leica", "Trimble", "FARO", "Topcon"]
  }
]
```

Listings store matching attributes in `dynamicAttributes` JSON field.

### Role-Based Access Control

```typescript
// Admin only
if (user.role !== "ADMIN") redirect("/")

// Company owners
if (user.role !== "COMPANY_OWNER") redirect("/")

// Individual users
if (user.role !== "INDIVIDUAL") redirect("/")
```

## Customization Guide

### Adding UI Components

1. Create new component in `src/components/ui/`
2. Export from component file
3. Use in pages/routes

Example:
```tsx
import { Button } from "@/components/ui/button"
```

### Adding Database Models

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:push`
3. Update types in TypeScript files
4. Re-run `npm run prisma:generate`

### Changing Theme Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 216 100% 50%; /* Change from #0055FF to your color */
  --primary-foreground: 0 0% 100%;
}
```

### Adding New Routes

1. Create folder in `src/app/`
2. Add `page.tsx` or `route.ts`
3. Middleware automatically protects admin/dashboard routes

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (signin, callback, etc)

### Ready to Extend

- `/api/listings` - List products/services
- `/api/companies` - Manage company profiles
- `/api/jobs` - Job board API
- `/api/admin` - Admin management endpoints

## Environment Variables Reference

```env
# Database Connection
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth Security
AUTH_SECRET="minimum-32-character-random-string-change-in-production"
NEXTAUTH_URL="http://localhost:3000" # or your production URL

# Site Configuration
NEXT_PUBLIC_SITE_NAME="B2B Connect"
NEXT_PUBLIC_PRIMARY_COLOR="#0055FF"
NEXT_PUBLIC_SITE_DESCRIPTION="The leading B2B marketplace"

# Feature Flags
ENABLE_JOBS=true
ENABLE_RENTALS=true

# AWS S3 (Optional, for file uploads)
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
```

## Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Check code quality

npm run prisma:generate  # Generate Prisma types
npm run prisma:push      # Sync schema with DB
npm run prisma:seed      # Run seed script
npm run prisma:studio    # Open Prisma Studio UI
```

## Database Management

### View Data in Prisma Studio

```bash
npm run prisma:studio
```

Opens interactive UI at http://localhost:5555 to browse/edit data.

### Reset Database (Development Only)

```bash
# Create new migration
npm run prisma:push

# OR manually:
dropdb b2b_marketplace
createdb b2b_marketplace
npm run prisma:push
npm run prisma:seed
```

## Deployment Checklist

- [ ] Update `AUTH_SECRET` with secure random string
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Configure PostgreSQL database on your host
- [ ] Set up AWS S3 bucket (optional)
- [ ] Update email configuration in `lib/auth.ts`
- [ ] Run `npm run build` locally to verify
- [ ] Test authentication flow in production
- [ ] Set up database backups
- [ ] Configure CORS if needed
- [ ] Add custom domain SSL certificate

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

Solution: Start PostgreSQL service
```bash
# macOS
brew services start postgresql

# Ubuntu
sudo systemctl start postgresql
```

### Prisma Client Not Generated

```bash
npm run prisma:generate
```

### Port Already in Use

```bash
# Change port
npm run dev -- -p 3001
```

### Authentication Not Working

1. Check `.env.local` has valid DATABASE_URL
2. Verify user exists in database
3. Check seed ran successfully: `npm run prisma:seed`
4. Clear browser cookies and restart dev server

## Next Steps

1. **Customize Design**: Update colors, fonts, and branding in `globals.css`
2. **Add Pages**: Create new routes in `src/app/`
3. **Extend API**: Add endpoints in `src/app/api/`
4. **Connect S3**: Configure AWS credentials for file uploads
5. **Deploy**: Push to Vercel, Railway, or your hosting platform
6. **Add Features**: Implement search, filtering, payments, messaging, etc.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Ready to start building your B2B marketplace? Run `npm install && npm run dev`!**

# B2B Marketplace Engine

A complete, production-ready White-Label B2B Marketplace built with Next.js 14+, TypeScript, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Secure NextAuth.js v5 with role-based access control (Admin, Company Owner, Individual)
- **Multi-tier Marketplace**: Support for equipment sales, rentals, services, and software
- **Dynamic Listings**: Custom fields per category via JSON schema
- **Company Directory**: Browse and claim company profiles
- **Job Board**: Post and manage job listings
- **Knowledge Base**: Publish articles and tutorials with sponsorship support
- **Admin Dashboard**: Manage users, companies, listings, and claim requests
- **AWS S3 Integration**: Image uploads and file management
- **Responsive Design**: Mobile-first UI built with Tailwind CSS and shadcn/ui

## Tech Stack

- **Frontend**: Next.js 14+, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with JWT sessions
- **Cloud**: AWS S3 for file storage
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd /sessions/focused-nice-lamport/mnt/B2B/b2b-marketplace
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy and update .env.local with your database URL and other secrets
cp .env.local .env.local
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Push schema to database:
```bash
npm run prisma:push
```

6. Seed the database with sample data:
```bash
npm run prisma:seed
```

7. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Demo Credentials

- **Admin User**
  - Email: `admin@b2bconnect.com`
  - Password: `Admin123!`

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── api/              # API endpoints
│   ├── dashboard/        # Protected dashboard
│   ├── page.tsx          # Home page
│   └── layout.tsx        # Root layout
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client singleton
│   └── utils.ts          # Utility functions
├── types/
│   └── next-auth.d.ts    # TypeScript augmentation for NextAuth
├── middleware.ts         # Route protection middleware
└── globals.css           # Global styles
prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Seed script
```

## Database Schema

### Core Models
- **User**: Authentication and profile management
- **Company**: Business profiles with ownership and subscription tiers
- **Category**: Hierarchical product/service categories with custom field schemas
- **Listing**: Products/services for sale or rent with dynamic attributes
- **Project**: Company portfolio projects
- **Job**: Job postings by companies
- **KnowledgeBase**: Articles and tutorials
- **ClaimRequest**: Company ownership claims

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:push      # Sync schema with database
npm run prisma:seed      # Run seed script
npm run prisma:studio    # Open Prisma Studio
```

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/b2b_marketplace"

# NextAuth
AUTH_SECRET="your-32-char-minimum-secret"
NEXTAUTH_URL="http://localhost:3000"

# Site Config
NEXT_PUBLIC_SITE_NAME="B2B Connect"
NEXT_PUBLIC_PRIMARY_COLOR="#0055FF"
NEXT_PUBLIC_SITE_DESCRIPTION="The leading B2B marketplace"

# Features
ENABLE_JOBS=true
ENABLE_RENTALS=true

# AWS S3
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket"
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

The project is fully compatible with any Node.js hosting platform. Ensure:
1. Node.js 18+ is installed
2. PostgreSQL database is configured
3. Environment variables are set
4. Run `npm run build` and `npm start`

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth handlers (login, logout, callback)

## Customization

### Theming
Update color variables in `/src/app/globals.css` to match your brand. The primary color defaults to `#0055FF` (blue).

### Categories
Seed additional categories in `prisma/seed.ts` with custom field schemas for your specific business needs.

### Components
All UI components use shadcn/ui. Customize them in `/src/components/ui/`.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT - This is a white-label template available for customization.

## Support

For issues and feature requests, please check the project documentation or contact support.

---

Built with Next.js 14+ and modern web technologies. Ready for production deployment.

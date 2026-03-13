# B2B Marketplace Pages - Quick Reference

## Summary
Created 4 production-ready pages for a Next.js 14 B2B marketplace with Tailwind CSS styling.

## Files Created

| File | Type | Size | Purpose |
|------|------|------|---------|
| `src/app/directory/page.tsx` | Server Component | 14KB | Company directory/search page with filters |
| `src/app/companies/[slug]/page.tsx` | Server Component | 11KB | Company detail page with listings & projects |
| `src/app/companies/[slug]/claim/page.tsx` | Client Component | 5.8KB | Company profile claiming form |
| `src/app/api/companies/[slug]/claim/route.ts` | API Route | 2.2KB | Backend for company claiming with auto-approval |

## Routes

### Frontend Routes
```
GET  /directory              - Company search & browse
GET  /companies/[slug]       - Company profile
GET  /companies/[slug]/claim - Claim company form
```

### API Routes
```
POST /api/companies/[slug]/claim - Submit company claim
```

## Key Features by Page

### Directory Page (`/directory`)
- Full-text search across company names/descriptions
- Dynamic JSONB-based category filters
- Subscription tier filter (PREMIUM, PRO, FREE)
- Pagination (12 per page)
- Responsive grid (1-3 columns)
- Featured company badges
- Verification indicators

### Company Detail (`/companies/[slug]`)
- Company header with logo/avatar
- Full contact information
- Verification & subscription tier badges
- Active listings preview (up to 12)
- Company projects showcase (up to 6)
- Claim button for unclaimed companies
- Unclaimed company warning banner
- Empty state handling
- SEO metadata generation

### Claim Form (`/companies/[slug]/claim`)
- Optional claim message textarea
- Form validation & loading states
- Success confirmation screen
- Error handling
- Responsive centered layout
- Info sections explaining approval process

### Claim API (`/api/companies/[slug]/claim`)
- Authentication required
- Domain-based auto-approval
  - Extracts email domain from session
  - Extracts company domain from website
  - Auto-approves on match
- Manual review queue for non-matching domains
- Duplicate claim prevention
- Error responses: 401, 404, 400

## UI Components Required

From `@/components/ui`:
- `input` - Input fields
- `button` - Buttons with variants
- `badge` - Tier/type badges
- `card` - CardContent, CardHeader, CardTitle
- `label` - Form labels
- `separator` - Dividers

From `@/components/layout`:
- `header` - Top navigation (accepts session prop)
- `footer` - Bottom footer

From `lucide-react`:
- Search, Filter, CheckCircle2, Building2, ExternalLink
- Globe, Mail, Phone, MapPin, Star, ArrowRight
- ShieldCheck, Loader2

## Database Requirements

Models needed:
- `Company` with: slug, name, description, website, email, phone, city, country, logoUrl, subscriptionTier, isVerified, isClaimed, ownerId, promotedUntil, viewCount, createdAt
- `Listing` with: title, description, price, listingType, status, isPromoted, companyId, categoryId, createdAt
- `Project` with: title, description, completedAt, companyId
- `Category` with: slug, name, customFieldsSchema (JSON)
- `ClaimRequest` with: userId, companyId, status, message, reviewedAt, createdAt

## Authentication

Uses NextAuth.js via `@/lib/auth`:
- `auth()` returns session with user.id, user.role, user.email
- Admin role for users with role === "ADMIN"
- Owner check: session.user.id === company.ownerId

## Styling

### Design System
- Minimal, clean design (Stripe/Vercel inspired)
- Tailwind CSS utility classes
- Responsive breakpoints: sm, lg, xl
- Color palette:
  - Primary (blue) - main CTA
  - Amber - premium tier, featured items
  - Green - success, verified
  - Blue - info, pro tier
  - Gray/Slate - text, backgrounds
  - White - primary background

### Key Classes
- Container widths: max-w-7xl, max-w-5xl, max-w-2xl
- Hover states with transitions
- Focus states for accessibility
- Responsive grids and flex layouts

## Performance Notes

1. **Directory page**: 12 companies per page, optimized queries
2. **Company page**: Listings limited to 12, projects to 6 (preview)
3. **View count**: Fire-and-forget increment (non-blocking)
4. **Claim API**: Transaction-based for atomicity

## Error Handling

All error cases handled:
- ✓ Unauthorized access
- ✓ Not found (company/company claim)
- ✓ Already claimed companies
- ✓ Duplicate pending claims
- ✓ Invalid form submission
- ✓ Network errors with fallback

## Testing Checklist

- [ ] Directory search filters work
- [ ] Category dynamic filters render correctly
- [ ] Pagination navigation works
- [ ] Company detail page loads
- [ ] Claim form submits successfully
- [ ] Domain auto-approval works (test with matching domain)
- [ ] Manual review path works (test with different domain)
- [ ] Unclaimed company banner shows correctly
- [ ] Contact links open correctly (mailto, https)
- [ ] Responsive design on mobile/tablet
- [ ] Empty states display properly

## Deployment Notes

- All components use Next.js 14+ app router
- Server components for data fetching
- Client component only for claim form
- No external API calls (uses internal endpoints)
- Prisma queries compatible with most databases
- CSS framework: Tailwind CSS (already configured)


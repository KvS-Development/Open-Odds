# Technical Architecture

## Technology Stack

### Frontend
- **React 18** - UI framework with hooks and modern features
- **TypeScript** - Type safety and better developer experience
- **Chart.js with react-chartjs-2** - Distribution visualizations
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing
- **React Query (TanStack Query)** - Server state management
- **Zustand** - Client state management (lightweight alternative to Redux)

### Backend & Infrastructure
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication & user management
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Edge Functions for complex calculations
  - Storage for user uploads

- **Vercel** - Deployment & hosting
  - Automatic deployments from GitHub
  - Preview deployments for PRs
  - Edge network for global performance
  - Analytics and monitoring

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest & React Testing Library** - Testing
- **GitHub Actions** - CI/CD pipeline

## Project Structure

```
open-odds/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Generic components (Button, Input, etc.)
│   │   ├── distributions/# Distribution-specific components
│   │   ├── scenarios/    # Scenario-related components
│   │   └── visualizations/# Chart and graph components
│   ├── features/         # Feature-specific modules
│   │   ├── auth/         # Authentication logic
│   │   ├── scenarios/    # Scenario management
│   │   ├── comments/     # Comments system
│   │   └── aggregation/  # Statistics aggregation
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   │   ├── supabase/     # Supabase client and helpers
│   │   ├── calculations/ # Probability calculations
│   │   └── validation/   # Input validation
│   ├── pages/            # Page components
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Helper functions
├── public/               # Static assets
├── tests/                # Test files
├── .env.example          # Environment variables template
├── .env.local            # Local environment variables (gitignored)
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Setup Requirements

### Prerequisites
1. **Node.js 18+** - JavaScript runtime
2. **npm or yarn** - Package manager
3. **Git** - Version control
4. **Vercel CLI** (optional) - For local testing of Vercel features
5. **Supabase CLI** (optional) - For local development

### Environment Variables
The following environment variables need to be configured:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For enhanced features
VITE_APP_URL=http://localhost:5173  # Production: https://open-odds.com
```

### Initial Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/KvS-Development/Open-Odds.git
   cd Open-Odds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy the project URL and anon key
   - Create `.env.local` file with your credentials

4. **Configure Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Enable automatic deployments

5. **Run development server**
   ```bash
   npm run dev
   ```

## Supabase Database Schema

### Core Tables

```sql
-- Users (managed by Supabase Auth)

-- Scenarios table
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  structure JSONB NOT NULL, -- Stores the scenario structure
  version INTEGER DEFAULT 1,
  parent_id UUID REFERENCES scenarios(id), -- For forked scenarios
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scenario versions for history
CREATE TABLE scenario_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  structure JSONB NOT NULL,
  change_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- User inputs for scenarios
CREATE TABLE scenario_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  inputs JSONB NOT NULL, -- Stores distribution parameters
  notes JSONB, -- Step-by-step notes
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  scenario_input_id UUID REFERENCES scenario_inputs(id) ON DELETE CASCADE,
  step_id TEXT, -- For step-specific comments
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Votes
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  target_type TEXT CHECK (target_type IN ('scenario', 'comment', 'input')),
  target_id UUID NOT NULL,
  vote_type INTEGER CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Scenarios: Users can CRUD their own, read public
CREATE POLICY "Users can manage own scenarios" ON scenarios
  FOR ALL USING (auth.uid() = user_id);
  
CREATE POLICY "Anyone can read public scenarios" ON scenarios
  FOR SELECT USING (is_public = true);

-- Similar policies for other tables...
```

## Key Features Implementation

### 1. Client-Side Calculations
- All probability calculations run in the browser
- Web Workers for heavy computations
- Local caching of results

### 2. Real-time Collaboration
- Supabase real-time subscriptions for live updates
- Optimistic UI updates for better UX

### 3. Version Control
- Automatic versioning on structural changes
- Diff visualization between versions
- Fork and merge capabilities

### 4. Aggregation System
- Background jobs for statistics calculation
- Cached aggregation results
- Smart grouping by scenario structure

## Deployment Pipeline

### Development Workflow
1. Create feature branch
2. Make changes and test locally
3. Push to GitHub
4. Vercel creates preview deployment
5. Review and test preview
6. Merge to main
7. Automatic production deployment

### CI/CD with GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

## Performance Considerations

### Frontend Optimization
- Code splitting with React.lazy()
- Virtual scrolling for long lists
- Memoization for expensive calculations
- Service Worker for offline capability

### Backend Optimization
- Database indexing on frequently queried fields
- Materialized views for aggregations
- Edge caching with Vercel
- Connection pooling in Supabase

## Security Measures

### Authentication
- Supabase Auth with multiple providers
- JWT tokens with refresh rotation
- Session management

### Data Protection
- Row Level Security in PostgreSQL
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## Monitoring and Analytics

### Application Monitoring
- Vercel Analytics for performance metrics
- Error tracking with Sentry (optional)
- Custom event tracking for user behavior

### Database Monitoring
- Supabase dashboard for query performance
- Slow query logging
- Connection pool monitoring

## Development Phases Implementation

### Phase 1: Core MVP
- Basic React app structure ✓
- Supabase integration ✓
- Simple scenario creation
- Distribution input UI
- Chart.js visualization
- Client-side calculations

### Phase 2: User System
- Supabase Auth integration
- User profiles
- Scenario saving/loading
- Basic version control

### Phase 3: Collaboration
- Publishing system
- Commenting
- Voting
- Forking scenarios

### Phase 4: Advanced Features
- Branching scenarios
- Aggregation statistics
- Advanced visualizations
- Export functionality

## Cost Considerations

### Supabase (Free tier includes)
- 500MB database
- 2GB bandwidth
- 50,000 monthly active users
- 500,000 Edge Function invocations

### Vercel (Free tier includes)
- 100GB bandwidth
- Unlimited deployments
- Automatic HTTPS
- Preview deployments

### Scaling Costs
- Supabase Pro: $25/month per project
- Vercel Pro: $20/month per member
- Custom domain: ~$15/year

## Next Steps

1. **Initialize React project with Vite**
2. **Set up Supabase project and database**
3. **Configure Vercel deployment**
4. **Implement basic scenario data model**
5. **Create distribution input components**
6. **Build visualization system with Chart.js**
7. **Add client-side calculation engine**

---

*This document will be updated as implementation progresses and architectural decisions are made.*
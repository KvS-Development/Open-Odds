# Getting Started with Open-Odds

This guide will help you set up the Open-Odds development environment from scratch.

## Prerequisites

### Required Software
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - We recommend [VS Code](https://code.visualstudio.com/)

### Required Accounts
1. **GitHub** - For code repository access
2. **Supabase** - [Sign up free](https://supabase.com)
3. **Vercel** - [Sign up free](https://vercel.com)

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KvS-Development/Open-Odds.git
cd Open-Odds
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18 and React Router
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Chart.js
- Supabase client
- Testing libraries

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New project"
3. Fill in:
   - Project name: `open-odds` (or your preference)
   - Database password: Choose a strong password
   - Region: Select closest to you
4. Click "Create new project" and wait for setup

#### Get Your API Keys

1. Once created, go to Settings → API
2. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public** key (safe for client-side)

#### Set Up Database Tables

1. Go to SQL Editor in Supabase
2. Create a new query
3. Copy and run this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create scenarios table
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  structure JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  parent_id UUID REFERENCES scenarios(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create scenario_versions table
CREATE TABLE scenario_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  version INTEGER NOT NULL,
  structure JSONB NOT NULL,
  change_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create scenario_inputs table
CREATE TABLE scenario_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  inputs JSONB NOT NULL,
  notes JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  scenario_input_id UUID REFERENCES scenario_inputs(id) ON DELETE CASCADE,
  step_id TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create votes table
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  target_type TEXT CHECK (target_type IN ('scenario', 'comment', 'input')),
  target_id UUID NOT NULL,
  vote_type INTEGER CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, target_type, target_id)
);

-- Enable Row Level Security
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies
CREATE POLICY "Users can manage own scenarios" ON scenarios
  FOR ALL USING (auth.uid() = user_id);
  
CREATE POLICY "Anyone can read public scenarios" ON scenarios
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can manage own inputs" ON scenario_inputs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read published inputs" ON scenario_inputs
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own votes" ON votes
  FOR ALL USING (auth.uid() = user_id);
```

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_APP_URL=http://localhost:5173
   ```

### 5. Run the Development Server

```bash
npm run dev
```

The app should open automatically at [http://localhost:5173](http://localhost:5173)

## Vercel Deployment Setup

### 1. Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### 2. Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add:

- `VITE_SUPABASE_URL` - Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
- `VITE_APP_URL` - Your production URL (e.g., `https://open-odds.vercel.app`)

### 4. Deploy

Vercel will automatically deploy when you push to the main branch.

For manual deployment:
```bash
vercel --prod
```

## Development Workflow

### Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
Open-Odds/
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-specific modules
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Libraries and utilities
│   │   └── supabase/    # Supabase client
│   ├── pages/           # Page components
│   ├── types/           # TypeScript types
│   └── utils/           # Helper functions
├── public/              # Static assets
├── .env.local           # Local environment variables
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── tailwind.config.js   # Tailwind CSS config
```

## Common Issues & Solutions

### Issue: Supabase connection failed

**Solution**: Check that your `.env.local` file has the correct credentials and that your Supabase project is active.

### Issue: Build fails on Vercel

**Solution**: Ensure all environment variables are set in Vercel dashboard and that Node version is set to 18+.

### Issue: Tailwind styles not working

**Solution**: Make sure Tailwind directives are in `src/index.css` and that you're using Tailwind classes correctly.

### Issue: TypeScript errors

**Solution**: Run `npm install` to ensure all type definitions are installed, and check that your VS Code is using the workspace TypeScript version.

## Next Steps

1. **Explore the codebase**: Start with `src/App.tsx` to understand the routing
2. **Try creating a component**: Add a new component in `src/components`
3. **Test Supabase**: Try the authentication flow in the Profile page
4. **Build a feature**: Start implementing the scenario builder

## Getting Help

- Check the [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) document
- Review the main [README](./README.md) for project overview
- Create an issue on GitHub for bugs or questions

## Useful VS Code Extensions

- **ESLint** - Integrates ESLint into VS Code
- **Prettier** - Code formatter
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript React code snippets** - Helpful snippets
- **GitLens** - Git supercharged

---

*Happy coding! 🚀*
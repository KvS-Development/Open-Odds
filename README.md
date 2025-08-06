# Open-Odds

Open-Odds.com - A visual probability distribution calculator for complex scenarios

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A [Supabase](https://supabase.com) account (free)
- A [Vercel](https://vercel.com) account (free) for deployment

### Quick Setup

1. **Clone the repository and install dependencies:**

```bash
git clone https://github.com/KvS-Development/Open-Odds.git
cd Open-Odds
npm install
```

2. **Create a Supabase project:**

- Go to [database.new](https://database.new)
- Create a new project
- Wait for it to finish setting up
- Go to Settings → API
- Copy your `Project URL` and `anon public` key

3. **Set up environment variables:**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📦 Deployment to Vercel

### Option 1: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and add your environment variables when asked.

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

## 🏗️ Project Structure

```
Open-Odds/
├── app/              # Next.js App Router pages
│   ├── auth/        # Authentication pages
│   ├── layout.tsx   # Root layout with navigation
│   └── page.tsx     # Home page
├── components/      # React components
│   ├── ui/         # Reusable UI components
│   └── *.tsx       # Feature components
├── lib/            # Utilities and configurations
│   ├── supabase/   # Supabase client setup
│   └── utils.ts    # Helper functions
└── public/         # Static assets
```

## 🔑 Features

### Current
- ✅ Next.js 15 with App Router
- ✅ Supabase authentication (email/password)
- ✅ TypeScript
- ✅ Tailwind CSS with dark mode
- ✅ Responsive design

### Coming Soon
- 🔄 Scenario builder
- 🔄 Distribution visualizations with Chart.js
- 🔄 Probability calculations
- 🔄 Save and share scenarios
- 🔄 Community features

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Visualizations:** [Chart.js](https://www.chartjs.org/) (coming soon)

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Setting up Supabase Tables

After creating your Supabase project, you'll need to set up the database schema. Go to the SQL Editor in your Supabase dashboard and run the SQL commands that will be provided in the next phase of development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[License to be determined]

---

## Project Overview

Open-Odds is a web application that provides visual feedback for probability calculations based on component distributions. Users can build scenarios with multiple steps, input probability distributions for each component, and see visual representations of both individual distributions and their convolutions.

The canonical use case is implementing the Drake equation, where users can specify distributions for each parameter and visualize the resulting probability distribution for the number of communicating civilizations in our galaxy.

### Core Features (Planned)

1. **Scenario Building** - Create multi-step scenarios with branching logic
2. **Distribution Input** - Support for various probability distributions
3. **Visualizations** - Real-time Chart.js visualizations
4. **Calculations** - Client-side probability calculations
5. **Collaboration** - Save, share, and discuss scenarios
6. **Authentication** - User accounts with Supabase Auth

---

*This project is actively under development. Check back for updates!*
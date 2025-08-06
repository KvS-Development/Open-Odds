# Open-Odds

Open-Odds.com - A visual probability distribution calculator for complex scenarios

## 🚀 Quick Start

See [GETTING_STARTED.md](./GETTING_STARTED.md) for detailed setup instructions.

```bash
# Clone the repository
git clone https://github.com/KvS-Development/Open-Odds.git
cd Open-Odds

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

## 📚 Documentation

- [Getting Started Guide](./GETTING_STARTED.md) - Complete setup instructions
- [Technical Architecture](./TECHNICAL_ARCHITECTURE.md) - System design and tech stack

## Project Overview

Open-Odds is a web application that provides visual feedback for probability calculations based on component distributions. Users can build scenarios with multiple steps, input probability distributions for each component, and see visual representations of both individual distributions and their convolutions.

The canonical use case is implementing the Drake equation, where users can specify distributions for each parameter and visualize the resulting probability distribution for the number of communicating civilizations in our galaxy.

## Core Features

### 1. Scenario Building
- **Component-Based Scenarios**: Users can create scenarios consisting of multiple components/steps
- **Branching Logic**: Support for scenarios with multiple branching paths
- **Visual Feedback**: Real-time visual representation of distributions at each step
- **Convolution Results**: Automatic calculation and visualization of combined probability distributions

### 2. Distribution Input
- **Multiple Distribution Types**: Support for various probability distributions (normal, uniform, exponential, etc.)
- **Custom Distributions**: Allow users to define custom probability distributions
- **Parameter Adjustment**: Interactive controls for adjusting distribution parameters
- **Visual Preview**: Live preview of each distribution as parameters are adjusted

### 3. Documentation & Evidence
- **Step Notes**: Users can add notes to each step explaining their reasoning
- **Evidence Links**: Support for linking to papers, articles, or other sources
- **Rationale Documentation**: Structured way to document the thinking behind each distribution choice

### 4. Collaboration Features
- **Public Publishing**: Users can publish their scenarios for public viewing
- **Copying & Modification**: Ability to copy existing scenarios and modify them
- **Version History**: Track changes to scenarios over time
- **Comments**: Comment system for individual steps and complete scenarios
- **Voting**: Up/down voting for comments and scenarios

### 5. Aggregation & Statistics
- **Scenario Aggregation**: Automatic grouping of scenarios with identical steps but different distributions
- **Statistical Summaries**:
  - Average expectation
  - Median expectation
  - Minimum and maximum values
  - 50th percentile range (centered on median)
  - 90th percentile range (centered on median)
- **Comparison Views**: Compare different approaches to the same problem

### 6. User Management
- **Anonymous Mode**: Fill out and compute scenarios client-side without signing in
- **Authenticated Features**: Sign-in required for:
  - Saving scenarios
  - Publishing scenarios
  - Commenting
  - Voting
- **User Profiles**: Track user's scenarios and contributions

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel
- **Build Tool**: Vite
- **State Management**: Zustand, React Query
- **Testing**: Jest, React Testing Library

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## User Experience Flow

### Anonymous User
1. Land on homepage
2. Browse public scenarios or create new
3. Input distributions for each step
4. View results and visualizations
5. Prompted to sign in to save

### Authenticated User
1. Sign in to account
2. Create/edit personal scenarios
3. Publish scenarios publicly
4. Comment and vote on others' scenarios
5. Track scenario performance and engagement

## Development Phases

### Phase 1: Core Functionality ✅
- [x] Basic React app structure
- [x] Supabase integration setup
- [x] Project configuration
- [ ] Simple scenario creation
- [ ] Distribution input UI
- [ ] Chart.js visualization
- [ ] Client-side calculations

### Phase 2: User System
- [ ] Supabase Auth integration
- [ ] User profiles
- [ ] Scenario saving/loading
- [ ] Basic version control

### Phase 3: Collaboration
- [ ] Publishing system
- [ ] Commenting
- [ ] Voting
- [ ] Forking scenarios

### Phase 4: Advanced Features
- [ ] Branching scenarios
- [ ] Aggregation statistics
- [ ] Advanced visualizations
- [ ] Export functionality

## Success Metrics
- User engagement (scenarios created, published)
- Collaboration metrics (comments, votes, copies)
- Scenario quality (completeness, documentation)
- Performance metrics (load time, calculation speed)

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[License information to be added]

---

*This document will be updated as the project evolves and requirements are refined.*
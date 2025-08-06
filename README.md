# Open-Odds

Open-Odds.com - A visual probability distribution calculator for complex scenarios

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

## Technical Requirements

### Frontend
- **Client-Side Computation**: Ability to calculate results without server interaction
- **Responsive Design**: Work across desktop and mobile devices
- **Interactive Visualizations**: Real-time updates as users adjust parameters
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with JS

### Backend
- **User Authentication**: Secure user registration and login system
- **Data Persistence**: Store scenarios, comments, votes, and user data
- **Version Control**: Track and manage scenario versions
- **API Design**: RESTful API for all operations

### Data Model
- **Scenarios**: Complex nested structure supporting branching
- **Distributions**: Flexible schema for various distribution types
- **Versioning**: Maintain history of changes
- **Relationships**: Link scenarios, comments, users, and votes

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

## Notification System
- **Structural Changes Alert**: Notify users when scenario structure changes affect aggregation
- **Comment Notifications**: Alert when scenarios receive comments
- **Version Update Alerts**: Notify followers of scenario updates

## Development Phases

### Phase 1: Core Functionality
- Basic scenario creation
- Distribution input and visualization
- Client-side calculation engine

### Phase 2: User System
- Authentication and user management
- Scenario saving and loading
- Basic version control

### Phase 3: Collaboration
- Publishing system
- Copying and modification
- Comments and voting

### Phase 4: Advanced Features
- Branching scenarios
- Aggregation and statistics
- Advanced visualization options

### Phase 5: Polish & Scale
- Performance optimization
- Mobile optimization
- Advanced analytics

## Technology Stack (To Be Determined)

### Frontend Options
- React/Vue/Angular for UI framework
- D3.js or Chart.js for visualizations
- TypeScript for type safety

### Backend Options
- Node.js/Python/Go for server
- PostgreSQL/MongoDB for database
- Redis for caching

### Infrastructure
- Cloud hosting (AWS/GCP/Azure)
- CDN for static assets
- CI/CD pipeline

## Success Metrics
- User engagement (scenarios created, published)
- Collaboration metrics (comments, votes, copies)
- Scenario quality (completeness, documentation)
- Performance metrics (load time, calculation speed)

## Constraints & Considerations
- **Privacy**: User data protection and GDPR compliance
- **Performance**: Handle complex calculations efficiently
- **Scalability**: Design for growth in users and data
- **Accessibility**: WCAG compliance for all users
- **Security**: Protect against common web vulnerabilities

## Next Steps
1. Define detailed technical architecture
2. Create wireframes and mockups
3. Set up development environment
4. Implement Phase 1 core functionality
5. Establish testing framework

---

*This document will be updated as the project evolves and requirements are refined.*
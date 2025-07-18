#  Let's Snippit

A modern, team-based code snippet management application built with React and Convex. Organize, share, and collaborate on code snippets with your team in a beautiful, intuitive interface.

![Project Preview](https://img.shields.io/badge/Status-Active-green) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![Convex](https://img.shields.io/badge/Convex-1.25.4-purple)

## Features
###  Core Functionality
- **Code Snippet Management**: Create, edit, and delete code snippets with syntax highlighting
- **Smart Search**: Search through snippets by title, description, or code content
- **Tag-Based Organization**: Organize snippets with customizable tags for easy categorization
- **Real-time Filtering**: Filter snippets by multiple tags simultaneously

###  Team Collaboration
- **Team-Based Authentication**: Join existing teams with team name and passcode
- **Team Creation**: Create new teams with secure passcode protection
- **Shared Snippet Library**: All team members can access and manage shared snippets
- **Secure Access Control**: Team-based access ensures privacy and security

###  User Experience
- **Modern Dark Theme**: Beautiful, professional dark interface with cyan accents
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **One-Click Copy**: Copy snippets to clipboard with visual feedback
- **Toast Notifications**: Real-time feedback for all user actions
- **Intuitive Navigation**: Clean, organized interface for efficient workflow

##  Technology Stack

- **Frontend**: React 19.1.0 with modern hooks and functional components
- **Backend**: Convex for real-time database and API management
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for responsive, utility-first styling
- **Authentication**: Team-based authentication with secure passcode system

##  Installation

### Prerequisites
- Node.js (16.0 or higher)
- npm or yarn package manager
- Convex account (free tier available)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/tjkreddy/lets-snippit.git
   cd lets-snippit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   # Install Convex CLI if you haven't already
   npm install -g convex

   # Initialize Convex in your project
   npx convex dev
   ```

4. **Configure environment**
   - Follow the Convex setup wizard to connect your project
   - The schema will be automatically deployed

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Create a new team or join an existing one to get started

## Usage

### Getting Started

1. **Team Setup**
   - **Create Team**: Click "Create Team" to set up a new workspace with a team name and secure passcode
   - **Join Team**: Use "Join Team" to access an existing team with the team name and passcode

2. **Managing Snippets**
   - **Add Snippet**: Click the "+" button to create a new code snippet
   - **Edit Snippet**: Click the edit icon on any snippet to modify it
   - **Delete Snippet**: Use the trash icon to remove snippets
   - **Copy Code**: Click the copy icon to copy snippet code to clipboard

3. **Organization & Search**
   - **Tag Filtering**: Click on tags to filter snippets by category
   - **Search**: Use the search bar to find snippets by content
   - **Multiple Filters**: Combine tags and search for precise results

### Team Collaboration

- All team members can create, edit, and delete snippets
- Changes are synced in real-time across all team members
- Secure team-based access ensures privacy
- Perfect for development teams, coding bootcamps, or study groups

## 📁 Project Structure

```
lets-snippit/
├── components/           # React components
│   ├── Header.tsx       # Main navigation and search
│   ├── SnippetForm.tsx  # Snippet creation/editing form
│   ├── SnippetItem.tsx  # Individual snippet display
│   ├── SnippetList.tsx  # Snippet grid layout
│   ├── TagFilter.tsx    # Tag filtering interface
│   ├── Toast.tsx        # Notification system
│   ├── Login.jsx        # Team login interface
│   ├── Signup.jsx       # Team creation interface
│   └── icons/           # Custom SVG icons
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts # Local storage management
├── convex/              # Backend functions and schema
│   ├── schema.ts        # Database schema
│   ├── snippets.ts      # Snippet CRUD operations
│   └── auth.ts          # Team authentication
├── src/                 # Styles and assets
└── App.tsx              # Main application component
```

##  Key Components

### Authentication System
- **Team-based approach**: No individual user accounts required
- **Secure passcode system**: Teams protected by secure passcodes
- **Persistent sessions**: Stay logged in across browser sessions

### Snippet Management
- **Rich text support**: Full markdown and code syntax support
- **Tag system**: Flexible tagging for organization
- **Search functionality**: Powerful search across all snippet content

### Real-time Collaboration
- **Convex integration**: Real-time data synchronization
- **Team workspace**: Shared snippet library for all team members
- **Instant updates**: Changes reflected immediately for all users

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

### Database Schema

The application uses Convex with the following schema:

```typescript
// Teams table
teams: {
  teamName: string,
  passcode: string,
  createdAt: number
}

// Snippets table
snippets: {
  title: string,
  description?: string,
  code: string,
  tags: string[],
  teamId?: string,
  createdAt: number,
  updatedAt?: number
}
```

##  Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow existing code style and patterns
- Add appropriate comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Built with [React](https://reactjs.org/) for the frontend framework
- Powered by [Convex](https://convex.dev/) for real-time backend services
- Styled with [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- Icons designed with modern SVG components

##  Support

For support, feedback, or questions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

**Happy Coding! 🚀** Start organizing your team's code snippets today with Let's Snippit!

# Custom Note Service

A simple, fast note-taking application built with Next.js that stores notes locally in your browser.

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Architecture Decisions

### Storage Strategy
- **Why localStorage + key naming**: localStorage provides persistent client-side storage without requiring a backend. Using a prefixed key (`notes-app-data`) prevents conflicts with other applications using the same domain.

### Component Design
- **Modular architecture**: Separated AddNote and NotesList into distinct components for maintainability and reusability
- **Controlled components**: Form inputs use React state for predictable data flow and easy validation
- **Props-based communication**: Parent component coordinates between add/view modes through callback props

### State Management
- **useState for local state**: Simple component-level state for form inputs and UI states
- **useEffect for storage sync**: Ensures component state reflects current localStorage data on mount
- **Refresh trigger pattern**: Parent component triggers list refresh after adding notes

### Styling Approach
- **Tailwind CSS for rapid utility styling**: Enables fast development with consistent design system
- **shadcn/ui components**: Pre-built accessible components reduce development time
- **Responsive grid layout**: Notes display adapts to different screen sizes

### Navigation
- **Tab-based navigation for simplicity**: Clear visual separation between add/view modes with built-in accessibility
- **Automatic navigation**: Redirects to view mode after successfully adding a note

## 🎯 Features

- ✅ Add notes with title and content
- ✅ View all saved notes in a responsive grid
- ✅ Delete individual notes
- ✅ Persistent storage using localStorage
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Accessible UI components

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: Browser localStorage
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📱 Browser Support

Works in all modern browsers that support localStorage (IE8+, all modern browsers).

## 🔧 Error Handling

- Storage quota exceeded errors
- JSON parsing errors
- Network-independent operation
- User-friendly error messages
\`\`\`

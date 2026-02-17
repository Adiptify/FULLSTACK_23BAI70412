# Exp-5 Section-2: Advanced SPA with Lazy Loading

An enhanced Single Page Application (SPA) built on top of the foundation from Exp-3, now featuring 2-second lazy loading for all main views, a redesigned Footer, and optimized performance.

## Key Features
- **Mandatory Lazy Loading**: All routes (Home, About, Contact) implement a controlled 2-second delay to showcase lazy loading states.
- **Dynamic Loading Overlay**: A smooth, centered loading spinner ensures the user is informed during route transitions.
- **Enhanced Footer**: Integrated global footer providing professional identification and technical context.
- **SPA Routing**: Seamless navigation using `react-router-dom`.
- **Responsive Design**: Fully responsive layout optimized for all screen sizes.

## Technical Enhancements
- **lazyWithDelay**: A custom high-order component helper for controlled `React.lazy` loading.
- **Suspense Integration**: Strategic placement of `Suspense` boundaries for optimal loading feedback.
- **CSS Transitions**: Micro-animations and smooth spinners for a premium user experience.

## Tech Stack
- **React 19**: Utilizing the latest React features.
- **Vite**: Ultra-fast build tool and development server.
- **React Router 7**: Modern routing orchestration.
- **Vanilla CSS**: Custom-built styling system without bloat.

## Quick Start
```bash
cd Section-2
npm install
npm run dev
```

---
Developed by **Kumar Aditya** | UID: 23BAI70412 | AI Engineering Student

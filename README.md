
# Shop.Co (E-Commerce Web App)

An e-commerce frontend web app with PWA capabilities built using modern web technologies: Vite, React, TypeScript, Tailwind CSS, and npm. The app is optimized for performance, responsive design, and a seamless user experience.

deployed - https://shopco-weld.vercel.app/

---

## Description

This e-commerce web app is a feature-rich platform designed for a seamless shopping experience. Key features include:

- **Fully Responsive Design**: Built using Tailwind CSS, the app adapts flawlessly to different screen sizes, providing an optimized experience for desktop, tablet, and mobile users.
- **State Management with Redux Toolkit**: Redux Toolkit is utilized for managing application state, including tracking user-specific carts and other app states efficiently.
- **Authentication**:
  - Login and signup functionalities implemented using Firebase Authentication.
  - JWT (JSON Web Tokens) ensures secure session management for logged-in users.
- **Cart Persistence**:
  - *Logged-in Users*: Cart data is stored and synced in Firebase Realtime Database, making it persistent across sessions.
  - *Guest Users*: Cart data is stored in localStorage, ensuring a consistent experience until the user clears their browser data.
- **Form Validation with Formik and Yup**: Seamless and robust form validation for features like signup and login forms.
- **Newsletter Subscription**: Users can subscribe to newsletters by providing their email, which is stored in Firebase Realtime Database. A confirmation email is sent using EmailJS.
- **Category-Based Browsing and Filtering**: Users can explore products through categories with advanced filtering options.
- **Search Functionality**:
  - Implements debounce logic for optimized, automatic searches.
  - Uses lazy loading to display matching results and provides a fallback with React Suspense for enhanced user experience.
- **Code Optimization**:
  - Utilizes route-based lazy loading for effective code splitting and faster loading times.
- **Offline and PWA Capabilities**:
  - Service workers handle offline caching for static assets, navigations, and API calls.
  - The app is fully functional offline and can be installed on both PCs and mobile devices.

---

## Features

- **Progressive Web App**: Offline functionality and installable on devices.
- **Fast Development with Vite**: Lightning-fast HMR and build process.
- **TypeScript**: Ensures robust and type-safe code.
- **Responsive UI**: Styled using Tailwind CSS for consistency and ease of design.
- **Modular Components**: Reusable and maintainable React components.
- **Production-Ready**: Optimized for performance in production.

---

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Authentication with JWT
- **Form Validation**: Formik and Yup
- **Database**: Firebase Realtime Database
- **Email Service**: EmailJS
- **Package Manager**: npm

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or above)
- npm (v7 or above)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/purvimalviya/SHOPCO.git
   cd SHOPCO


2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
    ```bash
   npm run dev

---
### PWA Setup

This app is a fully functional PWA with offline capabilities in production.
1. The service worker automatically caches.
2. The app is installable on mobile and desktop devices.

## Building for Production

To create an optimized build for production and preview production build, run:
  ```bash
  npm run build
  npm run preview



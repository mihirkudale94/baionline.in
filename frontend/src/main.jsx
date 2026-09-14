import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import './index.css'

// The SPA manages its own scroll position on navigation (ScrollToTop);
// browser restoration would fight it and reload pages mid-document.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Every section fades up on scroll. "user" turns the movement off for
        visitors who set reduce-motion in their OS; CSS already honours it. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)

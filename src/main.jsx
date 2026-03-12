import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Polyfill window.storage pour Vercel (localStorage)
window.storage = {
  async get(key) {
    try {
      const val = localStorage.getItem(key)
      if (val === null) throw new Error('not found')
      return { key, value: val }
    } catch {
      throw new Error('not found')
    }
  },
  async set(key, value) {
    localStorage.setItem(key, value)
    return { key, value }
  },
  async delete(key) {
    localStorage.removeItem(key)
    return { key, deleted: true }
  },
  async list(prefix = '') {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix))
    return { keys }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

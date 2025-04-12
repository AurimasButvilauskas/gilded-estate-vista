
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set initial HTML attributes for language support
document.documentElement.setAttribute('lang', 'en'); // Default language

// Add meta tags for SEO
const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
document.head.appendChild(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.head.appendChild(metaViewport);

createRoot(document.getElementById("root")!).render(<App />);

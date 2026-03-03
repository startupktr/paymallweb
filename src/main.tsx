import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent copy/paste on touch devices
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && ['c', 'x', 'a', 'u', 's'].includes(e.key.toLowerCase())) {
    e.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);

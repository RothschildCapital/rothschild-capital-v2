import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Fix untuk layar hitam: Menyediakan Buffer secara global di Browser
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById("root")!).render(<App />);
import { createRoot } from "react-dom/client";
import { captureAttribution } from "./lib/attribution";

import App from "./App";
import "./global.css";

captureAttribution();

createRoot(document.getElementById("root")!).render(<App />);

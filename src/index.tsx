import { createRoot } from "react-dom/client";
import App from "@src/App";

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(<App />);

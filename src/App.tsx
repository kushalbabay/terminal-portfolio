import Homepage from "./pages/homepage/homepage";
import "./App.scss";
import CommandProvider from "./contexts/CommandContext";
import { useEffect } from "react";
import { KeyCodes } from "./models/models";

function App() {
  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if ([KeyCodes.ArrowDown, KeyCodes.ArrowUp].includes(e.key)) {
        e.preventDefault();
      }
    });
  }, []);

  return (
    <CommandProvider>
      <Homepage />
    </CommandProvider>
  );
}

export default App;

import Homepage from "./pages/homepage/homepage";
import "./App.scss";
import CommandProvider from "./contexts/CommandContext";

function App() {
  return (
    <CommandProvider>
      <Homepage />
    </CommandProvider>
  );
}

export default App;

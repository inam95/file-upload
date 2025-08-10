import { Play } from "lucide-react";
import { Navbar } from "./components/navbar";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;

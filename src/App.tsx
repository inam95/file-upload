import { Play } from "lucide-react";
import { Navbar } from "./components/navbar";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./providers/theme-provider";
import { FileUpload } from "./components/file-upload";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <Navbar />
        <main className="py-10 space-y-10 px-4 sm:px-0">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Due Diligence Check</h1>
              <p className="text-sm text-muted-foreground max-w-4xl hidden sm:block">
                This job performs a high level analysis of from the uploaded
                company data packs(e.g. financial statements, management
                presentations, market research) to generate comprehensive IC
                (Investment Committee) documentation for investment decisions.
              </p>
            </div>
            <Button>
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
          {/* files upload section */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold">Upload Files</p>
            {/* file upload component */}
            <FileUpload />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

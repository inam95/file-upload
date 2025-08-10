import { FileUploadForm } from "./components/file-upload-form";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="container mx-auto">
        <Navbar />
        <main className="py-10 space-y-10 px-4 sm:px-0">
          <FileUploadForm />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

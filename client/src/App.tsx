import "./App.css";
import Navbar from "./components/Navbar";
import { Login } from "./pages/login";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Login />
      </ThemeProvider>
    </main>
  );
}

export default App;

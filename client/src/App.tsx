import "./App.css";
import Navbar from "./components/Navbar";
import { Login } from "./pages/login";
import { ThemeProvider } from "@/components/theme-provider";
import HeroSection from "./pages/student/HeroSection";
function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <HeroSection />
        <Login />
      </ThemeProvider>
    </main>
  );
}

export default App;

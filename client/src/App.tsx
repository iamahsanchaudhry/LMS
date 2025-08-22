import "./App.css";
import Navbar from "./components/Navbar";
import { Login } from "./pages/login";
import { ThemeProvider } from "@/components/theme-provider";
import HeroSection from "./pages/student/HeroSection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
            </>
        ),
      },
      {
        path:"login",
        element:<Login />
      }
    ],
  },
]);
function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;

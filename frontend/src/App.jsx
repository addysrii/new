import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Import components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import Profile from "./pages/Profile";
import ChatHomePage from "./pages/ChatHomePage";
import Create from "./pages/Create";
import Portfolio from "./pages/Portfolio";
// Loading spinner component for better reusability
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader className="w-10 h-10 animate-spin" />
  </div>
);

// Layout component to handle navbar visibility
const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname === "/chats";
  
  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

// Protected Route Component with loading state handling
const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Only Route Component (for login/signup pages)
const PublicOnlyRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();
  
  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Route configuration for better organization
const PROTECTED_ROUTES = [
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/settings", element: <SettingsPage /> },
  { path: "/chats", element: <ChatHomePage /> },
  { path: "/create", element: <Create /> },
    { path: "/portfolio", element: <Portfolio/> },
];

const PUBLIC_ROUTES = [
  { path: "/signup", element: <SignUpPage /> },
  { path: "/login", element: <LoginPage /> },
];

const App = () => {
  const { checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div data-theme={theme}>
      <Routes>
        {/* Protected Routes */}
        {PROTECTED_ROUTES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ))}

        {/* Public Only Routes */}
        {PUBLIC_ROUTES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PublicOnlyRoute>{element}</PublicOnlyRoute>}
          />
        ))}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
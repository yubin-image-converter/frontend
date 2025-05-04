import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AuthButton } from "./components/AuthButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";
import OAuthCallback from "./pages/oauth/OAuthCallback"; // 추가

function Home() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<AuthButton />} right={<UploadForm />} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oauth-callback" element={<OAuthCallback />} />
    </Routes>
  );
}

export default App;

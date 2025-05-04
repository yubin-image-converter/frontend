import { useEffect } from "react";
import "./App.css";

import { AuthButton } from "./components/AuthButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";
import axiosInstance from "./lib/axiosInstance";

function App() {
  console.log(import.meta.env.VITE_API_SERVER_URL);
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  console.log(import.meta.env.VITE_AUTHENTICATION_SERVER_URL);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<AuthButton />} right={<UploadForm />} />
    </div>
  );
}

export default App;

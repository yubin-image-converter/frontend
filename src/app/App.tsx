// src/app/App.tsx
import "./App.css";

import { Toaster } from "sonner";

import { Footer, Header, Main } from "@/shared/components";

import { AuthProvider } from "./providers";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-mono text-gray-100">
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          className:
            "bg-black text-green-300 border border-green-500 rounded-sm px-4 py-2 shadow-none font-mono text-sm leading-tight tracking-tight flex items-center gap-2",
        }}
      />
      <Header />
      <AuthProvider>
        <Main />
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;

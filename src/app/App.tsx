// src/app/App.tsx
import "./App.css";

import { Toaster } from "sonner";

import { Footer, Header, Main } from "@/shared/components";

import { AuthProvider, SocketProvider } from "./providers";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-black font-mono text-gray-100">
      <Toaster position="top-center" richColors />
      <Header />
      <AuthProvider>
        <SocketProvider>
          <Main />
        </SocketProvider>
      </AuthProvider>
      <Footer />
    </div>
  );
}

export default App;

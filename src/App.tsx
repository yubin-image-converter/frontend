import "./App.css";

import { AuthButton } from "./components/GoogleLoginButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";

function App() {
  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  console.log(import.meta.env.VITE_API_SERVER_URL);
  console.log(import.meta.env.VITE_AUTHENTICATION_SERVER_URL);
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<AuthButton />} right={<UploadForm />} />
    </div>
  );
}
export default App;

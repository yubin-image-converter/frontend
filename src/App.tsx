import "./App.css";

import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";

function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<GoogleLoginButton />} right={<UploadForm />} />
    </div>
  );
}
export default App;

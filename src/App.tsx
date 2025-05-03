import "./App.css";

import { AuthButton } from "./components/GoogleLoginButton";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { UploadForm } from "./components/UploadForm";

function App() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 text-foreground">
      <ResponsiveLayout left={<AuthButton />} right={<UploadForm />} />
    </div>
  );
}
export default App;

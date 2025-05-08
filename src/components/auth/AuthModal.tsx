import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut, LogIn } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
  } | null;
  onLogout: () => void;
}

export function AuthModal({ open, onClose, user, onLogout }: AuthModalProps) {
  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_AUTHENTICATION_SERVER_URL +
      "/auth/signin?provider=google";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border border-gray-700 bg-[#1a1a1a] text-white">
        <DialogHeader>
          <DialogTitle className="text-lg">내 계정</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 pt-2">
          {user ? (
            <>
              <UserCircle className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <Button
                variant="destructive"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Google 계정으로 로그인하세요.
              </p>
              <Button
                onClick={handleLogin}
                className="flex gap-2 bg-green-500 hover:bg-green-600"
              >
                <LogIn size={16} />
                Google 로그인
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

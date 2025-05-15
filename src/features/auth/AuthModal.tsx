import * as Dialog from "@radix-ui/react-dialog";
import { useAtomValue } from "jotai";
import { LogIn, LogOut, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/shared/hooks/useLogout";
import { userAtom } from "@/shared/store/userAtom";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const user = useAtomValue(userAtom);
  const logout = useLogout();

  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_AUTHENTICATION_SERVER_URL +
      "/auth/signin?provider=google";
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[999] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded border border-green-600 bg-black px-6 py-6 font-mono text-green-300 shadow-md">
          <div className="mb-4 text-center text-sm tracking-wide text-green-400">
            MY ACCOUNT
          </div>

          {user ? (
            <div className="flex w-full flex-col items-center text-sm">
              <UserCircle className="h-10 w-10 text-green-700" />
              <div className="mt-1 text-center text-green-300">{user.name}</div>
              <div className="mb-3 break-all text-center text-green-600">
                {user.email}
              </div>
              <Button
                onClick={logout}
                className="max-w-full border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
              >
                <LogOut size={14} className="mr-1" />
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center text-sm">
              <div className="mb-3 text-center text-green-600">
                Google 계정으로 로그인하세요.
              </div>
              <Button
                onClick={handleLogin}
                className="border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
              >
                <LogIn size={14} className="mr-1" />
                Google 로그인
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

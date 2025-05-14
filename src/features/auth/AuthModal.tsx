import * as Dialog from "@radix-ui/react-dialog";
import { LogIn, LogOut, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/shared/hooks";
import { makeAsciiTitleBox } from "@/utils/makeAsciiTitleBox";

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

  const { width } = useWindowSize();

  const fontPx = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const chEstimate = fontPx * 0.6;
  const dynamicWidth = Math.floor(width / chEstimate);

  // 모바일일수록 좁게 (최대 너비 기준 가중치 조절)
  const adjustedMaxWidth = width < 640 ? 40 : 60;

  const minWidth = Math.max(24, Math.min(adjustedMaxWidth, dynamicWidth));
  const minHeight = Math.max(24, Math.min(20, dynamicWidth));

  const { top, bottom } = makeAsciiTitleBox("MY ACCOUNT", minWidth);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[999] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-green-600 bg-black font-mono text-green-300 shadow-md"
          style={{ width: `${minWidth}ch`, minHeight: `${minHeight}ch` }}
        >
          <div className="flex flex-col items-center px-4 py-6 text-sm">
            <pre className="mx-auto w-max py-2 text-center text-sm leading-none text-green-300">
              {top}
            </pre>

            {user ? (
              <>
                <UserCircle className="h-10 w-10 text-green-700" />
                <div className="text-green-300">{user.name}</div>
                <div className="text-green-600">{user.email}</div>
                <Button
                  onClick={onLogout}
                  className="mt-2 border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
                >
                  <LogOut size={14} className="mr-1" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <div className="mb-2 text-green-600">
                  Google 계정으로 로그인하세요.
                </div>
                <Button
                  onClick={handleLogin}
                  className="border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
                >
                  <LogIn size={14} className="mr-1" />
                  Google 로그인
                </Button>
              </>
            )}

            <pre className="mx-auto w-max py-2 text-center text-sm leading-none text-green-600">
              {bottom}
            </pre>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

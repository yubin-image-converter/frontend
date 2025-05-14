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

  const adjustedMaxWidth = width < 480 ? 32 : width < 640 ? 40 : 60;
  const boxWidth = Math.max(24, Math.min(adjustedMaxWidth, dynamicWidth));
  const boxPxWidth = Math.min(480, boxWidth * 8.4);

  const { top, bottom } = makeAsciiTitleBox("MY ACCOUNT", boxWidth - 10);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Content
          style={{
            width: boxPxWidth,
            minWidth: boxPxWidth,
            maxWidth: boxPxWidth,
          }}
          className="fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 border border-green-600 bg-black px-4 py-6 font-mono text-green-300 shadow-md"
        >
          <div className="flex w-full flex-col items-center text-sm">
            <pre className="w-full overflow-hidden break-words text-center text-sm leading-none text-green-300">
              {top}
            </pre>

            {user ? (
              <>
                <UserCircle className="mt-4 h-10 w-10 text-green-700" />
                <div className="mt-2 break-all text-center text-green-300">
                  {user.name}
                </div>
                <div className="break-all text-center text-green-600">
                  {user.email}
                </div>
                <Button
                  onClick={onLogout}
                  className="mt-4 border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
                >
                  <LogOut size={14} className="mr-1" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <div className="mb-2 mt-4 text-center text-green-600">
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

            <pre className="mt-6 w-full overflow-hidden break-words text-center text-sm leading-none text-green-600">
              {bottom}
            </pre>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

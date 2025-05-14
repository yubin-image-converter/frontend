import * as Dialog from "@radix-ui/react-dialog";
import { LogIn, LogOut, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/shared/hooks";
import { makeAsciiTitleBox } from "@/utils/makeAsciiTitleBox";

function getCharWidthPx(font = "14px monospace") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 8.4; // fallback
  ctx.font = font;
  return ctx.measureText("M").width;
}

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
  const { width } = useWindowSize();

  // // ASCII 박스 너비 (문자 수 기준)
  // const boxCharWidth = isMobile ? 28 : 48;

  // 실제 px로 환산 (글자당 약 8.4px 기준)
  const charWidth = getCharWidthPx("14px monospace");
  const maxCharWidth = Math.max(24, Math.floor(width / charWidth) - 4); // 좌우 여백

  const { top, bottom } = makeAsciiTitleBox("MY ACCOUNT", maxCharWidth);
  const boxPxWidth = Math.min(480, maxCharWidth * charWidth);

  const handleLogin = () => {
    window.location.href =
      import.meta.env.VITE_AUTHENTICATION_SERVER_URL +
      "/auth/signin?provider=google";
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
        <Dialog.Content
          style={{
            width: boxPxWidth,
            minWidth: 0,
            maxWidth: "calc(100vw - 2rem)",
          }}
          className="fixed left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2 border border-green-600 bg-black px-4 py-6 font-mono text-green-300 shadow-md"
        >
          <div className="flex w-full flex-col items-center text-sm">
            <pre className="w-full overflow-hidden break-words text-center leading-none text-green-300">
              {top}
            </pre>

            {user ? (
              <div className="mt-5 flex w-full flex-col items-center text-sm">
                <UserCircle className="h-10 w-10 text-green-700" />
                <div className="break-words text-center text-green-300">
                  {user.name}
                </div>
                <div className="mb-3 break-all text-center text-green-600">
                  {user.email}
                </div>
                <Button
                  onClick={onLogout}
                  className="max-w-full border border-green-700 bg-black px-4 py-1 font-mono text-green-300 hover:bg-green-700 hover:text-black"
                >
                  <LogOut size={14} className="mr-1" />
                  로그아웃
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-3 mt-6 text-center text-sm text-green-600">
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

            <pre className="mt-6 w-full overflow-hidden break-words text-center leading-none text-green-600">
              {bottom}
            </pre>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

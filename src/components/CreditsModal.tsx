import { useEffect } from "react";

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose(); // Esc 키로 크레딧 모달 닫기
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // 크레딧 모달 열렸을 시 스크롤 잠금
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="credits-title"
        className="w-80 bg-white p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h5 id="credits-title" className="mb-4 text-lg font-medium">
          Credits
        </h5>

        <p className="mb-2 text-sm text-gray-600">
          Licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            CC BY 4.0
          </a>
          .
        </p>

        <p className="mb-6 text-sm text-gray-600">
          Free icons from{" "}
          <a
            href="https://streamlinehq.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://streamlinehq.com
          </a>
        </p>

        <button
          onClick={onClose}
          className="w-full rounded bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

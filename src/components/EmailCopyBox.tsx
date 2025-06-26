"use client";

interface EmailCopyBoxProps {
  email: string;
  copyText: string;
  copySuccess: string;
  copyError: string;
}

export default function EmailCopyBox({
  email,
  copyText,
  copySuccess,
  copyError,
}: EmailCopyBoxProps) {
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert(copySuccess);
    } catch {
      alert(`${copyError}: ${text}`);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <button
        onClick={() => copyTextToClipboard(email)}
        className="inline-flex cursor-pointer items-center gap-2 border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
        type="button"
      >
        <span className="text-blue-700">{email}</span>
        <span className="text-sm text-gray-500">{copyText}</span>
      </button>
    </div>
  );
}

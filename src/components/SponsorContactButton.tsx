"use client";

import { EnvelopeSimpleIcon } from "@phosphor-icons/react";

interface SponsorContactButtonProps {
  email: string;
  buttonText: string;
  copySuccess: string;
  copyError: string;
}

export default function SponsorContactButton({
  email,
  buttonText,
  copySuccess,
  copyError,
}: SponsorContactButtonProps) {
  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert(copySuccess);
    } catch {
      alert(`${copyError}: ${text}`);
    }
  }

  return (
    <div className="flex justify-center md:justify-start">
      <button
        onClick={() => copyTextToClipboard(email)}
        className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-6 font-medium text-white hover:bg-white/10"
        type="button"
      >
        <EnvelopeSimpleIcon /> {buttonText}
      </button>
    </div>
  );
}

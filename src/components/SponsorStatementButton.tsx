"use client";

import { FileIcon } from "@phosphor-icons/react";
import { usePostHog } from "posthog-js/react";

export default function SponsorStatementButton() {
  const posthog = usePostHog();

  return (
    <div className="flex justify-center md:justify-start">
      <a
        onClick={() => posthog?.capture("sponsor_statement_button_clicked")}
        href="https://drive.google.com/file/d/19SDY6OFaFf-zdpFaABngA_0yU8nelffm/view?usp=drive_link"
        target="_blank"
        className="flex h-12 items-center justify-center gap-1.5 border border-white bg-transparent px-6 font-medium text-white hover:bg-white/10"
      >
        <FileIcon /> 2024 연간 기부금 모금액 및 활용실적 명세서
      </a>
    </div>
  );
}

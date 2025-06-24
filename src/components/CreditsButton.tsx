"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import CreditsModal from "@/components/CreditsModal";

export default function CreditsButton() {
  const [isCreditsOpen, setCreditsOpen] = useState(false);
  const t = useTranslations("footer");

  return (
    <>
      <button
        onClick={() => setCreditsOpen(true)}
        className="text-sm underline hover:text-blue-600"
      >
        {t("credits")}
      </button>

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setCreditsOpen(false)}
      />
    </>
  );
}

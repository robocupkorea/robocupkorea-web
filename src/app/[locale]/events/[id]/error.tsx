"use client";

import { useTranslations } from "next-intl";

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations("error");

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {t("events.title")}
        </h1>
        <p className="mt-4 text-gray-600">{t("events.desc")}</p>
        <button
          onClick={reset}
          className="mt-6 bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          {t("events.retry")}
        </button>
      </div>
    </div>
  );
}

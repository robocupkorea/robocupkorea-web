"use client";

import { GlobeIcon } from "@phosphor-icons/react";

import { Link } from "@/i18n/navigation";

export default function LocaleSelector() {
  return (
    <div className="group relative">
      <button type="button" className="py-1">
        <GlobeIcon
          weight="thin"
          className="h-8 w-8 cursor-pointer hover:text-gray-500 md:h-10 md:w-10"
        />
      </button>

      <ul className="absolute right-0 top-full hidden w-24 border border-gray-200 bg-white py-2 shadow-lg group-hover:block">
        <li>
          <Link
            href="/"
            locale="ko"
            className="block w-full border-l border-transparent px-3 py-2 text-left text-sm font-medium hover:border-gray-900 hover:bg-gray-50"
          >
            한국어
          </Link>
        </li>

        <li>
          <Link
            href="/"
            locale="en"
            className="block w-full border-l border-transparent px-3 py-2 text-left text-sm font-medium hover:border-gray-900 hover:bg-gray-50"
          >
            English
          </Link>
        </li>
      </ul>
    </div>
  );
}

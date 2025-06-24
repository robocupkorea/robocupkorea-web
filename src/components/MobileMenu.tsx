"use client";

import { CaretDownIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";

interface MenuItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

interface MobileMenuProps {
  menuItems: MenuItem[];
}

export default function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
        {isMenuOpen ? (
          <XIcon size={32} weight="thin" />
        ) : (
          <ListIcon size={32} weight="thin" />
        )}
      </button>

      <div
        className={`fixed left-0 top-16 z-40 h-[calc(100dvh-4rem)] w-full bg-white transition-all duration-100 md:hidden ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <div className="container mx-auto h-full max-w-7xl px-4 py-6">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="border-b border-gray-200 pb-4 last:border-0"
              >
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsChildMenuOpen(!isChildMenuOpen)}
                      className="flex cursor-default cursor-pointer items-center gap-2 text-lg font-medium"
                    >
                      {item.name}
                      <CaretDownIcon
                        className={`${isChildMenuOpen ? "rotate-180" : ""}`}
                        size={20}
                      />
                    </button>
                    <ul
                      className={`mt-4 flex w-full flex-col gap-3 pl-4 ${
                        isChildMenuOpen ? "block" : "hidden"
                      }`}
                    >
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name} className="flex">
                          <Link
                            href={subItem.href}
                            className="block py-1 text-base font-medium text-gray-700 hover:text-gray-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="flex">
                    <Link
                      href={item.href || "#"}
                      className="block text-lg font-medium hover:text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

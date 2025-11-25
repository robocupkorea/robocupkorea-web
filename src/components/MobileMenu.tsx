"use client";

import {
  CaretDownIcon,
  DotOutlineIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";

interface MenuItem {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

interface MobileMenuProps {
  menuItems: MenuItem[];
  hasNewNotice: boolean;
}

export default function MobileMenu({
  menuItems,
  hasNewNotice,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(true);
  const locale = useLocale();

  // 현재 경로 가져오기
  const pathname = usePathname();

  // 현재 경로가 메뉴 아이템과 일치하는지 확인하는 함수
  const isActive = (href: string) => {
    // locale prefix 제거
    const pathWithoutLocale = pathname.replace(
      /^\/[a-z]{2}(?:-[A-Z]{2})?(?=\/|$)/,
      "",
    );

    if (href === "/") return pathWithoutLocale === "/";
    return pathWithoutLocale.startsWith(href);
  };

  // 경로가 변경될 때 메뉴 닫기
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 키보드로 메뉴 닫기
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

      <nav
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
                      className={`flex cursor-default cursor-pointer items-center gap-2 text-lg ${
                        item.submenu.some((subItem) =>
                          isActive(subItem.href || ""),
                        )
                          ? "font-bold"
                          : "font-medium group-hover:text-gray-600"
                      }`}
                    >
                      <span>{locale === "en" ? item.name[0] : item.name}</span>
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
                            className={`block py-1 text-base text-gray-700 hover:text-gray-600 ${
                              isActive(subItem.href || "")
                                ? "font-bold"
                                : "font-medium"
                            }`}
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
                      className={`relative block text-lg hover:text-gray-700 ${
                        isActive(item.href || "")
                          ? "font-bold"
                          : "font-medium hover:text-gray-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                      {item.href === "/notices" ? (
                        hasNewNotice ? (
                          <span className="absolute -right-[20px] -top-[10px] text-red-600">
                            <DotOutlineIcon size={28} weight="fill" />
                          </span>
                        ) : null
                      ) : null}
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

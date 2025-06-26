"use client";

import { ArrowUpRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useLocale, useMessages } from "next-intl";

import rckaLogo from "@/assets/images/rcka-logo.png";
import robocupLogo from "@/assets/images/robocup-logo.png";
import LocaleSelector from "@/components/LocaleSelector";
import MobileMenu from "@/components/MobileMenu";
import { Link, usePathname } from "@/i18n/navigation";
import { MenuItem } from "@/types/menu-item";

export default function Header() {
  const locale = useLocale();
  const messages = useMessages();

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

  return (
    <header className="sticky top-0 z-50 h-16 w-full min-w-[375px] border-b border-gray-200 bg-white md:h-20">
      <div className="container mx-auto h-full max-w-7xl px-4 md:px-8 xl:px-20">
        <nav className="flex h-full items-center justify-between">
          <div className="flex h-full items-center gap-10">
            <div>
              <Link href="/" className="flex items-center">
                <Image
                  src={rckaLogo}
                  alt="Logo"
                  className="h-14 w-auto md:h-[70px]"
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <ul className="flex items-center">
                {messages.menu.map((item: MenuItem) => (
                  <li key={item.name} className="group relative">
                    {item.submenu ? (
                      <div className="relative">
                        <button
                          type="button"
                          className={`flex w-full cursor-pointer items-center gap-1 px-2.5 py-3 ${
                            item.submenu.some((subItem) =>
                              isActive(subItem.href || ""),
                            )
                              ? "font-bold"
                              : "font-medium group-hover:text-gray-600"
                          }`}
                        >
                          {locale === "en" ? (
                            <>
                              <span className="hidden lg:inline">
                                {item.name[0]}
                              </span>
                              <span className="lg:hidden">{item.name[1]}</span>
                            </>
                          ) : (
                            <span>{item.name}</span>
                          )}
                          <CaretDownIcon size={16} weight="bold" />
                        </button>
                        <ul className="absolute left-0 top-full hidden w-32 border border-gray-200 bg-white py-2 shadow-lg group-hover:block">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href || "#"}
                                className={`block border-l px-4 py-2 text-sm hover:border-gray-900 hover:bg-gray-50 ${
                                  isActive(subItem.href || "")
                                    ? "border-l border-gray-900 bg-gray-50 font-bold"
                                    : "border-transparent font-medium"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`px-2.5 py-3 ${
                          isActive(item.href || "")
                            ? "font-bold"
                            : "font-medium hover:text-gray-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex h-full items-center gap-2">
            <a
              href="https://www.robocup.org"
              target="_blank"
              rel="noreferrer"
              className="group relative hover:opacity-80"
            >
              <Image
                src={robocupLogo}
                alt="RoboCup International Federation"
                className="h-9 w-auto md:h-10"
              />
              <ArrowUpRightIcon
                size={12}
                weight="bold"
                className="absolute -right-0.5 top-0 bg-gray-100 text-gray-500 group-hover:opacity-80"
              />
            </a>

            <LocaleSelector />

            <MobileMenu menuItems={messages.menu} />
          </div>
        </nav>
      </div>
    </header>
  );
}

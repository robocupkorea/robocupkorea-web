"use client";

import {
  CaretDownIcon,
  GlobeIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import rckaLogo from "@/assets/images/rcka-logo.png";
import robocupLogo from "@/assets/images/robocup-logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 모바일 메뉴
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(true); // 모바일 메뉴 하위 메뉴

  const menuItems = [
    {
      name: "한국로보컵협회",
      submenu: [
        { name: "소개", href: "/about" },
        { name: "위원회", href: "/committee" },
        { name: "연혁", href: "/history" },
        { name: "후원", href: "/sponsors" },
      ],
    },
    { name: "로보컵 리그", href: "/leagues" },
    { name: "로보컵 대회", href: "/events" },
    { name: "공지사항", href: "/notices" },
  ];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false); // Esc 키로 모바일 메뉴 닫기
    }

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // 모바일 메뉴 열렸을 시 스크롤 잠금
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 h-16 w-full min-w-[320px] border-b border-gray-200 bg-white md:h-20">
      <div className="container mx-auto h-full max-w-7xl px-4 md:px-8 xl:px-20">
        <nav className="flex h-full items-center justify-between">
          <div className="flex h-full items-center gap-10">
            <div>
              <Link href="/" className="flex items-center">
                <Image
                  src={rckaLogo}
                  alt="logo"
                  className="h-14 w-auto md:h-[70px]"
                />
              </Link>
            </div>

            <div className="hidden md:block">
              <ul className="flex items-center">
                {menuItems.map((item) => (
                  <li key={item.name} className="group relative">
                    {item.submenu ? (
                      <div className="relative">
                        <button
                          type="button"
                          className="flex w-full cursor-pointer items-center gap-1 px-2.5 py-3 font-medium group-hover:text-gray-600"
                        >
                          {item.name}
                          <CaretDownIcon size={16} weight="bold" />
                        </button>
                        <ul className="absolute left-0 top-full hidden w-32 border border-gray-200 bg-white py-2 shadow-lg group-hover:block">
                          {item.submenu.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                className="block border-l border-transparent px-4 py-2 text-sm font-medium hover:border-gray-900 hover:bg-gray-50"
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="px-2.5 py-3 font-medium hover:text-gray-600"
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
              className="rounded-full border bg-gray-50 px-1 py-0.5 hover:opacity-80"
            >
              <Image
                src={robocupLogo}
                alt="RoboCup International Federation"
                className="h-8 w-auto md:h-10"
              />
            </a>

            <div className="group relative">
              <button type="button" className="py-1">
                <GlobeIcon
                  weight="thin"
                  className="h-8 w-8 cursor-pointer hover:text-gray-500 md:h-10 md:w-10"
                />
              </button>
              <ul className="absolute right-0 top-full hidden w-20 border border-gray-200 bg-white py-2 shadow-lg group-hover:block">
                <li>
                  <button className="block w-full border-l border-transparent px-3 py-2 text-left text-sm font-medium hover:border-gray-900 hover:bg-gray-50">
                    한국어
                  </button>
                </li>
                <li>
                  <button className="block w-full border-l border-transparent px-3 py-2 text-left text-sm font-medium hover:border-gray-900 hover:bg-gray-50">
                    English
                  </button>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? (
                <XIcon size={32} weight="thin" />
              ) : (
                <ListIcon size={32} weight="thin" />
              )}
            </button>
          </div>
        </nav>
      </div>

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
                      href={item.href}
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
    </header>
  );
}

import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { getMessages } from "next-intl/server";

import rckaLogo from "@/assets/images/rcka-logo.png";
import robocupLogo from "@/assets/images/robocup-logo.png";
import LocaleSelector from "@/components/LocaleSelector";
import MobileMenu from "@/components/MobileMenu";
import { Link } from "@/i18n/navigation";
import { MenuItem } from "@/types/menuItem";

export default async function Header() {
  const messages = await getMessages();

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
                {messages.menu.map((item: MenuItem) => (
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
                                href={subItem.href || "#"}
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
                        href={item.href || "#"}
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

            <LocaleSelector />

            <MobileMenu menuItems={messages.menu} />
          </div>
        </nav>
      </div>
    </header>
  );
}

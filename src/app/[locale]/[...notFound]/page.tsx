import { getMessages } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFoundCatchAll() {
  const { notFound } = await getMessages();

  return (
    <>
      <div className="container mx-auto max-w-3xl px-4 py-24 md:px-8 xl:px-20">
        <div className="text-center">
          <h1 className="break-keep text-3xl font-bold text-gray-900">
            {notFound.default.title}
          </h1>
          <p className="mt-4 break-keep text-lg text-gray-800">
            {notFound.default.desc}
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="mt-6 flex h-12 items-center justify-center gap-1.5 border border-gray-900 bg-white px-6 font-medium text-black hover:bg-gray-100"
          >
            {notFound.default.back}
          </Link>
        </div>
      </div>
    </>
  );
}

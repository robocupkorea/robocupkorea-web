import { getMessages } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const { notFound } = await getMessages();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {notFound.notices.title}
        </h1>
        <p className="mt-4 text-gray-600">{notFound.notices.desc}</p>
        <Link
          href="/notices"
          className="mt-6 inline-block bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          {notFound.notices.back}
        </Link>
      </div>
    </div>
  );
}

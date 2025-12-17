import { getMessages } from "next-intl/server";

import PageContainer from "@/components/PageContainer";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const { notFound } = await getMessages();

  return (
    <PageContainer>
      <section className="container mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <h1
            id="not-found-heading"
            className="text-2xl font-bold text-gray-900"
          >
            {notFound.leagues.title}
          </h1>
          <p className="mt-4 text-gray-600">{notFound.leagues.desc}</p>
          <Link
            href="/leagues"
            className="mt-6 inline-block bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {notFound.leagues.back}
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

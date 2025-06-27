import Image from "next/image";
import { getMessages } from "next-intl/server";

export async function generateMetadata() {
  const { about } = await getMessages();

  return {
    title: about.meta.title,
    description: about.meta.description,
  };
}

export default async function About() {
  const { about } = await getMessages();

  return (
    <>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="break-keep text-4xl font-bold text-gray-900">
              {about.title}
            </h1>
            <p className="mt-4 break-keep text-lg text-gray-800">
              {about.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">
            {about.chairperson.section}
          </p>
          <h2 id="chairperson-heading" className="text-3xl font-bold">
            {about.chairperson.title}
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex flex-col items-center">
              <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-4 border-gray-200">
                <Image
                  src="https://media.robocupkorea.org/images/organization/chairperson/portrait.png"
                  alt="Portrait"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                {about.chairperson.name}
              </h3>
            </div>

            <div className="flex-1 text-left">
              <div className="space-y-4 break-keep px-4 leading-relaxed text-gray-700">
                {about.chairperson.message.map(
                  (paragraph: string, index: number) => (
                    <p
                      key={index}
                      className={
                        index === about.chairperson.message.length - 1
                          ? "font-semibold"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">
            {about.robocup.section}
          </p>
          <h2 id="robocup-heading" className="break-keep text-3xl font-bold">
            {about.robocup.title}
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <div className="mx-auto max-w-2xl space-y-5 break-keep leading-relaxed text-gray-700">
            {about.robocup.description.map(
              (paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ),
            )}
            <p>
              <a
                href="https://www.robocup.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline hover:text-blue-800"
              >
                robocup.org ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">
            {about.video.section}
          </p>
          <h2 id="video-heading" className="break-keep text-3xl font-bold">
            {about.video.title}
          </h2>
        </div>

        <div className="mb-8">
          <iframe
            className="aspect-video w-full rounded"
            src="https://www.youtube.com/embed/xeAO09prmV8?si=mb_LYKthwrrIIGcL&amp;controls=1"
            title={about.video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
          <p className="break-keep font-semibold text-black">
            {about.video.eventTitle}{" "}
            <span className="font-normal text-gray-600">
              ({about.video.eventDate})
            </span>
          </p>
          {about.video.description.map((paragraph: string, index: number) => (
            <p key={index} className="mt-2 break-keep">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

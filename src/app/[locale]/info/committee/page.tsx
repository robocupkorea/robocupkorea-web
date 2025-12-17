import { getLocale, getMessages } from "next-intl/server";

import CommitteeMemberCard from "@/components/CommitteeMemberCard";
import EmailCopyBox from "@/components/EmailCopyBox";
import PageContainer from "@/components/PageContainer";
import { committeeMemberData } from "@/data/committee-member-data";

export async function generateMetadata() {
  const { committee } = await getMessages();

  return {
    title: committee.meta.title,
    description: committee.meta.description,
  };
}

export default async function CommitteePage() {
  const locale = await getLocale();

  const { committee } = await getMessages();

  const members = committeeMemberData.filter(
    (member) => member.locale === locale,
  );

  return (
    <PageContainer>
      <header className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <h1 className="mb-4 break-keep text-4xl font-bold">
              {committee.title}
            </h1>
            <p className="mx-auto max-w-2xl break-keep leading-relaxed text-gray-700">
              {committee.subtitle}
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 break-keep text-gray-500">
            {committee.members.section}
          </p>
          <h2 id="members-heading" className="break-keep text-3xl font-bold">
            {committee.members.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {members.map((member) => (
            <CommitteeMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="mb-12 text-center">
            <p className="text-md mb-2 break-keep text-gray-500">
              {committee.contact.section}
            </p>
            <h2
              id="contact-heading"
              className="break-keep text-3xl font-bold text-gray-900"
            >
              {committee.contact.title}
            </h2>
          </div>

          <div className="text-center">
            <p className="mx-auto mb-8 max-w-2xl break-keep leading-relaxed text-gray-700">
              {committee.contact.description}
            </p>
            <EmailCopyBox
              email={committee.contact.email}
              copyText={committee.contact.copyText}
              copySuccess={committee.contact.copySuccess}
              copyError={committee.contact.copyError}
            />
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

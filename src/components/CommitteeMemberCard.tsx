import { BuildingIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";

import type { CommitteeMember } from "@/types/committee-member";

export default function CommitteeMemberCard({
  member,
}: {
  member: CommitteeMember;
}) {
  return (
    <article className="relative h-full w-full border bg-white p-6">
      <div className="mb-6 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <UserIcon size={32} weight="light" className="text-gray-600" />
        </div>
      </div>

      <div className="text-center">
        <h3
          id={`member-${member.id}-name`}
          className="mb-2 text-xl font-semibold text-gray-900"
        >
          {member.name}
        </h3>
        <p className="mb-4 text-sm font-medium text-gray-500">
          {member.position}
        </p>
      </div>

      <div className="flex items-start justify-center gap-2">
        <div>
          <BuildingIcon
            size={16}
            weight="light"
            className="mt-0.5 text-gray-500"
          />
        </div>

        <p className="break-keep text-sm leading-relaxed text-gray-500">
          {member.affiliation}
        </p>
      </div>
    </article>
  );
}

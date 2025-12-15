import { GraduationCapIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";

import { LearningCenter } from "@/generated/prisma";

export default function LearningCenterItem({
  learningCenter,
}: {
  learningCenter: LearningCenter;
}) {
  return (
    <article
      key={learningCenter.id}
      className="relative h-full w-full border bg-white"
    >
      <div className="relative h-48 w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white p-6 shadow-lg">
            <GraduationCapIcon size={32} className="text-gray-600" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2">
          <p className="break-keep text-sm font-medium tracking-wide text-gray-500">
            {learningCenter.alias}
          </p>
          <h3
            id={`learning-center-${learningCenter.id}-title`}
            className="mt-0.5 line-clamp-2 break-keep text-xl font-bold text-gray-900"
          >
            {learningCenter.name}
          </h3>
        </div>

        <div className="flex items-start gap-2">
          <MapPinIcon
            size={16}
            className="mt-0.5 flex-shrink-0 text-gray-400"
          />
          <p className="line-clamp-2 break-keep text-sm leading-relaxed text-gray-600">
            {learningCenter.address}
          </p>
        </div>
      </div>
    </article>
  );
}

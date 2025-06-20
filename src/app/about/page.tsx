import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              한국로보컵협회 소개
            </h1>
            <p className="mt-4 text-lg text-gray-800">
              로봇 교육의 미래를 이끄는 한국로보컵협회의 목표와 활동을
              소개합니다
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">회장 소개</p>
          <h2 className="text-3xl font-bold">인사말</h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <div className="flex flex-col items-center">
              <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-4 border-gray-200">
                <Image
                  src="https://media.robocupkorea.org/images/organization/chairperson/portrait.png"
                  alt="portrait"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                한상용 회장
              </h3>
            </div>

            <div className="flex-1 text-left">
              <div className="space-y-4 break-keep px-4 leading-relaxed text-gray-700">
                <p>
                  사단법인 한국로보컵협회(이하 RCKA)는 로봇을 연구하는 학생들을
                  위한 지역, 국가 및 국제 로봇 이벤트를 수행하는 프로젝트 중심의
                  교육 증진 운동입니다.
                </p>
                <p>
                  한국로보컵협회 홈페이지를 방문해 주신 고객 여러분께 깊이
                  감사드립니다.
                </p>
                <p>
                  로보컵 리그의 설립 목적은 양질의 다양한 로봇 교육 제공에
                  있습니다.
                </p>
                <p>
                  RCKA는 참된 로봇 교육에 뜻을 같이하는 교육 관련 종사자와
                  자원봉사자들로 구성된 비영리 기관입니다.
                </p>
                <p>
                  RCKA는 도전, 협동 및 경쟁 측면 등 교육에 필요한 여러 가지를
                  모두 제공합니다. 어린 학생들의 경우 RCKA를 통하여 직접 여러
                  로봇 분야 - 전자, 하드웨어와 소프트웨어 등에 대한 기술 능력을
                  키울 수 있는 기회를 제공합니다. 아울러 친구들과 함께 기술을
                  공유하면서 팀워크에 대해 배울 수 있는 동기 부여와 경험할 수
                  있는 새로운 방법을 제시합니다.
                </p>
                <p>
                  RCKA는 다양한 참가자들이 우수한 로봇 개발이라는 공동의 목표를
                  달성할 수 있는 팀으로 함께 연구할 수 있는 기회를 제공합니다.
                </p>
                <p>
                  여러분의 끊임없는 격려와 관심으로 성원해 주시길 부탁드립니다.
                </p>
                <p className="font-semibold">감사합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">로보컵 소개</p>
          <h2 className="text-3xl font-bold">로보컵 리그의 주요 활동과 목표</h2>
        </div>

        <div className="flex flex-col items-center gap-8 text-center">
          <div className="mx-auto max-w-2xl space-y-5 break-keep leading-relaxed text-gray-700">
            <p>
              <span className="font-semibold text-black">로보컵(RoboCup)</span>
              은 로봇 공학과 인공지능 분야에서 세계적으로 가장 권위 있는 대회 중
              하나로, 교육과 연구의 장을 마련하고자 시작되었습니다.
            </p>
            <p>
              참가자들은 실제 환경에서 문제 해결 능력, 협업 역량, 기술 구현
              능력을 키우며, 미래 로봇공학의 주역으로 성장하게 됩니다.
            </p>
            <p>
              로보컵은 경쟁을 넘어서{" "}
              <span className="font-medium text-black">공유와 학습</span>의
              문화를 지향하며, 다양한 리그와 과제를 통해 참여자들의 창의성과
              기술력을 이끌어냅니다.
            </p>
            <p>더 많은 정보는 공식 홈페이지에서 확인하실 수 있습니다.</p>
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
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8 xl:px-20">
        <div className="mb-12 text-center">
          <p className="text-md mb-2 text-gray-500">대회 영상</p>
          <h2 className="text-3xl font-bold">
            제1회 한국로보컵 주니어 대회 현장 스케치
          </h2>
        </div>

        <div className="mb-8">
          <iframe
            className="aspect-video w-full rounded"
            src="https://www.youtube.com/embed/xeAO09prmV8?si=mb_LYKthwrrIIGcL&amp;controls=1"
            title="제1회 한국로보컵 주니어 대회 영상"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="mx-auto max-w-3xl text-center leading-relaxed text-gray-700">
          <p className="font-semibold text-black">
            제1회 한국로보컵 주니어 대회{" "}
            <span className="font-normal text-gray-600">
              (2013년 3월 10일, 롯데백화점 평촌점)
            </span>
          </p>
          <p className="mt-2">
            국내 최초로 개최된 로보컵 리그 공식 인증 대회로, 전국의 학생들과
            연구자들이 참여해 로봇과 인공지능의 가능성을 선보인 뜻깊은
            자리였습니다.
          </p>
          <p className="mt-4">
            다양한 리그와 미션을 통해 창의력과 기술력을 발휘한 참가자들의 생생한
            모습을 영상으로 만나보세요.
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import WelcomeModal from "./WelcomeModal";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <WelcomeModal />
      {children}
    </>
  );
}

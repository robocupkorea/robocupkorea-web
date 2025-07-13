"use client";

import WelcomeModal from "@/components/WelcomeModal";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      {children}
      <WelcomeModal />
    </>
  );
}

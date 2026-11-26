import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main
      id="main-content"
      className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8"
    >
      {children}
    </main>
  );
}

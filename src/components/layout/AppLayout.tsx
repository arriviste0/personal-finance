import type React from "react";
import Header from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      {/* Optional Footer can be added here */}
    </div>
  );
}

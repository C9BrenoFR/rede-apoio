
import { SiteFooter, SiteNavBar } from "@/components/public/site-headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavBar />
      {children}
      <SiteFooter />
    </div>
  );
}

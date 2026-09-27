import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import LiveSalesPopup from "@/components/LiveSalesPopup";
import AuroraBackground from "@/components/AuroraBackground";
import { getConfig } from "@/app/actions/configActions";

export default async function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();
  
  return (
    <div className="flex flex-col min-h-screen pt-16 relative">
      <AuroraBackground config={config} />
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <FloatingChat config={config} />
      <LiveSalesPopup />
    </div>
  );
}




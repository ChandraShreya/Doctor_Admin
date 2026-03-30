
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { AnyARecord } from "node:dns";

export default function LayoutWrapper({ children}:any) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hideNavbar = pathname === "/";
  if (hideNavbar) return <>{children}</>;

  return (
    <div className="relative min-h-screen bg-[#f8f9fe] dark:bg-[#020617] overflow-hidden">

      
      <div
        className="absolute top-0 left-0 w-full h-[320px] pointer-events-none dark:hidden"
        style={{
          background: `
            linear-gradient(
              to bottom,
              #5e72e4 0%,
              #5e72e4 40%,
              rgba(94,114,228,0.6) 70%,
              rgba(94,114,228,0.25) 85%,
              rgba(248,249,254,0.9) 95%,
              #f8f9fe 100%
            )
          `,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-[320px] bg-[#020617] hidden dark:block" />

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>{sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}


      {/* MAIN CONTENT */}
      <main className="lg:ml-[17rem] mr-4 lg:mr-6 relative">

        <Navbar setOpen={setSidebarOpen}/>

        {/* CONTENT */}
        <div className="px-8 pt-8 pb-10">
          {children}
        </div>

      </main>
    </div>
  );
}
// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "../navbar/navbar";
// import Sidebar from "../sidebar/sidebar";

// export default function LayoutWrapper({ children }) {
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const hideNavbar = pathname === "/";

//   if (hideNavbar) return <>{children}</>;

//   return (
//     <div className="min-h-screen bg-[#f8f9fe]">
//       <div className="fixed top-0 left-0 w-full h-72 bg-[#5e72e4]"></div>

      

//       <Sidebar />

//       <main className="ml-[17rem] mr-6 relative">
//         <Navbar />

//         <div className="px-8 pb-10 pt-6">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }



// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "../navbar/navbar";
// import Sidebar from "../sidebar/sidebar";

// export default function LayoutWrapper({ children }) {
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const hideNavbar = pathname === "/";

//   if (hideNavbar) return <>{children}</>;

//   return (
//     <div className="min-h-screen bg-[#f8f9fe] dark:bg-slate-900 transition-colors duration-300">

//       {/* 🔥 Blue background ONLY in light mode */}
//       <div className="fixed top-0 left-0 w-full h-72 
//         bg-[#5e72e4] 
//         dark:hidden"
//       ></div>

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <main className="ml-[17rem] mr-6 relative">

//         {/* Navbar */}
//         <Navbar />

//         {/* Page Content */}
//         <div className="px-8 pb-10 pt-6">
//           {children}
//         </div>

//       </main>
//     </div>
//   );
// }



"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const hideNavbar = pathname === "/";
  if (hideNavbar) return <>{children}</>;

  return (
    <div className="relative min-h-screen bg-[#f8f9fe] dark:bg-[#020617] overflow-hidden">

      {/* 🔵 LIGHT MODE GRADIENT (PERFECTLY BLENDED) */}
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

      {/* 🌙 DARK MODE — PURE CLEAN BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-[#020617] hidden dark:block" />

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="ml-[17rem] mr-6 relative">

        <Navbar />

        {/* CONTENT */}
        <div className="px-8 pt-8 pb-10">
          {children}
        </div>

      </main>
    </div>
  );
}
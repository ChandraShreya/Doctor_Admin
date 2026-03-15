// "use client";

// import { usePathname } from "next/navigation";
// import Navbar from "../navbar/navbar";
// import Sidebar from "../sidebar/sidebar";

// export default function LayoutWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   const pathname = usePathname();

//   const hideNavbar = pathname === "/";

//   if (hideNavbar) return <>{children}</>;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right section */}
//       <div className="flex flex-col flex-1 ml-72">

//         {/* Navbar */}
//         <Navbar />

//         {/* Page Content */}
//         <div className="p-6 flex-1">
//           {children}
//         </div>

//       </div>

//     </div>
//   );
// }



"use client";

import { usePathname } from "next/navigation";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function LayoutWrapper({ children }) {

  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  if (hideNavbar) return <>{children}</>;

  return (

    <div className="min-h-screen bg-[#f8f9fe]">

      {/* Blue Header Background */}
      <div className="fixed top-0 left-0 w-full h-72 bg-[#5e72e4]"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <main className="ml-[17rem] mr-6 relative">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="px-8 pb-10 pt-6">
          {children}
        </div>

      </main>

    </div>
  );
}
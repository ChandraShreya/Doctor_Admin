// "use client";

// import { useRouter } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBell,
//   faRightFromBracket,
//   faMagnifyingGlass,
// } from "@fortawesome/free-solid-svg-icons";
// import { Cookies } from "react-cookie";

// export default function Navbar() {




//   return (
//     <div className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 mx-6 mt-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">

//       {/* LEFT SIDE */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-800">
//           Doctor Admin Panel
//         </h2>
//         <p className="text-sm text-blue-500">
//           Manage hospital departments
//         </p>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex items-center gap-6">

//         {/* Search */}
//         <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-72">
//           <FontAwesomeIcon
//             icon={faMagnifyingGlass}
//             className="text-gray-400 mr-2"
//           />
//           <input
//             type="text"
//             placeholder="Quick search..."
//             className="bg-transparent outline-none w-full text-sm"
//           />
//         </div>

//         {/* Notification */}
//         <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
//           <FontAwesomeIcon icon={faBell} />
//         </div>

//         {/* Profile */}
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
//             A
//           </div>

//           <div className="text-sm">
//             <p className="font-medium text-gray-800">Admin</p>
//             <p className="text-gray-400 text-xs">Administrator</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";

export default function Navbar() {
  const router = useRouter();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    router.push("/signIn");
  };

  return (
    <div className="relative top-0 z-40 flex items-center justify-between px-6 py-3 mx-6 mt-4 text-white backdrop-blur-sm">

      {/* LEFT SIDE */}
      <div>
        <h2 className="text-sm font-semibold tracking-wide text-white">
          Doctor Admin Panel
        </h2>
        <p className="text-xs text-white/80">
          Manage hospital departments
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* Admin Avatar */}
        <div className="w-9 h-9 bg-white text-[#5e72e4] flex items-center justify-center rounded-full font-semibold shadow">
          A
        </div>

        {/* Admin Info */}
        <div className="text-xs leading-tight">
          <p className="font-semibold text-white">Admin</p>
          <p className="text-white/70">Administrator</p>
        </div>

      </div>

    </div>
  );
}
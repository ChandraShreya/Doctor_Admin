// "use client";

// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHeartbeat,
//   faGauge,
//   faBuilding,
//   faUserDoctor,
//   faCalendarCheck,
//   faGear,
//   faRightFromBracket,
//   faChevronRight,
//   faBell,
//   faStethoscope,
// } from "@fortawesome/free-solid-svg-icons";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { logOut } from "@/redux/slice/authSlice";
// import { confirmLogout } from "../sweetAlert/confirmLogOut";


// export default function Sidebar() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const pathname = usePathname()
//   const dispatch = useDispatch()
//   const router = useRouter()

//   const navItems = [
//     {
//       id: "dashboard",
//       label:"Overview",
//       path:"/dashboard",
//       icon: faGauge,
//     },
//     {
//       id: "departments",
//       label:"Department",
//       path:"/department",
//       icon: faBuilding,
//       // badge: "4",
//     },
//     {
//       id: "doctors",
//       label:"Doctors",
//       path:"/doctor",
//       icon: faUserDoctor,
//     },
//     {
//       id: "appointments",
//       label:"Appointments",
//       path:"/appointment",
//       icon: faCalendarCheck,
//     },
//   ];


// const handleLogout = async () => {

//   const confirmed = await confirmLogout();

//   if (!confirmed) return;

//   const res = await dispatch(logOut());

//   router.push("/");
// };

//   return (
//     <div className="fixed inset-y-0 left-0 w-72 my-4 ml-4 bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col justify-between overflow-y-auto">

//       {/* Logo Section */}
//       <div className="px-5 pt-7 pb-12">

//         <div className="flex items-center gap-3">

//           <div className="relative w-10 h-10">

//             <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md"></div>

//             <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow">
//               <FontAwesomeIcon icon={faStethoscope} className="text-white text-xl" />
//             </div>

//           </div>

//           <div>
//             <p className="text-slate-800 text-xl font-semibold tracking-tight">
//               MediCore
//             </p>

//             <p className="text-blue-600 text-xs pb-2 uppercase tracking-widest">
//               Pro Admin
//             </p>
//           </div>

//         </div>

//         <div className="mt-5 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

//       </div>

//       {/* Navigation Label */}
//       <div className="px-5">
//         <p className="text-xs text-slate-400 pb-4 uppercase tracking-wider font-medium">
//           Navigation
//         </p>
//       </div>

//       {/* Navigation Items */}
//       <nav className="px-3 mt-4  flex-1 space-y-5">

//         {navItems.map((item) => {
//           const isActive = pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               href={item.path}
//               onClick={() => setActivePage(item.id)}
//               className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl  transition-all duration-200 group relative
              
//               ${
//                 isActive
//                   ? "bg-[var(--primary-soft)] border border-backdrop-100 text-blue-700 shadow-sm backdrop-blur-sm"
//                   : "text-slate-600 hover:bg-blue-50/30"
//               }
              
//               `}
//             >

//               {isActive && (
//                 <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full"></span>
//               )}

//               {/* Icon */}
//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition
//                 ${
//                   isActive
//                     ? "bg-[var(--primary)] text-white"
//                     : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
//                 }
//                 `}
//               >
//                 <FontAwesomeIcon icon={item.icon} className="text-xl" />
//               </div>

//               {/* Label */}
//               <span className="text-m font-medium flex-1 text-left">
//                 {item.label}
//               </span>

//               {item.badge && isActive && (
//                 <span className="text-xs bg-blue-200 text-blue-700 px-1 rounded font-medium">
//                   {item.badge}
//                 </span>
//               )}

//               {isActive && (
//                 <FontAwesomeIcon
//                   icon={faChevronRight}
//                   className="text-blue-600 text-xs"
//                 />
//               )}

//             </Link>
//           );
//         })}

//       </nav>

//       {/* Bottom Section */}
//       <div className="px-3 pb-6 space-y-2">

//         <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-2 mb-3"></div>

//         {/* Settings */}
//         <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition">

//           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
//             <FontAwesomeIcon icon={faGear} className="text-blue-600 text-xs" />
//           </div>

//           <span className="text-m font-medium">
//             Settings
//           </span>

//         </button>

//         {/* Logout */}
//         <button 
//         onClick={handleLogout}
//         className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition">

//           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
//             <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
//           </div>

//           <span className="text-m font-medium">
//             Logout
//           </span>

//         </button>

//         {/* Admin Card */}
//         <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center gap-3 shadow-sm">

//           <div className="relative">
//             <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
//               A
//             </div>

//             <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white"></span>
//           </div>

//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold text-slate-800 truncate">
//                Admin
//             </p>

//             <p className="text-xs text-blue-600 truncate">
//               admin@gmail.com
//             </p>
//           </div>

//           <FontAwesomeIcon
//             icon={faBell}
//             className="text-blue-400 hover:text-blue-600 text-xs cursor-pointer"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faBuilding,
  faUserDoctor,
  faCalendarCheck,
  faGear,
  faRightFromBracket,
  faChevronRight,
  faBell,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slice/authSlice";
import { confirmLogout } from "../sweetAlert/confirmLogOut";

export default function Sidebar() {
  const [activePage, setActivePage] = useState("dashboard");
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const navItems = [
    {
      id: "dashboard",
      label: "Overview",
      path: "/dashboard",
      icon: faGauge,
      color: "text-blue-600",
    },
    {
      id: "departments",
      label: "Department",
      path: "/department",
      icon: faBuilding,
      color: "text-purple-600",
    },
    {
      id: "doctors",
      label: "Doctors",
      path: "/doctor",
      icon: faUserDoctor,
      color: "text-emerald-600",
    },
    {
      id: "appointments",
      label: "Appointments",
      path: "/appointment",
      icon: faCalendarCheck,
      color: "text-orange-500",
    },
  ];

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) return;

    await dispatch(logOut());
    router.push("/");
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 my-6 ml-6 bg-white rounded-xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] border border-slate-200 flex flex-col justify-between overflow-y-auto">

      {/* Logo Section */}
      <div className="px-5 pt-6 pb-6">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-[#5e72e4] flex items-center justify-center shadow">
            <FontAwesomeIcon icon={faStethoscope} className="text-white text-sm" />
          </div>

          <div>
            <p className="text-slate-700 text-lg font-semibold">
              MediCore
            </p>

            <p className="text-[#5e72e4] text-[10px] uppercase tracking-wide">
              Pro Admin
            </p>
          </div>

        </div>

        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

      </div>


      {/* Navigation Label */}
      <div className="px-5">
        <p className="text-[10px] text-slate-400 pb-2 uppercase tracking-wider font-medium">
          Navigation
        </p>
      </div>


      {/* Navigation Items */}
      <nav className="px-4 mt-2 flex-1 space-y-2">

        {navItems.map((item) => {

          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative
              
              ${
                isActive
                  ? "bg-[#eef2ff] text-[#5e72e4] shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }
              
              `}
            >

              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#5e72e4] rounded-r-full"></span>
              )}

              {/* Icon */}
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-sm ${item.color}`}
              />

              {/* Label */}
              <span className="text-sm font-medium flex-1">
                {item.label}
              </span>

              {isActive && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-[#5e72e4] text-[10px]"
                />
              )}

            </Link>
          );
        })}

      </nav>


      {/* Bottom Section */}
      <div className="px-4 pb-4 space-y-2">

        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-2 mb-2"></div>

        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition">

          <FontAwesomeIcon icon={faGear} className="text-slate-500 text-sm" />

          <span className="text-sm font-medium">
            Settings
          </span>

        </button>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
        >

          <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />

          <span className="text-sm font-medium">
            Logout
          </span>

        </button>


        {/* Admin Card */}
        <div className="mt-3 p-3 rounded-lg bg-[#f4f6ff] border border-blue-100 flex items-center gap-2 shadow-sm">

          <div className="w-8 h-8 rounded-md bg-[#5e72e4] text-white flex items-center justify-center text-xs font-bold">
            A
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">
              Admin
            </p>

            <p className="text-[10px] text-slate-500 truncate">
              admin@gmail.com
            </p>
          </div>

          <FontAwesomeIcon
            icon={faBell}
            className="text-slate-400 hover:text-[#5e72e4] text-[10px] cursor-pointer"
          />

        </div>

      </div>

    </div>
  );
}
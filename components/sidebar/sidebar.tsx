
"use client";

import { useEffect, useState } from "react";
import {
  Dashboard,
  Apartment,
  MedicalServices,
  EventNote,
  Logout,
  ChevronRight,
  DarkMode,
  Notifications,
  HealthAndSafety,
  LightMode,
  NightlightRound,
  LocationOn,
  LocalHospital
} from "@mui/icons-material";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slice/authSlice";
import {  confirmLogout, showLogoutSuccess } from "../sweetAlert/confirmLogOut";
import { UserRole } from "@/typescript";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

 

  const navItems = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: <Dashboard fontSize="small" />,
    },
    {
      label: "Department",
      path: "/department",
      icon: <Apartment fontSize="small" />,
    },
    {
      label: "Doctors",
      path: "/dashboard/doctors",
      icon: <MedicalServices fontSize="small" />,
    },
    {
      label: "Appointments",
      path: "/appointment",
      icon: <EventNote fontSize="small" />,
    },
        {
      label: "Location",
      path: "/location",
      icon: <LocationOn fontSize="small" />,
    },
  ];

  /* ---------- DARK MODE TOGGLE ---------- */

  const toggleDarkMode = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const darkNow = html.classList.contains("dark");
    setIsDark(darkNow);

    localStorage.setItem("theme", darkNow ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.documentElement;
    setIsDark(html.classList.contains("dark"));
  }, []);

  /* ---------- LOGOUT ---------- */

const handleLogout = async () => {
  const confirmed = await confirmLogout();
  if (!confirmed) return;

  await dispatch(logOut());

  showLogoutSuccess(); 

  setTimeout(() => {
    router.push("/");
  }, 1200);
};

  return (
    <div className="fixed inset-y-0 left-0 w-64 my-6 ml-6 bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-700 flex flex-col justify-between overflow-y-auto transition-colors">

      {/* Logo */}
      <div className="px-5 pt-6 pb-6">
        <Link href="/dashboard" className="flex items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#5e72e4] flex items-center justify-center">
              <LocalHospital className="text-white text-xs" />
            </div>

            <div>
              <p className="text-slate-700 dark:text-white text-lg font-semibold">
                Averon
              </p>
              <p className="text-[#5e72e4] text-[10px] uppercase">
                Pro Admin
              </p>
            </div>
          </div>

          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        </Link>

      </div>

      {/* Nav Label */}
      <div className="px-5">
        <p className="text-[10px] text-slate-400 pb-2 uppercase tracking-wider font-medium">
          Navigation
        </p>
      </div>

      {/* Nav Items */}
      <nav className="px-4 mt-2 flex-1 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition relative
                
                ${isActive
                  ? "bg-[#eef2ff] dark:bg-slate-800 text-[#5e72e4]"
                  : "text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#5e72e4] rounded-r-full"></span>
              )}

              <span className="text-slate-400 dark:text-slate-300">
                {item.icon}
              </span>

              <span className="text-sm font-medium flex-1">
                {item.label}
              </span>

              {isActive && (
                <ChevronRight className="text-[#5e72e4] text-[14px]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-4 space-y-3">

        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        {/* Dark Mode Toggle */}
        {/* Android 12 Style Toggle */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800">

          {/* Label */}
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>

          {/* Switch */}
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-7 flex items-center rounded-full transition-all duration-300
      ${isDark
                ? "bg-indigo-500"
                : "bg-slate-300"}
    `}
          >
            {/* Thumb */}
            <span
              className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300
        ${isDark ? "translate-x-6" : "translate-x-1"}
      `}
            />
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        >
          <Logout fontSize="small" />
          <span className="text-sm font-medium">Logout</span>
        </button>

        {/* Admin Card */}
        <div className="mt-2 p-3 rounded-lg bg-[#f4f6ff] dark:bg-slate-800 border border-blue-100 dark:border-slate-700 flex items-center gap-2">

          <div className="w-8 h-8 rounded-md bg-[#5e72e4] text-white flex items-center justify-center text-xs font-bold">
            A
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 dark:text-white truncate">
              Admin
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              admin@gmail.com
            </p>
          </div>

          <Notifications className="text-slate-400 dark:text-slate-300 text-[16px]" />
        </div>
      </div>
    </div>
  );
}
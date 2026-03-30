
"use client";

import { useRouter, usePathname } from "next/navigation";
import { Cookies } from "react-cookie";

export default function Navbar({ setOpen }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    router.push("/signIn");
  };

  /* ---------- PAGE CONFIG ---------- */

  const pageConfig = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Overview of your hospital",
    },
    "/appointment": {
      title: "Appointments",
      subtitle: "Manage patient bookings",
    },
    "/dashboard/doctors": {
      title: "Doctors",
      subtitle: "Manage doctor profiles",
    },
    "/department": {
      title: "Departments",
      subtitle: "Manage hospital departments",
    },
    "/location": {
      title: "locations",
      subtitle: "View and manage location",
    },
  };

  const currentPage =
    pageConfig[pathname] || {
      title: "Doctor Admin Panel",
      subtitle: "Manage hospital system",
    };

  return (
    <div className="relative top-0 z-40 flex items-center justify-between px-6 py-3 mx-6 mt-4 text-white backdrop-blur-sm">

      {/* LEFT SIDE */}
<div className="flex items-center gap-3">

  
  <button
  className="lg:hidden text-white text-xl"
  onClick={() => setOpen(true)}
>
  ☰
</button>

  <div>
    <h2 className="text-sm font-semibold tracking-wide text-white">
      {currentPage.title}
    </h2>
    <p className="text-xs text-white/80">
      {currentPage.subtitle}
    </p>
  </div>

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
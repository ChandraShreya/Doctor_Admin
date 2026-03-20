// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   acceptedAppointment,
//   appointmentList,
//   cancelAppointment,
//   confirmAppointment,
// } from "@/redux/slice/doctorSlice";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronRight,
//   faCalendarCheck,
//   faCircleCheck,
//   faClock,
//   faCircleXmark,
// } from "@fortawesome/free-solid-svg-icons";

// import AppointmentModal from "./appointmentmodal";
// import Skeleton from "@mui/material/Skeleton";
// import { toast } from "sonner";

// export default function AppointmentList() {

//   const dispatch = useDispatch();

//   const [filter, setFilter] = useState("all");
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const allDoctors = useSelector((state) => state.doctor.doctorList);
//   const appointments = useSelector((state) => state.doctor.appointmentList);
//   const loading = useSelector((state) => state.doctor.loading);

//   useEffect(() => {
//     dispatch(appointmentList());
//     dispatch(acceptedAppointment());
//   }, [dispatch]);

//   const handleConfirm = async (id) => {
//     try {
//       const response = await dispatch(confirmAppointment(id)).unwrap();

//       toast.success(response?.message || "Appointment confirmed successfully");

//       setSelectedAppointment(null);
//     } catch (error) {
//       toast.error("Failed to confirm appointment");
//     }
//   };

//   const handleCancel = async (id) => {
//     try {
//       const response = await dispatch(cancelAppointment(id)).unwrap();

//       toast.success(response?.message || "Appointment cancelled successfully");

//       setSelectedAppointment(null);
//     } catch (error) {
//       toast.error("Failed to cancel appointment");
//     }
//   };

//   /* ---------- STATS ---------- */

//   const totalAppointments = appointments?.length || 0;

//   const confirmed =
//     appointments?.filter((a) => a.status?.toLowerCase() === "confirmed")
//       .length || 0;

//   const pending =
//     appointments?.filter((a) => a.status?.toLowerCase() === "pending")
//       .length || 0;

//   const cancelled =
//     appointments?.filter((a) => a.status?.toLowerCase() === "cancelled")
//       .length || 0;

//   /* ---------- FILTER ---------- */

//   const filteredAppointments = appointments?.filter((a) => {
//     if (filter === "all") return true;
//     return a.status?.toLowerCase() === filter;
//   });

//   return (
//     <div className="space-y-6">

//       {/* ---------- STATS ---------- */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//         {loading ? (

//           Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-6 py-5">
//               <Skeleton width={120} height={14} />
//               <Skeleton width={60} height={30} />
//               <Skeleton width={80} height={12} />
//             </div>
//           ))

//         ) : (

//           <>
//             <StatCard title="Total Appointments" value={totalAppointments} note="Since today" icon={faCalendarCheck} iconColor="bg-indigo-500" />
//             <StatCard title="Confirmed" value={confirmed} note="Updated today" icon={faCircleCheck} iconColor="bg-emerald-500" />
//             <StatCard title="Pending" value={pending} note="Awaiting confirmation" icon={faClock} iconColor="bg-amber-500" />
//             <StatCard title="Cancelled" value={cancelled} note="Updated today" icon={faCircleXmark} iconColor="bg-red-500" />
//           </>
//         )}
//       </div>

//       {/* ---------- MAIN CARD ---------- */}

//       <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] border border-slate-200 dark:border-slate-700 overflow-hidden">

//         {/* FILTER HEADER */}

//         <div className="px-6 py-5 flex items-center">

//           <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-full p-1">

//             {["all", "pending", "cancelled"].map((type) => (
//               <button
//                 key={type}
//                 onClick={() => setFilter(type)}
//                 className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${filter === type
//                     ? "bg-[#5e72e4] text-white shadow"
//                     : "text-slate-500 dark:text-slate-300"
//                   }`}
//               >
//                 {type === "all"
//                   ? "All Appointments"
//                   : type.charAt(0).toUpperCase() + type.slice(1)}
//               </button>
//             ))}

//           </div>

//         </div>

//         {/* HEADER */}

//         <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-300 font-semibold px-6 py-4 uppercase">
//           <div className="col-span-5">Patient</div>
//           <div className="col-span-2">Doctor</div>
//           <div className="col-span-3">Date & Time</div>
//           <div className="col-span-1">Status</div>
//           <div className="col-span-1 text-right">View</div>
//         </div>

//         <div className="h-px bg-slate-100 dark:bg-slate-700"></div>

//         {/* ROWS */}

//         {loading ? (

//           Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="grid grid-cols-12 items-center px-6 py-5">
//               <div className="col-span-5 flex items-center gap-4">
//                 <Skeleton variant="circular" width={44} height={44} />
//                 <div>
//                   <Skeleton width={120} height={14} />
//                   <Skeleton width={80} height={12} />
//                 </div>
//               </div>
//               <div className="col-span-2"><Skeleton width={100} height={14} /></div>
//               <div className="col-span-3">
//                 <Skeleton width={120} height={14} />
//                 <Skeleton width={80} height={12} />
//               </div>
//               <div className="col-span-1"><Skeleton width={70} height={24} /></div>
//               <div className="col-span-1 flex justify-end">
//                 <Skeleton variant="circular" width={36} height={36} />
//               </div>
//             </div>
//           ))

//         ) : filteredAppointments?.length === 0 ? (

          
//           <div className="flex flex-col items-center justify-center py-16">

//             <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
//               <FontAwesomeIcon
//                 icon={faCalendarCheck}
//                 className="text-slate-400 text-xl"
//               />
//             </div>

//             <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
//               No appointments found
//             </p>

//             <p className="text-sm text-slate-400 mt-1">
//               {filter === "all"
//                 ? "There are no appointments yet."
//                 : `No ${filter} appointments available.`}
//             </p>

//           </div>

//         ) : (

//           filteredAppointments?.map((item) => (

//             <div
//               key={item._id}
//               className="grid grid-cols-12 items-center px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
//             >

//               {/* PATIENT */}
//               <div className="col-span-5 flex items-center gap-4">
//                 <div className="w-11 h-11 rounded-full bg-[#5e72e4] text-white flex items-center justify-center text-sm font-semibold">
//                   {item.name?.charAt(0)}
//                 </div>

//                 <div>
//                   <p className="text-sm font-semibold text-slate-700 dark:text-white">
//                     {item.name}
//                   </p>
//                   <p className="text-xs text-slate-400">Patient</p>
//                 </div>
//               </div>

//               {/* DOCTOR */}
//               <div className="col-span-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
//                 {allDoctors.find((d) => d._id === item.doctorId)?.name || "—"}
//               </div>

//               {/* DATE */}
//               <div className="col-span-3">
//                 <p className="text-sm text-slate-700 dark:text-white">
//                   {new Date(item.date).toLocaleDateString("en-IN", {
//                     day: "2-digit",
//                     month: "short",
//                     year: "numeric",
//                   })}
//                 </p>
//                 <p className="text-xs text-slate-400">{item.time}</p>
//               </div>

//               {/* STATUS */}
//               <div className="col-span-1">
//                 <StatusBadge status={item.status} />
//               </div>

//               {/* VIEW */}
//               <div className="col-span-1 flex justify-end">
//                 <button
//                   onClick={() => setSelectedAppointment(item)}
//                   className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center justify-center"
//                 >
//                   <FontAwesomeIcon icon={faChevronRight} className="text-blue-600 dark:text-blue-400" />
//                 </button>
//               </div>

//             </div>
//           ))
//         )}

//       </div>

//       <AppointmentModal
//         appointment={selectedAppointment}
//         onClose={() => setSelectedAppointment(null)}
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//       />

//     </div>
//   );
// }


// /* ---------- STAT CARD ---------- */

// function StatCard({ title, value, note, icon, iconColor }) {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] px-6 py-5 flex items-center justify-between border border-slate-200 dark:border-slate-700">

//       <div>
//         <p className="text-xs uppercase text-slate-400 font-semibold tracking-wide">
//           {title}
//         </p>

//         <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
//           {value}
//         </p>

//         <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">
//           {note}
//         </p>
//       </div>

//       <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconColor}`}>
//         <FontAwesomeIcon icon={icon} />
//       </div>

//     </div>
//   );
// }


// /* ---------- STATUS BADGE ---------- */

// function StatusBadge({ status }) {

//   const key = status?.toLowerCase().includes("confirm")
//     ? "confirmed"
//     : status?.toLowerCase().includes("cancel")
//       ? "cancelled"
//       : "pending";

//   const styles = {
//     confirmed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
//     pending: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
//     cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[key]}`}>
//       {status}
//     </span>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptedAppointment,
  appointmentList,
  cancelAppointment,
  confirmAppointment,
} from "@/redux/slice/doctorSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCalendarCheck,
  faCircleCheck,
  faClock,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import AppointmentModal from "./appointmentmodal";
import Skeleton from "@mui/material/Skeleton";
import { toast } from "sonner";

export default function AppointmentList() {

  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const allDoctors = useSelector((state) => state.doctor.doctorList);
  const appointments = useSelector((state) => state.doctor.appointmentList);
  const acceptedAppointments = useSelector(
    (state) => state.doctor.acceptedAppointments
  );
  const loading = useSelector((state) => state.doctor.loading);

  useEffect(() => {
    dispatch(appointmentList());
    dispatch(acceptedAppointment());
  }, [dispatch]);

  const handleConfirm = async (id) => {
    try {
      const response = await dispatch(confirmAppointment(id)).unwrap();
      toast.success(response?.message || "Appointment confirmed successfully");
      setSelectedAppointment(null);
    } catch {
      toast.error("Failed to confirm appointment");
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await dispatch(cancelAppointment(id)).unwrap();
      toast.success(response?.message || "Appointment cancelled successfully");
      setSelectedAppointment(null);
    } catch {
      toast.error("Failed to cancel appointment");
    }
  };

  /* ---------- STATS ---------- */

  const totalAppointments = appointments?.length || 0;

  const confirmed =
    appointments?.filter((a) => a.status?.toLowerCase() === "confirmed")
      .length || 0;

  const pending =
    appointments?.filter((a) => a.status?.toLowerCase() === "pending")
      .length || 0;

  const cancelled =
    appointments?.filter((a) => a.status?.toLowerCase() === "cancelled")
      .length || 0;

  /* ---------- ACCEPTED LAST 7 DAYS ---------- */

  const last7DaysAccepted = acceptedAppointments?.filter((a) => {
    const appointmentDate = new Date(a.date); // change to createdAt if needed
    const today = new Date();
    const diffTime = today - appointmentDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  });

  /* ---------- FILTER ---------- */

  const filteredAppointments = (() => {
    if (filter === "all") return appointments;

    if (filter === "accepted") return last7DaysAccepted;

    return appointments?.filter(
      (a) => a.status?.toLowerCase() === filter
    );
  })();

  return (
    <div className="space-y-6">

      {/* ---------- STATS ---------- */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 px-6 py-5">
              <Skeleton width={120} height={14} />
              <Skeleton width={60} height={30} />
              <Skeleton width={80} height={12} />
            </div>
          ))
        ) : (
          <>
            <StatCard title="Total Appointments" value={totalAppointments} note="Since today" icon={faCalendarCheck} iconColor="bg-indigo-500" />
            <StatCard title="Confirmed" value={confirmed} note="Updated today" icon={faCircleCheck} iconColor="bg-emerald-500" />
            <StatCard title="Pending" value={pending} note="Awaiting confirmation" icon={faClock} iconColor="bg-amber-500" />
            <StatCard title="Cancelled" value={cancelled} note="Updated today" icon={faCircleXmark} iconColor="bg-red-500" />
          </>
        )}
      </div>

      {/* ---------- MAIN CARD ---------- */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] border border-slate-200 dark:border-slate-700 overflow-hidden">

        {/* FILTER HEADER */}

        <div className="px-6 py-5 flex items-center">
          <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-full p-1">

            {["all", "pending", "cancelled", "accepted"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1.5 text-sm rounded-full font-medium transition ${
                  filter === type
                    ? "bg-[#5e72e4] text-white shadow"
                    : "text-slate-500 dark:text-slate-300"
                }`}
              >
                {type === "all"
                  ? "All Appointments"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}

          </div>
        </div>

        {/* HEADER */}

        <div className="grid grid-cols-12 bg-slate-50 dark:bg-slate-700 text-xs text-slate-500 dark:text-slate-300 font-semibold px-6 py-4 uppercase">
          <div className="col-span-5">Patient</div>
          <div className="col-span-2">Doctor</div>
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">View</div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-700"></div>

        {/* ROWS */}

        {loading ? (

          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 items-center px-6 py-5">
              <div className="col-span-5 flex items-center gap-4">
                <Skeleton variant="circular" width={44} height={44} />
                <div>
                  <Skeleton width={120} height={14} />
                  <Skeleton width={80} height={12} />
                </div>
              </div>
              <div className="col-span-2"><Skeleton width={100} height={14} /></div>
              <div className="col-span-3">
                <Skeleton width={120} height={14} />
                <Skeleton width={80} height={12} />
              </div>
              <div className="col-span-1"><Skeleton width={70} height={24} /></div>
              <div className="col-span-1 flex justify-end">
                <Skeleton variant="circular" width={36} height={36} />
              </div>
            </div>
          ))

        ) : filteredAppointments?.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-16">

            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-slate-400 text-xl" />
            </div>

            <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
              No appointments found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              {filter === "all"
                ? "There are no appointments yet."
                : filter === "accepted"
                ? "No accepted appointments in last 7 days."
                : `No ${filter} appointments available.`}
            </p>

          </div>

        ) : (

          filteredAppointments?.map((item) => (

            <div
              key={item._id}
              className="grid grid-cols-12 items-center px-6 py-5 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >

              <div className="col-span-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#5e72e4] text-white flex items-center justify-center text-sm font-semibold">
                  {item.name?.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">Patient</p>
                </div>
              </div>

              <div className="col-span-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                {allDoctors.find((d) => d._id === item.doctorId)?.name || "—"}
              </div>

              <div className="col-span-3">
                <p className="text-sm text-slate-700 dark:text-white">
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-slate-400">{item.time}</p>
              </div>

              <div className="col-span-1">
                <StatusBadge status={item.status} />
              </div>

              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => setSelectedAppointment(item)}
                  className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-blue-600 dark:text-blue-400" />
                </button>
              </div>

            </div>
          ))
        )}

      </div>

      <AppointmentModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ title, value, note, icon, iconColor }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] px-6 py-5 flex items-center justify-between border border-slate-200 dark:border-slate-700">
      <div>
        <p className="text-xs uppercase text-slate-400 font-semibold tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
          {value}
        </p>
        <p className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">
          {note}
        </p>
      </div>

      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconColor}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
}

/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }) {

  const key = status?.toLowerCase().includes("confirm")
    ? "confirmed"
    : status?.toLowerCase().includes("cancel")
    ? "cancelled"
    : "pending";

  const styles = {
    confirmed: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[key]}`}>
      {status}
    </span>
  );
}
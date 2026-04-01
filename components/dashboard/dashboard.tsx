"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { IDoctor } from "@/typescript/doctor.interface";
import {
  getAllDoctors,
  getDepartmentList,
  appointmentList,
  acceptedAppointment,
  departmentwiseDoctor,
  doctorList,
} from "@/redux/slice/doctorSlice";


import Skeleton from "@mui/material/Skeleton";
import {
  MedicalServices,
  Apartment,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  type DeptDoctor = {
  name: string;
  count: number;
};
  const [deptDoctors, setDeptDoctors] = useState<DeptDoctor[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const departments = useSelector((state: RootState) => state.doctor.departmentList);
  const appointments = useSelector((state: RootState) => state.doctor.appointmentList);
  const accepted = useSelector((state: RootState) => state.doctor.acceptedAppointments);
  const loading = useSelector((state: RootState) => state.doctor.loading);
  const doctorsTotal = useSelector((state: RootState) => state.doctor.doctorTotal);

  const router = useRouter()

  
  useEffect(() => {
    if (hasInitialized) return;

    const fetchAllDoctors = async () => {
      let doctorsList: IDoctor[] = [];
      let page = 1;
      let hasMore = true;
      let totalCount = 0;
      while (hasMore) {
        try {
          const res = await dispatch(doctorList({ page, limit: 100 })).unwrap();
          doctorsList = [...doctorsList, ...res.data];
          totalCount = res.totalItems;
          if (page >= res.totalPages) hasMore = false;
          page++;
        } catch (error) {
          hasMore = false;
        }
      }
      setAllDoctors(doctorsList);
      
    };

    fetchAllDoctors();
    dispatch(getDepartmentList());
    dispatch(appointmentList());
    dispatch(acceptedAppointment());

    setHasInitialized(true);
  }, [dispatch]);


  const latestAppointments = [...(appointments || []), ...(accepted || [])]
    ?.sort((a, b) => new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime())
    ?.slice(0, 5);

  
  useEffect(() => {
    if (!departments?.length || !hasInitialized) return;
    
type DeptDoctor = {
  name: string;
  count: number;
};
    const fetchDeptCounts = async () => {
      const results:DeptDoctor[] = await Promise.all(
        departments.map(async (dept) => {
          try {
            const res = await dispatch(
              departmentwiseDoctor(dept._id)
            ).unwrap();

            return {
              name: dept.name,
              count:  res.data?.length || 0,
            };
          } catch (error) {
            return {
              name: dept.name,
              count: 0,
            };
          }
        })
      );

      setDeptDoctors(results);
    };

    fetchDeptCounts();
  }, [departments?.length, hasInitialized, dispatch]);

  const latestConfirmed = accepted?.slice(0, 5);

  return (
    <div className="space-y-6">

      {/* HERO */}
      <div
        className="
  relative rounded-2xl px-6 py-6
  bg-gradient-to-r from-[#5e72e4]/90 to-[#7b8cf5]/90
  dark:from-slate-900 dark:to-slate-800
  text-white
  shadow-[0_10px_40px_rgba(0,0,0,0.15)]
  overflow-hidden
"
      >
        {/* subtle overlay to blend */}
        <div className="absolute inset-0 bg-white/5 dark:bg-black/20 backdrop-blur-[2px]" />

        <div className="relative flex items-center justify-between gap-6 flex-wrap">

          {/* LEFT */}
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Welcome back, Admin
            </h2>

            <p className="text-sm md:text-base text-blue-100/90 dark:text-slate-400">
              Manage hospital operations smoothly and efficiently
            </p>
          </div>

          {/* RIGHT */}
          {loading ? (
            <div className="flex gap-4">
              <Skeleton width={90} height={40} />
              <Skeleton width={90} height={40} />
            </div>
          ) : (
            <div
              className="
        flex items-center gap-5
        px-5 py-3 rounded-xl
        bg-white/10 dark:bg-white/5
        backdrop-blur-xl
        border border-white/10
      "
            >
              {/* Doctors */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <MedicalServices className="text-white text-[18px]" />
                </div>

                <div className="leading-tight">
                  <p className="text-[11px] text-blue-100/80">
                    Registered Doctors
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {doctorsTotal}
                  </h3>
                </div>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/20" />

              {/* Departments */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                  <Apartment className="text-white text-[18px]" />
                </div>

                <div className="leading-tight">
                  <p className="text-[11px] text-blue-100/80">
                    Departments
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {departments?.length || 0}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* MIDDLE */}
      <div className="grid md:grid-cols-5 gap-6 items-stretch">

        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 pt-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-white">
              Accepted Appointments
            </h3>

            <button
              onClick={() => router.push("/appointment")}
              className="text-xs font-medium text-indigo-500 hover:text-indigo-600 transition"
            >
              View All →
            </button>
          </div>

          {/* LIST */}
          <div className="px-6 py-4 space-y-3">

            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={32} height={32} />
                    <div>
                      <Skeleton width={120} height={12} />
                      <Skeleton width={80} height={10} />
                    </div>
                  </div>
                  <Skeleton width={60} height={10} />
                </div>
              ))
            ) : (
              latestConfirmed?.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center px-3 py-2 rounded-lg 
          hover:bg-slate-50 dark:hover:bg-slate-700 transition group"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-full 
            bg-gradient-to-br from-[#5e72e4] to-[#7b8cf5] 
            text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                      {item.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-white group-hover:text-indigo-500 transition">
                        {item.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        Dr. {allDoctors?.find(doctor => doctor._id === item.doctorId)?.name || "—"}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(item.date).toLocaleDateString("en-IN")}
                  </span>

                </div>
              ))
            )}

          </div>
        </div>

        {/* DEPARTMENT CHART */}
        <div className="md:col-span-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">

          <h3 className="font-semibold text-slate-700 dark:text-white mb-5 text-sm tracking-wide">
            Doctors per Department
          </h3>

          <div className="space-y-4 max-h-[260px] overflow-y-auto pr-2">

            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton width={120} height={12} className="mb-2" />
                  <Skeleton height={8} />
                </div>
              ))
            ) : (
              deptDoctors?.map((dept, i) => {
                const max = Math.max(...deptDoctors.map(d => d.count || 1));
                const width = (dept.count / max) * 100;

                return (
                  <div key={i} className="group">

                    {/* Label */}
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-slate-700 dark:text-white group-hover:text-indigo-500 transition">
                        {dept.name}
                      </p>

                      <span className="text-xs px-2 py-0.5 rounded-full 
                  bg-indigo-50 dark:bg-indigo-900/30 
                  text-indigo-600 dark:text-indigo-300 font-medium">
                        {dept.count}
                      </span>
                    </div>

                    {/* Track */}
                    <div className="w-full h-3 rounded-full 
                bg-slate-100 dark:bg-slate-700 overflow-hidden">

                      {/* Bar */}
                      <div
                        className="h-3 rounded-full 
                  bg-gradient-to-r from-[#5e72e4] to-[#7b8cf5] 
                  shadow-[0_0_6px_rgba(94,114,228,0.4)] 
                  transition-all duration-700 ease-out"
                        style={{ width: `${width}%` }}
                      />

                    </div>

                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>



      {/* BOTTOM */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">


        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-700">

          <h3 className="font-semibold text-slate-700 dark:text-white text-sm tracking-wide">
            Latest Appointment
          </h3>

          {/* VIEW ALL BUTTON */}
          <button
            onClick={() => router.push("/appointment")}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 
        hover:text-indigo-700 dark:hover:text-indigo-300 transition"
          >
            View All →
          </button>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={40} />
              ))}
            </div>
          ) : latestAppointments?.length === 0 ? (

            /* EMPTY STATE */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No appointments found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Everything is clear for now
              </p>
            </div>

          ) : (

            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr className="text-left text-xs text-slate-500 dark:text-slate-300 uppercase tracking-wider">

                  <th className="px-6 py-3">Patient</th>
                  <th className="px-6 py-3">Doctor</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>

                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">

                {latestAppointments?.slice(0, 4).map((item) => {

                  const doctorName =
                    item.doctorName || "—";

                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                    >

                      {/* PATIENT */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full 
                      bg-gradient-to-br from-[#5e72e4] to-[#7b8cf5] 
                      text-white flex items-center justify-center text-sm font-semibold">
                            {item.name?.charAt(0)}
                          </div>

                          <span className="font-medium text-slate-700 dark:text-white">
                            {item.name}
                          </span>
                        </div>
                      </td>

                      {/* DOCTOR */}
                      <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium">
                        {allDoctors?.find(doctor => doctor._id === item.doctorId)?.name || "—"}
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* TIME */}
                      <td className="px-6 py-4 text-slate-500">
                        {item.time || "--"}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}





function StatusBadge({ status }:any) {
  const key = status?.toLowerCase().includes("confirm")
    ? "confirmed"
    : status?.toLowerCase().includes("cancel")
      ? "cancelled"
      : "pending";

  const styles = {
    confirmed:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
    pending:
      "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    cancelled:
      "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[key]}`}>
      {status}
    </span>
  );
}
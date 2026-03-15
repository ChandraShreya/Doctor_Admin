"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentList, confirmAppointment } from "@/redux/slice/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCalendarCheck,
  faCircleCheck,
  faClock,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import AppointmentModal from "./appointmentmodal";

export default function AppointmentList() {

  const dispatch = useDispatch();

  const { appointmentList: appointments } = useSelector(
    (state: any) => state.doctor
  );

  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  useEffect(() => {
    dispatch(appointmentList());
  }, [dispatch]);


  const handleConfirm = async (id: any) => {

    const response = await dispatch(confirmAppointment(id)).unwrap();

    setSelectedAppointment(null);

  };

  const handleCancel = async (id: any) => {

    const response = await dispatch(cancelAppointment(id)).unwrap();

    setSelectedAppointment(null);

  };

  /* ---------- STATS ---------- */

  const total = appointments?.length || 0;

  const confirmed =
    appointments?.filter(
      (a: any) => a.status?.toLowerCase() === "confirmed"
    ).length || 0;

  const pending =
    appointments?.filter(
      (a: any) => a.status?.toLowerCase() === "pending"
    ).length || 0;

  const cancelled =
    appointments?.filter(
      (a: any) => a.status?.toLowerCase() === "cancelled"
    ).length || 0;

  /* ---------- FILTER ---------- */

  const filteredAppointments = appointments?.filter((a: any) => {
    if (filter === "all") return true;
    return a.status?.toLowerCase() === filter;
  });

  return (
    <div className="space-y-6">

      {/* ---------- STATS ---------- */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard
          title="Total Appointments"
          value={total}
          note="Since today"
          icon={faCalendarCheck}
          iconColor="bg-indigo-500"
        />

        <StatCard
          title="Confirmed"
          value={confirmed}
          note="Updated today"
          icon={faCircleCheck}
          iconColor="bg-emerald-500"
        />

        <StatCard
          title="Pending"
          value={pending}
          note="Awaiting confirmation"
          icon={faClock}
          iconColor="bg-amber-500"
        />

        <StatCard
          title="Cancelled"
          value={cancelled}
          note="Updated today"
          icon={faCircleXmark}
          iconColor="bg-red-500"
        />

      </div>


      {/* ---------- MAIN CARD ---------- */}

      {/* ---------- APPOINTMENT LIST CARD ---------- */}

      <div className="bg-white rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] border border-slate-200 overflow-hidden">

        {/* FILTER HEADER */}
        <div className="px-6 py-5 flex items-center">

          <div className="flex items-center bg-slate-100 rounded-full p-1">

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 text-sm rounded-full font-medium ${filter === "all"
                ? "bg-[#5e72e4] text-white shadow"
                : "text-slate-500"
                }`}
            >
              All Appointments
            </button>

            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-1.5 text-sm rounded-full font-medium ${filter === "pending"
                ? "bg-[#5e72e4] text-white shadow"
                : "text-slate-500"
                }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-1.5 text-sm rounded-full font-medium ${filter === "cancelled"
                ? "bg-[#5e72e4] text-white shadow"
                : "text-slate-500"
                }`}
            >
              Cancelled
            </button>

          </div>

        </div>


        {/* HEADER ROW */}

        <div className="grid grid-cols-12 bg-slate-50 text-xs text-slate-500 font-semibold px-6 py-4 uppercase">

          <div className="col-span-5">Patient</div>
          <div className="col-span-2">Doctor</div>
          <div className="col-span-3">Date & Time</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">View</div>

        </div>

        <div className="h-px bg-slate-100"></div>


        {/* ROWS */}

        {filteredAppointments?.map((item: any) => (

          <div
            key={item._id}
            className="grid grid-cols-12 items-center px-6 py-5 hover:bg-slate-50 transition"
          >

            {/* PATIENT */}

            <div className="col-span-5 flex items-center gap-4">

              <div className="w-11 h-11 rounded-full bg-[#5e72e4] text-white flex items-center justify-center text-sm font-semibold">
                {item.name?.charAt(0)}
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-700">
                  {item.name}
                </p>

                <p className="text-xs text-slate-400">
                  Patient
                </p>

              </div>

            </div>


            {/* DOCTOR */}

            <div className="col-span-2 text-sm text-blue-600 font-medium">
              Dr. {item.doctorName || "Doctor"}
            </div>


            {/* DATE & TIME */}

            <div className="col-span-3">

              <p className="text-sm text-slate-700">

                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}

              </p>

              <p className="text-xs text-slate-400">
                {item.time}
              </p>

            </div>


            {/* STATUS */}

            <div className="col-span-1">
              <StatusBadge status={item.status} />
            </div>


            {/* VIEW */}

            <div className="col-span-1 flex justify-end">

              <button
                onClick={() => setSelectedAppointment(item)}
                className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center"
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-blue-600"
                />
              </button>

            </div>

          </div>

        ))}

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

function StatCard({ title, value, note, icon, iconColor }: any) {

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_27px_0_rgb(0_0_0_/5%)] px-6 py-5 flex items-center justify-between border border-slate-200">

      <div>

        <p className="text-xs uppercase text-slate-400 font-semibold tracking-wide">
          {title}
        </p>

        <p className="text-2xl font-bold text-slate-800 mt-1">
          {value}
        </p>

        <p className="text-xs text-emerald-500 mt-1">
          {note}
        </p>

      </div>

      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${iconColor}`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>

    </div>
  );
}


/* ---------- STATUS BADGE ---------- */

function StatusBadge({ status }: any) {

  const key = status?.toLowerCase();

  const styles: any = {
    confirmed: "bg-emerald-100 text-emerald-600",
    pending: "bg-amber-100 text-amber-600",
    cancelled: "bg-red-100 text-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[key]}`}
    >
      {status}
    </span>
  );
}

"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faBuilding,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function AppointmentModal({
  appointment,
  onClose,
  onConfirm,
  onCancel,
}: any) {

  const [loading, setLoading] = useState<"confirm" | "cancel" | null>(null);

  if (!appointment) return null;

  const handleConfirm = async () => {
    setLoading("confirm");
    await onConfirm(appointment._id);
    setLoading(null);
  };

  const handleCancel = async () => {
    setLoading("cancel");
    await onCancel(appointment._id);
    setLoading(null);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[520px] rounded-3xl shadow-2xl overflow-hidden
        bg-white/80 backdrop-blur-xl border border-white/30"
      >

        {/* HEADER */}
        <div className="p-6 border-b border-slate-200 flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center font-semibold shadow-sm">
            {appointment.name?.charAt(0)}
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-800">
              {appointment.name}
            </h3>

            <span className="mt-1 inline-block text-[11px] px-2.5 py-0.5 rounded-full font-medium
            bg-amber-100 text-amber-600">
              {appointment.status}
            </span>
          </div>

        </div>

        <div className="p-6 space-y-5">

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-3">

            <InfoCard
              label="Doctor"
              value={`Dr. ${appointment.doctorName}`}
              icon={faUserDoctor}
            />

            <InfoCard
              label="Department"
              value={appointment.departmentName || "Department"}
              icon={faBuilding}
            />

            <InfoCard
              label="Date"
              value={new Date(appointment.date).toLocaleDateString("en-IN")}
              icon={faCalendar}
            />

            <InfoCard
              label="Time"
              value={appointment.time}
              icon={faClock}
            />

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            {/* CANCEL */}
            <button
              onClick={handleCancel}
              disabled={loading !== null}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2

              bg-rose-50 text-rose-600 hover:bg-rose-100
              disabled:opacity-70"
            >
              {loading === "cancel" ? (
                <LoaderDots color="bg-rose-500" />
              ) : (
                "Cancel"
              )}
            </button>

            {/* CONFIRM */}
            <button
              onClick={handleConfirm}
              disabled={loading !== null}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2

              bg-indigo-50 text-indigo-600 hover:bg-indigo-100
              disabled:opacity-70"
            >
              {loading === "confirm" ? (
                <LoaderDots color="bg-indigo-500" />
              ) : (
                "Confirm"
              )}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}


/* INFO CARD */
function InfoCard({ label, value, icon }: any) {
  return (
    <div className="rounded-xl p-3 flex items-center gap-3 border

    bg-indigo-50/50 border-indigo-100">

      <div className="text-indigo-500">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <p className="text-[10px] text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-700">
          {value}
        </p>
      </div>

    </div>
  );
}


/* LOADER */
function LoaderDots({ color }: any) {
  return (
    <div className="flex items-center gap-1">
      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${color} [animation-delay:-0.3s]`} />
      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${color} [animation-delay:-0.15s]`} />
      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${color}`} />
    </div>
  );
}
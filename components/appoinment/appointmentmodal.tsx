"use client";

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

  if (!appointment) return null;

  return (

    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[520px] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >

        {/* TOP ACCENT LINE */}

        <div className="h-1.5 bg-slate-300"></div>

        <div className="p-7">

          {/* HEADER */}

          <div className="flex items-center gap-4 mb-6">

            <div
  className="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-semibold text-lg shadow"
  style={{ background: "#5e72e4" }}
>
  {appointment.name?.charAt(0)}
</div>

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                {appointment.name}
              </h3>

              <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-semibold">
                {appointment.status}
              </span>

            </div>

          </div>


          {/* INFO GRID */}

          <div className="grid grid-cols-2 gap-4">

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

          <div className="flex gap-3 mt-7">

            <button
              onClick={() => onCancel(appointment._id)}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
            >
              Cancel Appointment
            </button>

            <button
              onClick={() => onConfirm(appointment._id)}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 shadow transition"
            >
              Confirm Appointment
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}


function InfoCard({ label, value, icon }: any) {

  return (

    <div
      className="rounded-xl p-4 flex items-center gap-3 border"
      style={{
        background: "#5e72e410",
        borderColor: "#5e72e430"
      }}
    >

      <div style={{ color: "#5e72e4" }}>
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>

        <p className="text-xs text-slate-400 uppercase tracking-wide">
          {label}
        </p>

        <p className="text-sm font-medium text-slate-700">
          {value}
        </p>

      </div>

    </div>

  );
}

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserDoctor,
  faXmark,
  faCalendarCheck,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

export default function DepartmentDoctorsModal({
  show,
  onClose,
  doctors,
  departmentName,
  doctorLoading

}: any) {

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center font-semibold shadow-sm">
              <FontAwesomeIcon icon={faUserDoctor} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {departmentName} Staff
              </h3>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500">
                  Medical professionals directory
                </span>

                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  {doctors?.length || 0} Doctors
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

        </div>

        {/* Doctors Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[500px] overflow-y-auto">

          {doctorLoading ? (
  <p>Loading doctors...</p>
) : doctors.length === 0 ? (
  <p>No doctors found</p>
) : (
            doctors.map((doc: any) => (
              <div
                key={doc._id}
                className="rounded-2xl p-4 bg-white shadow-md border border-slate-100 hover:shadow-lg transition"
              >

                {/* Top */}
                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center font-semibold shadow-sm">
                    {doc.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {doc.name}
                    </p>
                    <p className="text-xs text-blue-600 flex items-center gap-1">
                      <FontAwesomeIcon icon={faStethoscope} />
                      {doc.specialization}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-3"></div>

                {/* Slots */}
                <div className="space-y-2 text-xs text-slate-600">

                  {doc.availableSlots && doc.availableSlots.length > 0 ? (

                    doc.availableSlots.map((slot: any, index: number) => {

                      const dateObj = new Date(slot.date);

                      const formattedDate = dateObj.toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      });

                      return (
                        <div key={index} className="flex items-center gap-2">

                          <FontAwesomeIcon
                            icon={faCalendarCheck}
                            className="text-green-500"
                          />

                          <span>
                            {formattedDate} • {slot.time}
                          </span>

                        </div>
                      );
                    })

                  ) : (

                    <p className="text-xs text-slate-400">
                      No slots available
                    </p>

                  )}

                </div>

                {/* Fee */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    Consultation Fee
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    ₹{doc.fees}
                  </span>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}
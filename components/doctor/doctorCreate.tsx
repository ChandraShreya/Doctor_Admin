
"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { doctorCreate, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStethoscope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IDoctorCreatePayload, IPayload } from "@/typescript/doctor.interface";

/* ================= VALIDATION ================= */

const schema = yup.object().shape({
  name: yup.string().required("Doctor name is required"),
  fees: yup.string().required("Fees is required"),
  departmentId: yup.string().required("Department is required"),
  startTime: yup.string().required("Start time required"),
  endTime: yup.string().required("End time required"),
  slotDuration: yup
    .number()
    .typeError("Must be number")
    .required("Slot duration required"),
});

export default function DoctorCreateModal({ setShowModal }: any) {
  const dispatch = useDispatch<AppDispatch>();

  const departmentList = useSelector(
    (state: RootState) => state.doctor.departmentList
  );

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const payload:IDoctorCreatePayload = {
      name: data.name,
      fees: Number(data.fees),
      departmentId: data.departmentId,
      schedule: {
        startTime: data.startTime,
        endTime: data.endTime,
        slotDuration: data.slotDuration,
      },
    };

    try {
      const response = await dispatch(doctorCreate(payload)).unwrap();
      toast.success(response.message);
      dispatch(doctorList({ page: 1, limit: 6 }));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={() => setShowModal(false)}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#5e72e4] to-[#7b8cf5] text-white flex items-center justify-center shadow-sm">
              <FontAwesomeIcon icon={faStethoscope} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Add Doctor
              </h3>
              <p className="text-xs text-slate-500">
                Fill doctor details
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowModal(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="p-6 space-y-5">

            {/* NAME */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Doctor Name
              </label>

              <input
                {...register("name")}
                placeholder="e.g. Dr. John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white 
                focus:outline-none focus:ring-2 focus:ring-indigo-100
                placeholder:text-slate-400 placeholder:font-medium
                dark:text-slate-700"
              />

              <p className="text-xs text-red-500 mt-1">
                {errors.name?.message}
              </p>
            </div>

            {/* FEES */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Consultation Fees
              </label>

              <input
                {...register("fees")}
                placeholder="e.g. ₹500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100
                placeholder:text-slate-400 placeholder:font-medium
                
  dark:text-slate-700
"
              />

              <p className="text-xs text-red-500 mt-1">
                {errors.fees?.message}
              </p>
            </div>

            {/* DEPARTMENT */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">
                Department
              </label>

              <select
                {...register("departmentId")}
                defaultValue=""
                className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100
  ${!watch("departmentId") ? "text-slate-400 font-medium" : "text-slate-700"}`}
              >
                <option value="" disabled hidden>
                  Select Department
                </option>

                {departmentList?.map((dep: any) => (
                  <option key={dep._id} value={dep._id} className="text-slate-700">
                    {dep.name}
                  </option>
                ))}
              </select>

              <p className="text-xs text-red-500 mt-1">
                {errors.departmentId?.message}
              </p>
            </div>

            {/* SCHEDULE */}
            <div>
              <label className="text-xs font-medium text-slate-600 mb-2 block">
                Schedule
              </label>

              <div className="grid grid-cols-3 gap-2">

                <input
                  type="time"
                  {...register("startTime")}
                  className={`px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100
  ${!watch("startTime") ? "text-slate-400 font-medium" : "text-slate-700"}`}
                />

                <input
                  type="time"
                  {...register("endTime")}
                  className={`px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100
  ${!watch("endTime") ? "text-slate-400 font-medium" : "text-slate-700"}`}
                />

                <input
                  type="number"
                  placeholder="Slot (min)"
                  {...register("slotDuration")}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />

              </div>

              <p className="text-xs text-red-500 mt-1">
                {errors.startTime?.message ||
                  errors.endTime?.message ||
                  errors.slotDuration?.message}
              </p>
            </div>

          </div>

          {/* FOOTER */}
          <div className="px-6 pb-6 flex gap-3">

            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all"
              style={{
                background: "linear-gradient(to right, #5e72e4, #7b8cf5)",
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Create
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}



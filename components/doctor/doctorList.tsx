
"use client";

import { departmentwiseDoctor, doctorDelete, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faSearch,
  faEye,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

import { confirmDelete, showDeleteError, showDeleteSuccess } from "../sweetAlert/ConfirmDelete";
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import DoctorCreateModal from "./doctorCreate";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";

export default function DoctorList() {

  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state:RootState) => state.doctor.doctorList);
  const doctorTotal = useSelector((state:RootState) => state.doctor.doctorTotal);
  const loading = useSelector((state:RootState) => state.doctor.loading);

  const [showModal, setShowModal] = useState(false);
  const [departmentId, setDepartmentId] = useState<string>("");
  const [editDoctor, setEditDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalPages = Math.ceil(doctorTotal / limit);
  const departments = useSelector((state:RootState) => state.doctor.departmentList);
  const router = useRouter();

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  useEffect(() => {
    if (departmentId) {
      dispatch(departmentwiseDoctor(departmentId));
    } else {
      dispatch(doctorList({ page, limit, search }));
    }
  }, [dispatch, page, search, departmentId]);

  const handleAddDoctor = () => {
    setEditDoctor(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditDoctor(null);
  };



const handleDeleteDoctor = async (id:string, doctorName:string) => {

  const confirmed = await confirmDelete("Doctor", doctorName);
  if (!confirmed) return;

  try {
    await dispatch(doctorDelete(id)).unwrap();

    showDeleteSuccess("Doctor", doctorName); 

  } catch (error) {
    console.log(error);

    showDeleteError("Doctor", doctorName); 
  }
};

  return (
    <div className="space-y-5 font-inter text-slate-700 dark:text-slate-200">

      {/* FILTER BAR */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="relative flex-1">

          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search doctor..."
            className="w-full border border-slate-200 dark:border-slate-700 rounded-full pl-9 pr-4 py-2 text-sm 
            bg-white dark:bg-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-slate-600"
          />

        </div>

        {/* DEPARTMENT FILTER */}
        <div className="relative">

          <FontAwesomeIcon
            icon={faFilter}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
          />

          <select
            value={departmentId}
            onChange={(e) => {
              setDepartmentId(e.target.value);
              setPage(1);
            }}
            className="border border-slate-200 dark:border-slate-700 rounded-full pl-8 pr-6 py-2 text-sm 
            bg-white dark:bg-slate-800 shadow-sm appearance-none cursor-pointer"
          >

            <option value="">All Departments</option>

            {departments?.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}

          </select>
        </div>

        {/* ADD DOCTOR */}
        <button
          onClick={handleAddDoctor}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
          bg-white dark:bg-slate-800 border shadow-sm transition
          text-[#5e72e4] border-[#5e72e4]"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Add Doctor
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Available Slot</th>
              <th className="px-6 py-4 text-left">Fees</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (

              Array.from({ length: 6 }).map((_, i) => (

                <tr key={i} className="border-b border-slate-100 dark:border-slate-700">

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton variant="circular" width={36} height={36} />
                      <div className="flex flex-col gap-1">
                        <Skeleton width={120} height={14} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4"><Skeleton width={120} height={14} /></td>
                  <td className="px-6 py-4"><Skeleton width={140} height={28} /></td>
                  <td className="px-6 py-4"><Skeleton width={60} height={14} /></td>

                  <td className="px-6 py-4 flex justify-end gap-3">
                    <Skeleton variant="circular" width={28} height={28} />
                    <Skeleton variant="circular" width={28} height={28} />
                  </td>

                </tr>

              ))

            ) : doctors?.length === 0 ? (

              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">

                  <div className="flex flex-col items-center gap-2">

                    <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-300" />

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
                      No doctors found
                    </p>

                    <p className="text-xs text-slate-400">
                      Try adjusting your search or filters
                    </p>

                  </div>

                </td>
              </tr>

            ) : (

              doctors.map((doc) => {

                return (
                  <tr
                    key={doc._id}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-semibold">
                          {doc.name?.charAt(0)}
                        </div>

                        <div className="leading-tight">
                          <p className="font-medium text-slate-800 dark:text-white text-sm">
                            {doc.name}
                          </p>

                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            {doc.specialization}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {
                        departments.find((d) => d._id === doc.departmentId)?.name ||
                        "—"}
                    </td>

                    <td className="px-6 py-4">
                      {doc.schedule ? (
                        <div className="inline-flex flex-col px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium w-fit">
                          <span>{doc.schedule.startTime} - {doc.schedule.endTime}</span>
                          <span className="text-[11px] text-emerald-500 dark:text-emerald-400">
                            {doc.schedule.slotDuration} mins / slot
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">No Slot</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                      ₹{doc.fees}
                    </td>

                    <td className="px-6 py-4 flex justify-end gap-3">

                      <button
                        onClick={() => router.push(`/dashboard/doctors/${doc._id}`)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      >
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                      </button>

                      <button
                        onClick={() => handleDeleteDoctor(doc._id, doc.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      </button>

                    </td>

                  </tr>
                );
              })

            )}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full 
          bg-white/60 dark:bg-slate-800 backdrop-blur-lg border border-white/40 dark:border-slate-700 shadow-sm">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={`px-3 py-1 text-xs rounded-full ${
                page === 1 ? "text-slate-300" : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Prev
            </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;

            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 text-xs rounded-full ${
                  page === p
                    ? "bg-[#5e72e4] text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {p}
              </button>
            );
          })}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className={`px-3 py-1 text-xs rounded-full ${
              page === totalPages ? "text-slate-300" : "hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Next
          </button>

        </div>
      </div>
      )}

      {/* MODAL */}
      {showModal && (
        <DoctorCreateModal setShowModal={closeModal} editDoctor={editDoctor} />
      )}

    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDepartment, IDoctor } from "@/typescript";
import Skeleton from "@mui/material/Skeleton";

import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  departmentCreate,
  departmentDelete,
  departmentwiseDoctor,
  getDepartmentList,
} from "@/redux/slice/doctorSlice";

import { confirmDelete, showDeleteError, showDeleteSuccess } from "../sweetAlert/ConfirmDelete";
import { toast } from "sonner";
import DepartmentDoctorsModal from "./departmentwiseDoctorModal";
import DepartmentModal from "./departmentCreate";

export default function DepartmentList() {
  const dispatch = useDispatch();

  const { departmentList, loading } = useSelector(
    (state: any) => state.doctor
  );

  const [showModal, setShowModal] = useState(false);
  const [showDoctorsModal, setShowDoctorsModal] = useState(false);
  const [departmentDoctors, setDepartmentDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [deptCounts, setDeptCounts] = useState({});
  const [departmentDoctorsMap, setDepartmentDoctorsMap] = useState({});
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [doctorLoading, setDoctorLoading] = useState(false);
  const fetchedRef = useRef(false); 

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

    useEffect(() => {
    if (!departmentList?.length) {
      dispatch(getDepartmentList());
    }
  }, []);

  useEffect(() => {
    setSearchLoading(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredDepartments = departmentList.filter((dept: any) =>
    dept.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = async () => {
    if (!form.name) return;

    const res = await dispatch(departmentCreate(form)).unwrap();
    toast.success(res.message);

    dispatch(getDepartmentList());

    setForm({
      name: "",
      description: "",
      themeIdx: 0,
    });

    setShowModal(false);
  };

const handleDeleteDepartment = async (id: string, name: string) => {

  const confirmed = await confirmDelete("Department", name);
  if (!confirmed) return;

  try {
    await dispatch(departmentDelete(id)).unwrap();

    
    showDeleteSuccess("Department", name);

  } catch (err) {
    console.log(err);

    
    showDeleteError("Department", name);
  }
};

const handleViewDoctors = async (id: string, name: string) => {
  setSelectedDepartment(name);
  setSelectedDepartmentId(id);
  setShowDoctorsModal(true);

  // if already cached → no loading needed
  if (departmentDoctorsMap[id]) return;

  setDoctorLoading(true); // 👈 start loading

  try {
    const res = await dispatch(
      departmentwiseDoctor(id)
    ).unwrap();

    setDepartmentDoctorsMap((prev: any) => ({
      ...prev,
      [id]: res.data || [],
    }));
  } catch (error) {
    console.log(error);
  } finally {
    setDoctorLoading(false); // 👈 stop loading
  }
};


  useEffect(() => {
    if (!departmentList?.length || fetchedRef.current) return;

    fetchedRef.current = true;

    const fetchCounts = async () => {
      const counts = {};

      for (const dept of departmentList) {
        try {
          const res = await dispatch(
            departmentwiseDoctor(dept._id)
          ).unwrap();

          counts[dept._id] = res.count || 0;
        } catch {
          counts[dept._id] = 0;
        }
      }

      setDeptCounts(counts);
    };

    fetchCounts();
  }, [departmentList]);


//   useEffect(() => {
//   if (!departmentList?.length) {
//     dispatch(getDepartmentList());
//   }
// }, []);

  return (
    <div className="space-y-6">

      {/* TOP BAR */}
      <div className="flex items-center gap-4">

        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search department..."
            className="w-full border border-slate-200 dark:border-slate-700 rounded-full pl-10 pr-4 py-2.5 text-sm 
  bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500
  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-slate-600"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
          bg-white dark:bg-slate-800 border shadow-sm transition hover:shadow-md"
          style={{ color: "#5e72e4", borderColor: "#5e72e4" }}
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Add Department
        </button>

      </div>

      {/* CARDS */}

      {loading || searchLoading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/40 dark:border-slate-700 shadow-sm"
            >
              <Skeleton width="60%" height={20} />
              <Skeleton width="100%" height={14} />
              <Skeleton width="80%" height={14} />

              <Skeleton width="40%" height={12} className="mt-4" />
              <Skeleton width="20%" height={18} />

              <div className="flex gap-3 mt-5">
                <Skeleton className="flex-1" height={32} />
                <Skeleton className="flex-1" height={32} />
              </div>
            </div>
          ))}
        </div>

      ) : filteredDepartments.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
            No departments found
          </p>
          {debouncedSearch && (
            <p className="text-xs text-slate-400">
              Try searching with a different keyword
            </p>
          )}
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {paginatedDepartments.map((dept: any) => (

            <div
              key={dept._id}
              className="rounded-2xl p-5 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-white/40 dark:border-slate-700 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-slate-800 dark:text-white font-semibold text-xl">
                {dept.name}
              </h3>

              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                {dept.description}
              </p>

              <p className="text-[11px] font-semibold text-slate-500 mt-4 uppercase">
                Doctors
              </p>

              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                {deptCounts[dept._id] || 0}
              </p>

              <div className="flex justify-end mt-2">
                <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex gap-3 mt-5">

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleViewDoctors(dept._id, dept.name);
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition

bg-indigo-50 text-indigo-600 hover:bg-indigo-100
dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
                >
                  View Doctors
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteDepartment(dept._id, dept.name);
                  }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition

bg-rose-50 text-rose-600 hover:bg-rose-100
dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/30"
                >
                  Delete
                </button>

              </div>
            </div>

          ))}

        </div>

      )}

      {/* PAGINATION */}

      {!loading && totalPages > 1 && (
        <div className="flex justify-end mt-8">

          <div className="flex items-center gap-2 px-3 py-2 rounded-full 
          bg-white/60 dark:bg-slate-800 backdrop-blur-lg border border-white/40 dark:border-slate-700 shadow-sm">

            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-xs rounded-full transition
              ${currentPage === 1
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-xs rounded-full transition
                  ${currentPage === page
                      ? "bg-[#5e72e4] text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-xs rounded-full transition
              ${currentPage === totalPages
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
            >
              Next
            </button>

          </div>
        </div>
      )}

      {/* MODALS */}

      <DepartmentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        form={form}
        setForm={setForm}
        onSubmit={handleAdd}
      />

      <DepartmentDoctorsModal
        show={showDoctorsModal}
        onClose={() => setShowDoctorsModal(false)}
        doctors={departmentDoctorsMap[selectedDepartmentId] || []}
        departmentName={selectedDepartment}
        doctorLoading={doctorLoading}
      />

    </div>
  );
}
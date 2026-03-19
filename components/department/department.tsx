// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faPlus,
//   faBuilding,
//   faEye,
//   faXmark,
//   faEllipsisVertical,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons";

// import { departmentCreate,  departmentDelete,  getDepartmentList } from "@/redux/slice/doctorSlice";
// import { confirmDelete } from "../sweetAlert/ConfirmDelete";
// import { toast } from "sonner";

// export default function DepartmentList() {

//   const dispatch = useDispatch();
//   const { departmentList, loading ,doctorList ,doctorTotal } = useSelector((state: any) => state.doctor);

//   const [showModal, setShowModal] = useState(false);
//   const [viewDetails, setViewDetails] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     themeIdx: 0,
//   });

//   useEffect(() => {
//     dispatch(getDepartmentList());
//   }, [dispatch]);



//   /* ---------------- Themes ---------------- */

//   const themes = [
//     { gradient: "from-blue-600 to-blue-800", glow: "shadow-blue-600/20", border: "border-blue-200", tag: "bg-blue-50 text-blue-700", dot: "bg-blue-600" },
//     { gradient: "from-indigo-600 to-indigo-800", glow: "shadow-indigo-600/20", border: "border-indigo-200", tag: "bg-indigo-50 text-indigo-700", dot: "bg-indigo-600" },
//     { gradient: "from-sky-500 to-blue-600", glow: "shadow-sky-500/20", border: "border-sky-200", tag: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
//     { gradient: "from-cyan-500 to-blue-600", glow: "shadow-cyan-500/20", border: "border-cyan-200", tag: "bg-cyan-50 text-cyan-700", dot: "bg-cyan-500" },
//     // { gradient: "from-blue-500 to-purple-600", glow: "shadow-purple-500/20", border: "border-purple-200", tag: "bg-purple-50 text-purple-700", dot: "bg-purple-500" },
//     { gradient: "from-blue-700 to-indigo-900", glow: "shadow-blue-700/20", border: "border-blue-300", tag: "bg-blue-100 text-blue-800", dot: "bg-blue-700" },
//   ];

//   /* ---------------- Create Department ---------------- */

//   const handleAdd = async () => {

//     if (!form.name) return;

//     const payload = {
//       name: form.name,
//       description: form.description,
//       themeIdx: form.themeIdx,
//     };

//     const response = await dispatch(departmentCreate(payload)).unwrap();
//     toast.success(response.message)

//     dispatch(getDepartmentList());

//     setForm({
//       name: "",
//       description: "",
//       themeIdx: 0,
//     });

//     setShowModal(false);
//   };

//   const handleViewDetails = (id) => {
//   setViewDetails(viewDetails === id ? null : id);
// };


// const handleDeleteDepartment = async(id , name)=>{
//   const confirmed = await confirmDelete("Department",name)
//   if(!confirmed) return;

//   try{
//     const res = await dispatch(departmentDelete(id)).unwrap()
//     setViewDetails(null)

//   }catch(error){
//     console.log("error" , error)

//   }
// }

//   return (

//     <div className="space-y-7 font-inter">

//       {/* Header */}

//       <div className="flex justify-between items-center">


//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all"
//         >
//           <FontAwesomeIcon icon={faPlus} />
//           Add Department
//         </button>

//       </div>

//       {/* Stats */}

//       <div className="grid grid-cols-3 gap-7">

//         <div className="bg-white border border-blue-100 rounded-2xl p-7 shadow-sm">
//           <p className="text-sm text-slate-500">Total Departments</p>
//           <p className="text-4xl font-semibold text-blue-700 mt-2">
//             {departmentList.length}
//           </p>
//         </div>

//         <div className="bg-white border border-blue-100 rounded-2xl p-7 shadow-sm">
//           <p className="text-sm text-slate-500">Total Doctors</p>
//           <p className="text-4xl font-semibold text-indigo-700 mt-2">
//             {doctorTotal}
//           </p>
//         </div>

//         <div className="bg-white border border-blue-100 rounded-2xl p-7 shadow-sm">
//           <p className="text-sm text-slate-500">Total Patients</p>
//           <p className="text-4xl font-semibold text-sky-700 mt-2">
//             1320
//           </p>
//         </div>

//       </div>

//       {/* Cards */}

//       {loading ? (

//         <p>Loading...</p>

//       ) : (

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

//           {departmentList.map((dept: any, index: number) => {

//             const theme = themes[dept.themeIdx ?? index % themes.length];

//             return (

//               <div
//                 key={dept._id}
//                 className={`relative bg-white ${theme.border} rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${theme.glow}`}
//               >

//                 {/* Top Gradient Strip */}
//                 <div className={`h-2.5 bg-gradient-to-r ${theme.gradient}`}></div>

//                 <div className="p-7">

//                   {/* Three Dots Menu */}
//                   <div className="absolute top-5 right-5">

//                     <button
//                       onClick={() =>
//                         handleViewDetails(dept._id)
//                       }
//                       className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50"
//                     >
//                       <FontAwesomeIcon icon={faEllipsisVertical} />
//                     </button>

//                     {viewDetails === dept._id && (
//                       <div className="absolute right-0 mt-2 w-32 bg-white border border-blue-100 rounded-xl shadow-lg py-2">

//                         <button
//                         onClick={()=>handleDeleteDepartment(dept._id ,dept.name )}
//                           className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
//                         >
//                           <FontAwesomeIcon icon={faTrash} />
//                           Delete
//                         </button>

//                       </div>
//                     )}

//                   </div>

//                   {/* Department Name */}
//                   <h3 className="text-xl font-semibold text-slate-800">
//                     {dept.name}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-slate-500 text-base mt-2">
//                     {dept.description}
//                   </p>

//                   {/* Created Date */}
//                   <p className="text-xs text-slate-400 mt-4">
//                     Created: {new Date(dept.createdAt).toLocaleDateString()}
//                   </p>


//                   {/* Status */}
//                   <span className={`mt-4 inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${theme.tag}`}>
//                     <span className={`w-2 h-2 rounded-full ${theme.dot}`}></span>
//                     Active
//                   </span>

//                   {/* View Details Button */}
//                   <button
//                     className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition"
//                   >
//                     <FontAwesomeIcon icon={faEye} />
//                     View Details
//                   </button>

//                 </div>

//               </div>

//             );

//           })}

//         </div>

//       )}

//       {/* Modal */}

//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//           {/* Background */}
//           <div
//             className="absolute inset-0 bg-blue-900/20 backdrop-blur-md"
//             onClick={() => setShowModal(false)}
//           />

//           <div className="relative w-full max-w-xl">

//             {/* Glow */}
//             <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-xl"></div>

//             <div className="relative bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden">

//               {/* Top gradient bar */}
//               <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"></div>

//               {/* Header */}
//               <div className="px-8 pt-7 pb-5 border-b border-blue-100">

//                 <div className="flex items-center justify-between">

//                   <div className="flex items-center gap-3">

//                     <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
//                       <FontAwesomeIcon icon={faBuilding} className="text-white" />
//                     </div>

//                     <div>
//                       <h3 className="text-slate-800 text-lg font-semibold">
//                         New Department
//                       </h3>
//                       <p className="text-slate-500 text-sm">
//                         Fill in the details below
//                       </p>
//                     </div>

//                   </div>

//                   {/* Close Button */}

//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-blue-50 transition"
//                   >
//                     <FontAwesomeIcon icon={faXmark} />
//                   </button>

//                 </div>

//               </div>

//               {/* Form */}
//               <div className="px-8 py-6 space-y-6">

//                 {/* Department Name */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">
//                     Department Name *
//                   </label>

//                   <input
//                     placeholder="e.g. Dermatology"
//                     value={form.name}
//                     onChange={(e) =>
//                       setForm({ ...form, name: e.target.value })
//                     }
//                     className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">
//                     Description
//                   </label>

//                   <textarea
//                     rows={3}
//                     placeholder="Brief description..."
//                     value={form.description}
//                     onChange={(e) =>
//                       setForm({ ...form, description: e.target.value })
//                     }
//                     className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
//                   />
//                 </div>



//                 {/* Theme Picker */}
//                 <div>

//                   <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-3">
//                     Color Theme
//                   </label>

//                   <div className="flex gap-3">

//                     {themes.map((t, idx) => (

//                       <button
//                         key={idx}
//                         onClick={() => setForm({ ...form, themeIdx: idx })}
//                         className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient}

//             ${form.themeIdx === idx
//                             ? "ring-2 ring-blue-400 ring-offset-2"
//                             : "opacity-60 hover:opacity-100"
//                           }

//             `}
//                       />

//                     ))}

//                   </div>

//                 </div>

//               </div>

//               {/* Footer */}
//               <div className="px-8 pb-7 flex gap-4">

//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 py-3 rounded-2xl border border-blue-300 text-slate-600 text-sm hover:border-blue-400 transition"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleAdd}
//                   className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium shadow-lg shadow-blue-500/30 hover:opacity-90 transition flex items-center justify-center gap-2"
//                 >
//                   <FontAwesomeIcon icon={faPlus} />
//                   Create Department
//                 </button>

//               </div>

//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [form, setForm] = useState({
    name: "",
    description: "",
    themeIdx: 0,
  });

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

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
    try {
      const res = await dispatch(departmentwiseDoctor(id)).unwrap();

      setDepartmentDoctors(res.data || []);
      setSelectedDepartment(name);
      setShowDoctorsModal(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                {dept.doctorCount || 0}
              </p>

              <div className="flex justify-end mt-2">
                <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() => handleViewDoctors(dept._id, dept.name)}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition

bg-indigo-50 text-indigo-600 hover:bg-indigo-100
dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
                >
                  View Doctors
                </button>

                <button
                  onClick={() =>
                    handleDeleteDepartment(dept._id, dept.name)
                  }
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
        doctors={departmentDoctors}
        departmentName={selectedDepartment}
      />

    </div>
  );
}
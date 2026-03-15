// "use client";

// import { doctorDelete, doctorList } from "@/redux/slice/doctorSlice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DoctorCreateModal from "./doctorCreate";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faEllipsisVertical,
//   faPen,
//   faTrash,
//   faSearch,
//   faStar,
//   faCalendar,
//   faGraduationCap
// } from "@fortawesome/free-solid-svg-icons";
// import { confirmDelete } from "../sweetAlert/ConfirmDelete";

// export default function DoctorList() {

//   const dispatch = useDispatch();

//   const doctors = useSelector((state) => state.doctor.doctorList);

//   const [search, setSearch] = useState("");
//   const [openMenu, setOpenMenu] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [editDoctor, setEditDoctor] = useState(null);


//   const [page, setPage] = useState(1);
//   const limit = 6;

//   useEffect(() => {
//     dispatch(doctorList({ page, limit }));
//   }, [dispatch, page]);

//   const handleAddDoctor = () => {
//   setEditDoctor(null);
//   setShowModal(true);
// };


// const closeModal = () => {
//   setShowModal(false);
//   setEditDoctor(null);
// };

// const handleDeleteDoctor = async(id , doctorName)=>{
//   const confirmed = await confirmDelete("Doctor" , doctorName)
//   if(!confirmed) return;

//   try{
//     const res = await dispatch(doctorDelete(id)).unwrap()

//   }catch(error){
//     console.log("error" , error)

//   }
// }

//   const filtered = doctors?.filter((doc) =>
//     doc.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="space-y-6 font-inter">

//       {/* HEADER */}

//       <div className="flex items-center justify-between">

//         <div>
//           <h2 className="text-2xl font-semibold text-slate-800">
//             Doctors
//           </h2>
//           <p className="text-slate-500 text-sm">
//             Manage your medical staff
//           </p>
//         </div>

//         <button
//           onClick={handleAddDoctor}
//           className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm text-white bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg shadow-blue-500/30"
//         >
//           <FontAwesomeIcon icon={faPlus} />
//           Add Doctor
//         </button>

//       </div>


//       {/* SEARCH */}

//       <div className="relative">

//         <FontAwesomeIcon
//           icon={faSearch}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//         />

//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search doctors..."
//           className="w-full bg-white border border-blue-200 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 shadow-sm"
//         />

//       </div>


//       {/* CARDS */}

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

//         {filtered?.map((doc) => {

//           //         const date = slot.date
//           // ? new Date(slot.date).toISOString().split("T")[0]
//           // : "";

//           const time = doc.availableSlots?.[0]?.time || "";

//           return (

//             <div
//               key={doc._id}
//               className="bg-white border border-blue-100 rounded-3xl shadow-lg hover:shadow-xl transition-all group relative"
//             >

//               {/* GRADIENT HEADER */}

//               <div className="relative h-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 ">

//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-indigo-100/20" />

//                 <div className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />

//                 {/* MENU */}

//                 <div className="absolute top-3 right-3">

//                   <button
//                     onClick={() =>
//                       setOpenMenu(openMenu === doc._id ? null : doc._id)
//                     }
//                     className="w-7 h-7 flex items-center justify-center rounded-xl bg-white/60 text-slate-500 hover:bg-white"
//                   >
//                     <FontAwesomeIcon icon={faEllipsisVertical} />
//                   </button>

//                   {openMenu === doc._id && (

//                     <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-2xl shadow-xl p-1 z-50">
//                       <button
//                         onClick={() => {
//                           setEditDoctor(doc);
//                           setShowModal(true);
//                           setOpenMenu(null);
//                         }}
//                         className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 w-full"
//                       >
//                         <FontAwesomeIcon icon={faPen} />
//                         Edit
//                       </button>

//                       <button 
//                       onClick={()=>handleDeleteDoctor(doc._id , doc.name)}
//                       className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 w-full">
//                         <FontAwesomeIcon icon={faTrash} />
//                         Delete
//                       </button>

//                     </div>

//                   )}

//                 </div>

//               </div>


//               {/* BODY */}

//               <div className="px-5 pb-5 -mt-8 relative">

//                 {/* AVATAR */}

//                 <div className="flex items-end justify-between mb-3">

//                   <div className="relative">

//                     <img
//                       src="/doctor-avatar.png"
//                       onError={(e) => {
//                         e.target.src = `https://ui-avatars.com/api/?name=${doc.name}`;
//                       }}
//                       alt="doctor"
//                       className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xl"
//                     />

//                     <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500" />

//                   </div>

//                   <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-600 z-10 relative">
//                     Available
//                   </span>

//                 </div>


//                 {/* INFO */}

//                 <h3 className="text-lg font-semibold text-slate-800">
//                   {doc.name}
//                 </h3>

//                 <p className="text-blue-600 text-sm mt-0.5">
//                   {doc.specialization}
//                 </p>

//                 <p className="text-slate-400 text-xs mt-0.5">
//                   {doc.department?.name}
//                 </p>


//                 {/* STATS */}

//                 {/* <div className="grid grid-cols-3 gap-2 mt-4">

//                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center shadow-sm">
//                     <FontAwesomeIcon icon={faStar} className="text-amber-500 text-xs" />
//                     <p className="text-xs font-semibold">4.7</p>
//                     <p className="text-[9px] text-slate-500">Rating</p>
//                   </div>

//                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center shadow-sm">
//                     <FontAwesomeIcon icon={faCalendar} className="text-blue-600 text-xs" />
//                     <p className="text-xs font-semibold">120</p>
//                     <p className="text-[9px] text-slate-500">Appts</p>
//                   </div>

//                   <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center shadow-sm">
//                     <FontAwesomeIcon icon={faGraduationCap} className="text-indigo-600 text-xs" />
//                     <p className="text-xs font-semibold">8 yrs</p>
//                     <p className="text-[9px] text-slate-500">Exp</p>
//                   </div>

//                 </div> */}


//                 {/* FOOTER */}

//                 <div className="mt-3 pt-3 border-t border-slate-200 space-y-1">

//                   {doc.availableSlots?.map((slot, i) => {

//                     const formattedDate = slot.date
//                       ? new Date(slot.date).toLocaleDateString("en-IN", {
//                         weekday: "short",
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })
//                       : "";

//                     return (
//                       <p key={i} className="text-xs text-slate-500">
//                         {formattedDate} | {slot.time}
//                       </p>
//                     );

//                   })}


//                   <p className="text-xs">
//                     Fees : ₹{doc.fees}
//                   </p>

//                 </div>

//               </div>

//             </div>

//           );

//         })}

//       </div>


//       {/* PAGINATION */}

//       <div className="flex justify-center items-center gap-2 mt-10">

//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           className="px-4 py-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 transition"
//         >
//           Prev
//         </button>

//         <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
//           Page {page}
//         </div>

//         <button
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 transition"
//         >
//           Next
//         </button>

//       </div>


//       {/* MODAL */}

//       {showModal && (
//         <DoctorCreateModal setShowModal={closeModal}
//           editDoctor={editDoctor}
//         />
//       )}

//     </div>
//   );
// }







"use client";

import { departmentwiseDoctor, doctorDelete, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DoctorCreateModal from "./doctorCreate";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faSearch,
  faEye,
  faFilter
} from "@fortawesome/free-solid-svg-icons";

import { confirmDelete } from "../sweetAlert/ConfirmDelete";

export default function DoctorList() {

  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctorList);
  const doctorTotal = useSelector((state) => state.doctor.doctorTotal);

  const [showModal, setShowModal] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [editDoctor, setEditDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(doctorTotal / limit);
  const departments = useSelector((state) => state.doctor.departmentList);

  useEffect(() => {
    dispatch(getDepartmentList());
  }, [dispatch]);

  useEffect(() => {
    if (departmentId) {
      dispatch(departmentwiseDoctor(departmentId))
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

  const handleDeleteDoctor = async (id, doctorName) => {

    const confirmed = await confirmDelete("Doctor", doctorName);

    if (!confirmed) return;

    try {
      await dispatch(doctorDelete(id)).unwrap();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="space-y-5 font-inter text-slate-700">

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
              setPage(1); // reset page when searching
            }}
            placeholder="Search doctor..."
            className="w-full border border-slate-200 rounded-full pl-9 pr-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
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
            className="border border-slate-200 rounded-full pl-8 pr-6 py-2 text-sm bg-white shadow-sm appearance-none cursor-pointer focus:outline-none focus:ring-0"
          >

            <option value="">All Departments</option>

            {departments?.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}

          </select>
        </div>


        {/* ADD DOCTOR BUTTON */}

        <button
          onClick={handleAddDoctor}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md hover:shadow-lg transition"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Add Doctor
        </button>

      </div>


      {/* DOCTOR TABLE */}

      <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">

            <tr>

              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Available Slot</th>
              <th className="px-6 py-4 text-left">Fees</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>


          <tbody>

            {doctors?.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center py-12 text-slate-400">

                  <div className="flex flex-col items-center gap-2">

                    <FontAwesomeIcon icon={faSearch} className="text-2xl text-slate-300" />

                    <p className="text-sm font-medium text-slate-500">
                      No doctors found
                    </p>

                    <p className="text-xs text-slate-400">
                      Try adjusting your search or filters
                    </p>

                  </div>

                </td>
              </tr>

            ) : (

              doctors?.map((doc) => {

                const slot = doc.availableSlots?.[0];

                return (

                  <tr
                    key={doc._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    {/* DOCTOR */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold">
                          {doc.name?.charAt(0)}
                        </div>

                        <div className="leading-tight">
                          <p className="font-medium text-slate-800 text-sm">
                            {doc.name}
                          </p>

                          <p className="text-xs text-blue-600">
                            {doc.specialization}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DEPARTMENT */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {doc.departmentId?.name}
                    </td>

                    {/* SLOT */}
                    <td className="px-6 py-4">
                      {slot ? (
                        <div className="inline-flex flex-col px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-medium">
                          <span>
                            {new Date(slot.date).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span className="text-[11px] text-emerald-500">
                            {slot.time}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">
                          No Slot
                        </span>
                      )}
                    </td>

                    {/* FEES */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      ₹{doc.fees}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 flex justify-end gap-3">

                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition">
                        <FontAwesomeIcon icon={faEye} className="text-xs" />
                      </button>

                      <button
                        onClick={() => {
                          setEditDoctor(doc);
                          setShowModal(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition"
                      >
                        <FontAwesomeIcon icon={faPen} className="text-xs" />
                      </button>

                      <button
                        onClick={() => handleDeleteDoctor(doc._id, doc.name)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
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

      <div className="flex justify-center mt-8">

        <div className="flex items-center gap-2">

          {/* PREVIOUS */}

          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 rounded-full text-sm border border-slate-200
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-slate-100 transition"
          >
            Previous
          </button>


          {/* PAGE NUMBERS */}

          {Array.from({ length: totalPages }).map((_, i) => {

            const p = i + 1;

            return (

              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-full text-sm font-medium transition
          
          ${page === p
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }
          
          `}
              >
                {p}
              </button>

            );

          })}


          {/* NEXT */}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-full text-sm border border-slate-200
      disabled:opacity-40 disabled:cursor-not-allowed
      hover:bg-slate-100 transition"
          >
            Next
          </button>

        </div>

      </div>


      {/* MODAL */}

      {showModal && (
        <DoctorCreateModal
          setShowModal={closeModal}
          editDoctor={editDoctor}
        />
      )}

    </div>
  );
}
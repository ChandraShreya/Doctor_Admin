// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { Cookies } from "react-cookie";
// import { doctorCreate, doctorEdit, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faStethoscope, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "sonner";

// const cookie = new Cookies();

// export default function DoctorCreateModal({ setShowModal, editDoctor }: any) {

//     const dispatch = useDispatch();

//     const departmentList = useSelector(
//         (state: any) => state.doctor.departmentList
//     );

//     const [form, setForm] = useState({
//         name: "",
//         fees: "",
//         departmentId: ""
//     });

//     // multiple slots
//     const [slots, setSlots] = useState([
//         { date: "", time: "" }
//     ]);

//     useEffect(() => {
//         dispatch(getDepartmentList());
//     }, [dispatch]);

//     useEffect(() => {

//         if (editDoctor) {

//             setForm({
//                 name: editDoctor.name || "",
//                 fees: editDoctor.fees || "",
//                 departmentId: editDoctor.department?._id || ""
//             });

//             if (editDoctor.availableSlots?.length) {

//                 setSlots(
//                     editDoctor.availableSlots.map((slot: any) => ({
//                         date: slot.date.split("T")[0],
//                         time: slot.time
//                     }))
//                 );

//             }

//         } else {

//             // reset form when adding new doctor
//             setForm({
//                 name: "",
//                 fees: "",
//                 departmentId: ""
//             });

//             setSlots([{ date: "", time: "" }]);

//         }

//     }, [editDoctor]);

//     // add slot
//     const addSlot = () => {
//         setSlots([...slots, { date: "", time: "" }]);
//     };

//     // remove slot
//     const removeSlot = (index: number) => {
//         const updated = [...slots];
//         updated.splice(index, 1);
//         setSlots(updated);
//     };

//     // update slot values
//     const handleSlotChange = (index: number, field: string, value: string) => {

//         const updatedSlots = [...slots];
//         updatedSlots[index][field] = value;
//         setSlots(updatedSlots);

//     };

//     const handleDepartment = (e: any) => {

//         const id = e.target.value;

//         setForm({
//             ...form,
//             departmentId: id
//         });

//         cookie.set("departmentId", id, { path: "/" });

//     };

//     const handleSubmit = async () => {

//         const payload = {
//             name: form.name,
//             fees: form.fees,
//             departmentId: form.departmentId,
//             availableSlots: slots
//                 .filter((slot) => slot.date && slot.time)
//                 .map((slot) => ({
//                     date: slot.date,
//                     time: slot.time
//                 }))
//         };

//         try {

//             let res;

//             if (editDoctor) {

//                 res = await dispatch(
//                     doctorEdit({
//                         id: editDoctor._id,
//                         data: payload
//                     })
//                 ).unwrap();

//                 console.log("Doctor update response:", res);
//                 toast.success(res.message)


//             } else {

//                const response = await dispatch(doctorCreate(payload)).unwrap();

//                 console.log("Doctor create response:", response);

//                     toast.success(response.message)


//             }

//             dispatch(doctorList({ page: 1, limit: 6 }));

//             setShowModal(false);

//         } catch (error) {

//             console.log("Doctor error:", error);

//         }

//     };

//     return (

//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//             {/* Background Blur */}
//             <div
//                 className="absolute inset-0 bg-blue-900/10 backdrop-blur-md"
//                 onClick={() => setShowModal(false)}
//             />

//             <div className="relative w-full max-w-md">

//                 {/* Glow effect */}
//                 <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/50 to-indigo-200/30 blur-xl" />

//                 {/* Modal */}
//                 <div className="relative bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

//                     {/* Top gradient */}
//                     <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 sticky top-0" />

//                     {/* Header */}
//                     <div className="px-6 pt-6 pb-4 border-b border-blue-100 bg-white">

//                         <div className="flex items-center justify-between">

//                             <div className="flex items-center gap-3">

//                                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">

//                                     <FontAwesomeIcon icon={faStethoscope} className="text-white text-sm" />

//                                 </div>

//                                 <div>
//                                     <h3 className="text-slate-800 text-[15px] font-semibold">
//                                         {editDoctor ? "Edit Doctor" : "Add New Doctor"}                                    </h3>
//                                     <p className="text-slate-500 text-xs">
//                                         Fill in the doctor's details
//                                     </p>
//                                 </div>

//                             </div>

//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
//                             >
//                                 <FontAwesomeIcon icon={faXmark} />
//                             </button>

//                         </div>

//                     </div>

//                     {/* Form */}
//                     <div className="px-6 py-5 space-y-4">

//                         {/* Doctor Name */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Doctor Name
//                             </label>

//                             <input
//                                 placeholder="Dr. John Smith"
//                                 value={form.name}
//                                 onChange={(e) =>
//                                     setForm({ ...form, name: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div>

//                         {/* Specialization */}
//                         {/* <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Specialization
//                             </label>

//                             <input
//                                 placeholder="e.g. Cardiologist"
//                                 value={form.specialization}
//                                 onChange={(e) =>
//                                     setForm({ ...form, specialization: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div> */}

//                         {/* Fees */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Consultation Fees
//                             </label>

//                             <input
//                                 placeholder="e.g. 1500"
//                                 value={form.fees}
//                                 onChange={(e) =>
//                                     setForm({ ...form, fees: e.target.value })
//                                 }
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             />

//                         </div>

//                         {/* Department */}
//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Department
//                             </label>

//                             <select
//                                 value={form.departmentId}
//                                 onChange={handleDepartment}
//                                 className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                             >

//                                 <option>Select Department</option>

//                                 {departmentList?.map((dep: any) => (
//                                     <option key={dep._id} value={dep._id}>
//                                         {dep.name}
//                                     </option>
//                                 ))}

//                             </select>

//                         </div>

//                         {/* Slots */}

//                         <div>

//                             <label className="text-slate-500 text-[11px] uppercase tracking-wider block mb-2">
//                                 Available Slots
//                             </label>

//                             {slots.map((slot, index) => (

//                                 <div key={index} className="flex gap-2 mb-2">

//                                     <input
//                                         type="date"
//                                         value={slot.date}
//                                         onChange={(e) =>
//                                             handleSlotChange(index, "date", e.target.value)
//                                         }
//                                         className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-2 text-sm"
//                                     />

//                                     <input
//                                         type="time"
//                                         value={slot.time}
//                                         onChange={(e) =>
//                                             handleSlotChange(index, "time", e.target.value)
//                                         }
//                                         className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-2 text-sm"
//                                     />

//                                     {slots.length > 1 && (

//                                         <button
//                                             onClick={() => removeSlot(index)}
//                                             className="text-red-500 px-2"
//                                         >
//                                             <FontAwesomeIcon icon={faXmark} />
//                                         </button>

//                                     )}

//                                 </div>

//                             ))}

//                             <button
//                                 onClick={addSlot}
//                                 className="text-blue-600 text-sm mt-1 flex items-center gap-1"
//                             >
//                                 <FontAwesomeIcon icon={faPlus} />
//                                 Add Slot
//                             </button>

//                         </div>

//                     </div>

//                     {/* Footer */}
//                     <div className="px-6 pb-6 flex gap-3">

//                         <button
//                             onClick={() => setShowModal(false)}
//                             className="flex-1 py-2.5 rounded-2xl border border-blue-300 text-slate-600 text-sm hover:border-blue-400"
//                         >
//                             Cancel
//                         </button>

//                         <button
//                             onClick={handleSubmit}
//                             className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
//                         >
//                             <FontAwesomeIcon icon={faPlus} />
//                             {editDoctor ? "Edit Doctor" : "Add New Doctor"}
//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </div>

//     );

// }




// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { doctorCreate, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faStethoscope, faXmark } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "sonner";

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // ================= VALIDATION =================

// const schema = yup.object().shape({
//   name: yup.string().required("Doctor name is required"),
//   fees: yup.string().required("Fees is required"),
//   departmentId: yup.string().required("Department is required"),
//   startTime: yup.string().required("Start time required"),
//   endTime: yup.string().required("End time required"),
//   slotDuration: yup
//     .number()
//     .typeError("Must be number")
//     .required("Slot duration required"),
// });

// export default function DoctorCreateModal({ setShowModal }: any) {

//   const dispatch = useDispatch();

//   const departmentList = useSelector(
//     (state: any) => state.doctor.departmentList
//   );

//   useEffect(() => {
//     dispatch(getDepartmentList());
//   }, [dispatch]);

//   // ================= FORM =================

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // ================= SUBMIT =================

//   const onSubmit = async (data: any) => {

//     const payload = {
//       name: data.name,
//       fees: data.fees,
//       departmentId: data.departmentId,
//       schedule: {
//         startTime: data.startTime,
//         endTime: data.endTime,
//         slotDuration: data.slotDuration,
//       },
//     };

//     try {

//       const response = await dispatch(doctorCreate(payload)).unwrap();

//       toast.success(response.message);

//       dispatch(doctorList({ page: 1, limit: 6 }));

//       setShowModal(false);

//     } catch (error) {
//       console.log(error);
//     }
//   };

// return (
//   <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

//     {/* Overlay */}
//     <div
//       onClick={() => setShowModal(false)}
//       className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//     />

//     {/* Modal */}
//     <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">

//       {/* HEADER */}
//       <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">

//         <div className="flex items-center gap-3">

//           <div className="w-11 h-11 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center shadow-sm">
//             <FontAwesomeIcon icon={faStethoscope} />
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
//               Add Doctor
//             </h3>
//             <p className="text-xs text-slate-500 dark:text-slate-400">
//               Fill doctor details
//             </p>
//           </div>

//         </div>

//         <button
//           onClick={() => setShowModal(false)}
//           className="w-9 h-9 flex items-center justify-center rounded-xl transition
//           hover:bg-slate-100 dark:hover:bg-slate-700/60"
//         >
//           <FontAwesomeIcon icon={faXmark} />
//         </button>

//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit(onSubmit)}>

//         <div className="p-6 space-y-5">

//           {/* NAME */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
//               Doctor Name
//             </label>

//             <input
//               {...register("name")}
//               placeholder="e.g. Dr. John Doe"
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm 
//               bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//               dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//             />

//             <p className="text-xs text-red-500 mt-1">
//               {errors.name?.message}
//             </p>
//           </div>

//           {/* FEES */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
//               Consultation Fees
//             </label>

//             <input
//               {...register("fees")}
//               placeholder="e.g. ₹000"
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm 
//               bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//               dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//             />

//             <p className="text-xs text-red-500 mt-1">
//               {errors.fees?.message}
//             </p>
//           </div>

//           {/* DEPARTMENT */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
//               Department
//             </label>

//             <select
//               {...register("departmentId")}
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm 
//               bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//               dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//             >
//               <option value="">Select Department</option>

//               {departmentList?.map((dep: any) => (
//                 <option key={dep._id} value={dep._id}>
//                   {dep.name}
//                 </option>
//               ))}

//             </select>

//             <p className="text-xs text-red-500 mt-1">
//               {errors.departmentId?.message}
//             </p>
//           </div>

//           {/* SCHEDULE */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 block">
//               Schedule
//             </label>

//             <div className="grid grid-cols-3 gap-2">

//               <input
//                 type="time"
//                 {...register("startTime")}
//                 className="px-3 py-2 rounded-xl border border-slate-200 text-sm 
//                 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//                 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//               />

//               <input
//                 type="time"
//                 {...register("endTime")}
//                 className="px-3 py-2 rounded-xl border border-slate-200 text-sm 
//                 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//                 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//               />

//               <input
//                 type="number"
//                 placeholder="Slot (min)"
//                 {...register("slotDuration")}
//                 className="px-3 py-2 rounded-xl border border-slate-200 text-sm 
//                 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100
//                 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:ring-slate-600"
//               />

//             </div>

//             <p className="text-xs text-red-500 mt-1">
//               {errors.startTime?.message ||
//                 errors.endTime?.message ||
//                 errors.slotDuration?.message}
//             </p>
//           </div>

//         </div>

//         {/* FOOTER */}
//         <div className="px-6 pb-6 flex gap-3">

//           <button
//             type="button"
//             onClick={() => setShowModal(false)}
//             className="flex-1 py-2.5 rounded-xl border text-sm transition
//             border-slate-300 text-slate-600 hover:bg-slate-100
//             dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/60"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2
//             shadow-sm hover:shadow-md transition-all duration-200"
//             style={{
//               background: "linear-gradient(to right, #5e72e4, #7b8cf5)",
//             }}
//           >
//             <FontAwesomeIcon icon={faPlus} />
//             Create
//           </button>

//         </div>

//       </form>

//     </div>
//   </div>
// );
// }


"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doctorCreate, doctorList, getDepartmentList } from "@/redux/slice/doctorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStethoscope, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const dispatch = useDispatch();

  const departmentList = useSelector(
    (state: any) => state.doctor.departmentList
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
    const payload = {
      name: data.name,
      fees: data.fees,
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



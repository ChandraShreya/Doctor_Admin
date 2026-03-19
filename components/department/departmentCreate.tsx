// "use client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBuilding, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

// export default function DepartmentModal({
//   showModal,
//   setShowModal,
//   form,
//   setForm,
//   handleAdd,
// }) {
//   if (!showModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-blue-900/20 backdrop-blur-md"
//         onClick={() => setShowModal(false)}
//       />

//       <div className="relative w-full max-w-xl">
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-xl"></div>

//         <div className="relative bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden">
//           {/* Top Bar */}
//           <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"></div>

//           {/* Header */}
//           <div className="px-8 pt-7 pb-5 border-b border-blue-100 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
//                 <FontAwesomeIcon icon={faBuilding} className="text-white" />
//               </div>
//               <div>
//                 <h3 className="text-slate-800 text-lg font-semibold">
//                   New Department
//                 </h3>
//                 <p className="text-slate-500 text-sm">
//                   Fill in the details below
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowModal(false)}
//               className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50"
//             >
//               <FontAwesomeIcon icon={faXmark} />
//             </button>
//           </div>

//           {/* Form */}
//           <div className="px-8 py-6 space-y-6">
//             <input
//               placeholder="Department Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm"
//             />

//             <textarea
//               rows={3}
//               placeholder="Description"
//               value={form.description}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   description: e.target.value,
//                 })
//               }
//               className="w-full bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm resize-none"
//             />
//           </div>

//           {/* Footer */}
//           <div className="px-8 pb-7 flex gap-4">
//             <button
//               onClick={() => setShowModal(false)}
//               className="flex-1 py-3 rounded-xl border border-blue-300 text-slate-600 text-sm"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleAdd}
//               className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm flex items-center justify-center gap-2"
//             >
//               <FontAwesomeIcon icon={faPlus} />
//               Create Department
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faXmark,
//   faBuilding,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";

// export default function DepartmentModal({
//   show,
//   onClose,
//   form,
//   setForm,
//   onSubmit,
// }: any) {

//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

//       {/* Overlay */}
//       <div
//         onClick={onClose}
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//       />

//       {/* Modal */}
//       <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">

//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

//           <div className="flex items-center gap-3">

//             <div className="w-12 h-12 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center shadow-sm">
//               <FontAwesomeIcon icon={faBuilding} />
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold text-slate-800">
//                 Add Department
//               </h3>
//               <p className="text-xs text-slate-500">
//                 Create a new department
//               </p>
//             </div>

//           </div>

//           <button
//             onClick={onClose}
//             className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
//           >
//             <FontAwesomeIcon icon={faXmark} />
//           </button>

//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-5">

//           {/* Department Name */}
//           <div>
//             <label className="text-xs text-slate-500 mb-1 block">
//               Department Name
//             </label>

//             <input
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               placeholder="e.g. Cardiology"
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-xs text-slate-500 mb-1 block">
//               Description
//             </label>

//             <textarea
//               rows={3}
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               placeholder="Short description..."
//               className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
//             />
//           </div>

//         </div>

//         {/* Footer */}
//         <div className="px-6 pb-6 flex gap-3">

//           <button
//             onClick={onClose}
//             className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-600 hover:bg-slate-100 transition"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onSubmit}
//             className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
//             style={{
//               background: "linear-gradient(to right, #5e72e4, #825ee4)",
//             }}
//           >
//             <FontAwesomeIcon icon={faPlus} />
//             Create
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }





"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBuilding,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";


const schema = yup.object().shape({
  name: yup.string().required("Department name is required"),
  description: yup
    .string()
    .required("Description is required")
    .min(5, "Minimum 5 characters"),
});

export default function DepartmentModal({
  show,
  onClose,
  form,
  setForm,
  onSubmit,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: form,
  });

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setForm(data);

    try {
      setLoading(true);
      await onSubmit(); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

  
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-[#5e72e4] text-white flex items-center justify-center shadow-sm">
              <FontAwesomeIcon icon={faBuilding} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Add Department
              </h3>
              <p className="text-xs text-slate-500">
                Create a new department
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >

          {/* Department Name */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Department Name
            </label>

            <input
              {...register("name")}
              placeholder="e.g. Cardiology"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />

            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1 block">
              Description
            </label>

            <textarea
              rows={3}
              {...register("description")}
              placeholder="Short description..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
            />

            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pt-2 flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(to right, #5e72e4, #825ee4)",
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs">Creating...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlus} />
                  Create
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
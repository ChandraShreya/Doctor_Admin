// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { doctorEdit, doctorList } from "@/redux/slice/doctorSlice";
// import { toast } from "sonner";

// export default function DoctorProfilePage() {

//     const { id } = useParams();
//     const router = useRouter();
//     const dispatch = useDispatch();

//     const doctors = useSelector((state: any) => state.doctor.doctorList);

//     const doctor = doctors?.find((doc: any) => doc._id === id);

//     const [form, setForm] = useState({
//         name: "",
//         specialization: "",
//         fees: "",
//         departmentId: "",
//         date: "",
//         time: ""
//     });

//     useEffect(() => {

//         if (!doctor) {
//             dispatch(doctorList({ page: 1, limit: 100 }));
//         }

//         if (doctor) {

//             const slot = doctor.availableSlots?.[0];

//             setForm({
//                 name: doctor.name || "",
//                 specialization: doctor.specialization || "",
//                 fees: doctor.fees || "",
//                 departmentId: doctor.department?._id || "",
//                 date: slot?.date?.split("T")[0] || "",
//                 time: slot?.time || ""
//             });

//         }

//     }, [doctor, dispatch]);

//     if (!doctor) {
//         return <div className="p-6 text-slate-500">Loading doctor...</div>;
//     }

//     const handleChange = (e: any) => {

//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });

//     };

//     const handleUpdateDoctor = async () => {

//         const payload = {

//             name: form.name,
//             specialization: form.specialization,
//             fees: form.fees,
//             departmentId: form.departmentId,
//             availableSlots: [
//                 {
//                     date: form.date,
//                     time: form.time
//                 }
//             ]

//         };

//         try {

//             const res = await dispatch(
//                 doctorEdit({
//                     id: doctor._id,
//                     data: payload
//                 })
//             ).unwrap();

//             toast.success(res.message || "Doctor updated successfully");

//             router.push("/dashboard/doctors");

//         } catch (error) {

//             toast.error("Failed to update doctor");

//         }

//     };

// return (
//   <div className="space-y-6">

//     {/* HERO HEADER */}
//     <div className="
//       relative rounded-2xl px-6 py-5
//       bg-gradient-to-r from-[#5e72e4]/90 to-[#7b8cf5]/90
//       dark:from-slate-900 dark:to-slate-800
//       text-white shadow-lg overflow-hidden
//     ">
//       <div className="absolute inset-0 bg-white/5 dark:bg-black/20 backdrop-blur-sm" />

//       <div className="relative flex items-center gap-4">
//         <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-semibold">
//           {doctor.name?.charAt(0)}
//         </div>

//         <div>
//           <h2 className="text-lg font-semibold">
//             {doctor.name}
//           </h2>
//           <p className="text-sm text-blue-100/80">
//             {doctor.department?.name}
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* GRID */}
//     <div className="grid grid-cols-12 gap-6">

//       {/* LEFT - FORM */}
//       <div className="col-span-8">
//         <div className="
//           rounded-2xl p-6
//           bg-white dark:bg-slate-900
//           border border-slate-200 dark:border-slate-700
//           shadow-[0_10px_30px_rgba(0,0,0,0.06)]
//         ">

//           <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-6">
//             Edit Doctor Details
//           </h3>

//           <div className="grid grid-cols-2 gap-x-6 gap-y-5">

//             {/* NAME */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Name
//               </label>
//               <input name="name" value={form.name} onChange={handleChange} className="input-style" />
//             </div>

//             {/* FEES */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Consultation Fees
//               </label>
//               <input name="fees" value={form.fees} onChange={handleChange} className="input-style" />
//             </div>

//             {/* DEPARTMENT */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Department
//               </label>
//               <input name="departmentId" value={form.departmentId} onChange={handleChange} className="input-style" />
//             </div>

//             {/* EMPTY SPACE FOR BALANCE */}
//             <div />

//             {/* SLOT SECTION */}
//             <div className="col-span-2 mt-2">
//               <p className="text-xs font-semibold text-slate-400 uppercase">
//                 Slot Configuration
//               </p>
//             </div>

//             {/* START TIME */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Start Time
//               </label>
//               <input type="time" name="startTime" className="input-style" />
//             </div>

//             {/* END TIME */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 End Time
//               </label>
//               <input type="time" name="endTime" className="input-style" />
//             </div>

//             {/* DURATION */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
//                 Slot Duration (min)
//               </label>
//               <input type="number" name="duration" className="input-style" />
//             </div>

//           </div>

//           {/* ACTIONS */}
//           <div className="mt-8 flex items-center gap-4">

//             <button
//               onClick={handleUpdateDoctor}
//               className="
//                 px-6 py-2.5 rounded-lg
//                 bg-gradient-to-r from-blue-600 to-indigo-600
//                 text-white text-sm font-medium
//                 shadow-md hover:shadow-lg
//                 hover:scale-[1.02] active:scale-[0.98]
//                 transition
//               "
//             >
//               Update Doctor
//             </button>

//             <button
//               onClick={() => router.push("/dashboard/doctors")}
//               className="
//                 px-6 py-2.5 rounded-lg
//                 border border-slate-300 dark:border-slate-600
//                 text-slate-600 dark:text-slate-300
//                 text-sm font-medium
//                 hover:bg-slate-100 dark:hover:bg-slate-800
//                 transition
//               "
//             >
//               Back to List
//             </button>

//           </div>

//         </div>
//       </div>


//       {/* RIGHT PANEL */}
//       <div className="col-span-4">

//         <div className="
//           rounded-2xl p-6 space-y-6
//           bg-white dark:bg-slate-900
//           border border-slate-200 dark:border-slate-700
//           shadow-[0_10px_30px_rgba(0,0,0,0.06)]
//         ">

//           {/* PROFILE */}
//           <div className="text-center">
//             <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-white font-semibold text-lg">
//               {doctor.name?.charAt(0)}
//             </div>

//             <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
//               {doctor.name}
//             </h3>

//             <p className="text-xs text-slate-500 dark:text-slate-400">
//               {doctor.specialization}
//             </p>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-2 gap-3">

//             <div className="
//               rounded-lg p-3 text-center
//               bg-slate-50 dark:bg-slate-800
//               border border-slate-200 dark:border-slate-700
//             ">
//               <p className="text-xs text-slate-400">
//                 Today's Patients
//               </p>
//               <p className="font-semibold text-slate-800 dark:text-white">
//                 12
//               </p>
//             </div>

//             <div className="
//               rounded-lg p-3 text-center
//               bg-slate-50 dark:bg-slate-800
//               border border-slate-200 dark:border-slate-700
//             ">
//               <p className="text-xs text-slate-400">
//                 Fees
//               </p>
//               <p className="font-semibold text-slate-800 dark:text-white">
//                 ₹{doctor.fees}
//               </p>
//             </div>

//           </div>

//           {/* SCHEDULE */}
//           <div className="
//             rounded-xl p-4
//             bg-blue-50 dark:bg-blue-500/10
//             border border-blue-100 dark:border-blue-400/30
//           ">
//             <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">
//               Today's Schedule
//             </p>

//             {form.date && form.time ? (
//               <p className="text-sm mt-1 text-blue-800 dark:text-blue-200">
//                 {new Date(form.date).toLocaleDateString("en-IN")} | {form.time}
//               </p>
//             ) : (
//               <p className="text-xs text-slate-400">
//                 No schedule today
//               </p>
//             )}
//           </div>

//         </div>
//       </div>

//     </div>
//   </div>
// );

// }



"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { doctorEdit, doctorList, appointmentList, acceptedAppointment } from "@/redux/slice/doctorSlice";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object({
    name: yup.string().required("Name is required"),
    fees: yup
        .number()
        .typeError("Fees must be a number")
        .required("Fees is required"),
    startTime: yup.string().required("Start time is required"),
    endTime: yup.string().required("End time is required"),
    duration: yup
        .number()
        .typeError("Duration must be number")
        .required("Duration is required"),
});

export default function DoctorProfilePage() {

    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const doctors = useSelector((state) => state.doctor.doctorList);
    const appointments = useSelector((state) => state.doctor.appointmentList);
    const acceptedAppointments = useSelector((state) => state.doctor.acceptedAppointments);
    const doctor = doctors?.find((doc) => doc._id === id);

    const doctorAppointments = [
        ...(appointments || []).filter((a) => a.doctorId === id),
        ...(acceptedAppointments || []).filter((a) => a.doctorId === id),
    ]
        .reduce((unique, item) => {
            if (!unique.find((a) => a._id === item._id)) unique.push(item);
            return unique;
        }, [])
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            fees: "",
            startTime: "",
            endTime: "",
            duration: "",
        },
    });

   
    useEffect(() => {
        if (!doctor) {
            dispatch(doctorList({ page: 1, limit: 100 }));
        }

        dispatch(appointmentList());
        dispatch(acceptedAppointment());

        if (doctor) {
            const schedule = doctor.schedule;

            reset({
    name: doctor.name || "",
    fees: doctor.fees || "",
    startTime: schedule?.startTime || "",
    endTime: schedule?.endTime || "",
    duration: schedule?.slotDuration || "",
});
        }
    }, [doctor, dispatch, reset]);

    if (!doctor) {
        return <div className="p-6 text-slate-500">Loading doctor...</div>;
    }

const onSubmit = async (data) => {
  const payload = {
    name: data.name,
    fees: Number(data.fees),
    schedule: {
      startTime: data.startTime,
      endTime: data.endTime,
      slotDuration: Number(data.duration),
    },
  };

  try {
    const res = await dispatch(
      doctorEdit({
        id: doctor._id,
        data: payload,
      })
    ).unwrap();

    toast.success(res.message || "Doctor updated");

    // optional but safe
    await dispatch(doctorList({ page: 1, limit: 10 }));

    router.push("/dashboard/doctors");

  } catch {
    toast.error("Update failed");
  }
};

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="
        rounded-2xl px-6 py-5
        bg-gradient-to-r from-[#5e72e4] to-[#7b8cf5]
        dark:from-slate-900 dark:to-slate-800
        text-white shadow-md
      ">
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                            {doctor.name?.charAt(0)}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                {doctor.name}
                            </h2>
                            <p className="text-sm text-blue-100">
                                {doctor.department?.name}
                            </p>
                        </div>
                    </div>


                    {/* <button
                        onClick={() => router.push("/dashboard/doctors")}
                        className="
              px-4 py-2 rounded-lg
              bg-white/20 hover:bg-white/30
              text-sm
              transition
            "
                    >
                        Back
                    </button> */}

                </div>
            </div>


            {/* GRID */}
            <div className="grid grid-cols-12 gap-6">

                {/* FORM */}
                <div className="col-span-8">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="
              bg-white dark:bg-slate-900
              rounded-2xl p-6
              border border-slate-200 dark:border-slate-700
              shadow-sm
              space-y-6
            "
                    >

                        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Edit Doctor
                        </h3>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-5">

                            {/* NAME */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 dark:text-slate-300">
                                    Name
                                </label>
                                <input
                                    {...register("name")}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500/40"
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                            </div>

                            {/* FEES */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 dark:text-slate-300">
                                    Fees
                                </label>
                                <input
                                    {...register("fees")}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500/40"
                                />
                                {errors.fees && <p className="text-xs text-red-500">{errors.fees.message}</p>}
                            </div>

                            {/* SLOT TITLE */}
                            <div className="col-span-2 mt-2">
                                <p className="text-xs uppercase text-slate-400">
                                    Slot Configuration
                                </p>
                            </div>

                            {/* START */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 dark:text-slate-300">
                                    Start Time
                                </label>
                                <input
                                    type="time"
                                    {...register("startTime")}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                                />
                                {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
                            </div>

                            {/* END */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 dark:text-slate-300">
                                    End Time
                                </label>
                                <input
                                    type="time"
                                    {...register("endTime")}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                                />
                                {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
                            </div>

                            {/* DURATION */}
                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-600 dark:text-slate-300">
                                    Duration (min)
                                </label>
                                <input
                                    type="number"
                                    {...register("duration")}
                                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                                />
                                {errors.duration && <p className="text-xs text-red-500">{errors.duration.message}</p>}
                            </div>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4 mt-6">

                            <button
                                type="submit"
                                className="
                  px-6 py-2.5 rounded-lg
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  text-white text-sm font-medium
                  shadow-md hover:shadow-lg
                  transition
                "
                            >
                                Update Doctor
                            </button>


                            <button
                                type="button"
                                onClick={() => router.push("/dashboard/doctors")}
                                className="
                  px-6 py-2.5 rounded-lg
                  border border-slate-300 dark:border-slate-600
                  text-slate-600 dark:text-slate-300
                  text-sm font-medium
                  hover:bg-slate-100 dark:hover:bg-slate-800
                  transition
                "
                            >
                                Back to List
                            </button>

                        </div>

                    </form>
                </div>



                <div className="col-span-4">

                    <div className="
    bg-white dark:bg-slate-900
    rounded-2xl p-6 space-y-6
    border border-slate-200 dark:border-slate-700
    shadow-sm
  ">

                        {/* PROFILE */}
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-white font-semibold text-lg">
                                {doctor.name?.charAt(0)}
                            </div>

                            <h3 className="mt-3 font-semibold text-slate-800 dark:text-white">
                                {doctor.name}
                            </h3>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {doctor.department?.name}
                            </p>
                        </div>


                        {/* STATS */}
                        <div className="grid grid-cols-2 gap-3">

                            {/* PATIENTS */}
                            <div className="
        rounded-lg p-3 text-center
        bg-slate-50 dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
      ">
                                <p className="text-xs text-slate-400">
                                    Today's Patients
                                </p>
                                <p className="font-semibold text-slate-800 dark:text-white">
                                    12
                                </p>
                            </div>

                            {/* FEES */}
                            <div className="
        rounded-lg p-3 text-center
        bg-slate-50 dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
      ">
                                <p className="text-xs text-slate-400">
                                    Fees
                                </p>
                                <p className="font-semibold text-slate-800 dark:text-white">
                                    ₹{doctor.fees}
                                </p>
                            </div>

                        </div>


                        {/* APPOINTMENT HISTORY */}
                        <div className="
      rounded-xl p-4
      bg-white dark:bg-slate-800
      border border-slate-200 dark:border-slate-700
      mt-4
    ">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Appointment History
                            </p>

                            {doctorAppointments.length === 0 ? (
                                <p className="text-sm mt-2 text-slate-500 dark:text-slate-400">
                                    No appointments found for this doctor.
                                </p>
                            ) : (
                                <ul className="mt-3 space-y-2 max-h-56 overflow-auto">
                                    {doctorAppointments.slice(0, 8).map((a) => (
                                        <li key={a._id} className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                            <div className="flex justify-between text-xs text-slate-500">
                                                <span>{new Date(a.date).toLocaleDateString("en-IN")}</span>
                                                <span className="font-semibold">{a.time}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                                {a.status?.charAt(0).toUpperCase() + a.status?.slice(1)}
                                                {a.name ? ` · ${a.name}` : ""}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
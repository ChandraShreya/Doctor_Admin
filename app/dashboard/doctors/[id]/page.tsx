"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doctorEdit, doctorList } from "@/redux/slice/doctorSlice";
import { toast } from "sonner";

export default function DoctorProfilePage() {

    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const doctors = useSelector((state: any) => state.doctor.doctorList);

    const doctor = doctors?.find((doc: any) => doc._id === id);

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        fees: "",
        departmentId: "",
        date: "",
        time: ""
    });

    useEffect(() => {

        if (!doctor) {
            dispatch(doctorList({ page: 1, limit: 100 }));
        }

        if (doctor) {

            const slot = doctor.availableSlots?.[0];

            setForm({
                name: doctor.name || "",
                specialization: doctor.specialization || "",
                fees: doctor.fees || "",
                departmentId: doctor.department?._id || "",
                date: slot?.date?.split("T")[0] || "",
                time: slot?.time || ""
            });

        }

    }, [doctor, dispatch]);

    if (!doctor) {
        return <div className="p-6 text-slate-500">Loading doctor...</div>;
    }

    const handleChange = (e: any) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleUpdateDoctor = async () => {

        const payload = {

            name: form.name,
            specialization: form.specialization,
            fees: form.fees,
            departmentId: form.departmentId,
            availableSlots: [
                {
                    date: form.date,
                    time: form.time
                }
            ]

        };

        try {

            const res = await dispatch(
                doctorEdit({
                    id: doctor._id,
                    data: payload
                })
            ).unwrap();

            toast.success(res.message || "Doctor updated successfully");

            router.push("/dashboard/doctors");

        } catch (error) {

            toast.error("Failed to update doctor");

        }

    };

    return (

        <div className="space-y-6">

            {/* HEADER */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {doctor.name?.charAt(0)}
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                        {doctor.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {doctor.department?.name}
                    </p>
                </div>


            </div>


            {/* GRID */}

            <div className="grid grid-cols-12 gap-6">


                {/* EDIT FORM */}

                <div className="col-span-8">

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                        <h3 className="text-xs font-semibold text-slate-500 uppercase mb-5">
                            Edit Doctor
                        </h3>



                        <div className="grid grid-cols-2 gap-4">

                            {/* NAME */}

                            <div>

                                <label className="text-xs text-slate-500 block mb-1">
                                    Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* SPECIALIZATION */}

                            <div>

                                <label className="text-xs text-slate-500 block mb-1">
                                    Specialization
                                </label>

                                <input
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* FEES */}

                            <div>

                                <label className="text-xs text-slate-500 block mb-1">
                                    Consultation Fees
                                </label>

                                <input
                                    name="fees"
                                    value={form.fees}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />

                            </div>


                            {/* DATE */}

                            <div>

                                <label className="text-xs text-slate-500 block mb-1">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                />

                            </div>


                            {/* TIME */}

                            <div>

                                <label className="text-xs text-slate-500 block mb-1">
                                    Time
                                </label>

                                <input
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                />

                            </div>

                        </div>



                        <div className="mt-6 flex items-center gap-4">

                            {/* UPDATE BUTTON */}

                            <button
                                onClick={handleUpdateDoctor}
                                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-md hover:shadow-lg transition"
                            >
                                Update Doctor
                            </button>


                            {/* BACK BUTTON */}

                            <button
                                onClick={() => router.push("/dashboard/doctors")}
                                className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                            >
                                Back to List
                            </button>

                        </div>


                    </div>

                </div>


                {/* INFO CARD */}

                <div className="col-span-4">

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">

                        <div className="text-center">

                            <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                                {doctor.name?.charAt(0)}
                            </div>

                            <h3 className="mt-3 font-semibold text-slate-800">
                                {doctor.name}
                            </h3>

                            <p className="text-xs text-slate-500">
                                {doctor.specialization}
                            </p>

                        </div>


                        {/* STATS */}

                        <div className="grid grid-cols-2 gap-3">

                            <div className="bg-slate-50 rounded-lg p-3 text-center">

                                <p className="text-xs text-slate-400">
                                    Today's Patients
                                </p>

                                <p className="font-semibold text-slate-800">
                                    12
                                </p>

                            </div>

                            <div className="bg-slate-50 rounded-lg p-3 text-center">

                                <p className="text-xs text-slate-400">
                                    Fees
                                </p>

                                <p className="font-semibold text-slate-800">
                                    ₹{doctor.fees}
                                </p>

                            </div>

                        </div>


                        {/* SCHEDULE */}

                        <div className="bg-blue-50 rounded-xl p-4">

                            <p className="text-xs text-blue-600 font-medium">
                                Today's Schedule
                            </p>

                            {form.date && form.time ? (

                                <p className="text-sm text-blue-800 mt-1">
                                    {new Date(form.date).toLocaleDateString("en-IN")} | {form.time}
                                </p>

                            ) : (

                                <p className="text-xs text-slate-400">
                                    No schedule today
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}
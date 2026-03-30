"use client";

import { createLocation } from "@/redux/slice/locationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import { useEffect } from "react";
import { Nullable } from "@/typescript";


const schema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),

  lat: yup
    .number()
    .typeError("Latitude must be a number")
    .required(),

  lng: yup
    .number()
    .typeError("Longitude must be a number")
    .required(),
});

export default function LocationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const selector = useSelector((state: RootState) => state.location);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
const onSubmit = async (data: any) => {
  try {
    const payload = {
      ...data,
      lat: Number(data.lat),
      lng: Number(data.lng),
    };

    console.log("PAYLOAD:", payload); 

    const result = await dispatch(createLocation(payload)).unwrap();

    if (result?.status) {
      toast.success("Location created successfully");
      reset();
    } else {
      toast.error(result?.message || "Failed");
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
};

  
  useEffect(() => {
    if (selector?.data?.status) {
      reset();
    }
  }, [selector.data]);

  return (
    <div className="p-6 flex justify-center">

      {/* CARD */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-[#e6ebff] overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center gap-4 p-6 border-b border-[#eef1ff]">

          <div className="w-12 h-12 rounded-xl bg-[#5e72e4] flex items-center justify-center text-white shadow-md shadow-[#5e72e4]/30">
            📍
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Add Location
            </h2>
            <p className="text-sm text-slate-500">
              Create diagnostic center location
            </p>
          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 space-y-7"
        >

          {/* NAME */}
          <div className="relative">
            <input
              {...register("name")}
              placeholder=" "
              className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
              px-4 pt-6 pb-3 text-sm text-slate-600
              focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20
              focus:bg-white transition"
            />
            <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
              peer-placeholder-shown:top-4.5
              peer-placeholder-shown:text-sm
              peer-focus:top-3
              peer-focus:text-xs
              peer-focus:text-[#5e72e4]">
              Center Name
            </label>
            <p className="text-xs text-red-500 mt-1">
              {errors.name?.message}
            </p>
          </div>

          {/* ADDRESS */}
          <div className="relative">
            <input
              {...register("address")}
              placeholder=" "
              className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
              px-4 pt-6 pb-3 text-sm text-slate-600
              focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20
              focus:bg-white transition"
            />
            <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
              peer-placeholder-shown:top-4.5
              peer-placeholder-shown:text-sm
              peer-focus:top-3
              peer-focus:text-xs
              peer-focus:text-[#5e72e4]">
              Address
            </label>
            <p className="text-xs text-red-500 mt-1">
              {errors.address?.message}
            </p>
          </div>

          {/* PHONE */}
          <div className="relative">
            <input
              {...register("phone")}
              placeholder=" "
              className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
              px-4 pt-6 pb-3 text-sm text-slate-600
              focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20
              focus:bg-white transition"
            />
            <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
              peer-placeholder-shown:top-4.5
              peer-placeholder-shown:text-sm
              peer-focus:top-3
              peer-focus:text-xs
              peer-focus:text-[#5e72e4]">
              Phone Number
            </label>
            <p className="text-xs text-red-500 mt-1">
              {errors.phone?.message}
            </p>
          </div>

          {/* LAT + LNG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="relative">
              <input
                {...register("lat")}
                placeholder=" "
                className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
                px-4 pt-6 pb-3 text-sm text-slate-600
                focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20
                focus:bg-white transition"
              />
              <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
                peer-placeholder-shown:top-4.5
                peer-placeholder-shown:text-sm
                peer-focus:top-3
                peer-focus:text-xs
                peer-focus:text-[#5e72e4]">
                Latitude
              </label>
              <p className="text-xs text-red-500 mt-1">
                {errors.lat?.message}
              </p>
            </div>

            <div className="relative">
              <input
                {...register("lng")}
                placeholder=" "
                className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
                px-4 pt-6 pb-3 text-sm text-slate-600
                focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20
                focus:bg-white transition"
              />
              <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
                peer-placeholder-shown:top-4.5
                peer-placeholder-shown:text-sm
                peer-focus:top-3
                peer-focus:text-xs
                peer-focus:text-[#5e72e4]">
                Longitude
              </label>
              <p className="text-xs text-red-500 mt-1">
                {errors.lng?.message}
              </p>
            </div>

          </div>

          {/* GEO LOCATION */}
          <button
            type="button"
            onClick={() => {
              navigator.geolocation.getCurrentPosition((pos) => {
                setValue("lat", pos.coords.latitude);
                setValue("lng", pos.coords.longitude);
              });
            }}
            className="text-xs text-[#5e72e4] hover:underline"
          >
            Use Current Location
          </button>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={()=>reset()}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
              bg-[#f1f3ff] text-slate-600 hover:bg-[#e6eaff]"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={selector.loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium
              bg-[#5e72e4] text-white shadow-md shadow-[#5e72e4]/30 
              hover:bg-[#4f63d6] disabled:opacity-80"
            >
              {selector.loading ? "Creating..." : "+ Create"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}
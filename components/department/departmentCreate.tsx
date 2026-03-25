
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
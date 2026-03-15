"use client";

import { authSignIn } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(authSignIn(data)).unwrap();

      if (result.status === true) {
        cookies.set("token", result.token, { path: "/" });

        toast.success("Login Successful");

        router.push("/doctor");
      } else {
        toast.error(result.message || "Login Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-100 px-4">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8">

          {/* ICON */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FontAwesomeIcon icon={faStethoscope} className="text-white text-lg" />
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-center text-slate-800">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 text-center mt-1 mb-6">
            Sign in to manage doctors & departments
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wide">
                Email
              </label>

              <input
                {...register("email")}
                placeholder="admin@gmail.com"
                className="mt-1 w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-slate-500 uppercase tracking-wide">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={selector.loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-medium shadow-lg shadow-blue-500/30 hover:opacity-95 transition"
            >
              {selector.loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-400 mt-6">
          MediCore Admin Panel
        </p>

      </div>

    </div>
  );
}


"use client";

import { authSignIn } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as yup from "yup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStethoscope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

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
        setSuccess(true);
        setRedirecting(true);

        setTimeout(() => {
          cookies.set("token", result.token, { path: "/" });
          toast.success("Login Successful");
          router.push("/dashboard");
        }, 800);
      } else {
        toast.error(result.message || "Login Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8ff] px-4">

      {/* WRAPPER */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-[#e6ebff] grid grid-cols-1 md:grid-cols-[1fr_1.1fr] overflow-hidden">

        {/* LEFT - FORM */}
        <div className="flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            {/* LOGO */}
            <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#5e72e4] flex items-center justify-center shadow-md shadow-[#5e72e4]/30">
              <FontAwesomeIcon icon={faStethoscope} className="text-white text-lg" />
            </div>

            <h2 className="text-xl font-semibold text-center text-slate-800">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 text-center mt-1 mb-8">
              Sign in to continue
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* EMAIL */}
              <div className="relative">
                <input
                  {...register("email")}
                  placeholder=" "
                  className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
  px-4 pt-6 pb-3 text-[13.5px] text-slate-500 
  focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20 
  focus:bg-white transition"
                />
                <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
  peer-placeholder-shown:top-4.5 
  peer-placeholder-shown:text-sm 
  peer-placeholder-shown:text-slate-400
  peer-focus:top-3 
  peer-focus:text-xs 
  peer-focus:text-[#5e72e4]">
                  Email Address
                </label>

                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  className="peer w-full bg-[#f4f6ff] border border-[#e0e6ff] rounded-xl 
px-4 pt-6 pb-3 text-[13.5px] text-slate-600 placeholder-transparent
focus:outline-none focus:border-[#5e72e4] focus:ring-2 focus:ring-[#5e72e4]/20 
transition"
                />
                <label className="absolute left-4 top-3 text-xs text-slate-400 transition-all
  peer-placeholder-shown:top-4.5 
  peer-placeholder-shown:text-sm 
  peer-placeholder-shown:text-slate-400
  peer-focus:top-3 
  peer-focus:text-xs 
  peer-focus:text-[#5e72e4]">
                  Password
                </label>

                {/* TOGGLE */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-[#5e72e4]"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>

                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={selector.loading || redirecting}
                className="w-full py-2.5 rounded-xl bg-[#5e72e4] text-white text-sm font-medium shadow-md shadow-[#5e72e4]/30 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#4f63d6] disabled:opacity-90 disabled:cursor-not-allowed"
              >
                {selector.loading ? (
                  <div className="flex items-center gap-2">

                    {/* DOT LOADER */}
                    <div className="flex items-center gap-[4px]">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.1s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                    </div>

                    <span>Authenticating</span>
                  </div>
                ) : redirecting ? (
                  <div className="flex items-center gap-2">

                    {/* SAME DOT LOADER */}
                    <div className="flex items-center gap-[4px]">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.1s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                    </div>

                    <span>Redirecting</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>

            <p className="text-center text-xs text-slate-400 mt-8">
              MediCore Admin Panel
            </p>

          </div>
        </div>

        {/* RIGHT - ANIMATION */}
        <div className="hidden md:flex items-center justify-center bg-[#f7f9ff] relative overflow-hidden">

          {/* subtle background glow */}
          <div className="absolute w-[380px] h-[380px] bg-[#5e72e4]/10 blur-3xl rounded-full" />

          {/* animation directly (NO BOX) */}
          <DotLottieReact
            src="https://lottie.host/8845df06-3d87-4f1a-9ec7-b6e4d6b86ccb/pl00obIMi1.lottie"
            loop
            autoplay
            speed={0.7}
            style={{ width: 380, height: 380 }}
          />

        </div>

      </div>

    </div>

  );
}
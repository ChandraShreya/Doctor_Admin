"use client";

import { useEffect } from "react";

export default function ThemeLoader() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}
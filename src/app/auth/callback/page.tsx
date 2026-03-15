"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.replace("/admin");
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
    >
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[#c8992a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium" style={{ color: "rgba(245,237,216,0.5)" }}>
          Authenticating...
        </p>
      </div>
    </div>
  );
}

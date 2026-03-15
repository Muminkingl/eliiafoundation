"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import AdminDashboard from "@/components/mvpblocks/index";
import { ThemeProvider } from "next-themes";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        router.replace("/login");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ background: "linear-gradient(160deg, #0e1a12 0%, #121f16 55%, #0c1710 100%)" }}
      >
        <div className="text-center">
          <div
            className="w-10 h-10 rounded-full animate-spin mx-auto mb-4"
            style={{ border: "3px solid rgba(200,153,42,0.2)", borderTopColor: "#c8992a" }}
          />
          <p className="text-sm font-medium" style={{ color: "rgba(245,237,216,0.5)" }}>
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AdminDashboard />
    </ThemeProvider>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ALLOWED_EMAIL = "eliiafoundation@gmail.com";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else if (session.user.email !== ALLOWED_EMAIL) {
        // Sign out unauthorized user to prevent loops
        supabase.auth.signOut().then(() => {
          router.replace("/403");
        });
      } else {
        setAuthorized(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        } else if (session.user.email !== ALLOWED_EMAIL) {
          supabase.auth.signOut().then(() => {
            router.replace("/403");
          });
        } else {
          setAuthorized(true);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  if (!authorized) {
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
            Checking authorization...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

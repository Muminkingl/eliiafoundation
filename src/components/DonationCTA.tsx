"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

export default function DonationCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="donate" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-10 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-secondary" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              Your Generosity Can Change Lives
            </h2>
            <p className="text-white/80 leading-relaxed max-w-xl mx-auto mb-8">
              Every donation, no matter how small, helps us provide essential care
              to orphans and families in need. Join us in making a lasting impact.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-lg text-base"
              >
                <Heart className="h-5 w-5" />
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base"
                asChild
              >
                <a href="#programs">
                  See Our Programs
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

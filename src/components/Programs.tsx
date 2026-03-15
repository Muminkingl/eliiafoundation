"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  HeartHandshake,
  Stethoscope,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: HeartHandshake,
    title: "Orphan Sponsorship",
    description:
      "Provide orphaned children with food, shelter, clothing, and the loving care they deserve for a brighter future.",
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description:
      "Fund school supplies, tuition fees, and educational programs to empower the next generation through knowledge.",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Stethoscope,
    title: "Healthcare Initiatives",
    description:
      "Ensure families have access to essential medical care, vaccinations, check-ups, and health education.",
    color: "bg-violet-50 text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Relief",
    description:
      "Rapid response aid for families affected by crises, providing food, water, shelter, and essential supplies.",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
];

export default function Programs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-secondary uppercase tracking-widest">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 mb-5">
            Our <span className="text-primary">Programs</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We run impactful programs across multiple regions, focused on
            providing holistic support to those who need it most.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 * i }}
              className="group bg-card rounded-xl p-6 lg:p-8 border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl ${program.iconBg} flex items-center justify-center mb-5`}
              >
                <program.icon className={`h-7 w-7 ${program.color.split(" ")[1]}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {program.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {program.description}
              </p>
              <Button variant="ghost" className="group-hover:text-primary p-0 h-auto">
                Learn More{" "}
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

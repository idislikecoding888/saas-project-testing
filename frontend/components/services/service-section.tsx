"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeader from "./section-header";
import ServiceCard from "./service-card";
import AnimatedSection from "./animated-section";

type Service = {
  name: string;
  description: string;
  price: number;
  status: "active" | "live" | "beta";
  icon: ReactNode;
};

export default function ServiceSection({
  title,
  services,
  icon,
}: {
  title: string;
  services: Service[];
  icon: ReactNode;
}) {
  const [collapsed, setCollapsed] =
    useState(false);
    if (services.length === 0) {
  return null;
}

  return (
    <section className="mb-10">
      <SectionHeader
        title={title}
        count={services.length}
        icon={icon}
        collapsed={collapsed}
        onToggle={() =>
          setCollapsed(!collapsed)
        }
      />

      <AnimatePresence initial={false}>
        {!collapsed && (
          <AnimatedSection>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.name}
                  {...service}
                />
              ))}
            </div>
          </AnimatedSection>
        )}
      </AnimatePresence>
    </section>
  );
}
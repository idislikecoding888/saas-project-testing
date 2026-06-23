"use client";

import { useState } from "react";

import ServiceSection from "@/components/services/service-section";
import ServicesToolbar from "@/components/services/services-toolbar";
import ServiceFilters from "@/components/services/service-filters";
import EmptyState from "@/components/services/empty-state";

import {
  Fingerprint,
  CreditCard,
  IdCard,
  Globe,
  Building,
  Building2,
  Link,
  Search,
  ArrowLeftRight,
  ScanFace,
  Camera,
  Type,
  Car,
  MapPin,
  Phone,
  Wallet,
  Briefcase,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function ServicesPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const identityServices = [
    {
      name: "Aadhaar OTP",
      description: "Verify Aadhaar identity using OTP authentication.",
      price: 0.75,
      status: "active" as const,
      icon: <Fingerprint size={20} />,
    },
    {
      name: "PAN",
      description: "Instant PAN verification and validation.",
      price: 1.2,
      status: "active" as const,
      icon: <CreditCard size={20} />,
    },
    {
      name: "PAN 360",
      description: "Comprehensive PAN intelligence profile.",
      price: 4.5,
      status: "beta" as const,
      icon: <IdCard size={20} />,
    },
    {
      name: "Passport",
      description: "Government passport verification.",
      price: 8,
      status: "live" as const,
      icon: <Globe size={20} />,
    },
    {
      name: "Driving License",
      description: "Verify driving licence information.",
      price: 2,
      status: "active" as const,
      icon: <IdCard size={20} />,
    },
    {
      name: "Voter ID",
      description: "Instant voter ID validation service.",
      price: 1.5,
      status: "active" as const,
      icon: <IdCard size={20} />,
    },
    {
      name: "DigiLocker",
      description: "Fetch verified Aadhaar documents.",
      price: 3,
      status: "beta" as const,
      icon: <Fingerprint size={20} />,
    },
  ];

  const businessServices = [
    {
      name: "GSTIN",
      description: "GST registration verification.",
      price: 1,
      status: "active" as const,
      icon: <Building size={20} />,
    },
    {
      name: "PAN To GSTIN",
      description: "Discover GSTINs associated with PAN.",
      price: 2,
      status: "active" as const,
      icon: <Link size={20} />,
    },
    {
      name: "CIN Lookup",
      description: "Ministry of Corporate Affairs lookup.",
      price: 4,
      status: "live" as const,
      icon: <Search size={20} />,
    },
    {
      name: "UDYAM",
      description: "Verify MSME registration details.",
      price: 2.5,
      status: "active" as const,
      icon: <Building2 size={20} />,
    },
    {
      name: "PAN To UDYAM",
      description: "Reverse lookup UDYAM records.",
      price: 3,
      status: "beta" as const,
      icon: <ArrowLeftRight size={20} />,
    },
  ];

  const faceServices = [
    {
      name: "Face Match",
      description: "AI powered facial identity matching.",
      price: 1.5,
      status: "live" as const,
      icon: <ScanFace size={20} />,
    },
    {
      name: "Face Liveness",
      description: "Detect spoofing and fake identities.",
      price: 6,
      status: "beta" as const,
      icon: <Camera size={20} />,
    },
    {
      name: "Name Match",
      description: "Fuzzy name verification engine.",
      price: 0.5,
      status: "active" as const,
      icon: <Type size={20} />,
    },
  ];

  const utilityServices = [
    {
      name: "Vehicle RC",
      description: "Vehicle registration lookup.",
      price: 1.5,
      status: "active" as const,
      icon: <Car size={20} />,
    },
    {
      name: "Reverse Geocode",
      description: "Convert coordinates into addresses.",
      price: 0.8,
      status: "live" as const,
      icon: <MapPin size={20} />,
    },
    {
      name: "Number Lookup",
      description: "Telecom operator and circle lookup.",
      price: 0.4,
      status: "active" as const,
      icon: <Phone size={20} />,
    },
  ];

  const financialServices = [
    {
      name: "Penny Drop",
      description: "Bank account ownership verification.",
      price: 2,
      status: "live" as const,
      icon: <Wallet size={20} />,
    },
    {
      name: "Employment 360",
      description: "Employment background intelligence.",
      price: 12,
      status: "beta" as const,
      icon: <Briefcase size={20} />,
    },
  ];

  const matchesFilter = (status: string) => {
    if (filter === "All") return true;

    return status.toLowerCase() === filter.toLowerCase();
  };

  const filterServices = (services: any[]) =>
    services.filter((service) => {
      const searchMatch = service.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch = matchesFilter(service.status);

      return searchMatch && statusMatch;
    });

  const totalResults =
    filterServices(identityServices).length +
    filterServices(businessServices).length +
    filterServices(faceServices).length +
    filterServices(utilityServices).length +
    filterServices(financialServices).length;

  return (
    <div className="p-6">
      <ServicesToolbar search={search} onSearch={setSearch} />

      <div className="mb-6 flex gap-8 text-sm text-slate-500">
        <span>{totalResults} endpoints</span>
        <span>5 categories</span>
      </div>

      <ServiceFilters selected={filter} onSelect={setFilter} />

      {totalResults === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ServiceSection
            title="Identity Verification"
            services={filterServices(identityServices)}
            icon={<ShieldCheck size={20} />}
          />

          <ServiceSection
            title="Business Verification"
            services={filterServices(businessServices)}
            icon={<Building2 size={20} />}
          />

          <ServiceSection
            title="Face Verification"
            services={filterServices(faceServices)}
            icon={<ScanFace size={20} />}
          />

          <ServiceSection
            title="Utility"
            services={filterServices(utilityServices)}
            icon={<Wrench size={20} />}
          />

          <ServiceSection
            title="Financial"
            services={filterServices(financialServices)}
            icon={<Wallet size={20} />}
          />
        </>
      )}
    </div>
  );
}
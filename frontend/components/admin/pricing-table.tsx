"use client";

import { useState } from "react";

import EditPricingModal from "./edit-pricing-modal";

const services = [
  // BUSINESS
  //
// IDENTITY VERIFICATION
//

{
  name: "Aadhaar OTP",
  category: "Identity Verification",
  price: "₹1.00",
  status: "Active",
},

{
  name: "DigiLocker Aadhaar",
  category: "Identity Verification",
  price: "₹3.00",
  status: "Active",
},

{
  name: "PAN Verification",
  category: "Identity Verification",
  price: "₹1.20",
  status: "Active",
},

{
  name: "PAN 360",
  category: "Identity Verification",
  price: "₹4.50",
  status: "Active",
},

{
  name: "Driving License",
  category: "Identity Verification",
  price: "₹2.50",
  status: "Active",
},

{
  name: "Passport",
  category: "Identity Verification",
  price: "₹5.00",
  status: "Active",
},

{
  name: "Voter ID",
  category: "Identity Verification",
  price: "₹1.50",
  status: "Active",
},

  {
    name: "GSTIN Verification",
    category: "Business Verification",
    price: "₹1.00",
    status: "Active",
  },

  {
    name: "PAN To GSTIN",
    category: "Business Verification",
    price: "₹2.00",
    status: "Active",
  },

  {
    name: "CIN / MCA Lookup",
    category: "Business Verification",
    price: "₹4.00",
    status: "Active",
  },

  {
    name: "Udyam Verification",
    category: "Business Verification",
    price: "₹2.50",
    status: "Active",
  },

  {
    name: "PAN To Udyam",
    category: "Business Verification",
    price: "₹3.00",
    status: "Beta",
  },

  // BANKING

  {
    name: "Penny Drop",
    category: "Banking Verification",
    price: "₹2.00",
    status: "Active",
  },

  // FACE

  {
    name: "Face Check",
    category: "Face Intelligence",
    price: "₹1.50",
    status: "Active",
  },

  {
    name: "Face Liveliness Check",
    category: "Face Intelligence",
    price: "₹6.00",
    status: "Beta",
  },

  {
    name: "Name Match",
    category: "Face Intelligence",
    price: "₹0.50",
    status: "Active",
  },

  // LOCATION

  {
    name: "Reverse Geocoding",
    category: "Location Intelligence",
    price: "₹0.80",
    status: "Active",
  },

  // VEHICLE

  {
    name: "Vehicle RC",
    category: "Vehicle Intelligence",
    price: "₹1.50",
    status: "Active",
  },

  // EMPLOYMENT

  {
    name: "Employment 360",
    category: "Employment Verification",
    price: "₹12.00",
    status: "Beta",
  },

  // TELECOM

  {
    name: "Number Lookup",
    category: "Telecom Intelligence",
    price: "₹0.40",
    status: "Active",
  },
];

export default function PricingTable() {
    const [editOpen, setEditOpen] =
  useState(false);
  const [search, setSearch] =
  useState("");
  const [selectedService,
setSelectedService] =
useState<any>(null);
  return (
    <section className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Pricing Management
        </h1>

        <p className="mt-2 text-[var(--foreground-muted)]">
          Configure service pricing.
        </p>
      </div>
      <div className="max-w-md">
  <input
  placeholder="Search services..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="
  w-full

  rounded-xl

  border
  border-[var(--border)]

  bg-[var(--surface)]

  px-4
  py-3

  outline-none
  "
/>
</div>

      <div
        className="
        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--surface)]
        "
      >
        <table className="w-full">

          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="p-5 text-left">
                Service
              </th>

              <th className="p-5 text-left">
                Category
              </th>

              <th className="p-5 text-left">
                Price
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {services
  .filter((service) =>
    service.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .map((service) => (
              <tr
                key={service.name}
                className="
                border-b
                border-[var(--border)]
                "
              >
                <td className="p-5">
                  {service.name}
                </td>

                <td className="p-5">
                  {service.category}
                </td>

                <td className="p-5">
                  {service.price}
                </td>

                <td className="p-5">{service.status}</td>

                <td className="p-5">
                  <button
  onClick={() => {
  setSelectedService(
    service
  );

  setEditOpen(true);
}}
  className="text-blue-400"
>
  Edit
</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <EditPricingModal
  open={editOpen}
  service={selectedService}
  onClose={() =>
    setEditOpen(false)
  }
/>

    </section>
  );
}
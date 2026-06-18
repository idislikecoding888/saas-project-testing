import {
  LayoutDashboard,
  ShieldCheck,
  KeyRound,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
} from "lucide-react";

export const developerNavigation = [
  
  {
    title: "Dashboard",
    href: "/developer",
    icon: LayoutDashboard,
  },

  {
    title: "Verification Services",
    href: "/developer/services",
    icon: ShieldCheck,
  },

  {
    title: "API Keys & Credits",
    href: "/developer/api-keys",
    icon: KeyRound,
  },

  {
  title: "Settings",
  href: "/developer/settings",
  icon: Settings,
},

  {
    title: "Documentation",
    href: "/developer/docs",
    icon: FileText,
  },
];

import {
  Users,
  BadgeIndianRupee,
  LifeBuoy,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Staff Management",
    href: "/admin/staff",
    icon: Users,
  },

  {
    title: "Pricing",
    href: "/admin/pricing",
    icon: BadgeIndianRupee,
  },

  {
    title: "Support Tickets",
    href: "/admin/support",
    icon: LifeBuoy,
  },

  {
  title: "Settings",
  href: "/admin/settings",
  icon: Settings,
},
];

export const staffNavigation = [
  {
    title: "Dashboard",
    href: "/staff",
    icon: LayoutDashboard,
  },

  {
    title: "Verifications",
    href: "/staff/verifications",
    icon: ShieldCheck,
  },

  {
    title: "Transactions",
    href: "/staff/transactions",
    icon: CreditCard,
  },

  {
    title: "Support",
    href: "/staff/support",
    icon: MessageSquare,
  },

  {
  title: "Settings",
  href: "/staff/settings",
  icon: Settings,
},
];
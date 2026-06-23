import {
  LayoutDashboard,
  ShieldCheck,
  KeyRound,
  Settings,
  CreditCard,
  Users,
  BadgeIndianRupee,
  LifeBuoy,
  MessageSquare,
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
    title: "API Keys & Wallet",
    href: "/developer/api-keys",
    icon: KeyRound,
  },
  {
    title: "Settings",
    href: "/developer/settings",
    icon: Settings,
  },
];

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
    title: "Transactions",
    href: "/admin/transactions",
    icon: CreditCard,
  },
  {
    title: "Verifications",
    href: "/admin/verifications",
    icon: ShieldCheck,
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
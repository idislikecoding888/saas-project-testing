import {
  LayoutDashboard,
  ShieldCheck,
  KeyRound,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
  Users,
  BadgeIndianRupee,
  LifeBuoy,
  Wallet,
  History,
  Webhook,
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
    title: "Verification History",
    href: "/developer/history",
    icon: History,
  },
  {
    title: "Wallet",
    href: "/developer/wallet",
    icon: Wallet,
  },
  {
    title: "Webhooks",
    href: "/developer/webhooks",
    icon: Webhook,
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
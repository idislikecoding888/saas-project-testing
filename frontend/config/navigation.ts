import {
  LayoutDashboard,
  ShieldCheck,
  KeyRound,
  Settings,
  FileText,
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
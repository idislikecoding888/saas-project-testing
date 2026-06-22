"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getRole,
  getToken,
  type UserRole,
} from "@/lib/auth/auth";

type UseAuthOptions = {
  allowedRoles?: UserRole[];
  redirectTo?: string;
};

function homeForRole(role: UserRole) {
  if (role === "admin") return "/admin";
  if (role === "staff") return "/staff";
  return "/developer";
}

export function useAuth(options: UseAuthOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = getToken();
    const currentRole = getRole();

    if (!token) {
      if (pathname !== "/login") {
        router.replace(options.redirectTo ?? "/login");
      }
      setReady(true);
      return;
    }

    setRole(currentRole);

    if (
      options.allowedRoles?.length &&
      currentRole &&
      !options.allowedRoles.includes(currentRole)
    ) {
      router.replace(homeForRole(currentRole));
      setReady(true);
      return;
    }

    setReady(true);
  }, [options.allowedRoles, options.redirectTo, pathname, router]);

  return {
    ready,
    role,
    isAuthenticated: !!role,
  };
}
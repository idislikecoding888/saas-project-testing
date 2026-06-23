"use client";

export function useAuth() {
  return {
    ready: true,
    role: "developer",
    isAuthenticated: true,
  };
}
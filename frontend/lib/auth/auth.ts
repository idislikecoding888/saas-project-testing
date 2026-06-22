"use client";

import api from "@/lib/api/axios";

export const TOKEN_KEY = "idproofpro_token";
export const ROLE_KEY = "idproofpro_role";
export const USER_KEY = "idproofpro_user";

export type UserRole = "admin" | "staff" | "developer";

export type AuthUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: string;
};

function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;

  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

export function setSession(token: string, user?: AuthUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(TOKEN_KEY, token);

  if (user?.role) {
    localStorage.setItem(ROLE_KEY, user.role);
    setCookie("role", user.role);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  setCookie("token", token);
}

export function clearSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);

  deleteCookie("token");
  deleteCookie("role");
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_KEY) as UserRole | null;
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const token = response.data?.access_token;

  if (!token) {
    throw new Error("Login failed: token not returned");
  }

  const profileResponse = await api.get("/users/me");
  const user = profileResponse.data as AuthUser;

  setSession(token, user);

  return {
    token,
    user,
  };
}

export async function hydrateSession() {
  const token = getToken();
  if (!token) return null;

  const user = getStoredUser();
  if (user) return user;

  const response = await api.get("/users/me");
  const freshUser = response.data as AuthUser;
  setSession(token, freshUser);
  return freshUser;
}

export function logout() {
  clearSession();
}
export const TOKEN_KEY = "idproofpro_token";
export const ROLE_KEY = "idproofpro_role";

export function login(role: string) {
  localStorage.setItem(
    TOKEN_KEY,
    "demo-token"
  );

  localStorage.setItem(
    ROLE_KEY,
    role
  );
}

export function logout() {
  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    ROLE_KEY
  );
}

export function getToken() {
  return localStorage.getItem(
    TOKEN_KEY
  );
}

export function getRole() {
  return localStorage.getItem(
    ROLE_KEY
  );
}

export function isAuthenticated() {
  return !!getToken();
}
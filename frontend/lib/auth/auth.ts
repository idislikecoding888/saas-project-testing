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

document.cookie =
"token=demo-token; path=/";
}

export function logout() {
localStorage.removeItem(
TOKEN_KEY
);

localStorage.removeItem(
ROLE_KEY
);

document.cookie =
"token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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

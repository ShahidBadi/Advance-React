// utils/auth.ts
export function isLoggedIn()
 {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("token");
}

export function getuserrole(){
  if (typeof window === "undefined") return false;
  return localStorage.getItem("usertype");
}

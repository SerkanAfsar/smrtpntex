import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const validateToken = (token: string): boolean => {
  const decoded = jwtDecode(token);

  const isExpired: boolean =
    (decoded.exp && new Date().getTime() / 1000 < decoded.exp) || false;

  return isExpired;
};

export const UserInfoResult = async () => {
  "use server";
  const cookieStore = await cookies();
  const smartJwt = cookieStore.get("smartJwt")?.value;
  if (!smartJwt) {
    return null;
  }

  const decoded = jwtDecode(smartJwt) as any;
  return decoded
    ? {
        ...decoded,
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" as string
        ],
        name: decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
      }
    : null;
};

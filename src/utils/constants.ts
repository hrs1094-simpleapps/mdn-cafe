
import * as b64 from "base64-js";
export const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export const navRoutes = {
  DashBoard: "/",
  Subscribers: "/subscribers",
  OnSpot: "/onspot",
  OnSpotDetails: "/onspot/:id?",
  Login: "/login",
  Logout: "/logout",
  Register: "/register",
};

export function encodeBase64(data: string): string {
    try {
        const utf8Encode = new TextEncoder();
        return b64.fromByteArray(utf8Encode.encode(data));
    } catch (error) {
        console.error("Unable to encodeBase64", error);
        return data;
    }
}

export function decodeBase64(data: string): string {
    try {
        const byteArray = b64.toByteArray(data);
        const decoded = String.fromCharCode(...byteArray);
        return decoded;
    } catch (error) {
        console.error("Unable to decodeBase64", error);
        return data;
    }
}

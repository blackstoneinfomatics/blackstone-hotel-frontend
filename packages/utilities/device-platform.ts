export type Platform =
  | "android"
  | "ios"
  | "web"
  | "windows"
  | "macos"
  | "linux";

export const getPlatform =() : Platform =>{
  if (typeof window === "undefined") {
    return "web";
  }

  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("android")) return "android";
  if (ua.includes("iphone") || ua.includes("ipad")) return "ios";
  if (ua.includes("windows")) return "windows";
  if (ua.includes("mac os") || ua.includes("macintosh")) return "macos";
  if (ua.includes("linux")) return "linux";

  return "web";
}
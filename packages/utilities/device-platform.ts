export type Platform =
  | "android"
  | "ios"
  | "web"
  | "windows"
  | "macos"
  | "linux";

export const getPlatform = (): Platform => {
  const ua = navigator.userAgent.toLowerCase();

  console.log("UA:", ua);

  if (ua.includes("android")) {
    console.log("Matched Android");
    return "android";
  }

  if (ua.includes("iphone")) {
    console.log("Matched iPhone");
    return "ios";
  }

  if (ua.includes("ipad")) {
    console.log("Matched iPad");
    return "ios";
  }

  if (ua.includes("windows")) {
    console.log("Matched Windows");
    return "windows";
  }

  if (ua.includes("mac os") || ua.includes("macintosh")) {
    console.log("Matched macOS");
    return "macos";
  }

  if (ua.includes("linux")) {
    console.log("Matched Linux");
    return "linux";
  }

  return "web";
};
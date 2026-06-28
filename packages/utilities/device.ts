
export const getDeviceId = (): string => {
  const STORAGE_KEY = "deviceId";

  let deviceId = localStorage.getItem(
    STORAGE_KEY
  );

  if (!deviceId) {
    deviceId = crypto.randomUUID();

    localStorage.setItem(
      STORAGE_KEY,
      deviceId
    );
  }
  console.log("Device ID:", deviceId);
  return deviceId;
};
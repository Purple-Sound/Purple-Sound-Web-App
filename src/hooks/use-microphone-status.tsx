import { useState, useEffect } from "react";

export function useMicrophoneStatus(): PermissionState {
  const [micStatus, setMicStatus] = useState("" as PermissionState);

  useEffect(() => {
    // "microphone" isn't recognized as a PermissionName
    // https://github.com/microsoft/TypeScript/issues/33923
    const micPermissionName = "microphone" as PermissionName;

    const handleMicPermissionChange = (permission: PermissionStatus) => {
      setMicStatus(permission.state);
    };
    const getMicPermission = async () => {
      const permission = await navigator.permissions.query({
        name: micPermissionName,
      });

      handleMicPermissionChange(permission);

      permission.onchange = () => {
        handleMicPermissionChange(permission);
      };

      setMicStatus(permission.state);
    };

    getMicPermission().catch(console.error);
  }, []);

  return micStatus;
}

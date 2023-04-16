import { useState, useEffect } from "react";

export function useMicrophoneStatus(): PermissionState {
  const [micStatus, setMicStatus] = useState("" as PermissionState);

  useEffect(() => {
    const micPermissionName = "microphone" as PermissionName;

    const handleMicPermissionChange = (permission: PermissionStatus) => {
      setMicStatus(permission.state);
    };

    const getMicPermission = async () => {
      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({
          name: micPermissionName,
        });

        handleMicPermissionChange(permission);

        permission.onchange = () => {
          handleMicPermissionChange(permission);
        };
      } else {
        // Fallback for browsers that don't support navigator.permissions.query
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (stream) {
          setMicStatus("granted");
          stream.getTracks().forEach((track) => track.stop());
        } else {
          setMicStatus("denied");
        }
      }
    };

    getMicPermission().catch((error) => {
      console.error(error);
      setMicStatus("denied");
    });
  }, []);

  return micStatus;
}

export function useMicrophoneStatusOldImplementation(): PermissionState {
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

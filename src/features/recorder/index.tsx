import { useState, useEffect } from "react";
import { VStack, Text, TextProps, IconButtonProps } from "@chakra-ui/react";
import { useMicrophoneStatus } from "../../hooks/use-microphone-status";
import RecordButton from "./record-button";

function RecorderText(props: TextProps): JSX.Element {
  const micStatus = useMicrophoneStatus();
  let text: string;
  if (micStatus === "prompt") {
    text = "Please allow access to your microphone to continue";
  } else if (micStatus === "denied") {
    text =
      "Access to your microphone has been denied. Please allow access to continue";
  } else {
    text = "Click the button to start recording ...";
  }

  return <Text {...props}>{text}</Text>;
}

function MicButton(props: IconButtonProps): JSX.Element {
  const micStatus = useMicrophoneStatus();

  return <RecordButton {...props} disabled={micStatus !== "granted"} />;
}

function handleMicPermissionSuccess() {}

const Recorder = (): JSX.Element => {
  const [isRecording, setIsRecording] = useState(false);
  const micStatus = useMicrophoneStatus();

  // get access to the mic
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleMicPermissionSuccess);
  }, [micStatus]);

  const handleRecordButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsRecording;
  };

  return (
    <VStack spacing="50px">
      <RecorderText mt="140px" color="white" />
      <MicButton
        aria-label="Start recording"
        onClick={handleRecordButtonClick}
      />
    </VStack>
  );
};

export default Recorder;

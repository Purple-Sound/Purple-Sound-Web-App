import { useState, useEffect } from "react";
import { VStack, Text, TextProps, IconButtonProps, HStack } from "@chakra-ui/react";
import { useMicrophoneStatus } from "../../hooks/use-microphone-status";
import RecordButton from "./record-button";
import PauseButton from "./pause-button";
import StopButton from "./stop-button";

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

// referenced and modified from https://web.dev/media-recording-audio/#save-the-data-from-the-microphone

const Recorder = (): JSX.Element => {
  const [isRecording, setIsRecording] = useState(false);
  const micStatus = useMicrophoneStatus();
  const [audioStream, setAudioStream] = useState(
    null as unknown as MediaStream
  );
  const [audioData, setAudioData] = useState([] as Blob[]);
  const [mediaRecorder, setMediaRecorder] = useState(
    null as unknown as MediaRecorder
  );
  const [recordedChunks, setRecordedChunks] = useState([] as Blob[]);

  // request access to the audio stream
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        setAudioStream(stream);
      })
      .catch(console.error);
  }, [micStatus]);

  function startRecording() {
    if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
    } else {
      const options = { mimeType: "audio/webm" };
      const recordedChunks: Blob[] = [];
      const newMediaRecorder = new MediaRecorder(audioStream, options);

      newMediaRecorder.addEventListener("dataavailable", function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      setMediaRecorder(newMediaRecorder);
      mediaRecorder.start();
    }
  }

  return (
    <VStack spacing="50px">
      <RecorderText mt="140px" color="white" />
      <HStack>
        <MicButton aria-label="Start recording" onClick={startRecording} />
        <PauseButton aria-label="Pause" />
      </HStack>
      <HStack>
        <StopButton aria-label="Stop"/>
        <PauseButton aria-label="Pause or Resume"/>
      </HStack>
    </VStack>
  );
};

export default Recorder;

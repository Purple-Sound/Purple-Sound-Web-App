import { useState, useEffect } from "react";
import {
  VStack,
  Text,
  TextProps,
  IconButtonProps,
  HStack,
} from "@chakra-ui/react";
import { useMicrophoneStatus } from "../../hooks/use-microphone-status";
import RecordButton from "./record-button";
import PauseButton from "./pause-button";
import StopButton from "./stop-button";
import AudioPlayer from "./audio-player";

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
  const [mediaRecorder, setMediaRecorder] = useState(
    null as unknown as MediaRecorder
  );
  const [recordedChunks, setRecordedChunks] = useState([] as Blob[]);
  const [mediaRecorderState, setMediaRecorderState] = useState("inactive" as RecordingState);
  const [mp3Blob, setMp3Blob] = useState(null as unknown as Blob);

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
    console.log(audioStream);
      const options = { mimeType: "audio/webm" };
      const newMediaRecorder = new MediaRecorder(audioStream, options);

      newMediaRecorder.ondataavailable = function (e) {
        console.log("a", e.data);
        if (e.data.size > 0) setRecordedChunks(prevChunks => [...prevChunks, e.data]);
      };

      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
  }

  useEffect(() => {
    if(mediaRecorder){
      mediaRecorder.start();
      setMediaRecorderState("recording");
    }
  },[mediaRecorder]);

  function pauseOrResumeRecording() {
    console.log("mediaRecorderState", mediaRecorderState);
    console.log("recordedChunks", recordedChunks);
    if(mediaRecorderState === "recording"){
      mediaRecorder.pause();
      setMediaRecorderState("paused");
    } else {
      mediaRecorder.resume();
      setMediaRecorderState("recording");
    }
  }

  // implent a function to stop the recording
  function stopRecording() {
    mediaRecorder.stop();
    setMediaRecorderState("inactive");
    setRecordedChunks([]);
    setIsRecording(false);
  }

  useEffect(() => {
    console.log("mediaRecorderState", mediaRecorderState);
    console.log("recordedChunks", recordedChunks);
    if (mediaRecorderState === "inactive" && recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "audio/wav" });
      setMp3Blob(blob);
    }
  }, [mediaRecorderState, recordedChunks]);

  return (
    <VStack spacing="50px">
      {mp3Blob && <AudioPlayer mp3Blob={mp3Blob}/>}
      {isRecording ? (
        <>
          <RecorderText mt="140px" color="white" />
          <HStack>
            <StopButton aria-label="Stop" onClick={stopRecording}/>
            <PauseButton aria-label="Pause or Resume" onClick={pauseOrResumeRecording}/>
          </HStack>
        </>
      ) : (
        <>
          <RecorderText mt="140px" color="white" />
          <MicButton aria-label="Start recording" onClick={startRecording} />
        </>
      )}
    </VStack>
  );
};

export default Recorder;

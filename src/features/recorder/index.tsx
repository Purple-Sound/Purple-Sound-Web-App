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
import worker from "./worker";

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
  const [mediaRecorderState, setMediaRecorderState] = useState("inactive" as RecordingState);
  const [worker, setWorker] = useState(null as unknown as Worker);
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


  useEffect(() => {
    setWorker(new Worker("./worker.js"));
    return () => worker.terminate();
  });


  function startRecording() {
      const options = { mimeType: "audio/webm" };
      const newMediaRecorder = new MediaRecorder(audioStream, options);

      newMediaRecorder.addEventListener("dataavailable", function (e) {
        if (e.data.size > 0) setRecordedChunks(prevChunks => [...prevChunks, e.data]);
      });

      setMediaRecorder(newMediaRecorder);
      mediaRecorder.start();
      setIsRecording(true);
  }

  function pauseOrResumeRecording() {
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
    setAudioData(recordedChunks);
    setRecordedChunks([]);
    setIsRecording(false);
  }

  function convertAudioToMP3() {
    worker.postMessage({ audioData});
    worker.onmessage = function (e) {
      setMp3Blob(e.data);
    };
  }

  return (
    <VStack spacing="50px">
      {isRecording ? (
        <>
          <audio id="player" controls></audio>
          <RecorderText mt="140px" color="white" />
          <HStack>
            <StopButton aria-label="Stop" />
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

import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

interface TimerProps {
  recordingState: RecordingState;
}

const Timer = ({ recordingState }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (recordingState === "recording") {
      setTimerActive(true);
    } else if (recordingState === "paused") {
      setTimerActive(false);
    } else {
      setTimerActive(false);
      setSeconds(0);
    }
  }, [recordingState]);

  useEffect(() => {
    if (!timerActive) {
      return;
    }

    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timerActive]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return <Text color="white">{formatTime(seconds)}</Text>;
};

export default Timer;

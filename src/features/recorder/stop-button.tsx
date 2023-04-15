import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FaStopCircle } from "react-icons/fa";

interface StopButtonProps extends IconButtonProps {
  mediaRecorderState: RecordingState;
}

const StopButton = (props: StopButtonProps) => {
  const { mediaRecorderState, ...restProps } = props;
  const buttonColor =
    mediaRecorderState === "inactive" || mediaRecorderState === "paused"
      ? "white"
      : "red";
  return (
    <IconButton
      {...restProps}
      size="lg"
      borderRadius="24px"
      backgroundColor="rgba(0,0,0,.3)"
      color={buttonColor}
      icon={<FaStopCircle />}
    />
  );
};

export default StopButton;

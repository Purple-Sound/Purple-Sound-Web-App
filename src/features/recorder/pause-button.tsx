import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";
import {keyframes} from "@chakra-ui/react";

interface PauseButtonProps extends IconButtonProps {
  mediaRecorderState: RecordingState;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const PauseButton = (props: PauseButtonProps) => {
  const {mediaRecorderState, ...restProps} = props;
  const shouldPulse = mediaRecorderState === "inactive" || mediaRecorderState === "paused";
  return (
      <IconButton
        {...restProps}
        size="lg"
        borderRadius="24px"
        backgroundColor="rgba(0,0,0,.3)"
        color="white"
        icon={<GiPauseButton />}
        animation={shouldPulse ? `${pulseAnimation} 1s infinite` : undefined}
      />
  );
};

export default PauseButton;

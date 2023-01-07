import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { GiPauseButton } from "react-icons/gi";

const PauseButton = (props: IconButtonProps) => {
  return (
      <IconButton
        {...props}
        size="lg"
        borderRadius="24px"
        backgroundColor="rgba(0,0,0,.3)"
        color="white"
        icon={<GiPauseButton />}
      />
  );
};

export default PauseButton;

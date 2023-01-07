import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FaStopCircle } from "react-icons/fa";

const StopButton = (props: IconButtonProps) => {
  return (
      <IconButton
        {...props}
        size="lg"
        borderRadius="24px"
        backgroundColor="rgba(0,0,0,.3)"
        color="white"
        icon={<FaStopCircle />}
      />
  );
};

export default StopButton;

import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { GrMicrophone } from "react-icons/gr";

const RecordButton = (props: IconButtonProps) => {
  return (
      <IconButton
        {...props}
        size="lg"
        borderRadius="24px"
        colorScheme="red"
        icon={<GrMicrophone />}
      />
  );
};

export default RecordButton;

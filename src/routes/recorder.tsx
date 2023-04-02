import Recorder from "../features/recorder";
import { Box } from "@chakra-ui/react";

const RecorderPage = (): React.ReactElement => {
  return (
    <Box
      as="section"
      w="100%"
      h="300px"
      bgGradient="radial-gradient(ellipse at center,#1a2f7d 0,#232b56 100%)"
    >
      <Recorder />
    </Box>
  );
};

export default RecorderPage;

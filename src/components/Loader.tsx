import { Box, Progress } from "@chakra-ui/react";

const Loader = (): JSX.Element => {
  return (
    <Box position="absolute" top={0} left={0} right={0}>
      <Progress hasStripe size="xs" isIndeterminate colorScheme="primary" />
    </Box>
  );
};

export default Loader;

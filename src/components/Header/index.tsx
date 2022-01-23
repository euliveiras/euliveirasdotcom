import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Grid as="header" w="100%" placeItems="center" borderBlockEnd="1px solid black">
      <Flex gap={8}>
        <Image src="/" alt="Matheus Oliveira" borderRadius="full"/>
        <Box>
          <Text>Matheus Oliveira da Silva</Text>
          <Text>full stack developer e & entusiasta de açaí</Text>
        </Box>
      </Flex>
    </Grid>
  );
};

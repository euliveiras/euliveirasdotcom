import { Avatar, Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Grid as="header" w="100%" placeItems="center">
      <Flex
        padding="1em"
        gap={8}
        justify="center"
        align="center"
        borderRadius="1px"
        boxShadow="0 0 0 1em #ee6352, 0 0 0 2em #d45379, 0 0 0 3em #a4558f"
      >
        <Avatar size="xl" src="/me.jpg" alt="Matheus Oliveira" />
        <Box>
          <Text>Matheus Oliveira da Silva</Text>
          <Text>full stack developer e & entusiasta de açaí</Text>
        </Box>
      </Flex>
    </Grid>
  );
};

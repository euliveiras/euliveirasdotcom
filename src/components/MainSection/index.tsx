import { SimpleGrid, Text, Box } from "@chakra-ui/react";

export const MainSection = () => {
  return (
    <SimpleGrid minChildWidth={160} w="90%" m="0 auto">
      <Box as="article">
        <Text>Título do post</Text>
        <Text>Lorem ipsum dolor olár no sei o que</Text>
      </Box>
      <Box as="article">
        <Text>Título do post</Text>
        <Text>Lorem ipsum dolor olár no sei o que</Text>
      </Box>
      <Box as="article">
        <Text>Título do post</Text>
        <Text>Lorem ipsum dolor olár no sei o que</Text>
      </Box>
    </SimpleGrid>
  );
};

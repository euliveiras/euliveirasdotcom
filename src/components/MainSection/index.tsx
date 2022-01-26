import { SimpleGrid, Flex, Text, Box } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

export const MainSection = () => {
  return (
    <SimpleGrid minChildWidth={160} w="90%" m="0 auto" spacing={12}>
      <Box as="article" h="100%" cursor={"pointer"}>
        <Text
          fontSize="2xl"
          sx={{
            backgroundImage: "linear-gradient(#ee6352,#d45379,#a4558f)",
            backgroundPosition: "bottom left",
            backgroundRepeat: "no-repeat",
            backgroundSize: "0% 4px",
            transition: "background-size 500ms ease-in-out",
            _hover: { "backgroundSize": "100% 4px", color: "inherit" },
          }}
          //   bgGradient="linear(#ee6352,#d45379,#a4558f)"
          //   backgroundPosition={"bottom left"}
          //   backgroundRepeat={"no-repeat"}
          //   backgroundSize={"0% 4px"}
          //   transition={" background-size 500ms ease-in-out"}
          //   _groupHover={{ "background-size": "100% 4px", color: "inherit" }}
        >
          Título do posta
        </Text>
        <Text mt={"2"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada
          fames ac turpis egestas maecenas pharetra.z
        </Text>
        <Flex gap={2} align="center" mt={"2"}>
          <TimeIcon boxSize={"20px"} />
          <Text fontSize={"1rem"}>4 min to read</Text>
        </Flex>
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

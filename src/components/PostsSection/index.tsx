import * as prismicH from "@prismicio/helpers";
import { useRouter } from "next/router";
import { SimpleGrid, Flex, Text, Box } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

type PostsSectionData = {
  posts: {
    uid: string;
    first_publication_date: string;
    last_publication_date: string;
    data: {
      post_title: [];
      post_excerpt: [];
      post_banner: {};
      post_content: [];
    };
  }[];
};

export const PostsSection = ({ posts }: PostsSectionData) => {
  const router = useRouter();

  if (posts) {
    return (
      <SimpleGrid minChildWidth={160} w="90%" m="0 auto" spacing={12}>
        {posts.map((post) => (
          <Box
            as="article"
            h="100%"
            role="group"
            cursor={"pointer"}
            key={post.uid}
          >
            <Text
              fontSize="2xl"
              sx={{
                backgroundImage: "linear-gradient(#ee6352,#d45379,#a4558f)",
                backgroundPosition: "bottom left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "0% 4px",
                transition: "background-size 500ms ease-in-out",
              }}
              _groupHover={{ backgroundSize: "100% 4px", color: "inherit" }}
              //   bgGradient="linear(#ee6352,#d45379,#a4558f)"
              //   backgroundPosition={"bottom left"}
              //   backgroundRepeat={"no-repeat"}
              //   backgroundSize={"0% 4px"}
              //   transition={" background-size 500ms ease-in-out"}
              //   _groupHover={{ "background-size": "100% 4px", color: "inherit" }}
            >
              {prismicH.asText(post.data.post_title)}
            </Text>
            <Text mt={"2"}>{prismicH.asText(post.data.post_excerpt)}</Text>
            <Flex gap={2} textAlign="center" mt={"2"}>
              <TimeIcon boxSize={"20px"} />
              <Text fontSize={"1rem"}>4 min to read</Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return <Text role="article">Carregando</Text>;
};

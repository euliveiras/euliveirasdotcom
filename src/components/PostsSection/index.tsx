import * as prismicH from "@prismicio/helpers";
import { useRouter } from "next/router";
import { SimpleGrid, Flex, Text, Box } from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

import { Post } from "../../utils/posts";
import { fetchService } from "../../services/fetchService";

type PostsSectionData = {
  posts: Post[];
};

export const PostsSection = ({ posts }: PostsSectionData) => {
  const router = useRouter();

  const handleClick = async (uid: string) => {
    await fetchService("/api/postClick", "post", { uid, first_visit: true });
    return router.push(`/posts/${uid}`);
  };

  if (posts) {
    return (
      <SimpleGrid minChildWidth={160} w="90%" m="0 auto" spacing={12}>
        {posts.map((post) => {
          const excerpt = prismicH.asText(post.data.post_excerpt as any);
          const title = prismicH.asText(post.data.post_title as any);
          const timeToRead = post?.data.post_content?.reduce((acc, item) => {
            const bodyText = item.text;
            const splitted = bodyText.split(" ");
            return acc + splitted.length;
          }, excerpt.split(" ").length + title.split(" ").length);
          return (
            <Box
              as="article"
              h="100%"
              w="360px"
              data-testid="handleClick"
              role="group"
              cursor={"pointer"}
              key={post.uid}
              onClick={() => handleClick(post.uid)}
            >
              <Text
                fontSize="2xl"
                sx={{
                  backgroundImage: "linear-gradient(#ee6352, #d45379, #a4558f)",
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
                {title}
              </Text>
              <Text mt={"2"}>{excerpt}</Text>
              <Flex gap={2} textAlign="center" mt={"2"}>
                <TimeIcon boxSize={"20px"} />
                <Text fontSize={"1rem"} data-testid="time-to-read">
                  {Math.ceil(timeToRead / 200)} min to read
                </Text>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    );
  }

  return <Text role="article">Carregando</Text>;
};

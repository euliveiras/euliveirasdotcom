import { Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";

import { getPrismicClient } from "../services/prismic";
import { Header, PostsSection } from "../components";

export default function Home({ header_data, posts_section_data }) {
  // console.log("posts_section_data:", posts_section_data);
  return (
    <>
      <Head>
        <title>euliveiras | blog</title>
      </Head>
      <Box h="100vh">
        {/* <Grid placeItems="center">
      </Grid> */}
        <Header data={header_data} />
        {/* <Box textAlign={"center"} m={"4em 0 2em"}>
        <Text as="h1" fontSize={"3xl"}>
          blog sobre javascript e programação no gerala
        </Text>
      </Box> */}
        <PostsSection posts={posts_section_data} />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const Prismic = getPrismicClient();
  const { data: headerData } = await Prismic.getSingle("profile");
  const { results: postsSectionData } = await Prismic.getByType("post");
  // console.log("getByType(): ", postsSectionData)
  // console.log("postsSectionData[0]: ",postsSectionData[0].data);
  return {
    props: {
      header_data: headerData,
      posts_section_data: postsSectionData,
    },
  };
};

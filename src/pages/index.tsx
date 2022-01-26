import { Grid, Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import { getPrismicClient } from "../services/prismic";
import { Header, MainSection } from "../components";

export default function Home({ header_data, main_section_data }) {
  console.log("main_section_data:", main_section_data);
  return (
    <Box h="100vh">
      <Grid placeItems="center">
        <Header {...header_data} />
      </Grid>
      <MainSection posts={main_section_data} />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const Prismic = getPrismicClient();
  const { data: headerData } = await Prismic.getSingle("profile");
  const { results } = await Prismic.getByType("post");
  console.log("getByType(): ", results)
  // console.log("results[0]: ",results[0].data);
  return {
    props: {
      header_data: { ...headerData },
      main_section_data: results,
    },
  };
};

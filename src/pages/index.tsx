import { Grid, Box } from "@chakra-ui/react";
import * as prismic from "@prismicio/client";
import { GetStaticProps } from "next";

import { getPrismicClient } from "../services/prismic";
import { Header, MainSection } from "../components";

type HomeProps = {
  header_data: {
    profile_img: {
      alt: string;
      url: string;
    };
    profile_name: {
      text: string;
    }[];
    profile_about: {
      text: string;
    }[];
  };
};

export default function Home({ header_data }: HomeProps) {
  return (
    <Box h="100vh">
      <Grid placeItems="center">
        <Header {...header_data} />
      </Grid>
      <MainSection />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const Prismic = getPrismicClient();
  const { data: headerData } = await Prismic.getSingle("profile");
  const postsData = await Prismic.getByType("post")
  console.log(postsData);

  return {
    props: {
      header_data: { ...headerData },
      main_section_data: { results: postsData.results },
    },
  };
};

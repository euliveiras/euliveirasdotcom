import { Grid, Box } from "@chakra-ui/react";
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
  const { data } = await getPrismicClient().getSingle("profile");
  console.log(data);
  return {
    props: {
      header_data: { ...data },
    },
  };
};

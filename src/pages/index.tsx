import { Grid } from "@chakra-ui/react";
import { GetStaticProps } from "next";

import { getPrismicClient } from "../services/prismic";
import { Header, MainSection } from "../components";

type HomeProps = {
  profile_data: {
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

export default function Home({ profile_data }: HomeProps) {
  return (
    <Grid placeItems="center">
      <Header {...profile_data} />
      <MainSection />
    </Grid>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await getPrismicClient().getSingle("profile");
  console.log(data);
  return {
    props: {
      profile_data: { ...data },
    },
  };
};

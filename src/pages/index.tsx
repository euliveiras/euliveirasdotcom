import { Grid } from "@chakra-ui/react";
import { GetStaticProps } from "next";

import {getPrismicClient} from "../services/prismic";
import { Header, MainSection } from "../components";

export default function Home() {
  return (
    <Grid placeItems="center">
      <Header />
      <MainSection/>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getPrismicClient().getSingle("profile")
  console.log(data)

  return {
    props: {
      ...data
    },
  };
};

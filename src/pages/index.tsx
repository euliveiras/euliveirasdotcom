import { Grid } from "@chakra-ui/react";
import { Header, MainSection } from "../components";

export default function Home() {
  return (
    <Grid placeItems="center">
      <Header />
      <MainSection/>
    </Grid>
  );
}

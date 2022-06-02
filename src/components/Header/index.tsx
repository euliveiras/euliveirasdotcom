import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

type HeaderProps = {
  data: {
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

export const Header = ({ data }: HeaderProps) => {
  const hasData = typeof data !== "undefined" ? data : null;

  return (
    <Grid as="header" w="100%" placeItems="center">
      <Flex justify="center" align="center" gap={8} padding="3em">
        <Image
          boxSize="90px"
          src={hasData.profile_img.url}
          alt={hasData.profile_img.alt}
          borderRadius="full"
        />
        <Box>
          <Text fontWeight={"medium"}>{hasData.profile_name[0].text}</Text>
          <Text fontWeight={"light"} fontStyle={"italic"}>
            {hasData.profile_about[0].text}
          </Text>
        </Box>
      </Flex>
    </Grid>
  );
};

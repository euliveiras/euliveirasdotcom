import { Avatar, Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

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

export const Header = ({data
}: HeaderProps) => {
  return (
    <Grid as="header" w="100%" placeItems="center">
      <Flex
        padding="1em"
        gap={8}
        justify="center"
        align="center"
        borderRadius="1px"
        boxShadow="0 0 0 1em #ee6352, 0 0 0 2em #d45379, 0 0 0 3em #a4558f"
        mb={"5em"}
      >
        <Image
          boxSize="90px"
          src={data?.profile_img?.url}
          alt={data?.profile_img?.alt}
          borderRadius="full"
        />
        <Box>
          <Text>{data?.profile_name?.[0].text}</Text>
          <Text>{data?.profile_about?.[0].text}</Text>
        </Box>
      </Flex>
    </Grid>
  );
};

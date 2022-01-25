import { Avatar, Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

type HeaderProps = {
  profile_img: {
    alt: string;
    url: string;
  };
  profile_name: {
    text: string;
  };
  profile_about: {
    text: string;
  };
};

export const Header = ({
  profile_about,
  profile_img,
  profile_name,
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
      >
        <Avatar size="xl" src={profile_img?.url} alt={profile_name?.text} />
        <Box>
          <Text>{profile_name?.[0].text}</Text>
          <Text>{profile_about?.[0].text}</Text>
        </Box>
      </Flex>
    </Grid>
  );
};

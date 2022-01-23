import { Box, Flex, Image } from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box 
            as="header"
            w="100%"
            margin="0 auto"
        >
            <Flex>
                <Image src="/" alt="Matheus Oliveira"/>
            </Flex>
        </Box>
    )
}

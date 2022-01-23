import { Box, Text } from "@chakra-ui/react"

export const MainSection = () => {
    return(<Box as="main">
        <Box as="article" _first={{marginTop: "10%"}}>
            <Text>Título do post</Text>
            <Text>Lorem ipsum dolor olár no sei o que</Text>
        </Box>
    </Box>)
}
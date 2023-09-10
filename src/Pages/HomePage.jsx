import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <>
      <Container maxW='xl' centerContent>
        <Box
          display={"flex"}
          justifyContent='center'
          p={3}
          bg={'white'}
          w='100%'
          m="40px 0 15px 0"
          borderRadius="1g"
          borderWidth="1px"
          color={"black"}>
          <Text
            fontSize={"2xl"}
            fontFamily={'Roboto'}
            color={"black"}
            fontWeight={'bold'}
          >LogIn</Text>
        </Box>

        <Box
        p={4}
        bg={'white'}
        borderRadius={'1g'}
        borderWidth='2px'
        width={'100%'}
        >

        </Box>

      </Container>
    </>
  )
}

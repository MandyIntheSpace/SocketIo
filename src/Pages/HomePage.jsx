import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'

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
          >Authentications</Text>
        </Box>

        <Box
          p={4}
          bg={'white'}
          borderRadius={'1g'}
          borderWidth='2px'
          width={'100%'}
        >
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList mb={'1em'}>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {<Login />}
              </TabPanel>
              <TabPanel>
                {<Signup />}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

      </Container>
    </>
  )
}

import React, { useState } from 'react'
import {
  VStack, FormControl, FormLabel, Input, InputGroup
  , InputRightElement, Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

export default function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  const submitHandler = () => { }

  return (
    <VStack spacing={'5px'} color={'black'}>
      <FormControl id='first-email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id='first-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.7rem"} size={'sm'} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme='blue'
        width={'100%'}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>

      <Button
        colorScheme='red'
        width={'100%'}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail('gues123@gmail.com')
          setPassword("1122311223")
          console.log(email, password)
        }}
      >
        Get Guest User Credentials
      </Button>

    </VStack>
  )
}

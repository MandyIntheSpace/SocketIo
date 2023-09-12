import React, { useState } from 'react'
import {
  VStack, FormControl, FormLabel, Input, InputGroup
  , InputRightElement, Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import axios from 'axios'

export default function Login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [show, setShow] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {
    setLoading(true)
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
      return;
    }
    try {

      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login", {
        email,
        password,
      },
        config,
      )
      console.log(data)

      toast({
        title: "User successfully loggedin",
        duration: 2000,
        isClosable: true,
        status: 'success',
        position: 'top-right'
      })

      localStorage.setItem('userInfo', data)
      setLoading(false)
      // navigate("/chat")

    } catch (err) {
      console.log(err.message)
      toast({
        title: "Error Occured",
        description: err.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      })
      setLoading(false)
    }
  }

  return (
    <VStack spacing={'5px'} color={'black'}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id='first-password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter your Password'
            value={password}
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

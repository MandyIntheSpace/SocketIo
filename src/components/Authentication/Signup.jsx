import React, { useState } from 'react'
import {
    VStack, FormControl, FormLabel, Input, InputGroup
    , InputRightElement, Button
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [show, setShow] = useState(false)
    const toast = useToast()
    const [picLoading, setPicLoading] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => setShow(!show)

    const submitHandler = async () => {
        setPicLoading(true)
        console.log("i am here")
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            setPicLoading(false)
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Password Do not match",
                duration: 2000,
                isClosable: true,
                status: 'warning',
                position: 'top-right'
            })
            return
        }
        console.log(email, password, confirmPassword, pic)

        try {

            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await Axios.post(
                "http://localhost:5000/api/user", {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data)

            toast({
                title: "User successfully stored",
                duration: 2000,
                isClosable: true,
                status: 'success',
                position: 'top-right'
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setPicLoading(false)

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
            setPicLoading(false)
        }

    }

    const postDetails = (pics) => {
        setPicLoading(true)
        if (pics === undefined) {
            toast({
                title: "Please select the image",
                duration: 2000,
                isClosable: true,
                status: 'warning',
                position: 'top-right'
            })
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "socketapp")
            data.append("cloud_name", "dsksetclo")
            fetch("https://api.cloudinary.com/v1_1/dsksetclo/image/upload", {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString())
                    console.log(data.url.toString())
                    setPicLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setPicLoading(false)
                })
        } else {
            toast({
                title: "Please select an image",
                duration: 10000,
                isClosable: true,
                status: 'warning',
                position: 'top-right'
            })
            setPicLoading(false)
            return;
        }

    }



    return (
        <VStack spacing={'5px'} color={'black'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                ></Input>
            </FormControl>

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

            <FormControl id='first-confirmPassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter your Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h={"1.7rem"} size={'sm'} onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='first-pic'>
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme='blue'
                width={'100%'}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={picLoading}
            >
                Sign Up
            </Button>

        </VStack>
    )
}

import React from "react";
import { Box } from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

export default function UserBadgeItem({ user, handleFunction }) {
  return (
    <div>
      <Box
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        colorScheme="purple"
        cursor={"pointer"}
        onClick={handleFunction}
        backgroundColor={"red"}
        color={"white"}
      >
        {user.name}
        <CloseIcon p={1}/>
      </Box>
    </div>
  );
}

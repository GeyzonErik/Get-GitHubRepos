import React from "react";
import { Box, Text } from "@chakra-ui/react";
import styled from "styled-components";

const Logo = styled.a`
  cursor: pointer;
  font-size: 1.87rem;
`;

function Header() {
  function reloadPage() {
    window.location.reload();
  }

  return (
    <Box bg="#3498ff" p="7" color="#fefefe">
      <Logo onClick={reloadPage}>GitHub User Repos</Logo>
    </Box>
  );
}

export default Header;

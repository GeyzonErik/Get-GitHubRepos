import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Container,
  Box,
  Text,
  Tag,
  Grid,
  List,
  Avatar,
  Link,
  Divider,
} from "@chakra-ui/react";
import styled from "styled-components";
import axios from "axios";

const SearchButton = styled.a`
  background-color: #57708b;
  border-radius: 0.38rem;
  cursor: pointer;
  margin-left: 0.7rem;
  padding: 0.55rem 1.7rem;
  transition: 0.6s;
  &:hover {
    background-color: #042d41;
    color: #fff;
  }
`;

const ListItens = styled.li`
  padding: 0.7rem;
  margin: 0.3rem 0;
`;

function Searcher() {
  const [userName, setUserName] = useState("");
  const [userRepositories, setUserRepositories] = useState([]);

  const getRepos = (userName) => {
    axios
      .get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => {
        setUserRepositories(response.data);
      });
  };

  function handleUserName(userName) {
    getRepos(userName);
    setUserName("");
  }

  return (
    <>
      <Container p="50" marginTop="7vh" centerContent borderRadius="12px">
        <FormControl>
          <FormLabel htmlFor="gitHubUser">GitHub User</FormLabel>
          <Input
            id="gitHubUser"
            type="text"
            width="15rem"
            placeholder="User"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleUserName(userName);
              }
            }}
          />
          <SearchButton
            onClick={(event) => {
              event.preventDefault();
              handleUserName(userName);
            }}
          >
            Test
          </SearchButton>
          <FormHelperText>Please Insert a github user</FormHelperText>
        </FormControl>
      </Container>

      <Box>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={"7rem"}
          margin={"0 10rem"}
          padding={"0 3rem"}
        >
          {userRepositories.map((repositorie) => (
            <List
              borderBottom={"1px solid #3498ff"}
              key={repositorie.id}
              margin={"1.3rem 0"}
              padding={"1rem"}
            >
              <ListItens>
                <Avatar src={repositorie.owner.avatar_url} />
                <Text>{repositorie.owner.login}</Text>
              </ListItens>

              <ListItens margin={"1.3rem 0 1.3rem 0"}>
                <Tag bg={"#3498ff"}>
                  <Link href={repositorie.html_url} isExternal>
                    {repositorie.name}
                  </Link>
                </Tag>
                <Tag bg={"none"} marginLeft={"2px"}>
                  {repositorie.language}
                </Tag>
              </ListItens>

              <ListItens>
                <Text>{repositorie.description}</Text>
              </ListItens>
            </List>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Searcher;

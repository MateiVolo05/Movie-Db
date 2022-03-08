import { Badge, Box, Button, Heading, Link, ListItem, Progress, List, ListIcon, Center, GridItem, Stack } from "@chakra-ui/react";
import React from "react";
import Layout from '../components/Layout'
import useSWR from "swr";
import {ChevronRightIcon} from '@chakra-ui/icons'

class App extends React.Component {
   
    // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch(
          "/api/history")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    results: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
      const { DataisLoaded, results } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait some time.... </h1> </div> ;
   
        return (
          <Layout title="Homepage">
            <Box mb={20}><Center><Heading as="h2" fontSize='5xl'>Similar Movies based on your search history</Heading></Center></Box>
            <Center>
              <Stack
                as="nav"
                  direction={['column', , 'row']}
                  justify="space-between"
                  wrap="wrap"
                  py="1.5rem"
              >
                {results.map((item) => (
                  <GridItem key={item.id} fontSize='2xl' pt="12vh" pl="2vh">
                    Similar to{" "}
                    <Link href={`/movies/${item.id}`} passHref color="orange.500">
                      <Button
                        as="a"
                        variant="link"
                        fontSize='2xl'
                      >
                      <p as="span">{item.title} </p>
                      </Button>
                    </Link>
                    <Recomandations id={item.id} fontSize='lg'/>
                  </GridItem>
                ))}
              </Stack>
          </Center>
        </Layout>
      );
    }
}
  
function Recomandations(props){
  const terms = props.id;
  const { data, error } = useSWR(terms && `/api/similar/${terms}`);
  console.log(terms)
  if (!terms) {
    return <p>Type some terms and submit for a quick search</p>;
  }
  if (error) {
    return (
      <p color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </p>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <p>No results</p>;
  }
  return (
    <List stylePosition="inside">
      {data.results.map(({ id, title, vote_average }) => (
        <ListItem key={id}>
          <ListIcon as={ChevronRightIcon} color='orange' />
          <Link href={`/movies/${id}`} passHref>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge color='orange'>{vote_average}{" / 10"}</Badge>}
            >
              <p as="span">{title} </p>
            </Button>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default App;
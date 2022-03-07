import { Badge, Button, Heading, Link, Box, Center,Icon,Image, Stack, GridItem, Grid} from "@chakra-ui/react";
import React from "react";
import Layout from '../components/Layout'
import {ChevronRightIcon} from '@chakra-ui/icons'
import { buildImageUrl } from '../utils/api';

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
          "/api/watchlist")
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
          <h1> Please wait some time.... </h1> </div>;
      if(results.length===0) return <Layout><Center><Heading fontSize='4xl'>No movies in your watchlist</Heading></Center></Layout>
   
        return (
          <Layout title="Watchlist">
            <Box mb={20}><Center><Heading as="h2" fontSize='5xl'>Your Watchlist</Heading></Center></Box>
            <Center>
              <Grid
                  templateColumns='repeat(2, 1fr)'
                  justify="space-between"
                  wrap="wrap"
                  py="1.5rem"
                >
                {results.map((item) => (
                  <>
                    <GridItem key={item.id} pb="12" pl="2">
                      <Icon as={ChevronRightIcon} color='orange' />
                      <Link href={`/movies/${item.id}`} passHref>
                        <Button
                          as="a"
                          variant="link"
                          rightIcon={<Badge color='orange'>{item.release_date.split('-').reverse().join('-')}</Badge>}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    </GridItem>
                    <Image
                      src={buildImageUrl(item.poster_path, 'w300')}
                      alt="Movie poster"
                      layout="responsive"
                      width="150"
                      height="300"
                      pb="12"
                      objectFit="contain"
                      unoptimized
                    />
                    </>
                ))}
              </Grid>
          </Center>
        </Layout>
      );
    }
}
   
export default App;
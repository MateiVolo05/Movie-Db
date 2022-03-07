import { Badge, Box, Button, Heading, Link, GridItem, Center, Icon, Image, Grid} from "@chakra-ui/react";
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
          <h1> Please wait some time.... </h1> </div>;
      if(results.length===0) return <Layout><Center><Heading fontSize='4xl'>No movies in history</Heading></Center></Layout>

   
        return (
          <Layout title="History">
            <Box mb={20}><Center><Heading as="h2" fontSize='5xl'>Your Recent Movies</Heading></Center></Box>
            <Center>
              <Grid
                templateColumns='repeat(2, auto)'
                direction={['column', , 'row']}
                align={['start', , 'center']}
                justify="space-between"
                wrap="wrap"
                py="1.5rem"
                spacing={8}
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
                  <GridItem>
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
                  </GridItem>
                </>
              ))}
            </Grid>
          </Center>
        </Layout>
      );
    }
}
   
export default App;
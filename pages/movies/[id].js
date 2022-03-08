import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {ChevronRightIcon, SearchIcon} from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Progress,
  Stack,
  Tag,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  OrderedList,
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';
import WatchlistButton from '../../components/WatchlistButton';
import { useEffect, useState } from 'react';

let text;

const MovieContent = () => {
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);
  
  const [ln, setText] = useState('');

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
          <WatchlistButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
          
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}{" - "}{data.runtime}{" min"}</Heading>
          <Box>
            <Tag colorScheme="orange" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="orange" variant="outline">
              {genre.name}
            </Badge>
          ))}
        </Stack>
        <p>Rating <Badge colorScheme="orange" variant="outline" width="fit-content" p="1">{data.vote_average}{" / 10"}</Badge></p>
        <Box textAlign='justify'>{data.overview}</Box>
        <p>Where to watch:</p>
        <InputGroup as="form" onSubmit={(event)=>{text=event.target.value}}>
          <Input
            value={ln}
            onChange={(event) => setText(event.target.value)}
            placeholder="Country..."
            size="lg"
            variant="outline"
            bg="#ffa269"
            color="black"
            focusBorderColor='#ff4400'
            _placeholder={{ color: '#787878' }}
            borderColor="orange.500"
            borderWidth="2px"
            name='country'
          />
          <InputRightElement pr='2' pt='2'>
            <IconButton
              aria-label="Country"
              icon={<SearchIcon />}
              type="submit"
              bg="#ffa269"
            />
          </InputRightElement>
        </InputGroup>
        <Providers />
      </Stack>
    </Stack>
  );
};

function Providers(){
  const terms = useRouter().query.id
  text=useRouter().query.country
  const { data, error } = useSWR(terms && `/api/providers/${terms}/${text}`);
  if (!text) {
    return <p>Type the country code (with uppercase letters) and submit for a quick search</p>;
  }
  if (error) {
    return (
      <Text color="red">
        Invalid
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.length) {
    return <p>No results</p>;
  } 
    const names=[]
    const id=[]
    data.map((item)=>{
      names.push(item.provider_name)
      id.push(item.provider_id)
    })
    let i=0;
  return (
    <OrderedList stylePosition="inside">
      {
        names.map((e)=>
          <ListItem key={id[i++]}>{e}</ListItem>
        )
      }
    </OrderedList>
  );
}

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
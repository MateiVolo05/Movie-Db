import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  List,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge,
  ListIcon,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon,ChevronRightIcon} from '@chakra-ui/icons';
import Layout from '../components/Layout';

function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState('');

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || '');
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };
  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        size="lg"
          variant="outline"
          bg="#ffa269"
          color="black"
          focusBorderColor='#ff4400'
          _placeholder={{ color: '#787878' }}
          borderColor="orange.500"
          borderWidth="2px"
      />
      <InputRightElement pr='2' pt='2'>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          bg="#ffa269"
        />
      </InputRightElement>
    </InputGroup>
  );
}
function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type a movie title and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <List stylePosition="inside">
      {data.results.map(({ id, title, release_date }) => (
        <ListItem key={id}>
          <ListIcon as={ChevronRightIcon} color='orange' />
          <Link href={`/movies/${id}`} passHref>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge>{release_date}</Badge>}
            >
              <Text as="span">{title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default function Search() {
  return (
    <Layout title="Search">
      <Container>
        <VStack spacing={4} align="stretch">
          <SearchBar />
          <SearchResults />
        </VStack>
      </Container>
    </Layout>
  );
}
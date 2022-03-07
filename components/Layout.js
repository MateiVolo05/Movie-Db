import Head from 'next/head';
import Link from 'next/link';
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  VStack,
  Grid,
  useColorMode,
  Icon,
  useColorModeValue,
  DarkMode,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('white', 'black')
  const bg=useColorModeValue('#11121a', '#f2f2f2')
  return (
    <Box bgGradient="linear(to-bl,#F09819,#FF5858)">
      <Container>
        <Stack
          as="nav"
          direction={['column', , 'row']}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <MenuItem href="/" mr={8}>
              <Heading size="lg" color={bg}>Movies DB</Heading>
            </MenuItem>

            <Box display={['block', , 'none']} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={['column', , 'row']}
            justify="start"
            align={['start', , 'center']}
            display={[isOpen ? 'flex' : 'none', , 'flex']}
            spacing={4}
          >
            <MenuItem href="/search" color={bg}>Search</MenuItem>
            <MenuItem href="/watchlist" color={bg}>
              Watchlist
            </MenuItem>
            <MenuItem href="/history" color={bg}>
              History
            </MenuItem>
            <MenuItem href="/similar" color={bg}>Similar</MenuItem>
          </Stack>
          <Spacer />
          <Box display={[isOpen ? 'block': 'none', , 'block']}>
            <Button onClick={toggleColorMode} bg={bg} _hover={{bg:'orange'}}>
              {colorMode === 'light' ? <Icon as={MoonIcon} color={color} _hover={{color:'black'}}></Icon> : <Icon as={SunIcon} color={color}  _hover={{color:'white'}}></Icon>}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/photo.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
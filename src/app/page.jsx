'use client';

import { Box, Flex, HStack, useColorModeValue, Heading, useDisclosure } from '@chakra-ui/react';
import TableData from './components/main/table/index';
import ModalDeposits from './components/main/wallet-data/modalDeposits.jsx';

import WalletData from './components/main/wallet-data/index.jsx';

export default function Home({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" direction="column">
      <Box mx="auto" maxW={'7xl'} width="100%" bg={useColorModeValue('white', 'gray.800')} px={4}>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <HStack spacing={8} alignItems={'center'}>
            <Flex alignItems="center">
              <Heading size="md" color="black" mt={0.2} ml={1} _hover=" ">
                Rather Labs
              </Heading>
            </Flex>
          </HStack>

          <WalletData onOpen={onOpen} />
        </Flex>
      </Box>
      {onOpen && <ModalDeposits isOpen={isOpen} onClose={onClose} />}
      <TableData />
      <Box mx="auto" flex={1} p={4} maxW={'7xl'} width="100%">
        {children}
      </Box>
    </Flex>
  );
}

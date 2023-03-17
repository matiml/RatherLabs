import { Flex, Button, Tag, TagLabel, Badge, TagCloseButton, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../../config/web3';
import { useCallback, useEffect, useState } from 'react';
import useTruncatedAddress from '../../../../hooks/useTruncatedAddress';


const WalletData = ({ onOpen }) => {
  const [balance, setBalance] = useState(0);
  const { active, activate, deactivate, account, error, library } = useWeb3React();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(async () => {
    activate(connector);
    const rta = await fetch(`https://ratherlabsserver-production.up.railway.app/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: account }),
    });
    localStorage.setItem('previouslyConnected', 'true');
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('previouslyConnected');
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    

    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <Flex alignItems={'center'}>
      {active && (
        <Button colorScheme="teal" variant="outline" size="sm" onClick={onOpen}>
          Deposits history
        </Button>
      )}
      {active ? (
        <Tag colorScheme="blue" borderRadius="full">
          <TagLabel>
            <Link href="/">{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            d={{
              base: 'none',
              md: 'block',
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button variant={'outline'} colorScheme={'blue'} size={'sm'} leftIcon={<AddIcon />} onClick={connect} disabled={isUnsupportedChain}>
          {isUnsupportedChain ? 'Red no soportada' : 'Conectar wallet'}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;

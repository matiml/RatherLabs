'use client';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import usePoolAave from '@/hooks/usePoolAave';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import useAaveProtocolDataProvider from '@/hooks/useAaveProtocolDataProvider';
import Pools from '../pools';


const TableData = () => {
  const [assets, setAssets] = useState();
  const { active } = useWeb3React();

  const poolData = usePoolAave();
  const DataProvider = useAaveProtocolDataProvider();

  const getAssets = useCallback(async () => {
    if (DataProvider) {
      const tokens = await DataProvider.methods.getAllReservesTokens().call();
      setAssets(tokens);
      
    }
  }, [DataProvider]);

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  if (!active) return 'conecta tu wallet';

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Assets</Th>
            <Th>Wallet balance</Th>
            <Th>APY</Th>
            <Th>Suppliyed</Th>
            <Th isNumeric> Supply</Th>
            <Th isNumeric> withdraw </Th>
          </Tr>
        </Thead>
        <Tbody>
          {assets &&
            assets?.map((asset) => {
              return <Pools token={asset} key={asset[1]} />;
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableData;

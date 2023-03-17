import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import useAaveProtocolDataProvider from '@/hooks/useAaveProtocolDataProvider';
import useWalletBalance from '@/hooks/useWalletBalanceProvider';
import useAaveOracle from '@/hooks/useAaveOracle';
import APY from './apy';
import Supply from './supply';
import Withdraw from './withdraw';

const Pools = ({ token }) => {
  const [balance, setBalance] = useState();
  const [supliyed, setSupliyed] = useState();
  const [supliyedInUsd, setSupliyedInUsd] = useState();
  const WalletBalance = useWalletBalance();
  const AaveDataProvider = useAaveProtocolDataProvider();
  const { active, account } = useWeb3React();
  const oracle = useAaveOracle();
  const [priceAsset, setPriceAsset] = useState();

  const getPriceAsset = async (address) => {
    if (oracle) {
      const result = await oracle.methods.getAssetPrice(address).call();

      setPriceAsset((result / 1e8).toFixed(2));
    }
  };

  const supliyedUsd = async () => {
    if (supliyed !== 0) {
      setSupliyedInUsd(supliyed / priceAsset);
    }
    setSupliyedInUsd(supliyed);
  };

  const getSupliyed = useCallback(async () => {
    if (AaveDataProvider) {
      if (active) {
        const result = await AaveDataProvider.methods.getUserReserveData(token[1], account).call();
        if (result !== 0) {
          setSupliyed((result[0] / 1e18).toFixed(2));
        }
        setSupliyed(result[0]);
        // console.log(result[0]);
      }
    }
  }, [AaveDataProvider]);

  const getWalletBalance = useCallback(async () => {
    if (WalletBalance && active) {
      if (active) {
        const unit = await WalletBalance.methods.balanceOf(account, token[1]).call();
        if (unit !== 0) {
          setBalance((unit / 1e18).toFixed(2));
        }
        setBalance(unit);
        // console.log(unit);
      }
    }
  }, [WalletBalance]);

  useEffect(() => {
    getSupliyed();
    getWalletBalance();
    getPriceAsset(token[1]);
    supliyedUsd();
  }, [getWalletBalance, getSupliyed, priceAsset]);

  return (
    <Tr>
      <Td>{token[0]}</Td>
      <Td>
        {balance} {token[0]}
      </Td>
      <APY address={token[1]} />
      {supliyed && (
        <Td>
          {supliyed} {token[0]} / {supliyedInUsd} USD
        </Td>
      )}
      <Supply address={token[1]} />
      <Withdraw address={token[1]} />
    </Tr>
  );
};

export default Pools;

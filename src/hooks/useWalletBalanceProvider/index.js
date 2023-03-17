import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import WalletBalanceProvider from '@/app/config/web3/artifacts/WalletBalanceProvider';

const { address, abi } = WalletBalanceProvider;

const useWalletBalanceProvider = () => {
  const { active, library, chainId } = useWeb3React();

  const WalletBalance = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return WalletBalance;
};

export default useWalletBalanceProvider;

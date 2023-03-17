import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import AaveProtocolDataProvider from '@/app/config/web3/artifacts/AaveProtocolDataProvider';

const { address, abi } = AaveProtocolDataProvider;

const useAaveProtocolDataProvider = () => {
  const { active, library, chainId } = useWeb3React();

  const AaveProtocolDataProvider = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return AaveProtocolDataProvider;
};

export default useAaveProtocolDataProvider;

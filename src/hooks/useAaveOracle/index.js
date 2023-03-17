import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import AaveOracleContact from '@/app/config/web3/artifacts/AaveOracle';

const { address, abi } = AaveOracleContact;

const useAaveOracle = () => {
  const { active, library, chainId } = useWeb3React();

  const AaveOracle = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return AaveOracle;
};

export default useAaveOracle;

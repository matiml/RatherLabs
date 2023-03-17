import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import poolAaveContract from '@/app/config/web3/artifacts/pool';

const { address, abi } = poolAaveContract;

const usePoolAave = () => {
  const { active, library, chainId } = useWeb3React();

  const poolAave = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return poolAave;
};

export default usePoolAave;

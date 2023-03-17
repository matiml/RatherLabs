import { Td } from '@chakra-ui/react';
import usePoolAave from '@/hooks/usePoolAave';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import calculateAPY, { calculateApy } from './../../../../utils/index';

const APY = ({ address }) => {
  const { active, account } = useWeb3React();
  const pool = usePoolAave();
  const [Apy, setApy] = useState();

  const getData = async (address) => {
    if (pool && active) {
      // console.log(address)
      const result = await pool.methods.getReserveData(address).call();
      //   console.log(result);
      const { depositAPY } = calculateAPY(result[3], result[5]);
      setApy(depositAPY);
    }
  };

  useEffect(() => {
    // console.log(address)
    getData(address);
  }, [active]);
  return <Td>{Apy && Apy}</Td>;
};
export default APY;

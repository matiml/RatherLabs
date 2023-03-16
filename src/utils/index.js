import useAaveOracle from '@/hooks/useAaveOracle';

const getPriceAsset = async (address) => {
  const oracle = useAaveOracle();

  if (oracle) {
    const result = await oracle.methods.getUserReserveData(address).call();

    return result;
  }
};

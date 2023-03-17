const calculateAPY = (liquidityRate, variableBorrowRate) => {
  const RAY = 10 ** 27;
  const SECONDS_PER_YEAR = 31536000;


  let depositAPR = liquidityRate / RAY;
  let variableBorrowAPR = variableBorrowRate / RAY;
  let stableBorrowAPR = variableBorrowRate / RAY;

  let depositAPY = (1 + depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
  let variableBorrowAPY = (1 + variableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;
  let stableBorrowAPY = (1 + stableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1;

  return { depositAPY, variableBorrowAPY, stableBorrowAPY };
};

export default calculateAPY;

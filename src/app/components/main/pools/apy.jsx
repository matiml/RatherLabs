import { Td } from '@chakra-ui/react';
//el apy se calcula utilizando  el metodo  calculateinteresrates de el contrato DefaultReserveInterestRateStrategy con los parametros 
//       totalStableDebt
//       totalVariableDebt
//       averageStableBorrowRate 
// esto segun el codigo del contrato ya que la documentacion no esta y el metodo del contrato pool que indica estos parametros retorna 0
const APY = () => {
  return <Td>APY</Td>;
};
export default APY;

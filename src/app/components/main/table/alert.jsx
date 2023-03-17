import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const AlertWallet = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      Connect your wallet!
    </Alert>
  );
};

export default AlertWallet;

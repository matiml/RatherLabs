import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, List, ListItem, ListIcon, Button, MdCheckCircle } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

function ModalDeposits({ onClose, isOpen }) {
  const { active, account } = useWeb3React();
  const [deposits, setDeposits] = useState();

  const fetchDeposits = async () => {
    try {
      const response = await fetch(`http://localhost:3005/deposits/${account}`);
      const data = await response.json();
      setDeposits(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [active, isOpen]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deposits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {isOpen &&
                deposits.map((deposit) => (
                  <ListItem key={deposit.id}>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Date: {deposit.createdAt} Ammount: {deposit.ammount} | Asset: {deposit.pool} Tx: {deposit.id}
                  </ListItem>
                ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDeposits;

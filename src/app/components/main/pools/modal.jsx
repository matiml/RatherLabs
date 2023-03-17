import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { useState } from 'react';

const ModalForm = ({ isOpen, onClose, tittle, onSupply, onWithdraw }) => {
  const [amount, setAmount] = useState();

  const handleSubmit = (amount) => {
    setAmount(amount);
    console.log('antes', amount);
  };

  const handleClick = (amount) => {
    console.log('handleclick', amount);
    tittle == 'Supply' ? onSupply(amount) : onWithdraw(amount);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{tittle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <NumberInput max={50} min={10}>
                <NumberInputField onChange={(e) => handleSubmit(e.target.value)} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" variant="outline" mr={3} onClick={() => handleClick(amount)}>
              Confirm
            </Button>
            <Button colorScheme="blue" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;

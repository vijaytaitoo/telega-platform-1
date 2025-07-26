import {
import React from 'react';
  Box,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  title,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      p={4}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      transition="all 0.2s"
      _hover={{ shadow: 'sm' }}
    >
      <HStack spacing={4} align="start">
        <Image src={image} alt={title} boxSize="100px" objectFit="cover" borderRadius="md" />

        <VStack flex={1} align="start" spacing={2}>
          <Text fontWeight="medium" fontSize="lg">
            {title}
          </Text>

          <HStack spacing={6}>
            <NumberInput
              size="sm"
              maxW={20}
              min={1}
              max={99}
              value={quantity}
              onChange={(_, value) => onQuantityChange(id, value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>

            <Text fontWeight="bold" fontSize="lg" color="brand.solid.blue.start">
              {(price * quantity).toLocaleString()} ₽
            </Text>
          </HStack>
        </VStack>

        <IconButton
          aria-label="Удалить из корзины"
          icon={<FiTrash2 />}
          variant="ghost"
          colorScheme="red"
          onClick={() => onRemove(id)}
        />
      </HStack>
    </Box>
  );
};

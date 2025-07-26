import { Box, HStack, VStack, Text, Image, Button, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

interface ProductPreview {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface ChatMessageProps {
  message: string;
  isOwn: boolean;
  timestamp: string;
  product?: ProductPreview;
}

export const ChatMessage = ({ message, isOwn, timestamp, product }: ChatMessageProps) => {
  const bgColor = useColorModeValue(
    isOwn ? 'brand.gradient.blue' : 'gray.100',
    isOwn ? 'brand.gradient.blue' : 'gray.700',
  );
  const textColor = isOwn ? 'white' : 'gray.800';

  return (
    <Box alignSelf={isOwn ? 'flex-end' : 'flex-start'} maxW="70%" mb={4}>
      <Box
        bgGradient={isOwn ? bgColor : undefined}
        bg={!isOwn ? bgColor : undefined}
        color={textColor}
        px={4}
        py={2}
        borderRadius="2xl"
        borderTopRightRadius={isOwn ? 0 : '2xl'}
        borderTopLeftRadius={!isOwn ? 0 : '2xl'}
      >
        <Text>{message}</Text>

        {product && (
          <Box mt={2} p={2} bg="white" borderRadius="lg" boxShadow="sm">
            <HStack spacing={3}>
              <Image
                src={product.image}
                alt={product.title}
                boxSize="60px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" flex={1} spacing={0}>
                <Text fontSize="sm" fontWeight="medium" color="gray.800" noOfLines={2}>
                  {product.title}
                </Text>
                <Text fontSize="sm" fontWeight="bold" color="brand.solid.blue.start">
                  {product.price.toLocaleString()} ₽
                </Text>
              </VStack>
              <Button
                size="sm"
                leftIcon={<FiShoppingCart />}
                bgGradient="brand.gradient.yellow"
                color="gray.800"
                _hover={{ opacity: 0.9 }}
              >
                Купить
              </Button>
            </HStack>
          </Box>
        )}
      </Box>
      <Text fontSize="xs" color="gray.500" mt={1} textAlign={isOwn ? 'right' : 'left'}>
        {timestamp}
      </Text>
    </Box>
  );
};

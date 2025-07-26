import React from 'react';
import {
  Box,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  discount?: number;
  isNew?: boolean;
}

export const ProductCard = ({ title, price, image, discount, isNew }: ProductCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      bg={cardBg}
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        bgGradient: 'brand.gradient.purple',
        opacity: 0.05,
        zIndex: 0,
      }}
    >
      <Box position="relative">
        <Image src={image} alt={title} width="100%" height="200px" objectFit="cover" />
        {isNew && (
          <Badge
            position="absolute"
            top={2}
            right={2}
            px={3}
            py={1}
            bgGradient="brand.gradient.green"
            color="white"
            borderRadius="full"
            boxShadow="sm"
            fontWeight="medium"
            letterSpacing="wide"
          >
            Новинка
          </Badge>
        )}
      </Box>

      <VStack p={4} align="stretch" spacing={2}>
        <Text fontWeight="medium" noOfLines={2}>
          {title}
        </Text>

        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color={discount ? 'brand.solid.pink.start' : 'gray.900'}
            >
              {discountedPrice.toLocaleString()} ₽
            </Text>
            {discount && (
              <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                {price.toLocaleString()} ₽
              </Text>
            )}
          </VStack>

          <Button
            size="sm"
            leftIcon={<FiShoppingCart />}
            bgGradient="brand.gradient.yellow"
            color="gray.800"
            fontWeight="medium"
            px={4}
            _hover={{
              transform: 'translateY(-1px)',
              shadow: 'md',
              _before: {
                opacity: 0.8,
              },
            }}
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgGradient: 'brand.gradient.yellow',
              opacity: 0.6,
              transition: 'opacity 0.2s',
              zIndex: -1,
            }}
          >
            В корзину
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

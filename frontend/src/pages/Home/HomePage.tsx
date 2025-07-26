import {
import React from 'react';
  Box,
  Container,
  SimpleGrid,
  Text,
  Image,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { ProductCard } from '../../components/Product/ProductCard';
import { BottomNav } from '../../components/Navigation/BottomNav';

const categories = [
  { id: '1', name: 'Одежда', icon: '👕' },
  { id: '2', name: 'Электроника', icon: '📱' },
  { id: '3', name: 'Дом', icon: '🏠' },
  { id: '4', name: 'Красота', icon: '💄' },
];

const products = [
  {
    id: '1',
    title: 'Стильная футболка',
    price: 2999,
    image: '/product-1.jpg',
    isNew: true,
  },
  {
    id: '2',
    title: 'Смартфон XPhone',
    price: 79999,
    image: '/product-2.jpg',
    discount: 15,
  },
  {
    id: '3',
    title: 'Умные часы SmartWatch',
    price: 19999,
    image: '/product-3.jpg',
  },
  {
    id: '4',
    title: 'Беспроводные наушники',
    price: 12999,
    image: '/product-4.jpg',
    discount: 20,
  },
];

export const HomePage = () => {
  const bannerBg = useColorModeValue('brand.gradient.purple', 'brand.gradient.blue');
  const categoryBg = useColorModeValue('white', 'gray.800');

  return (
    <Box minH="100vh" pb={{ base: 16, md: 0 }}>
      <Container maxW="container.xl" py={4}>
        {/* Поисковая строка */}
        <HStack mb={6} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Поиск товаров"
              bg="white"
              borderRadius="full"
              _focus={{ borderColor: 'brand.solid.blue.start' }}
            />
          </InputGroup>
          <Icon
            as={FiFilter}
            boxSize={6}
            color="gray.600"
            cursor="pointer"
            _hover={{ color: 'brand.solid.blue.start' }}
          />
        </HStack>

        {/* Баннер */}
        <Box mb={8} borderRadius="2xl" overflow="hidden" position="relative" height="200px">
          <Box
            bgGradient={bannerBg}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            p={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text color="white" fontSize="2xl" fontWeight="bold" maxW="60%" mb={2}>
              Летняя распродажа
            </Text>
            <Text color="whiteAlpha.900" fontSize="lg" maxW="50%">
              Скидки до 50% на все товары
            </Text>
          </Box>
          <Image
            src="/banner-image.svg"
            alt="Баннер"
            position="absolute"
            right={0}
            bottom={0}
            height="90%"
            objectFit="contain"
          />
        </Box>

        {/* Категории */}
        <VStack align="stretch" mb={8} spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Популярные категории
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {categories.map((category) => (
              <Box
                key={category.id}
                bg={categoryBg}
                p={4}
                borderRadius="xl"
                cursor="pointer"
                transition="all 0.2s"
                position="relative"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'lg',
                  _before: { opacity: 0.7 },
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgGradient: 'brand.gradient.pink',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  zIndex: 0,
                }}
              >
                <VStack spacing={2} position="relative" zIndex={1}>
                  <Text fontSize="2xl">{category.icon}</Text>
                  <Text fontWeight="medium">{category.name}</Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Товары */}
        <VStack align="stretch" spacing={4}>
          <Text fontSize="xl" fontWeight="bold">
            Рекомендуемые товары
          </Text>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 4, md: 6 }}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Нижняя навигация для мобильных устройств */}
      <BottomNav />
    </Box>
  );
};

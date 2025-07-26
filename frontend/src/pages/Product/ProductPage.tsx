import {
import React from 'react';
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: ProductImage[];
  characteristics: Record<string, string>;
  inStock: boolean;
}

export const ProductPage = () => {
  const product: ProductDetails = {
    id: '1',
    title: 'Название товара',
    description: 'Подробное описание товара...',
    price: 9999,
    oldPrice: 12999,
    images: [
      { url: '/product-1.jpg', alt: 'Фото 1' },
      { url: '/product-2.jpg', alt: 'Фото 2' },
    ],
    characteristics: {
      Материал: 'Хлопок',
      Размер: 'M',
      Цвет: 'Синий',
    },
    inStock: true,
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Галерея */}
        <Box bg={bgColor} p={4} borderRadius="xl" shadow="sm">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            w="full"
            h="400px"
            objectFit="cover"
            borderRadius="lg"
          />
          <SimpleGrid columns={4} spacing={2} mt={2}>
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={image.alt}
                w="full"
                h="80px"
                objectFit="cover"
                borderRadius="md"
                cursor="pointer"
                opacity={index === 0 ? 1 : 0.6}
                _hover={{ opacity: 1 }}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Информация о товаре */}
        <VStack align="stretch" spacing={6}>
          <VStack align="stretch" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">
              {product.title}
            </Text>

            <HStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold" color="brand.solid.blue.start">
                {product.price.toLocaleString()} ₽
              </Text>
              {product.oldPrice && (
                <Text fontSize="lg" color="gray.500" textDecoration="line-through">
                  {product.oldPrice.toLocaleString()} ₽
                </Text>
              )}
              <Badge
                ml={2}
                px={2}
                py={1}
                bgGradient="brand.gradient.green"
                color="white"
                borderRadius="full"
              >
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </Badge>
            </HStack>
          </VStack>

          <HStack spacing={4}>
            <Button
              size="lg"
              leftIcon={<FiShoppingCart />}
              flex={1}
              bgGradient="brand.gradient.yellow"
              color="gray.800"
              _hover={{ opacity: 0.9 }}
            >
              В корзину
            </Button>
            <Button
              size="lg"
              icon={<FiHeart />}
              variant="outline"
              borderColor="brand.solid.pink.start"
              color="brand.solid.pink.start"
            />
            <Button
              size="lg"
              icon={<FiShare2 />}
              variant="outline"
              borderColor="brand.solid.blue.start"
              color="brand.solid.blue.start"
            />
          </HStack>

          <Tabs colorScheme="blue" isLazy>
            <TabList>
              <Tab>Описание</Tab>
              <Tab>Характеристики</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text color="gray.600">{product.description}</Text>
              </TabPanel>
              <TabPanel>
                <VStack align="stretch" spacing={2}>
                  {Object.entries(product.characteristics).map(([key, value]) => (
                    <HStack key={key} justify="space-between">
                      <Text color="gray.600">{key}</Text>
                      <Text fontWeight="medium">{value}</Text>
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

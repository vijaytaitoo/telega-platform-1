import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { FiCreditCard, FiTruck } from 'react-icons/fi';

export const CheckoutPage = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Форма оформления */}
        <VStack spacing={6} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            Оформление заказа
          </Text>

          {/* Контактные данные */}
          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">
                Контактные данные
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>Имя</FormLabel>
                  <Input placeholder="Введите имя" />
                </FormControl>
                <FormControl>
                  <FormLabel>Телефон</FormLabel>
                  <Input placeholder="+7 (___) ___-__-__" />
                </FormControl>
                <FormControl gridColumn={{ md: 'span 2' }}>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="email@example.com" />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Доставка */}
          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">
                Доставка
              </Text>
              <FormControl>
                <FormLabel>Способ доставки</FormLabel>
                <Select defaultValue="courier">
                  <option value="courier">Курьерская доставка</option>
                  <option value="pickup">Самовывоз</option>
                  <option value="post">Почта России</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Адрес</FormLabel>
                <Textarea placeholder="Введите адрес доставки" />
              </FormControl>
            </VStack>
          </Box>

          {/* Оплата */}
          <Box
            bg={bgColor}
            p={6}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">
                Способ оплаты
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Button
                  h="auto"
                  p={4}
                  variant="outline"
                  borderWidth="2px"
                  borderColor="brand.solid.blue.start"
                  _hover={{ bg: 'brand.solid.blue.start', color: 'white' }}
                >
                  <VStack spacing={2}>
                    <FiCreditCard size={24} />
                    <Text>Банковской картой</Text>
                  </VStack>
                </Button>
                <Button
                  h="auto"
                  p={4}
                  variant="outline"
                  _hover={{ bg: 'gray.50' }}
                >
                  <VStack spacing={2}>
                    <FiTruck size={24} />
                    <Text>При получении</Text>
                  </VStack>
                </Button>
              </SimpleGrid>
            </VStack>
          </Box>
        </VStack>

        {/* Сводка заказа */}
        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          borderWidth="1px"
          borderColor={borderColor}
          height="fit-content"
          position="sticky"
          top={4}
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              Ваш заказ
            </Text>

            <VStack spacing={3} align="stretch">
              {/* Здесь будет список товаров */}
            </VStack>

            <Divider />

            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text color="gray.600">Товары</Text>
                <Text fontWeight="medium">19 998 ₽</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">Доставка</Text>
                <Text fontWeight="medium">300 ₽</Text>
              </HStack>
              <HStack justify="space-between" pt={2}>
                <Text fontSize="lg" fontWeight="bold">
                  Итого
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  20 298 ₽
                </Text>
              </HStack>
            </VStack>

            <Button
              size="lg"
              w="full"
              bgGradient="brand.gradient.yellow"
              color="gray.800"
              _hover={{ opacity: 0.9 }}
            >
              Оформить заказ
            </Button>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};
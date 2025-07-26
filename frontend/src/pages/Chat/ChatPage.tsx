import {
import React from 'react';
  Box,
  Container,
  VStack,
  HStack,
  Input,
  IconButton,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import { ChatMessage } from '../../components/Chat/ChatMessage';
import { BottomNav } from '../../components/Navigation/BottomNav';

export const ChatPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const inputBgColor = useColorModeValue('white', 'gray.800');

  const mockMessages = [
    {
      message: 'Здравствуйте! Интересует товар из вашего магазина.',
      isOwn: true,
      timestamp: '12:30',
    },
    {
      message: 'Добрый день! Какой именно товар вас интересует?',
      isOwn: false,
      timestamp: '12:31',
    },
    {
      message: 'Вот этот:',
      isOwn: true,
      timestamp: '12:32',
      product: {
        id: '1',
        title: 'Стильная футболка с градиентным принтом',
        price: 2999,
        image: '/product-1.jpg',
      },
    },
    {
      message: 'Отличный выбор! Этот товар есть в наличии. Хотите оформить заказ?',
      isOwn: false,
      timestamp: '12:33',
    },
  ];

  return (
    <Box minH="100vh" bg={bgColor} pb={{ base: 16, md: 0 }}>
      <Container maxW="container.md" h="100vh" p={0}>
        <VStack h="full" spacing={0}>
          {/* Чат */}
          <Box
            flex={1}
            w="full"
            overflowY="auto"
            p={4}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray.300',
                borderRadius: '24px',
              },
            }}
          >
            <VStack spacing={4} align="stretch">
              {mockMessages.map((msg, index) => (
                <ChatMessage key={index} {...msg} />
              ))}
            </VStack>
          </Box>

          {/* Разделитель */}
          <Divider />

          {/* Поле ввода */}
          <Box w="full" p={4} bg={inputBgColor} borderTop="1px" borderColor="gray.100">
            <HStack spacing={2}>
              <IconButton
                aria-label="Прикрепить файл"
                icon={<FiPaperclip />}
                variant="ghost"
                colorScheme="blue"
                isRound
              />
              <Input
                placeholder="Введите сообщение..."
                bg={inputBgColor}
                borderRadius="full"
                _focus={{
                  borderColor: 'brand.solid.blue.start',
                  boxShadow: 'none',
                }}
              />
              <IconButton
                aria-label="Отправить сообщение"
                icon={<FiSend />}
                bgGradient="brand.gradient.blue"
                color="white"
                isRound
                _hover={{
                  transform: 'translateY(-1px)',
                  shadow: 'md',
                }}
              />
            </HStack>
          </Box>
        </VStack>
      </Container>

      <BottomNav />
    </Box>
  );
};

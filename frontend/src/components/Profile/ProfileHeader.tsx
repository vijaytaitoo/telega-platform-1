import {
import React from 'react';
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiEdit2, FiSettings, FiShoppingBag } from 'react-icons/fi';

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar?: string;
  ordersCount: number;
  onEditProfile: () => void;
  onSettings: () => void;
}

export const ProfileHeader = ({
  name,
  email,
  avatar,
  ordersCount,
  onEditProfile,
  onSettings,
}: ProfileHeaderProps) => {
  const bgGradient = useColorModeValue(
    'brand.gradient.purple',
    'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)',
  );

  return (
    <Box position="relative">
      <Box bgGradient={bgGradient} h="150px" borderRadius="xl" mb="60px" />

      <VStack position="absolute" left={0} right={0} bottom="-50px" spacing={2}>
        <Avatar size="xl" name={name} src={avatar} border="4px solid white" />

        <VStack spacing={1}>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {email}
          </Text>
        </VStack>

        <HStack spacing={4} mt={2}>
          <Button
            size="sm"
            leftIcon={<Icon as={FiEdit2} />}
            onClick={onEditProfile}
            bgGradient="brand.gradient.blue"
            color="white"
            _hover={{ opacity: 0.9 }}
          >
            Редактировать
          </Button>

          <Button
            size="sm"
            leftIcon={<Icon as={FiSettings} />}
            onClick={onSettings}
            variant="ghost"
          >
            Настройки
          </Button>
        </HStack>

        <HStack w="full" justify="center" p={4} bg="white" borderRadius="lg" shadow="sm" mt={4}>
          <VStack spacing={0} align="center">
            <Icon as={FiShoppingBag} boxSize={6} color="brand.solid.blue.start" />
            <Text fontSize="lg" fontWeight="bold">
              {ordersCount}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Заказов
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

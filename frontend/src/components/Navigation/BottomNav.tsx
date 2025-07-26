import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FiHome, FiSearch, FiMessageSquare, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { icon: FiHome, label: 'Главная', path: '/' },
  { icon: FiSearch, label: 'Поиск', path: '/search' },
  { icon: FiMessageSquare, label: 'Чат', path: '/chat' },
  { icon: FiShoppingCart, label: 'Корзина', path: '/cart' },
  { icon: FiUser, label: 'Профиль', path: '/profile' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="0 -2px 10px rgba(0,0,0,0.05)"
      display={{ base: 'block', md: 'none' }}
      zIndex={1000}
    >
      <Flex justify="space-around" py={2}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path}>
              <Flex
                direction="column"
                align="center"
                color={isActive ? 'brand.solid.blue.start' : 'gray.500'}
                _hover={{ color: 'brand.solid.blue.start' }}
              >
                <Icon as={item.icon} boxSize={6} mb={1} />
                <Text fontSize="xs" fontWeight={isActive ? 'medium' : 'normal'}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

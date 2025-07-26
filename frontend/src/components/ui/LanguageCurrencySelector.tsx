import React from 'react';
import { Box, Select, HStack, Text } from '@chakra-ui/react';
import { useLocalization, Language, Currency } from '../../hooks/useLocalization';

export const LanguageCurrencySelector: React.FC = () => {
  const { language, currency, setLanguage, setCurrency, t } = useLocalization();

  return (
    <HStack spacing={4}>
      <Box>
        <Text fontSize="sm" mb={1}>
          {t('common.language')}
        </Text>
        <Select
          id="language-selector"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          size="sm"
          width="120px"
        >
          <option value="ru">Русский</option>
          <option value="uz">O&apos;zbekcha</option>
          <option value="en">English</option>
        </Select>
      </Box>

      <Box>
        <Text fontSize="sm" mb={1}>
          {t('common.currency')}
        </Text>
        <Select
          id="currency-selector"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          size="sm"
          width="100px"
        >
          <option value="RUB">₽ RUB</option>
          <option value="UZS">UZS</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </Select>
      </Box>
    </HStack>
  );
};

import React from 'react';
import { Box, Select, Text, VStack, Button, useToast } from '@chakra-ui/react';
import { useLocalization } from '../../hooks/useLocalization';

interface PaymentMethodSelectorProps {
  onPaymentSelect: (method: string) => void;
  amount: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onPaymentSelect,
  amount,
}) => {
  const { t, formatPrice } = useLocalization();
  const toast = useToast();

  const handlePayment = (method: string) => {
    onPaymentSelect(method);

    // Имитация обработки платежа
    if (method === 'cash') {
      toast({
        title: t('payment.paymentConfirmed'),
        description: `${t('payment.orderNumber')}: #${Math.random().toString(36).substr(2, 9)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (method === 'liqpay') {
      // Редирект на LiqPay
      window.open('https://www.liqpay.ua', '_blank');
    } else if (method === 'uzumpay') {
      // Редирект на UzumPay
      window.open('https://uzumpay.uz', '_blank');
    } else if (method === 'telegram-stars') {
      toast({
        title: t('payment.telegramStars'),
        description: 'Оплата через Telegram Stars',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } else if (method === 'TON') {
      toast({
        title: 'TON кошелек',
        description: 'Оплата через TON',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } else if (method === 'BTC') {
      toast({
        title: 'Bitcoin адрес',
        description: 'Оплата через Bitcoin',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {t('payment.methods')}
        </Text>
        <Select
          id="payment-method"
          onChange={(e) => handlePayment(e.target.value)}
          placeholder={t('payment.methods')}
        >
          <option value="liqpay">{t('payment.liqpay')}</option>
          <option value="uzumpay">{t('payment.uzumpay')}</option>
          <option value="telegram-stars">{t('payment.telegramStars')}</option>
          <option value="TON">{t('payment.ton')}</option>
          <option value="BTC">{t('payment.bitcoin')}</option>
          <option value="cash">{t('payment.cash')}</option>
        </Select>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          {t('payment.amount')}: {formatPrice(amount)}
        </Text>
      </Box>

      <Button
        id="pay-button"
        colorScheme="blue"
        size="lg"
        onClick={() => {
          const method = (document.getElementById('payment-method') as HTMLSelectElement)?.value;
          if (method) {
            handlePayment(method);
          }
        }}
      >
        {t('payment.confirmPayment')}
      </Button>
    </VStack>
  );
};

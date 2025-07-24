import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home/HomePage';
import { ProductPage } from './pages/Product/ProductPage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import { ChatPage } from './pages/Chat/ChatPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/product/:id',
    element: <ProductPage />
  },
  {
    path: '/checkout',
    element: <CheckoutPage />
  },
  {
    path: '/cart',
    element: <CheckoutPage />
  },
  {
    path: '/chat',
    element: <ChatPage />
  }
]);
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  owner: string;
  category: 'fashion' | 'electronics' | 'freelance';
  trustScore: number;
  reviews: number;
  responseSpeed: number;
  activity: number;
  image: string;
  products: Product[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  shopId: string;
}

export interface BlockTemplate {
  id: string;
  type: 'gallery' | 'portfolio' | 'booking' | 'hero' | 'contact';
  name: string;
  icon: string;
  category: 'fashion' | 'electronics' | 'freelance';
}

export interface DroppedBlock {
  id: string;
  type: string;
  name: string;
  position: number;
  config: Record<string, any>;
}

export enum Category {
  PRODUCE = 'Produce',
  DAIRY = 'Dairy & Eggs',
  BAKERY = 'Bakery',
  MEAT = 'Meat & Seafood',
  PANTRY = 'Pantry',
  BEVERAGES = 'Beverages'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  unit: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isThinking?: boolean;
}

export type UserRole = 'user' | 'admin' | 'sub-admin';

export interface User {
  id: string;
  name: string;
  contact: string; // email or mobile
  password?: string; // In a real app, this would be hashed
  role: UserRole;
  joinedAt: number;
}

export type PaymentMethod = 'card' | 'upi' | 'cod';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentMethod: PaymentMethod;
  createdAt: number;
}
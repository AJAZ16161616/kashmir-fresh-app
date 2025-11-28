import { User, Product, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// --- DATABASE SIMULATION ---
// In a real full-stack app, these would be database tables in MongoDB/Postgres

const DB_KEYS = {
  USERS: 'freshmarket_users_db',
  PRODUCTS: 'freshmarket_products',
  ORDERS: 'freshmarket_orders',
  SESSION: 'freshmarket_user_session',
  BANK: 'freshmarket_bank_details'
};

const INITIAL_ADMIN: User = {
  id: 'admin-1',
  name: 'Super Admin',
  contact: 'admin@freshmarket.com',
  password: 'admin',
  role: 'admin',
  joinedAt: Date.now()
};

// Simulate network latency (300-800ms)
const delay = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms || Math.random() * 500 + 300));

// --- HELPER FUNCTIONS ---

const getStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initialize DB with seed data if empty
export const initializeDatabase = () => {
  // 1. Ensure Admin Exists
  const users = getStorage<User[]>(DB_KEYS.USERS, []);
  // Check case-insensitively
  if (!users.some(u => u.contact.toLowerCase() === INITIAL_ADMIN.contact.toLowerCase())) {
    users.push(INITIAL_ADMIN);
    setStorage(DB_KEYS.USERS, users);
  }

  // 2. Ensure Products Exist
  let products = getStorage<Product[]>(DB_KEYS.PRODUCTS, []);
  if (products.length === 0) {
    setStorage(DB_KEYS.PRODUCTS, MOCK_PRODUCTS);
  } else {
    // FIX: Auto-patch broken images in local storage if they exist
    // This ensures that when we update the code constants, the user's browser DB gets the fix without needing a hard reset
    const updatedProducts = products.map(p => {
        // Fix Gulab Jamun (519)
        if (p.id === '519') {
            const mock = MOCK_PRODUCTS.find(m => m.id === '519');
            if (mock && p.image !== mock.image) {
                return { ...p, image: mock.image };
            }
        }
        // Fix Nadru (102)
        if (p.id === '102') {
            const mock = MOCK_PRODUCTS.find(m => m.id === '102');
            if (mock && p.image !== mock.image) {
                return { ...p, image: mock.image };
            }
        }
        return p;
    });
    
    // Only save if changed to avoid unnecessary writes
    if (JSON.stringify(products) !== JSON.stringify(updatedProducts)) {
        setStorage(DB_KEYS.PRODUCTS, updatedProducts);
    }
  }
};

// --- API ENDPOINTS ---

export const api = {
  // AUTHENTICATION ROUTES
  auth: {
    me: async (): Promise<User | null> => {
      await delay(200);
      return getStorage<User | null>(DB_KEYS.SESSION, null);
    },
    
    login: async (contact: string, password: string): Promise<User> => {
      await delay(800);
      const normalizedContact = contact.trim().toLowerCase();
      const users = getStorage<User[]>(DB_KEYS.USERS, []);
      
      const user = users.find(u => u.contact.toLowerCase() === normalizedContact && u.password === password);
      
      if (!user) throw new Error("Invalid credentials");
      
      setStorage(DB_KEYS.SESSION, user);
      return user;
    },

    signup: async (data: Omit<User, 'id' | 'role' | 'joinedAt'>): Promise<User> => {
      await delay(800);
      const normalizedContact = data.contact.trim().toLowerCase();
      const users = getStorage<User[]>(DB_KEYS.USERS, []);
      
      if (users.some(u => u.contact.toLowerCase() === normalizedContact)) {
        throw new Error("User already exists");
      }

      const newUser: User = {
        id: Date.now().toString(),
        role: 'user',
        joinedAt: Date.now(),
        ...data,
        contact: normalizedContact // Store normalized contact
      };

      users.push(newUser);
      setStorage(DB_KEYS.USERS, users);
      setStorage(DB_KEYS.SESSION, newUser); // Auto-login
      return newUser;
    },

    logout: async () => {
      await delay(200);
      localStorage.removeItem(DB_KEYS.SESSION);
    },

    deleteAccount: async (userId: string) => {
      await delay(500);
      const users = getStorage<User[]>(DB_KEYS.USERS, []);
      const newUsers = users.filter(u => u.id !== userId);
      setStorage(DB_KEYS.USERS, newUsers);
      localStorage.removeItem(DB_KEYS.SESSION);
    }
  },

  // PRODUCT ROUTES
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(400);
      return getStorage<Product[]>(DB_KEYS.PRODUCTS, MOCK_PRODUCTS);
    },

    create: async (product: Product): Promise<Product> => {
      await delay(500);
      const products = getStorage<Product[]>(DB_KEYS.PRODUCTS, []);
      const newProduct = { ...product, id: Date.now().toString() };
      products.push(newProduct);
      setStorage(DB_KEYS.PRODUCTS, products);
      return newProduct;
    },

    update: async (product: Product): Promise<Product> => {
      await delay(500);
      const products = getStorage<Product[]>(DB_KEYS.PRODUCTS, []);
      const index = products.findIndex(p => p.id === product.id);
      if (index === -1) throw new Error("Product not found");
      
      products[index] = product;
      setStorage(DB_KEYS.PRODUCTS, products);
      return product;
    },

    delete: async (id: string): Promise<void> => {
      await delay(400);
      const products = getStorage<Product[]>(DB_KEYS.PRODUCTS, []);
      const newProducts = products.filter(p => p.id !== id);
      setStorage(DB_KEYS.PRODUCTS, newProducts);
    }
  },

  // ORDER ROUTES
  orders: {
    getAll: async (): Promise<Order[]> => {
      await delay(400);
      return getStorage<Order[]>(DB_KEYS.ORDERS, []);
    },

    getUserOrders: async (userId: string): Promise<Order[]> => {
      await delay(400);
      const orders = getStorage<Order[]>(DB_KEYS.ORDERS, []);
      return orders.filter(o => o.userId === userId);
    },

    create: async (order: Order): Promise<Order> => {
      await delay(1500); // Process payment simulation
      const orders = getStorage<Order[]>(DB_KEYS.ORDERS, []);
      const newOrder = { ...order, id: Date.now().toString(), createdAt: Date.now() };
      // New orders go to the top
      setStorage(DB_KEYS.ORDERS, [newOrder, ...orders]);
      return newOrder;
    }
  },

  // ADMIN USER ROUTES
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(400);
      return getStorage<User[]>(DB_KEYS.USERS, []);
    },
    
    delete: async (id: string): Promise<void> => {
      await delay(400);
      const users = getStorage<User[]>(DB_KEYS.USERS, []);
      if (users.find(u => u.id === id)?.role === 'admin') {
        throw new Error("Cannot delete admin");
      }
      setStorage(DB_KEYS.USERS, users.filter(u => u.id !== id));
    }
  },

  // SETTINGS ROUTES
  settings: {
    getBankDetails: async () => {
      await delay(200);
      return getStorage(DB_KEYS.BANK, {
        holderName: '',
        accountNumber: '',
        bankName: '',
        ifsc: '',
        upiId: '',
        isLinked: false
      });
    },

    saveBankDetails: async (details: any) => {
      await delay(500);
      setStorage(DB_KEYS.BANK, details);
      return details;
    },

    resetDatabase: async () => {
      await delay(1000);
      localStorage.removeItem(DB_KEYS.PRODUCTS);
      localStorage.removeItem(DB_KEYS.ORDERS);
      localStorage.removeItem(DB_KEYS.USERS);
      localStorage.removeItem(DB_KEYS.SESSION);
      localStorage.removeItem(DB_KEYS.BANK);
      // Re-init happens on reload usually, but we can call it here
      initializeDatabase();
    }
  }
};
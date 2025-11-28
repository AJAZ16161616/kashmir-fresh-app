import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { api } from '../services/api';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (updatedProduct: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await api.products.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    try {
      const newProduct = await api.products.create(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const result = await api.products.update(updatedProduct);
      setProducts(prev => prev.map(p => p.id === result.id ? result : p));
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await api.products.delete(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      <div 
        onClick={onClick}
        className="relative aspect-square overflow-hidden bg-gray-100 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-700 shadow-sm pointer-events-none">
          {product.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 
            className="font-semibold text-lg text-slate-800 leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={onClick}
          >
            {product.name}
          </h3>
          <span className="text-yellow-500 text-sm flex items-center">
            ★ {product.rating}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
            <span className="text-slate-400 text-xs ml-1">/ {product.unit}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1 bg-slate-100 hover:bg-primary hover:text-white text-slate-700 px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={16} />
            <span className="text-sm font-medium">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
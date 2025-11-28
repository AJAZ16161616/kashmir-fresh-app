import React from 'react';
import { X, Star, ShoppingCart, Edit2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, isOpen, onClose, onEdit }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'sub-admin';

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-slideUp flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 relative group h-64 md:h-auto">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 bg-white/80 p-2 rounded-full md:hidden text-slate-800 shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm font-medium text-primary bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {product.category}
              </span>
              <h2 className="text-3xl font-bold text-slate-800 mt-3 leading-tight">{product.name}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 hidden md:block hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center text-yellow-400">
              <Star className="fill-current" size={20} />
              <span className="font-bold text-slate-700 ml-1 text-lg">{product.rating}</span>
            </div>
            <span className="text-slate-300 text-xl">•</span>
            <span className="text-slate-500 text-sm">Fresh & Organic</span>
          </div>

          <div className="prose prose-slate mb-8 flex-grow">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {product.description}
            </p>
            <p className="text-slate-500 mt-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              📦 Sold in units of approximately <span className="font-semibold text-slate-700">1 {product.unit}</span>.
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500 uppercase font-semibold">Price</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                  <span className="text-slate-400 font-medium">/ {product.unit}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-200 transition-all active:scale-[0.99] flex items-center justify-center gap-3"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
              
              {isAdmin && onEdit && (
                <button
                  onClick={() => {
                    onEdit(product);
                    onClose();
                  }}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-3 rounded-xl font-bold text-lg transition-all active:scale-[0.99] flex items-center justify-center gap-3"
                >
                  <Edit2 size={20} /> Edit Product
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsModal;
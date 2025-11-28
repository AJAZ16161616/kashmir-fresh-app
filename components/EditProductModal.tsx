import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Package, CheckCircle, Trash2, Loader } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../context/ProductContext';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null; // If null/undefined, it's in "Add" mode
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({ ...product });
      } else {
        // Reset for Add Mode
        setFormData({
          name: '',
          price: 0,
          unit: '',
          category: undefined,
          description: '',
          image: ''
        });
      }
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const isEditMode = !!product;
  const isBase64Image = formData.image?.startsWith('data:');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (isEditMode && formData.id) {
        await updateProduct(formData as Product);
      } else {
        const newProduct: Product = {
          id: '', // Service assigns ID
          name: formData.name || 'New Product',
          price: formData.price || 0,
          category: formData.category as any || 'Pantry',
          image: formData.image || 'https://picsum.photos/400/400',
          description: formData.description || '',
          unit: formData.unit || 'pc',
          rating: 0
        };
        await addProduct(newProduct);
      }
      onClose();
    } catch (error) {
      alert("Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size too large. Please use an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-slideUp">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Product Name</label>
            <input 
              type="text" 
              value={formData.name || ''}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none font-medium text-slate-800"
              required
              placeholder="e.g. Organic Bananas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price (₹)</label>
              <input 
                type="number" 
                value={formData.price || ''}
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Unit</label>
              <input 
                type="text" 
                value={formData.unit || ''}
                onChange={e => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                required
                placeholder="e.g. kg, pc, box"
              />
            </div>
          </div>

            <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Product Image</label>
            
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              {/* Preview */}
              <div className="mb-4 flex justify-center bg-white rounded-lg border border-slate-200 p-2 h-48 relative overflow-hidden group">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="h-full object-contain" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove Image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-300">
                      <Package size={48} />
                    </div>
                  )}
              </div>

              <div className="space-y-3">
                {/* Input Logic: Show cleaner UI if using uploaded file */}
                {isBase64Image ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Image uploaded from device</span>
                    </div>
                    <button 
                      type="button"
                      onClick={clearImage}
                      className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
                    >
                      Remove & Use URL
                    </button>
                  </div>
                ) : (
                  <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase mb-1">Image URL</label>
                      <input 
                      type="text" 
                      value={formData.image || ''}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 outline-none bg-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-slate-50 px-2 text-slate-500">OR</span>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block w-full cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      className="hidden" 
                    />
                    <div className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-pink-300 rounded-lg text-pink-600 hover:bg-pink-50 transition-colors">
                      <Upload size={16} />
                      <span className="text-sm font-medium">Upload from Device</span>
                    </div>
                  </label>
                  <p className="text-xs text-center text-slate-400 mt-1">Max size: 1MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select 
              value={formData.category || ''}
              onChange={e => setFormData({...formData, category: e.target.value as any})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none bg-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Produce">Produce</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Bakery">Bakery</option>
              <option value="Meat & Seafood">Meat & Seafood</option>
              <option value="Pantry">Pantry</option>
              <option value="Beverages">Beverages</option>
            </select>
          </div>

            <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea 
              value={formData.description || ''}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              rows={3}
              required
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-slate-100 mt-4">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              {isSaving ? <Loader size={18} className="animate-spin"/> : <Save size={18} />}
              {isEditMode ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
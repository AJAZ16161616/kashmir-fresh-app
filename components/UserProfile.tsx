import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Calendar, LogOut, Trash2, ShoppingBag, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { api } from '../services/api';

const UserProfile: React.FC = () => {
  const { user, logout, deleteProfile } = useAuth();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const orders = await api.orders.getUserOrders(user.id);
          setMyOrders(orders.reverse()); // Newest first
        } catch (error) {
          console.error("Failed to load orders", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchHistory();
  }, [user]);

  const getPaymentLabel = (method: string) => {
    switch(method) {
      case 'cod': return 'Cash on Delivery';
      case 'upi': return 'UPI Payment';
      case 'card': return 'Credit/Debit Card';
      default: return 'Online';
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="bg-white p-1 rounded-full">
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center border-4 border-white text-pink-400">
                <User size={40} />
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button 
                onClick={logout}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
              <button 
                onClick={() => {
                  if(window.confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
                    deleteProfile();
                  }
                }}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Trash2 size={16} /> Delete Profile
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mb-2">{user.name}</h1>
          <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
            <span className="flex items-center gap-1.5">
              {user.contact.includes('@') ? <Mail size={16} /> : <Phone size={16} />}
              {user.contact}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-mono uppercase border border-slate-200">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-primary" />
          Order History
        </h2>
        
        {isLoading ? (
          <div className="text-center py-10">
            <Loader className="animate-spin mx-auto text-primary" />
          </div>
        ) : myOrders.length > 0 ? (
          <div className="grid gap-4">
            {myOrders.map(order => (
              <div key={order.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-slate-500">#{order.id.slice(-6)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                  </p>
                </div>
                <div className="flex items-center justify-between md:gap-8">
                  <div className="text-right md:text-left">
                    <p className="text-xs text-slate-400 uppercase">Total</p>
                    <p className="font-bold text-slate-800">₹{order.total.toFixed(2)}</p>
                  </div>
                   <div className="text-right">
                    <p className="text-xs text-slate-400 uppercase">Payment</p>
                    <p className="font-medium text-slate-700 uppercase text-sm">{getPaymentLabel(order.paymentMethod)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <ShoppingBag className="mx-auto text-slate-300 mb-3" size={48} />
            <p className="text-slate-500">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
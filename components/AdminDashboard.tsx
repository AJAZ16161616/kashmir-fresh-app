import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, Settings, 
  DollarSign, Clock, CheckCircle, Edit2,
  Landmark, AlertCircle, RefreshCw, Trash2, Loader, Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Order, User, Product } from '../types';
import EditProductModal from './EditProductModal';
import { api } from '../services/api';

interface BankDetails {
  holderName: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  upiId: string;
  isLinked: boolean;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts(); // Product Context handles product state
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'users' | 'settings'>('overview');
  
  // Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  // Edit/Add State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Settings State
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    holderName: '',
    accountNumber: '',
    bankName: '',
    ifsc: '',
    upiId: '',
    isLinked: false
  });

  // Fetch Data on Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [fetchedOrders, fetchedUsers, fetchedBank] = await Promise.all([
        api.orders.getAll(),
        api.users.getAll(),
        api.settings.getBankDetails()
      ]);
      setOrders(fetchedOrders);
      setUsers(fetchedUsers);
      setBankDetails(fetchedBank);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Stats calculation
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const totalUsers = users.length;

  // Sub-admin restriction
  const isSubAdmin = user?.role === 'sub-admin';

  const handleDeleteProduct = (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...bankDetails, isLinked: true };
    await api.settings.saveBankDetails(updated);
    setBankDetails(updated);
    alert('Bank account linked successfully!');
  };

  const handleUnlinkAccount = async () => {
    if(window.confirm('Are you sure you want to unlink this account?')) {
      const reset = { holderName: '', accountNumber: '', bankName: '', ifsc: '', upiId: '', isLinked: false };
      await api.settings.saveBankDetails(reset);
      setBankDetails(reset);
    }
  };

  const handleResetData = async () => {
    if (window.confirm("WARNING: This will delete ALL database records. Are you sure?")) {
      await api.settings.resetDatabase();
      window.location.reload();
    }
  };

  const openEditModal = (product: Product | null) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if(window.confirm("Are you sure you want to remove this user?")) {
      await api.users.delete(userId);
      fetchData(); // Refresh list
    }
  }

  const getPaymentBadge = (method: string) => {
    if(method === 'upi') return <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-medium border border-emerald-200">UPI</span>;
    if(method === 'card') return <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium border border-blue-200">CARD</span>;
    return <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-xs font-medium border border-slate-200">COD</span>;
  }

  if (isLoadingData) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-slate-50">
        <Loader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-100 relative">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
        <div className="mb-8 px-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="Overview" 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
            />
            <SidebarItem 
              icon={<ShoppingCart size={20} />} 
              label="Orders" 
              active={activeTab === 'orders'} 
              onClick={() => setActiveTab('orders')} 
            />
            {!isSubAdmin && (
              <>
                <SidebarItem 
                  icon={<Package size={20} />} 
                  label="Products" 
                  active={activeTab === 'products'} 
                  onClick={() => setActiveTab('products')} 
                />
                <SidebarItem 
                  icon={<Users size={20} />} 
                  label="Users" 
                  active={activeTab === 'users'} 
                  onClick={() => setActiveTab('users')} 
                />
                 <SidebarItem 
                  icon={<Settings size={20} />} 
                  label="Settings" 
                  active={activeTab === 'settings'} 
                  onClick={() => setActiveTab('settings')} 
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<DollarSign className="text-green-500" />} title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
              <StatCard icon={<Clock className="text-orange-500" />} title="Pending Orders" value={pendingOrders.toString()} />
              <StatCard icon={<Users className="text-blue-500" />} title="Total Users" value={totalUsers.toString()} />
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4">Recent Orders</h3>
              {orders.length === 0 ? (
                <p className="text-slate-500">No orders yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-sm text-slate-500">
                        <th className="pb-3">ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Method</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b border-slate-50 last:border-0">
                          <td className="py-3 font-mono">{order.id.slice(-6)}</td>
                          <td className="py-3">{order.userName}</td>
                          <td className="py-3 font-bold">₹{order.total.toFixed(2)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3">{getPaymentBadge(order.paymentMethod)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-sm font-semibold text-slate-600">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="p-4 font-mono text-sm">{order.id}</td>
                      <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-sm font-medium">{order.userName}</td>
                      <td className="p-4 text-sm">{order.items.length} items</td>
                      <td className="p-4 text-sm font-bold">₹{order.total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4">{getPaymentBadge(order.paymentMethod)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && <div className="p-8 text-center text-slate-500">No orders found.</div>}
          </div>
        )}
        
        {activeTab === 'users' && !isSubAdmin && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-sm font-semibold text-slate-600">
                    <th className="p-4">Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-sm">{u.contact}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono uppercase">{u.role}</span>
                      </td>
                      <td className="p-4 text-sm text-slate-500">{new Date(u.joinedAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        {u.role !== 'admin' && (
                          <button 
                            onClick={() => handleDeleteUser(u.id)}
                            className="text-pink-600 hover:text-pink-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        )}
        
         {activeTab === 'products' && !isSubAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {products.map(product => (
               <div key={product.id} className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 hover:shadow-md transition-shadow">
                 <img 
                   src={product.image} 
                   alt={product.name} 
                   className="w-16 h-16 rounded object-cover bg-slate-100 cursor-pointer"
                   onClick={() => openEditModal(product)} 
                 />
                 <div className="flex-1 min-w-0">
                   <h4 className="font-bold text-slate-800 truncate cursor-pointer hover:text-primary transition-colors" onClick={() => openEditModal(product)}>
                     {product.name}
                   </h4>
                   <p className="text-sm text-slate-500">₹{product.price}</p>
                   <div className="mt-2 flex gap-2">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-xs flex items-center gap-1 text-pink-600 hover:text-pink-700 font-medium px-2 py-1 bg-pink-50 rounded"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                   </div>
                 </div>
               </div>
             ))}
             <div 
               onClick={() => openEditModal(null)}
               className="bg-emerald-50 p-4 rounded-lg border border-dashed border-emerald-300 flex flex-col items-center justify-center text-emerald-600 cursor-pointer hover:bg-emerald-100 transition-colors h-[120px]"
             >
               <Package size={24} className="mb-2" />
               <span className="font-medium">Add New Product</span>
             </div>
          </div>
        )}

        {activeTab === 'settings' && !isSubAdmin && (
          <div className="max-w-3xl space-y-6">
            
            {/* Payout Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-6 border-b border-slate-100">
                 <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                   <Landmark className="text-slate-500" /> Payout Configuration
                 </h2>
                 <p className="text-sm text-slate-500 mt-1">
                   Link a bank account to receive payments from your online orders.
                 </p>
               </div>

               <div className="p-6">
                 {bankDetails.isLinked ? (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-5">
                      <div className="flex items-start gap-3">
                         <div className="p-2 bg-green-100 text-green-600 rounded-full">
                           <CheckCircle size={24} />
                         </div>
                         <div className="flex-1">
                           <h3 className="font-bold text-green-800">Account Linked Successfully</h3>
                           <p className="text-sm text-green-600 mb-4">Your payments will be deposited to this account automatically.</p>
                           
                           <div className="bg-white p-4 rounded border border-green-100 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Bank Name</span>
                                <span className="font-medium text-slate-700">{bankDetails.bankName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Account Holder</span>
                                <span className="font-medium text-slate-700">{bankDetails.holderName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Account Number</span>
                                <span className="font-medium text-slate-700">•••• •••• {bankDetails.accountNumber.slice(-4)}</span>
                              </div>
                              <div className="flex justify-between border-t border-slate-100 pt-2 mt-2">
                                <span className="text-slate-500">UPI ID / VPA</span>
                                <span className="font-medium text-slate-700">{bankDetails.upiId || 'Not Set'}</span>
                              </div>
                           </div>

                           <button 
                             onClick={handleUnlinkAccount}
                             className="mt-4 text-sm text-pink-600 hover:text-pink-800 font-medium hover:underline"
                            >
                             Unlink Account
                           </button>
                         </div>
                      </div>
                    </div>
                 ) : (
                   <form onSubmit={handleLinkAccount} className="space-y-4">
                     <div className="bg-yellow-50 p-3 rounded-lg flex items-center gap-2 text-sm text-yellow-700 mb-4">
                       <AlertCircle size={16} />
                       You have not linked a payout account yet.
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Account Holder Name</label>
                         <input 
                            type="text" 
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. John Smith"
                            value={bankDetails.holderName}
                            onChange={e => setBankDetails({...bankDetails, holderName: e.target.value})}
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-sm font-medium text-slate-700">Bank Name</label>
                         <input 
                            type="text" 
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. HDFC Bank"
                            value={bankDetails.bankName}
                            onChange={e => setBankDetails({...bankDetails, bankName: e.target.value})}
                         />
                       </div>
                     </div>

                     <div className="space-y-2">
                       <label className="text-sm font-medium text-slate-700">Account Number</label>
                       <input 
                          type="password" 
                          required
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none font-mono"
                          placeholder="0000 0000 0000 0000"
                          value={bankDetails.accountNumber}
                          onChange={e => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                       />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">IFSC / Routing Code</label>
                          <input 
                              type="text" 
                              required
                              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none uppercase"
                              placeholder="HDFC0001234"
                              value={bankDetails.ifsc}
                              onChange={e => setBankDetails({...bankDetails, ifsc: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">UPI ID / VPA (Optional)</label>
                          <div className="relative">
                            <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="merchant@upi"
                                value={bankDetails.upiId}
                                onChange={e => setBankDetails({...bankDetails, upiId: e.target.value})}
                            />
                          </div>
                        </div>
                     </div>

                     <div className="pt-2">
                       <button 
                         type="submit"
                         className="bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2"
                       >
                         <Landmark size={18} /> Link Account
                       </button>
                     </div>
                   </form>
                 )}
               </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl shadow-sm border border-red-200 overflow-hidden">
                <div className="p-6 border-b border-red-50 bg-red-50">
                   <h2 className="text-lg font-bold text-red-800 flex items-center gap-2">
                     <AlertCircle size={20} /> Danger Zone
                   </h2>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 mb-4 text-sm">
                      If you are experiencing issues or "Cannot find products", use this button to reset the application database. 
                      This will delete all orders, users (except default admin), and restore products to the default list.
                    </p>
                    <button 
                      onClick={handleResetData}
                      className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <RefreshCw size={18} /> Reset Database
                    </button>
                </div>
            </div>

          </div>
        )}

      </div>

      {/* Edit/Add Product Modal */}
      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        product={editingProduct} 
      />
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      active ? 'bg-emerald-50 text-primary' : 'text-slate-600 hover:bg-slate-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string }> = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-slate-50 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard, Truck, Loader, CreditCard as CardIcon, Lock, Smartphone, QrCode, ArrowRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order, PaymentMethod } from '../types';
import { api } from '../services/api';

interface CartDrawerProps {
  onLoginRequest: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onLoginRequest }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart
  } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Payment Modal State
  const [paymentTab, setPaymentTab] = useState<'card' | 'upi'>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);
  const [merchantVpa, setMerchantVpa] = useState('');
  
  // UPI Simulation State
  const [upiStatus, setUpiStatus] = useState<'idle' | 'redirecting' | 'processing' | 'success'>('idle');
  const [showQr, setShowQr] = useState(false);

  // Load Merchant UPI from settings when opening modal
  useEffect(() => {
    if (showPaymentModal) {
      api.settings.getBankDetails().then(details => {
        setMerchantVpa(details.upiId || 'shop@upi');
      });
    }
  }, [showPaymentModal]);

  const initiatePayment = (method: 'online' | 'cod') => {
    if (!user) {
      setIsCartOpen(false);
      onLoginRequest();
      return;
    }

    if (method === 'online') {
      setShowPaymentModal(true);
      setUpiStatus('idle');
      setShowQr(false);
      setSelectedUpiApp(null);
    } else {
      processOrder('cod');
    }
  };

  const processOrder = async (method: PaymentMethod) => {
    if (!user) return;
    setIsProcessing(true);
    
    try {
      // Create Order payload
      const orderPayload: Order = {
        id: '', // Server will assign
        userId: user.id,
        userName: user.name,
        items: [...items],
        total: cartTotal,
        status: 'pending',
        paymentMethod: method,
        createdAt: 0 // Server will assign
      };

      // Call API
      await api.orders.create(orderPayload);

      setIsProcessing(false);
      setShowPaymentModal(false);
      clearCart();
      setIsCartOpen(false);
      setUpiStatus('idle'); // Reset UPI status
      
      let methodText = 'Online Payment';
      if (method === 'cod') methodText = 'Cash on Delivery';
      if (method === 'upi') methodText = 'UPI';
      if (method === 'card') methodText = 'Card';

      alert(`Order Placed Successfully! Payment Method: ${methodText}`);

    } catch (error) {
      console.error("Order processing failed", error);
      alert("Something went wrong processing your order. Please try again.");
      setIsProcessing(false);
      setUpiStatus('idle');
    }
  };

  const handleUpiAppClick = (app: string) => {
    if (isProcessing) return;
    
    setSelectedUpiApp(app);
    setUpiStatus('redirecting');

    // Simulate redirection delay
    setTimeout(() => {
      setUpiStatus('processing');
      // Simulate Payment Processing time (e.g. user authorizing in GPay)
      setTimeout(() => {
        setUpiStatus('success');
        // Finalize order after success animation
        setTimeout(() => {
          processOrder('upi');
        }, 1000);
      }, 2500);
    }, 1500);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Drawer Panel */}
        <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-slideInRight">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShoppingBag className="text-primary" />
              Your Cart
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <ShoppingBag size={64} className="opacity-20" />
                <p className="text-lg">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-primary hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-slate-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-slate-800 line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-secondary transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500">₹{item.price.toFixed(2)} / {item.unit}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-emerald-50 text-slate-600 rounded-l-lg transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-emerald-50 text-slate-600 rounded-r-lg transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-semibold text-slate-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-2xl font-bold text-slate-800">₹{cartTotal.toFixed(2)}</span>
              </div>
              
              {isProcessing && !showPaymentModal ? (
                 <div className="w-full py-4 flex items-center justify-center gap-2 text-primary font-medium bg-emerald-50 rounded-xl">
                   <Loader className="animate-spin" /> Processing Order...
                 </div>
              ) : (
                <div className="grid gap-3">
                  <button 
                    onClick={() => initiatePayment('online')}
                    className="w-full bg-primary hover:bg-emerald-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CreditCard size={20} /> Pay Online / UPI
                  </button>
                  <button 
                    onClick={() => initiatePayment('cod')}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3.5 rounded-xl font-semibold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Truck size={20} /> Pay on Delivery
                  </button>
                </div>
              )}
              
              <button 
                onClick={clearCart}
                disabled={isProcessing}
                className="w-full mt-3 py-2 text-sm text-slate-400 hover:text-secondary transition-colors disabled:opacity-50"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Gateway Modal Simulation */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-slideUp flex flex-col max-h-[90vh]">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-primary" />
                <span className="font-semibold">Secure Payment</span>
              </div>
              {!isProcessing && (
                <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              )}
            </div>
            
            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
               <div>
                  <p className="text-xs text-slate-500">Amount to Pay</p>
                  <p className="text-2xl font-bold text-slate-800">₹{cartTotal.toFixed(2)}</p>
               </div>
               <div className="bg-white px-2 py-1 rounded border border-emerald-200 text-xs font-mono text-emerald-600">
                 ID: {Math.floor(Math.random()*1000000)}
               </div>
            </div>

            {/* If in simulated UPI redirection flow */}
            {upiStatus !== 'idle' ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                {upiStatus === 'redirecting' && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                       <Smartphone size={32} className="text-slate-400" />
                    </div>
                    <Loader className="animate-spin text-primary" size={32} />
                    <h3 className="font-bold text-slate-800">Opening {selectedUpiApp}...</h3>
                    <p className="text-sm text-slate-500">Redirecting to your payment app securely.</p>
                  </>
                )}
                {upiStatus === 'processing' && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-2 animate-pulse">
                       <Lock size={32} className="text-yellow-600" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-800">Waiting for Approval</h3>
                      <p className="text-sm text-slate-500">Please approve the payment of ₹{cartTotal.toFixed(2)} in {selectedUpiApp}.</p>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-4">
                      <div className="h-full bg-primary animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </>
                )}
                {upiStatus === 'success' && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2 animate-bounce">
                       <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-bold text-green-700">Payment Successful!</h3>
                    <p className="text-sm text-slate-500">Redirecting to order confirmation...</p>
                  </>
                )}
              </div>
            ) : (
              // Normal Payment Selection
              <>
                <div className="flex border-b border-slate-200 shrink-0">
                  <button 
                    onClick={() => setPaymentTab('upi')}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      paymentTab === 'upi' ? 'text-primary border-b-2 border-primary bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <Smartphone size={18} /> UPI / Apps
                  </button>
                  <button 
                    onClick={() => setPaymentTab('card')}
                    className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      paymentTab === 'card' ? 'text-primary border-b-2 border-primary bg-white' : 'text-slate-500 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <CardIcon size={18} /> Card
                  </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                  
                  {paymentTab === 'upi' && (
                    <div className="space-y-5">
                      {/* App Buttons */}
                      <div className="grid grid-cols-3 gap-3">
                          <button 
                            onClick={() => handleUpiAppClick('GPay')}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all active:scale-95 group"
                          >
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-lg font-bold text-slate-700 group-hover:scale-110 transition-transform">
                              <span className="text-blue-500">G</span>Pay
                            </div>
                            <span className="text-xs font-medium text-slate-600">Google Pay</span>
                          </button>

                          <button 
                            onClick={() => handleUpiAppClick('PhonePe')}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all active:scale-95 group"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center shadow-sm text-white font-bold text-xs group-hover:scale-110 transition-transform">
                              Pe
                            </div>
                            <span className="text-xs font-medium text-slate-600">PhonePe</span>
                          </button>

                          <button 
                            onClick={() => handleUpiAppClick('Paytm')}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all active:scale-95 group"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#00b9f1] flex items-center justify-center shadow-sm text-white font-bold text-[10px] group-hover:scale-110 transition-transform">
                              Paytm
                            </div>
                            <span className="text-xs font-medium text-slate-600">Paytm</span>
                          </button>
                      </div>

                      <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400">Or enter UPI ID</span>
                          </div>
                      </div>

                      {/* Manual UPI / QR */}
                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-500 uppercase">UPI ID / VPA</label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              type="text" 
                              placeholder="e.g. mobile@upi" 
                              value={upiId}
                              onChange={(e) => {
                                setUpiId(e.target.value);
                                setShowQr(false);
                              }}
                              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" 
                            />
                          </div>
                          
                          <button 
                            onClick={() => setShowQr(!showQr)}
                            className="text-[10px] text-primary hover:text-emerald-700 w-full text-right flex items-center justify-end gap-1 font-medium"
                          >
                            <QrCode size={12} /> {showQr ? 'Hide QR Code' : 'Generate QR Code'}
                          </button>

                          {showQr && (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center animate-fadeIn">
                              <div className="w-32 h-32 bg-slate-800 rounded-lg flex items-center justify-center text-white mb-2">
                                <QrCode size={64} />
                              </div>
                              <p className="text-xs text-slate-500 font-medium">Scan to Pay ₹{cartTotal.toFixed(2)}</p>
                              <p className="text-[10px] text-slate-400">Merchant: {merchantVpa}</p>
                            </div>
                          )}
                      </div>
                      
                      <button 
                        onClick={() => processOrder('upi')}
                        disabled={isProcessing || !upiId}
                        className="w-full mt-2 bg-primary hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? <Loader className="animate-spin" size={20} /> : `Verify & Pay ₹${cartTotal.toFixed(2)}`}
                      </button>
                    </div>
                  )}

                  {paymentTab === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Card Number</label>
                        <div className="relative">
                          <CardIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="space-y-1 flex-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase">CVV</label>
                          <input type="password" placeholder="123" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none" />
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => processOrder('card')}
                        disabled={isProcessing}
                        className="w-full mt-4 bg-primary hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                      >
                        {isProcessing ? <Loader className="animate-spin" size={20} /> : `Pay ₹${cartTotal.toFixed(2)}`}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <div className="bg-slate-50 p-3 text-center text-xs text-slate-400 border-t border-slate-100 shrink-0">
              <p>Processed securely via MockGateway</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
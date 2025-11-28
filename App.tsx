import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, LogIn, LayoutDashboard, Lock, LogOut, ChevronRight, ChevronLeft, Zap, Star, Loader } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIChef from './components/AIChef';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import ProductDetailsModal from './components/ProductDetailsModal';
import EditProductModal from './components/EditProductModal';
import { Category, Product } from './types';

// Types for View State
type ViewState = 'home' | 'profile' | 'admin';

interface NavbarProps {
  onAuthClick: () => void;
  onAdminAuthClick: () => void;
  onViewChange: (view: ViewState) => void;
  currentView: ViewState;
}

// Navbar Component
const Navbar: React.FC<NavbarProps> = ({ onAuthClick, onAdminAuthClick, onViewChange, currentView }) => {
  const { setIsCartOpen, itemCount } = useCart();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-yellow-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
              K
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 hidden sm:block group-hover:text-primary transition-colors">
              KASHMIR<span className="text-primary">FRESH</span>
            </span>
          </div>

          {/* Search Bar - Hidden on mobile, shown on md+ */}
          {currentView === 'home' && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-emerald-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search groceries..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-emerald-100 rounded-full leading-5 bg-emerald-50/50 text-slate-900 placeholder-emerald-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all sm:text-sm shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Direct Dashboard Link for Admins */}
            {user && (user.role === 'admin' || user.role === 'sub-admin') && (
               <button
                 onClick={() => onViewChange('admin')}
                 className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                   currentView === 'admin' 
                     ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                     : 'bg-white text-slate-700 border border-slate-200 hover:border-primary hover:text-primary'
                 }`}
               >
                 <LayoutDashboard size={18} />
                 <span className="hidden sm:inline">Dashboard</span>
               </button>
            )}

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-emerald-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-emerald-100"
                >
                  <div className="w-9 h-9 bg-pink-100 text-secondary rounded-full flex items-center justify-center text-sm font-bold shadow-sm border border-pink-200">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[100px] truncate">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-emerald-100 z-20 overflow-hidden py-1 animate-slideUp">
                      <button 
                        onClick={() => { onViewChange('profile'); setShowUserMenu(false); }}
                        className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                      >
                        <User size={16} className="text-emerald-500" /> Profile
                      </button>
                      {(user.role === 'admin' || user.role === 'sub-admin') && (
                        <button 
                          onClick={() => { onViewChange('admin'); setShowUserMenu(false); }}
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-3 transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-emerald-500" /> Dashboard
                        </button>
                      )}
                      
                      {/* Allow regular users to switch to admin easily */}
                      {user.role === 'user' && (
                        <button 
                          onClick={() => { 
                            logout(); 
                            setShowUserMenu(false); 
                            onAdminAuthClick(); 
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 flex items-center gap-3 border-t border-slate-50 transition-colors"
                        >
                          <Lock size={16} className="text-emerald-500" /> Switch to Admin
                        </button>
                      )}
                      <button 
                        onClick={() => { 
                          logout(); 
                          setShowUserMenu(false); 
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-pink-600 hover:bg-pink-50 flex items-center gap-3 border-t border-slate-50 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Dedicated Admin Login Button */}
                <button 
                  onClick={onAdminAuthClick} 
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-primary hover:bg-emerald-50 rounded-lg transition-colors"
                  title="Admin Access"
                >
                  <Lock size={16} />
                  <span>Admin</span>
                </button>

                {/* Prominent User Login Button */}
                <button 
                  onClick={onAuthClick} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-emerald-700 text-white text-sm font-bold rounded-full shadow-lg shadow-emerald-200 transition-all transform active:scale-95"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              </div>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-emerald-50 rounded-full text-emerald-700 hover:text-white hover:bg-primary transition-all duration-300 group"
            >
              <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary rounded-full animate-bounce shadow-sm ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Running Offer Bar Component
const RunningOfferBar = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white py-2 overflow-hidden relative z-30 border-b border-emerald-800">
      <div className="animate-infinite-scroll flex gap-8 whitespace-nowrap w-max">
        {[...Array(4)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              FLASH SALE: FLAT 20% OFF ON KASHMIRI WALNUTS
            </span>
            <span className="text-emerald-700">|</span>
            <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
              <ShoppingBag size={14} className="text-pink-400" />
              FREE DELIVERY ON ORDERS ABOVE ₹999
            </span>
            <span className="text-emerald-700">|</span>
             <span className="flex items-center gap-2 text-xs md:text-sm font-medium tracking-wide">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              NEW ARRIVALS: FRESH SAFFRON & HONEY
            </span>
            <span className="text-emerald-700">|</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Hero Carousel Component
const slides = [
  {
    image: "https://images.unsplash.com/photo-1632556275816-092576c96849?q=80&w=1920&auto=format&fit=crop",
    title: "Fresh Kashmiri Apples",
    subtitle: "Juicy, crisp, and hand-picked from the orchards of Sopore.",
    color: "from-red-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1516629272373-c1c4f4544525?q=80&w=1920&auto=format&fit=crop",
    title: "Pure Pampore Saffron",
    subtitle: "The world's finest saffron (Kesar), bringing golden warmth to your dishes.",
    color: "from-purple-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1563595471467-3342372f9c99?q=80&w=1920&auto=format&fit=crop",
    title: "Premium Kagzi Walnuts",
    subtitle: "Rich, buttery, and packed with health benefits. Sourced locally.",
    color: "from-amber-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1920&auto=format&fit=crop",
    title: "Aromatic Basmati Rice",
    subtitle: "Long-grain aromatic rice, perfect for your Wazwan feasts.",
    color: "from-emerald-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1920&auto=format&fit=crop",
    title: "Authentic Kashmiri Spices",
    subtitle: "Fiery Kashmiri Chilies and aromatic spices to elevate your cooking.",
    color: "from-red-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1576092768241-dec231847233?q=80&w=1920&auto=format&fit=crop",
    title: "Traditional Kahwa Tea",
    subtitle: "A soul-warming blend of green tea, saffron, cinnamon, and cardamom.",
    color: "from-yellow-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d61?q=80&w=1920&auto=format&fit=crop",
    title: "Kashmiri Almonds (Mamra)",
    subtitle: "Sweet, oil-rich almonds directly from the valley.",
    color: "from-orange-900/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1920&auto=format&fit=crop",
    title: "Pure Himalayan Honey",
    subtitle: "Raw and unprocessed honey from the high-altitude flora of Kashmir.",
    color: "from-yellow-800/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1567375698509-4622738ed69d?q=80&w=1920&auto=format&fit=crop",
    title: "Bhaderwah Rajma",
    subtitle: "Famous Kashmiri kidney beans known for their unique flavor and texture.",
    color: "from-red-800/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1628840045765-f97576f30ec7?q=80&w=1920&auto=format&fit=crop",
    title: "Fresh Nadru (Lotus Root)",
    subtitle: "Crunchy and delicious lotus roots harvested from the Dal Lake.",
    color: "from-emerald-800/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=1920&auto=format&fit=crop",
    title: "Dried Apricots & Figs",
    subtitle: "Naturally dried fruits packed with energy and nutrition.",
    color: "from-orange-800/80 to-slate-900/40"
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop",
    title: "The Taste of Wazwan",
    subtitle: "Get all the authentic ingredients to cook a royal feast at home.",
    color: "from-slate-900/80 to-slate-800/40"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleShopNow = () => {
    const shopSection = document.getElementById('shop-categories');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[400px] md:h-[500px] bg-slate-900 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover opacity-100"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-start p-4 md:p-16">
            <div className={`max-w-3xl transform transition-all duration-700 ${
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold tracking-wider mb-4 animate-fadeIn">
                AUTHENTIC KASHMIRI GROCERIES
              </span>
              <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-100 mb-8 font-light drop-shadow-md max-w-2xl">
                {slide.subtitle}
              </p>
              <button 
                onClick={handleShopNow}
                className="bg-primary hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-emerald-900/30 active:scale-95 flex items-center gap-2"
              >
                Shop Now <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-primary' : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
      
      {/* Arrows */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors hidden md:block"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// Home View Component
const HomeView = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { user } = useAuth();
  
  // Edit logic state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20">
        <RunningOfferBar />
        <HeroCarousel />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Categories */}
          <div id="shop-categories" className="mb-12 scroll-mt-28">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-bold text-slate-800">Shop by Category</h2>
               <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex flex-col items-center min-w-[100px] gap-3 p-4 rounded-2xl transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-white border-primary shadow-lg shadow-emerald-100 transform scale-105'
                      : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-sm ${
                     selectedCategory === category ? 'bg-emerald-100 text-primary' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {category === 'All' && '🛍️'}
                    {category === Category.PRODUCE && '🍎'}
                    {category === Category.DAIRY && '🥛'}
                    {category === Category.BAKERY && '🥖'}
                    {category === Category.MEAT && '🍗'}
                    {category === Category.PANTRY && '🍝'}
                    {category === Category.BEVERAGES && '🧃'}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category ? 'text-primary' : 'text-slate-600'
                  }`}>
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div>
             <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedCategory === 'All' ? 'Popular Products' : selectedCategory}
                </h2>
                <span className="text-sm text-slate-500 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">
                  {filteredProducts.length} items
                </span>
             </div>
             
             {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
             ) : (
               <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                 <div className="text-6xl mb-4">🥕</div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">No products found</h3>
                 <p className="text-slate-500">Try selecting a different category.</p>
               </div>
             )}
          </div>
        </main>

        <AIChef />
      </div>

      <ProductDetailsModal 
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onEdit={handleEditProduct}
      />
      
      <EditProductModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={productToEdit}
      />
    </>
  );
};

// Main App Component
const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialData, setAuthInitialData] = useState<{contact?: string, password?: string} | undefined>(undefined);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const { user, isLoading } = useAuth();

  const handleAuthClick = () => {
    setAuthInitialData(undefined); // Clear any presets
    setIsAuthModalOpen(true);
  };
  
  const handleAdminAuthClick = () => {
    setAuthInitialData({ contact: 'admin@freshmarket.com', password: 'admin' });
    setIsAuthModalOpen(true);
  };

  const handleViewChange = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader className="animate-spin text-primary mx-auto mb-4" size={48} />
          <h2 className="text-lg font-semibold text-slate-700">Loading KASHMIRFRESH...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar 
        onAuthClick={handleAuthClick} 
        onAdminAuthClick={handleAdminAuthClick}
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'profile' && user && <UserProfile />}
      {currentView === 'admin' && (user?.role === 'admin' || user?.role === 'sub-admin') && <AdminDashboard />}
      {currentView === 'admin' && (!user || (user.role !== 'admin' && user.role !== 'sub-admin')) && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center p-4">
          <Lock size={48} className="text-slate-300 mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-500 mb-6">You need administrator privileges to view this page.</p>
          <button onClick={() => setCurrentView('home')} className="text-primary font-medium hover:underline">
            Go back home
          </button>
        </div>
      )}

      <CartDrawer onLoginRequest={handleAuthClick} />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialData={authInitialData}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
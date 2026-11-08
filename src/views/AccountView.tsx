import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  User,
  Package,
  Heart,
  Crown,
  Truck,
  Edit2,
  Check,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    orders,
    wishlist,
    navigateTo,
    formatPKR,
    addToCart,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'vip'>('orders');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit profile form state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [city, setCity] = useState(userProfile.city);
  const [address, setAddress] = useState(userProfile.address);
  const [province, setProvince] = useState(userProfile.province);

  React.useEffect(() => {
    setName(userProfile.name);
    setEmail(userProfile.email);
    setPhone(userProfile.phone);
    setCity(userProfile.city);
    setAddress(userProfile.address);
    setProvince(userProfile.province);
  }, [userProfile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      city,
      address,
      province
    });
    setIsEditingProfile(false);
  };

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Account Header Hero */}
      <div className="bg-[#171513] text-[#F6F2EC] p-6 sm:p-10 border border-[#B69A70]/30 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#641D32] flex items-center justify-center font-serif text-2xl font-bold text-white border-2 border-[#B69A70]">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide">
                {userProfile.name}
              </h1>
              <span className="text-xs bg-[#B69A70] text-[#171513] font-bold px-2 py-0.5 uppercase tracking-wider">
                {userProfile.memberTier}
              </span>
            </div>
            <p className="text-xs text-[#EEE5DF]/70 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>{userProfile.city}, Pakistan</span>
              <span className="text-[#B69A70]/40">·</span>
              <span>{userProfile.points} Atelier Couture Points</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              showToast('Logged out of demo session.', 'info');
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs text-[#EEE5DF] hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Account</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation (Zero-pill, clean segmented buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#171513]/10 text-xs">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#641D32] text-[#641D32] bg-white'
              : 'border-transparent text-[#171513]/70 hover:text-[#171513]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`px-5 py-3 font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'wishlist'
              ? 'border-[#641D32] text-[#641D32] bg-white'
              : 'border-transparent text-[#171513]/70 hover:text-[#171513]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Heirlooms ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-3 font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#641D32] text-[#641D32] bg-white'
              : 'border-transparent text-[#171513]/70 hover:text-[#171513]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('vip')}
          className={`px-5 py-3 font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
            activeTab === 'vip'
              ? 'border-[#641D32] text-[#641D32] bg-white'
              : 'border-transparent text-[#171513]/70 hover:text-[#171513]'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>VIP Couture Privilège</span>
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#171513]/10 space-y-3">
              <Package className="w-10 h-10 mx-auto text-[#B69A70]" />
              <h3 className="font-serif text-xl text-[#171513]">No orders placed yet</h3>
              <p className="text-xs text-[#171513]/60">
                Browse our festive collections and place your first order with Cash on Delivery.
              </p>
              <button
                onClick={() => navigateTo('collection')}
                className="px-6 py-2.5 bg-[#171513] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white border border-[#171513]/10 shadow-sm p-6 space-y-4"
              >
                {/* Order Top Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#171513]/10 gap-3">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-[#171513]/50 uppercase tracking-wider block">
                        Order Placed
                      </span>
                      <span className="text-xs font-semibold text-[#171513]">{ord.date}</span>
                    </div>
                    <div className="border-l border-[#171513]/10 pl-4">
                      <span className="text-[10px] text-[#171513]/50 uppercase tracking-wider block">
                        Order Number
                      </span>
                      <span className="font-mono text-sm font-bold text-[#641D32]">
                        {ord.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        ord.status === 'Delivered'
                          ? 'bg-[#1E3A2F]/10 text-[#1E3A2F]'
                          : ord.status === 'Out for Delivery'
                          ? 'bg-[#641D32]/10 text-[#641D32]'
                          : 'bg-[#B69A70]/20 text-[#171513]'
                      }`}
                    >
                      {ord.status}
                    </span>

                    <button
                      onClick={() => navigateTo('tracking')}
                      className="px-4 py-1.5 bg-[#171513] text-white hover:bg-[#641D32] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#B69A70]" />
                      <span>Track</span>
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs">
                      <img
                        src={item.image}
                        alt=""
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('/src/assets/images/')) {
                            target.src = target.src.replace('/src/assets/images/', '/images/');
                          }
                        }}
                        className="w-14 h-16 object-cover object-top bg-[#EEE5DF] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-semibold text-[#171513] truncate">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-[#171513]/60 block">
                          Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                          {item.isStitched && ' (Custom Stitched)'}
                        </span>
                      </div>
                      <span className="font-mono font-semibold text-sm text-[#171513]">
                        {formatPKR((item.price + (item.isStitched ? item.stitchingPrice || 0 : 0)) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="pt-3 border-t border-[#171513]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#171513]/70 gap-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#B69A70]" />
                    <span>Courier: {ord.courier} (Tracking: <strong className="font-mono text-[#171513]">{ord.trackingNumber}</strong>)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span>Total Payment:</span>
                    <span className="font-mono text-base font-bold text-[#641D32]">
                      {formatPKR(ord.total)}
                    </span>
                    <span className="text-[10px] text-[#1E3A2F] font-semibold">
                      ({ord.paymentMethod})
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#171513]/10 space-y-3">
              <Heart className="w-10 h-10 mx-auto text-[#B69A70]" />
              <h3 className="font-serif text-xl text-[#171513]">Your wishlist is currently empty</h3>
              <p className="text-xs text-[#171513]/60">
                Click the heart on any luxury piece to save it for your next wedding or festive event.
              </p>
              <button
                onClick={() => navigateTo('collection')}
                className="px-6 py-2.5 bg-[#171513] text-white text-xs uppercase tracking-wider font-semibold"
              >
                Explore Heirlooms
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROFILE & ADDRESSES */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 sm:p-8 border border-[#171513]/10 max-w-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#171513]/10 mb-6">
            <h3 className="font-serif text-xl font-semibold text-[#171513]">
              Default Delivery Profile in Pakistan
            </h3>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-xs text-[#641D32] hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="text-[#171513] font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#171513] font-medium block mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                  />
                </div>
                <div>
                  <label className="text-[#171513] font-medium block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#171513] font-medium block mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-[#171513]/20 p-2.5 bg-white"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[#171513] font-medium block mb-1">Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full border border-[#171513]/20 p-2.5 bg-white"
                  >
                    {PAKISTAN_PROVINCES.map((pr) => (
                      <option key={pr} value={pr}>
                        {pr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#171513] font-medium block mb-1">Street Address</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-[#171513]/20 p-2.5 focus:outline-none focus:border-[#641D32]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#641D32]"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-5 py-2.5 bg-white border border-[#171513]/20 text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#F6F2EC] space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#171513]">
                  <User className="w-4 h-4 text-[#B69A70]" />
                  <span>{userProfile.name}</span>
                </div>
                <div className="flex items-center gap-2 text-[#171513]/70">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#171513]/70">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-start gap-2 text-[#171513]/80 pt-1 border-t border-[#171513]/10">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#641D32]" />
                  <span>
                    {userProfile.address}, {userProfile.city}, {userProfile.province}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#1E3A2F]/30 text-[#1E3A2F] flex items-center gap-2 text-[11px]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Cash on Delivery patron address on file.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VIP COUTURE CLUB */}
      {activeTab === 'vip' && (
        <div className="bg-white p-6 sm:p-10 border border-[#B69A70]/40 max-w-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#641D32] text-white">
              <Crown className="w-6 h-6 text-[#B69A70]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block">
                Privilege Status
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#171513]">
                Gold Couture Circle Member
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#171513]/80 leading-relaxed">
            As a recognized patron of VEYORA, your account unlocks bespoke tailoring privileges, priority courier dispatch via TCS across Pakistan, and invitations to intimate runway previews.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#F6F2EC] border border-[#171513]/5 space-y-1">
              <span className="font-semibold text-[#641D32] block">Complimentary Priority Shipping</span>
              <p className="text-[#171513]/70 text-[11px]">
                Zero delivery fee on all orders regardless of cart value across Pakistan.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EC] border border-[#171513]/5 space-y-1">
              <span className="font-semibold text-[#641D32] block">48-Hour Early Access</span>
              <p className="text-[#171513]/70 text-[11px]">
                Shop festive drops and bridal releases before public launch.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EC] border border-[#171513]/5 space-y-1">
              <span className="font-semibold text-[#641D32] block">Direct Atelier Stylist</span>
              <p className="text-[#171513]/70 text-[11px]">
                One-on-one video styling with our Lahore head designer.
              </p>
            </div>

            <div className="p-4 bg-[#F6F2EC] border border-[#171513]/5 space-y-1">
              <span className="font-semibold text-[#641D32] block">Bespoke Fit Adjustments</span>
              <p className="text-[#171513]/70 text-[11px]">
                Free collar, hemline or sleeve customization on luxury pret.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#171513]/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-[#171513]/70 block">Points Balance:</span>
              <span className="font-serif text-2xl font-bold text-[#641D32]">{userProfile.points} Pts</span>
            </div>
            <button
              onClick={() => navigateTo('rewards')}
              className="px-6 py-2.5 bg-[#B69A70] hover:bg-[#A3855B] text-[#171513] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Open Full Rewards Club Dashboard →
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

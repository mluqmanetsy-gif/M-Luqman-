import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENTS } from '../data/departments';
import { DepartmentId } from '../types';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  Truck,
  BookOpen,
  Crown
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    setIsStylistOpen,
    setIsCopilotOpen,
    userProfile
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [departmentsDropdownOpen, setDepartmentsDropdownOpen] = useState(false);
  const [mobileClothingExpanded, setMobileClothingExpanded] = useState(false);

  const clothingDept = DEPARTMENTS.find((d) => d.id === 'clothing') || DEPARTMENTS[0];
  const otherDepartments = DEPARTMENTS.filter((d) => d.id !== 'clothing');

  const handleSelectDepartment = (deptId: DepartmentId) => {
    navigateTo('collection', { department: deptId, category: 'All' });
    setDepartmentsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSelectCategory = (deptId: DepartmentId, subcategory: string) => {
    navigateTo('collection', { department: deptId, category: subcategory });
    setDepartmentsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#171513] text-[#F6F2EC] text-xs py-2 px-4 border-b border-[#B69A70]/30 tracking-widest uppercase">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#B69A70]">
            <Truck className="w-3.5 h-3.5" />
            <span>Cash on Delivery (COD) Available Nationwide Across Pakistan</span>
          </div>

          <div className="mx-auto md:mx-0 text-center font-medium text-[11px]">
            <span>Complimentary Express Delivery on Orders Above PKR 5,000</span>
            <span className="hidden sm:inline mx-2 text-[#B69A70]">·</span>
            <span className="hidden sm:inline text-[#EEE5DF]">TCS & Leopard Delivery in 2–4 Days</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px]">
            <button
              onClick={() => navigateTo('tracking')}
              className="text-[#EEE5DF] hover:text-[#B69A70] transition-colors"
            >
              Track Order
            </button>
            <span className="text-[#B69A70]/40">·</span>
            <a
              href="https://wa.me/923494968548"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#EEE5DF] hover:text-[#B69A70] transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#B69A70]" />
              <span>WhatsApp: 03494968548</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#F6F2EC]/95 backdrop-blur-md border-b border-[#171513]/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#171513] hover:text-[#641D32] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => navigateTo('home')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] font-medium text-[#171513] group-hover:text-[#641D32] transition-colors">
                VEYORA
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#B69A70] font-sans -mt-1 font-semibold">
                Fashion • Style • You
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links & Advanced Mega Menu (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide text-[#171513]">
            
            {/* Departments Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDepartmentsDropdownOpen(true)}
              onMouseLeave={() => setDepartmentsDropdownOpen(false)}
            >
              <button
                onClick={() => navigateTo('collection', { department: 'all' })}
                className="flex items-center gap-1.5 py-2 hover:text-[#641D32] transition-colors whitespace-nowrap shrink-0 group"
              >
                <span>Departments</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#B69A70] group-hover:rotate-180 transition-transform" />
              </button>

              {/* Advanced Mega Dropdown Panel */}
              {departmentsDropdownOpen && (
                <div className="absolute top-full left-0 w-[840px] bg-white border border-[#171513]/10 shadow-2xl p-6 rounded-none z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#171513]/10">
                    <span className="font-serif text-lg text-[#171513] italic font-medium">
                      All Women's Departments & Wardrobe Universes
                    </span>
                    <button
                      onClick={() => {
                        navigateTo('collection', { department: 'all' });
                        setDepartmentsDropdownOpen(false);
                      }}
                      className="text-xs uppercase tracking-wider text-[#B69A70] hover:text-[#641D32] font-semibold"
                    >
                      View Full Catalog →
                    </button>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    {/* Col 1 (5 cols): Women's Clothing Subcategories */}
                    <div className="col-span-5 border-r border-[#171513]/10 pr-4">
                      <button
                        onClick={() => handleSelectDepartment('clothing')}
                        className="text-xs uppercase tracking-wider font-semibold text-[#641D32] hover:text-[#171513] block mb-2"
                      >
                        Women's Clothing Subcategories:
                      </button>
                      <div className="grid grid-cols-2 gap-1.5 text-xs">
                        {clothingDept.subcategories.filter((s) => !s.startsWith('All')).map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleSelectCategory('clothing', sub)}
                            className="text-left py-1 px-1.5 hover:bg-[#F6F2EC] hover:text-[#641D32] text-[#171513]/85 rounded-xs transition-colors truncate"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 2 (4 cols): Other 10 Approved Departments */}
                    <div className="col-span-4 border-r border-[#171513]/10 pr-4">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#B69A70] block mb-2">
                        Other Departments:
                      </span>
                      <div className="space-y-1 text-xs">
                        {otherDepartments.map((dept) => (
                          <button
                            key={dept.id}
                            onClick={() => handleSelectDepartment(dept.id)}
                            className="w-full text-left py-1 px-1.5 hover:bg-[#F6F2EC] hover:text-[#641D32] text-[#171513]/85 rounded-xs transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{dept.name}</span>
                            <span className="text-[10px] text-[#B69A70]">→</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 3 (3 cols): Featured Heirloom Teaser */}
                    <div className="col-span-3 flex flex-col justify-between bg-[#F6F2EC] p-3 border border-[#171513]/5">
                      <div>
                        <div className="aspect-[4/5] overflow-hidden bg-[#EEE5DF] mb-2">
                          <img
                            src="/src/assets/images/hero_luxury_couture_1794123004357.jpg"
                            alt="Festive Heirlooms"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B69A70] font-semibold block">
                          Festive '26
                        </span>
                        <h4 className="font-serif text-xs font-semibold text-[#171513] line-clamp-1">
                          Zehra Raw Silk Kurta Set
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          navigateTo('product', { productId: 'veyora-cl-01' });
                          setDepartmentsDropdownOpen(false);
                        }}
                        className="mt-2 text-[10px] uppercase font-semibold text-[#641D32] hover:underline"
                      >
                        Explore Piece →
                      </button>
                    </div>

                  </div>

                  <div className="mt-4 pt-3 border-t border-[#171513]/10 flex items-center justify-between text-xs text-[#171513]/70">
                    <span>Authentic slow-crafted luxury from master Karachi karigars</span>
                    <span className="text-[#641D32] font-medium">Nationwide Free Doorstep Exchange</span>
                  </div>
                </div>
              )}
            </div>

            {/* New Arrivals */}
            <button
              onClick={() => navigateTo('collection', { department: 'all', category: 'All' })}
              className={`hover:text-[#641D32] transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'collection' ? 'text-[#641D32] font-semibold' : ''
              }`}
            >
              New Arrivals
            </button>

            {/* Bestsellers */}
            <button
              onClick={() => navigateTo('collection', { department: 'clothing', category: 'Eastern Wear' })}
              className="hover:text-[#641D32] transition-colors whitespace-nowrap shrink-0"
            >
              Bestsellers
            </button>

            {/* VEYORA Style Journal */}
            <button
              onClick={() => navigateTo('journal')}
              className={`flex items-center gap-1.5 hover:text-[#641D32] transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'journal' ? 'text-[#641D32] font-semibold' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Style Journal</span>
            </button>

            {/* Rewards Club */}
            <button
              onClick={() => navigateTo('rewards')}
              className={`flex items-center gap-1.5 hover:text-[#641D32] transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'rewards' ? 'text-[#641D32] font-semibold' : ''
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Rewards Club</span>
            </button>

            {/* Fashion Copilot */}
            <button
              onClick={() => setIsCopilotOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#641D32]/10 text-[#641D32] hover:bg-[#641D32] hover:text-white transition-all text-xs uppercase tracking-wider font-semibold border border-[#641D32]/30"
              title="Open AI Luxury Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B69A70]" />
              <span>Fashion Copilot</span>
            </button>

          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#171513] hover:text-[#641D32] transition-colors"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('account')}
              className="relative p-2 text-[#171513] hover:text-[#641D32] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#641D32] text-white text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => navigateTo('account')}
              className="hidden sm:flex items-center gap-2 p-2 text-[#171513] hover:text-[#641D32] transition-colors group"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-medium tracking-tight text-[#171513]/80 group-hover:text-[#641D32]">
                {userProfile.name.split(' ')[0]}
              </span>
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#171513] text-[#F6F2EC] hover:bg-[#641D32] transition-colors"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#B69A70]" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                Bag
              </span>
              <span className="text-xs bg-[#B69A70] text-[#171513] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Expandable Navigation) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#171513]/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide Drawer */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#F6F2EC] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#171513]/10">
                <div>
                  <span className="font-serif text-2xl tracking-widest font-medium text-[#171513]">
                    VEYORA
                  </span>
                  <span className="block text-[9px] tracking-widest uppercase text-[#B69A70]">
                    Fashion • Style • You
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#171513] hover:text-[#641D32]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => {
                    setIsCopilotOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 bg-[#641D32] text-white text-xs font-medium uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B69A70]" />
                    Fashion Copilot
                  </span>
                  <span>→</span>
                </button>
              </div>

              {/* Expandable Clothing Accordion */}
              <div className="mt-5 border border-[#171513]/10 bg-white">
                <button
                  onClick={() => setMobileClothingExpanded(!mobileClothingExpanded)}
                  className="w-full p-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#171513]"
                >
                  <span>Women's Clothing Subcategories</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B69A70] transition-transform ${
                      mobileClothingExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileClothingExpanded && (
                  <div className="p-3 pt-0 border-t border-[#171513]/10 grid grid-cols-2 gap-1.5 text-xs">
                    {clothingDept.subcategories.filter((s) => !s.startsWith('All')).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSelectCategory('clothing', sub)}
                        className="text-left py-1.5 px-2 hover:bg-[#F6F2EC] text-[#171513]/80 rounded-xs"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* All Other 10 Departments */}
              <div className="mt-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B69A70]">
                  All Departments
                </span>
                <div className="mt-2 space-y-1">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => handleSelectDepartment(dept.id)}
                      className="w-full text-left py-2 px-3 hover:bg-white text-xs text-[#171513] font-medium flex items-center justify-between transition-colors"
                    >
                      <span>{dept.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#B69A70]" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Features */}
              <div className="mt-6 pt-6 border-t border-[#171513]/10 space-y-2 text-xs text-[#171513]">
                <button
                  onClick={() => {
                    navigateTo('journal');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-[#641D32] flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#B69A70]" />
                  <span>VEYORA Style Journal</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('rewards');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-[#641D32] flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 text-[#B69A70]" />
                  <span>Rewards Club & VIP Pass</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('account');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-[#641D32] flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#B69A70]" />
                  <span>Customer Account & Orders</span>
                </button>

                <button
                  onClick={() => {
                    navigateTo('tracking');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 hover:text-[#641D32] flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#B69A70]" />
                  <span>Track Order (Pakistan)</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#171513]/10 text-[11px] text-[#171513]/60">
              <p>Karachi Atelier · Cash on Delivery Nationwide</p>
              <a
                href="https://wa.me/923494968548"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[#641D32] font-semibold block hover:underline"
              >
                WhatsApp: 03494968548
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

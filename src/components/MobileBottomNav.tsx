import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENTS } from '../data/departments';
import { Home, Grid, Search, Heart, User, X, ChevronRight } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, navigateTo, wishlist, setIsSearchOpen } = useShop();
  const [categoriesDrawerOpen, setCategoriesDrawerOpen] = useState(false);

  const handleCategoriesClick = () => {
    setCategoriesDrawerOpen(true);
  };

  const handleSelectDepartment = (deptId: string) => {
    setCategoriesDrawerOpen(false);
    navigateTo('collection', { department: deptId as any });
  };

  return (
    <>
      {/* Sticky Bottom Navigation Bar (Mobile only, md:hidden) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 bg-[#171513]/95 backdrop-blur-md border-t border-[#B69A70]/20 md:hidden px-2 py-1 flex items-center justify-around h-16 shadow-2xl safe-area-pb"
      >
        {/* 1. Home */}
        <button
          onClick={() => {
            setCategoriesDrawerOpen(false);
            navigateTo('home');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 transition-colors ${
            currentView === 'home' && !categoriesDrawerOpen
              ? 'text-[#B69A70]'
              : 'text-[#EEE5DF]/70 hover:text-[#EEE5DF]'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Home</span>
        </button>

        {/* 2. Categories */}
        <button
          onClick={handleCategoriesClick}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 transition-colors ${
            categoriesDrawerOpen || currentView === 'collection'
              ? 'text-[#B69A70]'
              : 'text-[#EEE5DF]/70 hover:text-[#EEE5DF]'
          }`}
          aria-label="Categories"
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Categories</span>
        </button>

        {/* 3. Search */}
        <button
          onClick={() => {
            setCategoriesDrawerOpen(false);
            setIsSearchOpen(true);
          }}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 text-[#EEE5DF]/70 hover:text-[#B69A70] transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Search</span>
        </button>

        {/* 4. Wishlist */}
        <button
          onClick={() => {
            setCategoriesDrawerOpen(false);
            navigateTo('account');
          }}
          className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 transition-colors ${
            currentView === 'account'
              ? 'text-[#B69A70]'
              : 'text-[#EEE5DF]/70 hover:text-[#EEE5DF]'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5 mb-0.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#641D32] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase font-medium">Wishlist</span>
        </button>

        {/* 5. Account */}
        <button
          onClick={() => {
            setCategoriesDrawerOpen(false);
            navigateTo('account');
          }}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-1 py-1 transition-colors ${
            currentView === 'account'
              ? 'text-[#B69A70]'
              : 'text-[#EEE5DF]/70 hover:text-[#EEE5DF]'
          }`}
          aria-label="Account"
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Account</span>
        </button>
      </nav>

      {/* Categories Slide-up Sheet for Mobile */}
      {categoriesDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setCategoriesDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative z-10 bg-[#171513] text-[#F6F2EC] rounded-t-2xl max-h-[82vh] overflow-y-auto border-t border-[#B69A70]/30 shadow-2xl p-5 pb-20">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A70] font-semibold block">
                  VEYORA Catalog
                </span>
                <h3 className="font-serif text-xl text-white font-medium">
                  All 11 Women's Departments
                </h3>
              </div>
              <button
                onClick={() => setCategoriesDrawerOpen(false)}
                className="p-2 text-[#EEE5DF]/70 hover:text-white"
                aria-label="Close categories"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <button
                onClick={() => handleSelectDepartment('all')}
                className="w-full text-left p-3 hover:bg-white/5 border border-transparent hover:border-[#B69A70]/30 flex items-center justify-between text-sm font-medium transition-colors"
              >
                <span className="text-[#B69A70]">✨ View All Products</span>
                <ChevronRight className="w-4 h-4 text-[#B69A70]" />
              </button>

              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => handleSelectDepartment(dept.id)}
                  className="w-full text-left p-3 hover:bg-white/5 border border-transparent hover:border-[#B69A70]/30 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dept.featuredImage}
                      alt={dept.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover object-center rounded-xs border border-white/10"
                    />
                    <div>
                      <h4 className="text-sm font-serif text-white group-hover:text-[#B69A70] transition-colors">
                        {dept.name}
                      </h4>
                      <p className="text-[10px] text-[#EEE5DF]/50 line-clamp-1">
                        {dept.tagline.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#EEE5DF]/40 group-hover:text-[#B69A70] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-around text-xs text-[#EEE5DF]/70">
              <button
                onClick={() => {
                  setCategoriesDrawerOpen(false);
                  navigateTo('journal');
                }}
                className="hover:text-[#B69A70] underline underline-offset-4"
              >
                Style Journal
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setCategoriesDrawerOpen(false);
                  navigateTo('rewards');
                }}
                className="hover:text-[#B69A70] underline underline-offset-4"
              >
                Rewards Club
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setCategoriesDrawerOpen(false);
                  navigateTo('tracking');
                }}
                className="hover:text-[#B69A70] underline underline-offset-4"
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

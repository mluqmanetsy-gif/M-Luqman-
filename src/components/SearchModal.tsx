import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { DEPARTMENTS } from '../data/departments';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPKR } = useShop();
  const [query, setQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');

  const popularSearches = [
    'Raw Silk Pret',
    'Velvet Gharara',
    'Polki Choker',
    'Zardozi Khussa',
    'Pashmina Shawl',
    'Co-ord Sets',
    'Abaya',
    'Bridal Potli'
  ];

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && selectedDeptFilter === 'all') return [];

    return PRODUCTS.filter((p) => {
      const matchesDept = selectedDeptFilter === 'all' || p.department === selectedDeptFilter;
      if (!matchesDept) return false;
      if (!q) return true;

      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [query, selectedDeptFilter]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Search Container */}
      <div className="relative bg-[#F6F2EC] w-full max-h-[85vh] shadow-2xl border-b border-[#B69A70]/30 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          
          {/* Top Bar with Input & Close */}
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#171513]/10">
            <div className="relative flex-1 flex items-center">
              <Search className="w-6 h-6 text-[#B69A70] absolute left-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search luxury pret, velvet formals, polki jewellery, khussas..."
                className="w-full bg-transparent pl-10 pr-4 py-2 font-serif text-xl sm:text-2xl text-[#171513] placeholder-[#171513]/40 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs text-[#171513]/40 hover:text-[#641D32] uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-[#171513] hover:text-[#641D32] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Department Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-[#171513]/5 text-xs">
            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1.5 whitespace-nowrap transition-colors ${
                selectedDeptFilter === 'all'
                  ? 'bg-[#171513] text-[#F6F2EC]'
                  : 'bg-white text-[#171513] hover:bg-[#EEE5DF]'
              }`}
            >
              All Departments
            </button>
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptFilter(dept.id)}
                className={`px-3 py-1.5 whitespace-nowrap transition-colors ${
                  selectedDeptFilter === dept.id
                    ? 'bg-[#171513] text-[#F6F2EC]'
                    : 'bg-white text-[#171513] hover:bg-[#EEE5DF]'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Quick Trending Searches */}
          {!query && selectedDeptFilter === 'all' && (
            <div className="pt-6">
              <h4 className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold mb-3">
                Trending Searches in Pakistan
              </h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white border border-[#171513]/10 hover:border-[#641D32] text-xs text-[#171513] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {(query || selectedDeptFilter !== 'all') && (
            <div className="pt-6">
              <div className="flex items-center justify-between text-xs text-[#171513]/60 mb-4">
                <span>
                  Found <strong className="text-[#171513]">{searchResults.length}</strong> creations
                </span>
                {query && <span>Searching for "{query}"</span>}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-12 text-[#171513]/70">
                  <p className="font-serif text-lg">No matching creations found</p>
                  <p className="text-xs text-[#171513]/50 mt-1">
                    Try searching for "velvet", "silk", "khussa" or browse all collections.
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('collection', { department: 'all' });
                    }}
                    className="mt-4 px-5 py-2 bg-[#171513] text-white text-xs uppercase tracking-wider font-semibold"
                  >
                    View All Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product', { productId: product.id });
                      }}
                      className="flex gap-3 p-2.5 bg-white border border-[#171513]/10 hover:border-[#641D32] cursor-pointer transition-colors group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.includes('/src/assets/images/')) {
                            target.src = target.src.replace('/src/assets/images/', '/images/');
                          }
                        }}
                        className="w-16 h-20 object-cover object-top shrink-0 bg-[#EEE5DF]"
                      />
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <span className="text-[10px] text-[#171513]/60 uppercase tracking-widest block truncate">
                            {product.category}
                          </span>
                          <h5 className="font-serif text-sm font-semibold text-[#171513] truncate group-hover:text-[#641D32] transition-colors">
                            {product.title}
                          </h5>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-xs font-semibold text-[#171513]">
                            {formatPKR(product.price)}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#B69A70] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

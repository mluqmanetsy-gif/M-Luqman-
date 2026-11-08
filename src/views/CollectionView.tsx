import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { DEPARTMENTS } from '../data/departments';
import { DepartmentId } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, LayoutGrid, X, Check, RotateCcw } from 'lucide-react';

export const CollectionView: React.FC = () => {
  const { selectedDepartment, selectedCategory, navigateTo, formatPKR, products, productsLoading, productsError } = useShop();

  const [department, setDepartment] = useState<DepartmentId | 'all'>(selectedDepartment);
  const [category, setCategory] = useState<string>(selectedCategory || 'All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [columns, setColumns] = useState<2 | 3 | 4>(3);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync with context if context changes
  React.useEffect(() => {
    setDepartment(selectedDepartment);
    setCategory(selectedCategory || 'All');
  }, [selectedDepartment, selectedCategory]);

  const currentDeptObj = DEPARTMENTS.find((d) => d.id === department);

  const colorsList = [
    { name: 'All', hex: '' },
    { name: 'Ivory Gold', hex: '#F6F2EC' },
    { name: 'Deep Burgundy', hex: '#641D32' },
    { name: 'Champagne Gold', hex: '#B69A70' },
    { name: 'Soft Blush', hex: '#EEE5DF' },
    { name: 'Deep Emerald', hex: '#1E3A2F' },
    { name: 'Rich Black', hex: '#171513' }
  ];

  const sizesList = ['all', 'XS', 'S', 'M', 'L', 'XL'];
  const fabricsList = ['all', 'Raw Silk', 'Velvet', 'Lawn', 'Chiffon', 'Pashmina', 'Leather'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Department filter
      if (department !== 'all' && p.department !== department) return false;

      // Category filter
      if (category !== 'All' && p.category !== category) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      // Size filter
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize)) return false;

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // Fabric filter
      if (selectedFabric !== 'all') {
        if (!p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [products, department, category, maxPrice, selectedSize, selectedColor, selectedFabric, sortBy]);

  const handleResetFilters = () => {
    setDepartment('all');
    setCategory('All');
    setSelectedSize('all');
    setSelectedColor('all');
    setSelectedFabric('all');
    setMaxPrice(50000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    department !== 'all' ||
    category !== 'All' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    selectedFabric !== 'all' ||
    maxPrice < 50000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Editorial Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B69A70] font-semibold">
          {currentDeptObj ? currentDeptObj.name : 'VEYORA Collections'}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#171513]">
          {currentDeptObj ? currentDeptObj.name : "All Women's Collections"}
        </h1>
        <p className="text-xs sm:text-sm text-[#171513]/70 font-light max-w-xl mx-auto">
          {currentDeptObj
            ? currentDeptObj.tagline
            : 'Explore handcrafted luxury pret, festive formals, unstitched heirlooms, fine jewellery, and artisan footwear.'}
        </p>
      </div>

      {/* Department Navigation Chips (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#171513]/10 text-xs scrollbar-none">
        <button
          onClick={() => {
            setDepartment('all');
            setCategory('All');
          }}
          className={`px-4 py-2 uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
            department === 'all'
              ? 'bg-[#171513] text-white shadow-sm'
              : 'bg-white text-[#171513] border border-[#171513]/10 hover:border-[#171513]'
          }`}
        >
          All Departments
        </button>
        {DEPARTMENTS.map((d) => (
          <button
            key={d.id}
            onClick={() => {
              setDepartment(d.id);
              setCategory('All');
            }}
            className={`px-4 py-2 uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
              department === d.id
                ? 'bg-[#171513] text-white shadow-sm'
                : 'bg-white text-[#171513] border border-[#171513]/10 hover:border-[#171513]'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Subcategory Pills if Department is Selected */}
      {currentDeptObj && currentDeptObj.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs">
          <span className="text-[#171513]/50 uppercase tracking-widest text-[10px] whitespace-nowrap mr-2">
            Categories:
          </span>
          {currentDeptObj.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setCategory(sub === 'All ' + currentDeptObj.name ? 'All' : sub)}
              className={`px-3 py-1 text-xs whitespace-nowrap transition-colors border ${
                category === sub || (sub.startsWith('All') && category === 'All')
                  ? 'bg-[#641D32] text-white border-[#641D32]'
                  : 'bg-white text-[#171513] border-[#171513]/10 hover:border-[#641D32]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar (Mobile Filter toggle, Sort, Grid Switcher) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-8 border-y border-[#171513]/10 text-xs">
        
        {/* Left: Filter Toggle & Count */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white border border-[#171513]/20 hover:border-[#171513] font-semibold text-[#171513] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#B69A70]" />
            <span>Filter Catalog</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#641D32]" />
            )}
          </button>

          <span className="text-[#171513]/70">
            Showing <strong className="text-[#171513] font-mono">{filteredProducts.length}</strong> creations
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="hidden sm:flex items-center gap-1 text-[#641D32] hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Right: Sorting & Grid Switcher */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[#171513]/60 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#171513]/20 px-3 py-2 text-xs text-[#171513] focus:outline-none focus:border-[#641D32]"
            >
              <option value="featured">Featured Heirlooms</option>
              <option value="price-low">Price: Low to High (PKR)</option>
              <option value="price-high">Price: High to Low (PKR)</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals First</option>
            </select>
          </div>

          {/* Desktop Grid Columns */}
          <div className="hidden lg:flex items-center border border-[#171513]/20 bg-white">
            <button
              onClick={() => setColumns(2)}
              className={`p-2 transition-colors ${columns === 2 ? 'bg-[#171513] text-white' : 'text-[#171513]'}`}
              title="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(3)}
              className={`p-2 transition-colors ${columns === 3 ? 'bg-[#171513] text-white' : 'text-[#171513]'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`p-2 transition-colors ${columns === 4 ? 'bg-[#171513] text-white' : 'text-[#171513]'}`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Content Layout (Sidebar Filters + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar (Collapsible on mobile, permanent on desktop if toggled) */}
        <aside
          className={`space-y-6 lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="bg-white p-5 border border-[#171513]/10 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#171513]/10">
              <span className="font-serif text-base font-semibold text-[#171513]">
                Refine Selection
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#641D32] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#171513]">Max Price:</span>
                <span className="font-mono font-bold text-[#641D32]">
                  {formatPKR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={3000}
                max={50000}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#641D32]"
              />
              <div className="flex justify-between text-[10px] text-[#171513]/50 font-mono mt-1">
                <span>PKR 3,000</span>
                <span>PKR 50,000</span>
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171513] block mb-2.5">
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {sizesList.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#171513] text-white border-[#171513]'
                        : 'bg-white text-[#171513] border-[#171513]/20 hover:border-[#171513]'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171513] block mb-2.5">
                Color Tone
              </span>
              <div className="space-y-1.5">
                {colorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-full flex items-center justify-between p-2 text-xs transition-colors ${
                      selectedColor === c.name
                        ? 'bg-[#F6F2EC] font-semibold text-[#641D32]'
                        : 'hover:bg-[#F6F2EC] text-[#171513]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {c.hex && (
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      )}
                      <span>{c.name}</span>
                    </div>
                    {selectedColor === c.name && <Check className="w-3.5 h-3.5 text-[#641D32]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#171513] block mb-2.5">
                Fabric & Material
              </span>
              <div className="space-y-1">
                {fabricsList.map((fb) => (
                  <button
                    key={fb}
                    onClick={() => setSelectedFabric(fb)}
                    className={`w-full text-left p-2 text-xs transition-colors flex items-center justify-between ${
                      selectedFabric === fb
                        ? 'bg-[#F6F2EC] font-semibold text-[#641D32]'
                        : 'hover:bg-[#F6F2EC] text-[#171513]/80'
                    }`}
                  >
                    <span>{fb === 'all' ? 'All Fabrics' : fb}</span>
                    {selectedFabric === fb && <Check className="w-3.5 h-3.5 text-[#641D32]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Assurance in sidebar */}
            <div className="p-3 bg-[#F6F2EC] text-[11px] text-[#171513]/70 space-y-1 border border-[#171513]/5">
              <p className="font-semibold text-[#171513]">Cash on Delivery (COD)</p>
              <p>Pay cash upon delivery anywhere in Pakistan.</p>
            </div>

          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#171513]/10 p-8 space-y-4">
              <p className="font-serif text-2xl text-[#171513]">
                No creations match your current filters
              </p>
              <p className="text-xs text-[#171513]/60 max-w-md mx-auto">
                Try widening your price range, selecting "All Colors", or reset all filters to view our full Pakistani luxury catalog.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#171513] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#641D32] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                columns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : columns === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};

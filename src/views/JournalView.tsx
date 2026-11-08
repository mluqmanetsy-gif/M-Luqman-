import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { JOURNAL_ARTICLES } from '../data/journal';
import { PRODUCTS } from '../data/products';
import { JournalArticle } from '../types';
import { ArrowLeft, Clock, Calendar, Sparkles, ArrowRight, Share2, Bookmark } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { navigateTo, formatPKR, showToast } = useShop();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(JOURNAL_ARTICLES[0]);

  const categories = ['All', 'Trend Report', 'Styling Guide', 'Modest Edit', 'Craftsmanship'];

  const filteredArticles = JOURNAL_ARTICLES.filter((art) => {
    if (selectedCategory === 'All') return true;
    return art.category === selectedCategory;
  });

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      showToast('Article link copied to clipboard.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb & Header */}
      <div className="border-b border-[#171513]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => navigateTo('home')}
            className="text-xs uppercase tracking-widest text-[#B69A70] hover:text-[#171513] font-semibold flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </button>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
            Editorial Gazette · Karachi
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171513]">
            VEYORA Style Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#171513]/70 font-light mt-1 max-w-xl">
            Curated narratives on traditional South Asian textile arts, seasonal bridal silhouettes, and modern modest couture.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[#171513]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#171513] text-white shadow-xs'
                  : 'text-[#171513]/70 hover:text-[#171513]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Leading Editorial */}
      {activeArticle && (
        <section className="bg-white border border-[#171513]/10 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Visual Cover */}
            <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[460px] bg-[#EEE5DF]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4 bg-[#171513] text-[#B69A70] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                {activeArticle.category}
              </div>
            </div>

            {/* Reading Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-[#171513]/60 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B69A70]" />
                    {activeArticle.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#B69A70]" />
                    {activeArticle.readTime}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#171513] font-medium leading-snug">
                  {activeArticle.title}
                </h2>

                <p className="text-xs uppercase tracking-wider text-[#641D32] font-semibold mt-2">
                  {activeArticle.subtitle}
                </p>

                <p className="text-sm text-[#171513]/80 leading-relaxed mt-4 font-light">
                  {activeArticle.excerpt}
                </p>

                {/* Article Prose Paragraphs */}
                <div className="mt-6 pt-6 border-t border-[#171513]/10 space-y-3 text-xs sm:text-sm text-[#171513]/75 leading-relaxed">
                  {activeArticle.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Featured In This Story Products */}
              {activeArticle.featuredProducts && activeArticle.featuredProducts.length > 0 && (
                <div className="pt-6 border-t border-[#171513]/10">
                  <span className="text-[11px] uppercase tracking-wider text-[#B69A70] font-semibold block mb-2">
                    Heirlooms Featured in this Story:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.featuredProducts.map((pId) => {
                      const prod = PRODUCTS.find((p) => p.id === pId);
                      if (!prod) return null;
                      return (
                        <button
                          key={prod.id}
                          onClick={() => navigateTo('product', { productId: prod.id })}
                          className="flex items-center gap-2 p-1.5 pr-3 bg-[#F6F2EC] hover:bg-[#EEE5DF] border border-[#171513]/10 transition-colors text-left"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 object-cover rounded-xs"
                          />
                          <div>
                            <span className="text-[11px] font-medium text-[#171513] block line-clamp-1">
                              {prod.title}
                            </span>
                            <span className="text-[10px] font-mono text-[#641D32]">
                              {formatPKR(prod.price)}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Strip */}
              <div className="pt-4 border-t border-[#171513]/10 flex items-center justify-between text-xs">
                <button
                  onClick={() => handleShare(activeArticle.title)}
                  className="flex items-center gap-1.5 text-[#171513]/70 hover:text-[#641D32] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Story</span>
                </button>
                <button
                  onClick={() => showToast('Article saved to your personal library.')}
                  className="flex items-center gap-1.5 text-[#171513]/70 hover:text-[#641D32] transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save to Reading List</span>
                </button>
              </div>

            </div>

          </div>
        </section>
      )}

      {/* Grid of Other Articles */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-[#171513] font-medium border-b border-[#171513]/10 pb-3">
          Latest Stories & Styling Dispatches
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => {
                setActiveArticle(art);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              className="bg-white border border-[#171513]/10 p-4 hover:border-[#641D32] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#EEE5DF] mb-4 relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#171513]/90 text-white text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5">
                    {art.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#171513]/50 mb-2 font-mono">
                  <span>{art.date}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#171513] group-hover:text-[#641D32] transition-colors line-clamp-2">
                  {art.title}
                </h4>

                <p className="text-xs text-[#171513]/70 font-light mt-2 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#171513]/5 flex items-center justify-between text-xs text-[#641D32] font-semibold">
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

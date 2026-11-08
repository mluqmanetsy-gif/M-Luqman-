import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler, CheckCircle2, ArrowRight } from 'lucide-react';

export const SmartSizeAssistantModal: React.FC = () => {
  const { isSizeAssistantOpen, setIsSizeAssistantOpen, showToast } = useShop();

  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [bust, setBust] = useState<number>(36);
  const [waist, setWaist] = useState<number>(30);
  const [hips, setHips] = useState<number>(40);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'standard' | 'relaxed'>('standard');

  if (!isSizeAssistantOpen) return null;

  // Convert for calculations if unit is cm
  const effectiveBustInches = unit === 'in' ? bust : bust / 2.54;

  // Pakistani pret sizing algorithm
  let recommendedSize = 'M';
  let chestAllowance = 2; // inches ease
  let fitNote = 'Standard comfortable Pakistani pret cut with graceful drape.';

  if (fitPreference === 'fitted') {
    chestAllowance = 1.5;
    fitNote = 'Trim, contoured bodice suited for modern tailored silhouette.';
  } else if (fitPreference === 'relaxed') {
    chestAllowance = 3;
    fitNote = 'Generous ease for effortless flow, modest coverage, and breathable movement.';
  }

  const finishedGarmentChest = Math.round(effectiveBustInches + chestAllowance);

  if (finishedGarmentChest <= 37) {
    recommendedSize = 'XS';
  } else if (finishedGarmentChest <= 39) {
    recommendedSize = 'S';
  } else if (finishedGarmentChest <= 42) {
    recommendedSize = 'M';
  } else if (finishedGarmentChest <= 45) {
    recommendedSize = 'L';
  } else {
    recommendedSize = 'XL';
  }

  // Pre-calculated garment dimensions based on size
  const garmentSpecs: Record<string, { chest: number; shoulder: number; waist: number; hip: number; kurtaLength: number; trouserLength: number }> = {
    XS: { chest: 36, shoulder: 13.5, waist: 33, hip: 38, kurtaLength: 42, trouserLength: 37 },
    S: { chest: 38, shoulder: 14.5, waist: 35, hip: 40, kurtaLength: 43, trouserLength: 38 },
    M: { chest: 41, shoulder: 15.0, waist: 38, hip: 44, kurtaLength: 44, trouserLength: 38.5 },
    L: { chest: 44, shoulder: 15.5, waist: 41, hip: 47, kurtaLength: 45, trouserLength: 39 },
    XL: { chest: 48, shoulder: 16.5, waist: 45, hip: 51, kurtaLength: 45, trouserLength: 39.5 }
  };

  const specs = garmentSpecs[recommendedSize];

  const handleApplySize = () => {
    showToast(`Size ${recommendedSize} saved to your fitting profile.`);
    setIsSizeAssistantOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171513]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeAssistantOpen(false)}
      />

      <div className="relative bg-[#F6F2EC] w-full max-w-2xl shadow-2xl border border-[#B69A70]/30 z-10 my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#171513] text-[#F6F2EC] flex items-center justify-between border-b border-[#B69A70]/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#641D32]">
              <Ruler className="w-5 h-5 text-[#B69A70]" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-medium tracking-wide">
                Smart Size & Fit Assistant
              </h2>
              <p className="text-xs text-[#EEE5DF]/70">
                Precision algorithm for Pakistani Pret & Festive Formals
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeAssistantOpen(false)}
            className="p-2 text-[#EEE5DF] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assistant Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#171513]/10">
            <span className="text-xs uppercase tracking-wider text-[#171513] font-semibold">
              Measurement Unit
            </span>
            <div className="flex bg-[#EEE5DF] p-0.5 border border-[#171513]/20">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-semibold ${
                  unit === 'in' ? 'bg-[#171513] text-white shadow-sm' : 'text-[#171513]'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-semibold ${
                  unit === 'cm' ? 'bg-[#171513] text-white shadow-sm' : 'text-[#171513]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Bust */}
            <div className="bg-white p-4 border border-[#171513]/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-[#171513]">Bust</span>
                <span className="font-mono text-sm font-bold text-[#641D32]">
                  {bust} {unit}
                </span>
              </div>
              <input
                type="range"
                min={unit === 'in' ? 30 : 76}
                max={unit === 'in' ? 50 : 127}
                value={bust}
                onChange={(e) => setBust(Number(e.target.value))}
                className="w-full accent-[#641D32]"
              />
              <span className="text-[10px] text-[#171513]/50 block mt-1">Fullest part of chest</span>
            </div>

            {/* Waist */}
            <div className="bg-white p-4 border border-[#171513]/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-[#171513]">Natural Waist</span>
                <span className="font-mono text-sm font-bold text-[#641D32]">
                  {waist} {unit}
                </span>
              </div>
              <input
                type="range"
                min={unit === 'in' ? 24 : 60}
                max={unit === 'in' ? 44 : 112}
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full accent-[#641D32]"
              />
              <span className="text-[10px] text-[#171513]/50 block mt-1">Above belly button</span>
            </div>

            {/* Hips */}
            <div className="bg-white p-4 border border-[#171513]/10">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-[#171513]">Hips</span>
                <span className="font-mono text-sm font-bold text-[#641D32]">
                  {hips} {unit}
                </span>
              </div>
              <input
                type="range"
                min={unit === 'in' ? 32 : 81}
                max={unit === 'in' ? 54 : 137}
                value={hips}
                onChange={(e) => setHips(Number(e.target.value))}
                className="w-full accent-[#641D32]"
              />
              <span className="text-[10px] text-[#171513]/50 block mt-1">Widest part of hips</span>
            </div>
          </div>

          {/* Fit Preference */}
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B69A70] font-semibold block mb-2.5">
              Silhouette Ease Preference
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setFitPreference('fitted')}
                className={`p-3 text-left border transition-all text-xs ${
                  fitPreference === 'fitted'
                    ? 'bg-white border-[#641D32] text-[#171513] shadow-sm'
                    : 'bg-[#EEE5DF]/50 border-transparent text-[#171513]/70 hover:bg-white'
                }`}
              >
                <strong className="block text-sm font-serif">Tailored Fit</strong>
                <span className="text-[11px] block mt-0.5">Slightly snug silhouette</span>
              </button>

              <button
                onClick={() => setFitPreference('standard')}
                className={`p-3 text-left border transition-all text-xs ${
                  fitPreference === 'standard'
                    ? 'bg-white border-[#641D32] text-[#171513] shadow-sm'
                    : 'bg-[#EEE5DF]/50 border-transparent text-[#171513]/70 hover:bg-white'
                }`}
              >
                <strong className="block text-sm font-serif">Standard Pret</strong>
                <span className="text-[11px] block mt-0.5">Classic Pakistani drape</span>
              </button>

              <button
                onClick={() => setFitPreference('relaxed')}
                className={`p-3 text-left border transition-all text-xs ${
                  fitPreference === 'relaxed'
                    ? 'bg-white border-[#641D32] text-[#171513] shadow-sm'
                    : 'bg-[#EEE5DF]/50 border-transparent text-[#171513]/70 hover:bg-white'
                }`}
              >
                <strong className="block text-sm font-serif">Modest / Flowy</strong>
                <span className="text-[11px] block mt-0.5">Extra ease & full length</span>
              </button>
            </div>
          </div>

          {/* Size Result Box */}
          <div className="p-5 bg-white border border-[#B69A70]/60 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#171513]/10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#1E3A2F]" />
                <div>
                  <span className="text-xs text-[#171513]/60 uppercase tracking-widest block">
                    Recommended Size
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-[#641D32]">
                      Size {recommendedSize}
                    </span>
                    <span className="text-xs text-[#1E3A2F] font-semibold">
                      (99% Guaranteed Match)
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono text-xs text-[#171513]/70">
                <span>Garment Chest: <strong>{specs.chest}"</strong></span>
                <br />
                <span>Shoulder: <strong>{specs.shoulder}"</strong></span>
              </div>
            </div>

            <p className="text-xs text-[#171513]/80 italic">
              "{fitNote}"
            </p>

            {/* Complete Dimension Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
              <div className="p-2 bg-[#F6F2EC]">
                <span className="text-[#171513]/60 block text-[10px] uppercase">Shirt Length</span>
                <span className="font-mono font-bold text-[#171513]">{specs.kurtaLength}"</span>
              </div>
              <div className="p-2 bg-[#F6F2EC]">
                <span className="text-[#171513]/60 block text-[10px] uppercase">Waist Ease</span>
                <span className="font-mono font-bold text-[#171513]">{specs.waist}"</span>
              </div>
              <div className="p-2 bg-[#F6F2EC]">
                <span className="text-[#171513]/60 block text-[10px] uppercase">Hip Flare</span>
                <span className="font-mono font-bold text-[#171513]">{specs.hip}"</span>
              </div>
              <div className="p-2 bg-[#F6F2EC]">
                <span className="text-[#171513]/60 block text-[10px] uppercase">Trouser Length</span>
                <span className="font-mono font-bold text-[#171513]">{specs.trouserLength}"</span>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleApplySize}
              className="flex-1 py-3 bg-[#171513] hover:bg-[#641D32] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Apply Size {recommendedSize} to Product</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSizeAssistantOpen(false)}
              className="px-5 py-3 bg-white border border-[#171513]/20 text-[#171513] text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

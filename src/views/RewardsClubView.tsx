import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { REWARD_VOUCHERS, TIER_BENEFITS } from '../data/rewards';
import { RewardVoucher } from '../types';
import { Crown, Sparkles, Gift, ArrowLeft, Copy, Check, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

export const RewardsClubView: React.FC = () => {
  const { navigateTo, userProfile, updateUserProfile, showToast } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [unlockedVouchers, setUnlockedVouchers] = useState<string[]>([]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Voucher code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleRedeem = (voucher: RewardVoucher) => {
    if (userProfile.points < voucher.pointsCost) {
      showToast(
        `Insufficient points balance. You need ${voucher.pointsCost - userProfile.points} more points to redeem this benefit.`,
        'error'
      );
      return;
    }

    // Deduct points
    updateUserProfile({ points: userProfile.points - voucher.pointsCost });
    setUnlockedVouchers((prev) => [...prev, voucher.id]);
    showToast(`Congratulations! You unlocked ${voucher.title}. Voucher code: ${voucher.discountCode}`);
  };

  const nextTierPoints = 3000;
  const currentPoints = userProfile.points;
  const progressPercent = Math.min(100, Math.round((currentPoints / nextTierPoints) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
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
            Privilège Clientèle
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#171513]">
            VEYORA Rewards Club
          </h1>
          <p className="text-xs sm:text-sm text-[#171513]/70 font-light mt-1">
            An exclusive tiered membership rewarding dedication to Pakistani haute couture and bespoke craft.
          </p>
        </div>

        <button
          onClick={() => navigateTo('account')}
          className="px-5 py-2.5 bg-[#171513] text-white hover:bg-[#641D32] text-xs font-semibold uppercase tracking-wider transition-colors self-start md:self-auto"
        >
          View Account Profile
        </button>
      </div>

      {/* Member Digital VIP Pass Card */}
      <div className="bg-[#171513] text-[#F6F2EC] p-6 sm:p-10 border border-[#B69A70]/40 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative gold motif */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B69A70]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Card Left: Member Status */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-[#B69A70]/20 text-[#B69A70] border border-[#B69A70]/40 rounded-full">
                <Crown className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A70] font-semibold block">
                  Active Tier Status
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  {userProfile.memberTier}
                </h2>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-[#EEE5DF]/70">Member Cardholder</span>
              <p className="font-serif text-xl text-white font-medium">{userProfile.name}</p>
              <p className="text-xs text-[#EEE5DF]/50">{userProfile.city}, Pakistan</p>
            </div>

            {/* Progress to next tier */}
            <div className="space-y-1.5 pt-4 border-t border-white/10 max-w-md">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#EEE5DF]/80">Progress to Black Diamond VIP</span>
                <span className="font-mono text-[#B69A70] font-semibold">{currentPoints} / 3,000 pts</span>
              </div>
              <div className="w-full h-2 bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#B69A70] to-[#641D32] transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-[#EEE5DF]/60 block">
                Earn {nextTierPoints - currentPoints} more points on upcoming Pakistani couture orders to unlock VIP status.
              </span>
            </div>
          </div>

          {/* Card Right: Points Available */}
          <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 flex flex-col justify-between items-start md:items-end text-left md:text-right space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#B69A70] font-semibold block">
                Available Reward Points
              </span>
              <span className="font-serif text-4xl sm:text-5xl font-medium text-white tabular-nums block mt-1">
                {currentPoints.toLocaleString()}
              </span>
              <span className="text-xs text-[#EEE5DF]/60">
                Equivalent to approx PKR {(currentPoints * 3).toLocaleString()} in atelier benefits
              </span>
            </div>

            <div className="text-xs text-[#EEE5DF]/75 space-y-1 pt-4 border-t border-white/10 w-full text-left md:text-right">
              <p>✓ 1.5x Multiplier on Festive & Velvet Collections</p>
              <p>✓ Complimentary Bespoke Tailoring on Unstitched Fabric</p>
              <p>✓ Priority Dispatch via TCS Express from Karachi</p>
            </div>
          </div>

        </div>
      </div>

      {/* Redeemable Rewards Interface */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#171513]/10 pb-4 gap-2">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
              Redeem Privileges
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171513]">
              Available Member Vouchers
            </h3>
          </div>
          <span className="text-xs text-[#171513]/60">
            Redeem points to receive exclusive promotional codes at checkout
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REWARD_VOUCHERS.map((voucher) => {
            const isUnlocked = unlockedVouchers.includes(voucher.id);
            const canAfford = currentPoints >= voucher.pointsCost;

            return (
              <div
                key={voucher.id}
                className="bg-white border border-[#171513]/10 p-5 flex flex-col justify-between hover:border-[#B69A70] transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#641D32] font-semibold px-2 py-0.5 bg-[#641D32]/5 border border-[#641D32]/20">
                      {voucher.tierRequired}
                    </span>
                    <span className="font-mono font-semibold text-[#B69A70]">
                      {voucher.pointsCost} Points
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#171513]">
                    {voucher.title}
                  </h4>

                  <p className="text-xs text-[#171513]/70 font-light mt-2 leading-relaxed">
                    {voucher.benefit}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#171513]/10">
                  {isUnlocked ? (
                    <div className="space-y-2">
                      <div className="p-2 bg-[#F6F2EC] border border-[#B69A70]/40 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#171513] tracking-wider">
                          {voucher.discountCode}
                        </span>
                        <button
                          onClick={() => handleCopy(voucher.discountCode)}
                          className="text-[11px] text-[#641D32] hover:text-[#171513] flex items-center gap-1 font-semibold"
                        >
                          {copiedCode === voucher.discountCode ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-emerald-700 block">
                        Unlocked! Apply this promo code at checkout.
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRedeem(voucher)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                        canAfford
                          ? 'bg-[#171513] hover:bg-[#641D32] text-white'
                          : 'bg-[#EEE5DF] text-[#171513]/40 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Redeem with Points' : 'Need More Points'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tier Breakdown Comparison */}
      <section className="space-y-6 pt-6">
        <div className="border-b border-[#171513]/10 pb-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B69A70] font-semibold block mb-1">
            Membership Architecture
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#171513]">
            Privilège Levels & Tier Privileges
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIER_BENEFITS.map((tier) => {
            const isCurrent = userProfile.memberTier === tier.tier;
            return (
              <div
                key={tier.tier}
                className={`p-6 border flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-white border-[#B69A70] shadow-md ring-1 ring-[#B69A70]'
                    : 'bg-white border-[#171513]/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-xl font-medium text-[#171513]">
                      {tier.tier}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#B69A70] text-[#171513]">
                        Your Tier
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#641D32] font-semibold block mb-4">
                    {tier.pointsRange}
                  </span>

                  <ul className="space-y-2.5 text-xs text-[#171513]/80">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B69A70] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#171513]/10 text-[11px] text-[#171513]/60">
                  Points automatically credited upon order delivery confirmation via TCS / Leopards COD.
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Points History Ledger */}
      <section className="bg-white border border-[#171513]/10 p-6 space-y-4">
        <h4 className="font-serif text-xl font-medium text-[#171513]">
          Recent Rewards & Points Ledger
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#171513]/10 text-[#171513]/50 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 font-medium">Date</th>
                <th className="py-2.5 font-medium">Activity</th>
                <th className="py-2.5 font-medium">Reference</th>
                <th className="py-2.5 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171513]/5">
              <tr>
                <td className="py-3 font-mono text-[#171513]/70">2026-11-04</td>
                <td className="py-3 font-medium">Order Delivery Bonus (1.5x Tier Multiplier)</td>
                <td className="py-3 font-mono text-[#B69A70]">VY-9241 (Zehra Raw Silk Set)</td>
                <td className="py-3 font-mono text-emerald-700 font-semibold text-right">+495 pts</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-[#171513]/70">2026-10-25</td>
                <td className="py-3 font-medium">Order Delivery Points</td>
                <td className="py-3 font-mono text-[#B69A70]">VY-8109 (Zarrin Khussa)</td>
                <td className="py-3 font-mono text-emerald-700 font-semibold text-right">+127 pts</td>
              </tr>
              <tr>
                <td className="py-3 font-mono text-[#171513]/70">2026-10-01</td>
                <td className="py-3 font-medium">Welcome VIP Onboarding Credit</td>
                <td className="py-3 font-mono text-[#B69A70]">Karachi Atelier Register</td>
                <td className="py-3 font-mono text-emerald-700 font-semibold text-right">+800 pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

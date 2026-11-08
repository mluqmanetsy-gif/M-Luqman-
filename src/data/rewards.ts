import { RewardVoucher } from '../types';

export const REWARD_VOUCHERS: RewardVoucher[] = [
  {
    id: 'reward-01',
    title: 'PKR 1,500 Off Next Order',
    pointsCost: 500,
    discountCode: 'PRIVILEGE1500',
    benefit: 'Valid on any order above PKR 10,000 across all departments',
    tierRequired: 'Silver Privilège'
  },
  {
    id: 'reward-02',
    title: 'Complimentary Bespoke Stitching Service',
    pointsCost: 750,
    discountCode: 'FREESTITCH',
    benefit: '100% free master tailoring on any unstitched raw silk or formal fabric suit',
    tierRequired: 'Silver Privilège'
  },
  {
    id: 'reward-03',
    title: 'PKR 3,500 Festive Couture Voucher',
    pointsCost: 1200,
    discountCode: 'COUTURE3500',
    benefit: 'Exclusive discount applicable to all Festive Heirlooms and Velvet Ghararas',
    tierRequired: 'Gold Couture'
  },
  {
    id: 'reward-04',
    title: 'Complimentary Pure Silk Scarf',
    pointsCost: 1500,
    discountCode: 'LUXESILK',
    benefit: 'Receive a complimentary 90cm hand-rolled pure silk scarf with your next delivery',
    tierRequired: 'Gold Couture'
  },
  {
    id: 'reward-05',
    title: 'Private Stylist Concierge & PKR 5,000 Credit',
    pointsCost: 2000,
    discountCode: 'VIP5000',
    benefit: 'Bespoke one-on-one styling consultation + PKR 5,000 credit on any luxury couture order',
    tierRequired: 'Black Diamond VIP'
  }
];

export const TIER_BENEFITS = [
  {
    tier: 'Silver Privilège' as const,
    pointsRange: '0 – 999 Points',
    threshold: 0,
    perks: [
      'Earn 1 Point per PKR 100 spent',
      'Early access to seasonal private sales',
      'Complimentary signature fragrance gift packaging',
      'Dedicated WhatsApp customer care (03494968548)'
    ]
  },
  {
    tier: 'Gold Couture' as const,
    pointsRange: '1,000 – 2,999 Points',
    threshold: 1000,
    perks: [
      'Earn 1.5 Points per PKR 100 spent',
      'Complimentary bespoke tailoring vouchers',
      'Priority express courier dispatch via TCS',
      'Invitations to preview private bridal trunk shows',
      'Exclusive seasonal styling guides and lookbooks'
    ]
  },
  {
    tier: 'Black Diamond VIP' as const,
    pointsRange: '3,000+ Points',
    threshold: 3000,
    perks: [
      'Earn 2 Points per PKR 100 spent',
      'Complimentary door-to-door express delivery with zero minimum',
      'Private Karachi atelier appointments with our Head Designer',
      'Personal fashion stylist on WhatsApp hotline',
      'Complimentary annual luxury silk gift'
    ]
  }
];

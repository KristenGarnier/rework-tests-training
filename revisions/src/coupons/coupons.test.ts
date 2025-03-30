import { describe, it, expect } from 'vitest';
import { validateCoupon, Coupon } from './coupons';

describe('validateCoupon', () => {
  const validCoupon: Coupon = {
    code: 'PROMO10',
    discount: 10,
    expiresAt: new Date(new Date().getTime() + 100000),
    minOrder: 50,
    usageLimit: 5
  };

  it('valide un coupon correct', () => {
    expect(validateCoupon(validCoupon, 100, 2)).toBe(10);
  });

  it('rejette un coupon expiré', () => {
    const expiredCoupon: Coupon = { ...validCoupon, expiresAt: new Date(new Date().getTime() - 100000) };
    expect(() => validateCoupon(expiredCoupon, 100, 2)).toThrow("Coupon expiré");
  });

  it('rejette un coupon si le montant de commande est insuffisant', () => {
    expect(() => validateCoupon(validCoupon, 40, 2)).toThrow("Montant de commande insuffisant pour ce coupon");
  });

  it('rejette un coupon si usage limite atteint', () => {
    expect(() => validateCoupon(validCoupon, 100, 5)).toThrow("Usage limite du coupon atteint");
  });
});

import { describe, expect, it } from 'vitest';
import { ShoppingCart } from '../cart/cart';
import { Coupon } from '../coupons/coupons';
import { processOrder } from './orders';

describe('processOrder', () => {
  it('calcule correctement une commande sans coupon', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: "Produit A", price: 100, quantity: 1 });
    const summary = processOrder(cart, {
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: 10,
    });
    expect(summary.subtotal).toBe(100);
    expect(summary.discount).toBe(0);
    expect(summary.shipping).toBe(10);
    expect(summary.tax).toBe(20);
    expect(summary.total).toBe(130);
  });

  it('calcule correctement une commande avec coupon valide', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: "Produit A", price: 200, quantity: 1 });
    const coupon: Coupon = {
      code: 'PROMO20',
      discount: 20,
      expiresAt: new Date(new Date().getTime() + 100000),
      minOrder: 100,
      usageLimit: 5,
    };
    const summary = processOrder(cart, {
      coupon,
      couponUsageCount: 1,
      shippingDestination: 'international',
      shippingMethod: 'express',
      shippingWeight: 5,
    });
    expect(summary.subtotal).toBe(200);
    expect(summary.discount).toBe(40);
    expect(summary.shipping).toBe(30);
    expect(summary.tax).toBe(32);
    expect(summary.total).toBe(222);
  });
});

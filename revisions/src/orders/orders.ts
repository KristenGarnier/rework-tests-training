import { ShoppingCart } from '../cart/cart';
import { calculateShippingCost } from '../shipping/shipping';
import { Coupon, validateCoupon } from '../coupons/coupons';

export interface OrderSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export function processOrder(
  cart: ShoppingCart,
  options: {
    coupon?: Coupon;
    couponUsageCount?: number;
    shippingDestination: 'domestic' | 'international';
    shippingMethod?: 'standard' | 'express';
    shippingWeight: number;
  }
): OrderSummary {
  const subtotal = cart.getTotal();
  let discount = 0;
  if (options.coupon) {
    const couponDiscount = validateCoupon(options.coupon, subtotal, options.couponUsageCount || 0);
    discount = subtotal * (couponDiscount / 100);
  }
  const discountedSubtotal = subtotal - discount;
  const shipping = calculateShippingCost(options.shippingWeight, options.shippingDestination, options.shippingMethod);
  const tax = discountedSubtotal * 0.2;
  const total = discountedSubtotal + tax + shipping;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}

import { ShoppingCart } from '../cart/cart';
import { processOrder, OrderSummary } from '../orders/orders';
import { Coupon } from '../coupons/coupons';

export interface OrderOptions {
  coupon?: Coupon;
  couponUsageCount?: number;
  shippingDestination: 'domestic' | 'international';
  shippingMethod?: 'standard' | 'express';
  shippingWeight: number;
}

export interface PaymentService {
  processPayment(amount: number): { success: boolean; transactionId?: string };
}

export class OrderService {
  constructor(private paymentService: PaymentService) { }

  createOrder(cart: ShoppingCart, options: OrderOptions): OrderSummary {
    const orderSummary = processOrder(cart, options);
    const paymentResult = this.paymentService.processPayment(orderSummary.total);
    if (!paymentResult.success) {
      throw new Error('Payment failed');
    }
    return orderSummary;
  }
}

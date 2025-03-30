import { describe, it, expect, vi } from 'vitest';
import { ShoppingCart } from '../cart/cart';
import { OrderService, OrderOptions, PaymentService } from './OrderService';
import { PaymentServiceImpl } from './PaymentService';

describe('OrderService Integration', () => {
  it('crée une commande avec paiement réussi', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Produit A', price: 100, quantity: 1 }); // sous-total = 100
    const paymentService = new PaymentServiceImpl();
    const orderService = new OrderService(paymentService);
    const orderOptions: OrderOptions = {
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: 10, // shipping = 5 + 0.5*10 = 10, taxe = 20, total = 130
    };
    const orderSummary = orderService.createOrder(cart, orderOptions);
    expect(orderSummary.subtotal).toBe(100);
    expect(orderSummary.shipping).toBe(10);
    expect(orderSummary.tax).toBe(20);
    expect(orderSummary.total).toBe(130);
  });

  it('appelle le service de paiement avec le montant correct', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Produit A', price: 100, quantity: 1 });
    const processPaymentMock = vi.fn(() => ({ success: true, transactionId: 'TX456' }));
    const mockPaymentService: PaymentService = { processPayment: processPaymentMock };
    const orderService = new OrderService(mockPaymentService);
    const orderOptions: OrderOptions = {
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: 10,
    };
    const orderSummary = orderService.createOrder(cart, orderOptions);
    expect(processPaymentMock).toHaveBeenCalledWith(orderSummary.total);
  });

  it('lance une erreur pour un poids négatif', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Produit A', price: 100, quantity: 1 });
    const paymentService = { processPayment: vi.fn(() => ({ success: true, transactionId: 'TX123' })) };
    const orderService = new OrderService(paymentService);
    const orderOptions: OrderOptions = {
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: -5, // Valeur inattendue
    };
    expect(() => orderService.createOrder(cart, orderOptions))
      .toThrow("Poids négatif non autorisé");
  });

  it('lance une erreur pour un coupon non valide lorsque le montant est trop bas', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Produit A', price: 40, quantity: 1 }); // 40 < minOrder (50)
    const coupon = {
      code: 'PROMO10',
      discount: 10,
      expiresAt: new Date(new Date().getTime() + 100000),
      minOrder: 50,
      usageLimit: 5
    };
    const paymentService = { processPayment: vi.fn(() => ({ success: true, transactionId: 'TX123' })) };
    const orderService = new OrderService(paymentService);
    const orderOptions: OrderOptions = {
      coupon,
      couponUsageCount: 0,
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: 10,
    };
    expect(() => orderService.createOrder(cart, orderOptions))
      .toThrow("Montant de commande insuffisant pour ce coupon");
  });

  it('échoue la commande si le paiement échoue', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Produit A', price: 100, quantity: 1 });
    const failingPaymentService: PaymentService = {
      processPayment: (amount: number) => ({ success: false })
    };
    const orderService = new OrderService(failingPaymentService);
    const orderOptions: OrderOptions = {
      shippingDestination: 'domestic',
      shippingMethod: 'standard',
      shippingWeight: 10,
    };
    expect(() => orderService.createOrder(cart, orderOptions)).toThrow('Payment failed');
  });
});

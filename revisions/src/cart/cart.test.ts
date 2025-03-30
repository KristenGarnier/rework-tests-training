import { describe, it, expect } from 'vitest';
import { ShoppingCart, CartItem } from './cart';

describe('ShoppingCart', () => {
  it('ajoute un item et calcule le total', () => {
    const cart = new ShoppingCart();
    const item: CartItem = { id: 1, name: "Produit A", price: 10, quantity: 2 };
    cart.addItem(item);
    expect(cart.getTotal()).toBe(20);
  });

  it('met à jour la quantité d’un item existant', () => {
    const cart = new ShoppingCart();
    const item: CartItem = { id: 1, name: "Produit A", price: 10, quantity: 2 };
    cart.addItem(item);
    cart.addItem({ id: 1, name: "Produit A", price: 10, quantity: 3 });
    expect(cart.getTotal()).toBe(50);
  });

  it('supprime un item', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: "Produit A", price: 10, quantity: 2 });
    cart.addItem({ id: 2, name: "Produit B", price: 15, quantity: 1 });
    cart.removeItem(1);
    expect(cart.getTotal()).toBe(15);
  });

  it('met à jour la quantité via updateItemQuantity', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: "Produit A", price: 10, quantity: 2 });
    cart.updateItemQuantity(1, 5);
    expect(cart.getTotal()).toBe(50);
  });

  it('retire l’item si la quantité est mise à 0', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: "Produit A", price: 10, quantity: 2 });
    cart.updateItemQuantity(1, 0);
    expect(cart.getTotal()).toBe(0);
  });

});

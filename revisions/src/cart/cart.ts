export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export class ShoppingCart {
  private items: CartItem[] = [];

  addItem(item: CartItem): void {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index].quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(itemId: number): void {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  updateItemQuantity(itemId: number, quantity: number): void {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      item.quantity = quantity;
    }
  }

  getTotal(discountPercentage?: number): number {
    const total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return discountPercentage ? total * (1 - discountPercentage / 100) : total;
  }
}

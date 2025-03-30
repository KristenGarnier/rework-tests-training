export interface Coupon {
  code: string;
  discount: number;
  expiresAt: Date;
  minOrder: number;
  usageLimit: number;
}

export function validateCoupon(coupon: Coupon, orderTotal: number, usageCount: number): number {
  const now = new Date();
  if (coupon.expiresAt < now) {
    throw new Error("Coupon expiré");
  }
  if (orderTotal < coupon.minOrder) {
    throw new Error("Montant de commande insuffisant pour ce coupon");
  }
  if (usageCount >= coupon.usageLimit) {
    throw new Error("Usage limite du coupon atteint");
  }
  return coupon.discount;
}

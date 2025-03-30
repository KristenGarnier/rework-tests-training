export function calculateShippingCost(
  weight: number,
  destination: 'domestic' | 'international',
  method: 'standard' | 'express' = 'standard'
): number {
  if (weight < 0) {
    throw new Error("Poids négatif non autorisé");
  }

  let base: number;
  let costPerKg: number;

  if (destination === 'domestic') {
    base = 5;
    costPerKg = 0.5;
  } else {
    base = 15;
    costPerKg = 1;
  }

  let cost = base + costPerKg * weight;
  if (method === 'express') {
    cost *= 1.5;
  }

  return cost;
}

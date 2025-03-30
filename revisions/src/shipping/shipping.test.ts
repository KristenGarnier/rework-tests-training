
import { describe, it, expect } from 'vitest';
import { calculateShippingCost } from './shipping';

describe('calculateShippingCost', () => {
  it('calcule les frais pour une expédition domestique standard', () => {
    expect(calculateShippingCost(10, 'domestic')).toBe(5 + 0.5 * 10);
  });

  it('calcule les frais pour une expédition domestique express', () => {
    expect(calculateShippingCost(10, 'domestic', 'express')).toBe((5 + 0.5 * 10) * 1.5);
  });

  it('calcule les frais pour une expédition internationale standard', () => {
    expect(calculateShippingCost(5, 'international')).toBe(15 + 1 * 5);
  });

  it('calcule les frais pour une expédition internationale express', () => {
    expect(calculateShippingCost(5, 'international', 'express')).toBe((15 + 1 * 5) * 1.5);
  });

  it('gère un poids nul', () => {
    expect(calculateShippingCost(0, 'domestic')).toBe(5);
  });
});

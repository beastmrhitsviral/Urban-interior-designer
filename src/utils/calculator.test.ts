import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProjectCost, formatINR, BASE_PRICING, DELHI_INTERIOR_TIERS } from './calculator';

test('calculates turnkey essential tier for 1000 sq ft correctly', () => {
  const result = calculateProjectCost({
    sqft: 1000,
    tierId: 'essential',
    includeKitchen: false,
    includeBedroom: false,
    consultationBooked: false
  });

  assert.equal(result.sanitizedSqft, 1000);
  assert.equal(result.ratePerSqFt, 4500);
  assert.equal(result.baseSqftCost, 4500000);
  assert.equal(result.totalCost, 4500000);
});

test('calculates signature luxury tier (₹5,500/sq.ft) with modular kitchen and bedroom addons', () => {
  const result = calculateProjectCost({
    sqft: 1200,
    tierId: 'signature',
    includeKitchen: true,
    kitchenCount: 1,
    includeBedroom: true,
    bedroomCount: 2,
    consultationBooked: true
  });

  // 1200 * 5500 = 6,600,000
  // 1 kitchen = 120,000
  // 2 bedrooms = 2 * 85,000 = 170,000
  // consultation = 1,500
  // total = 6,600,000 + 120,000 + 170,000 + 1,500 = 6,891,500
  assert.equal(result.baseSqftCost, 6600000);
  assert.equal(result.kitchenCost, 120000);
  assert.equal(result.bedroomCost, 170000);
  assert.equal(result.consultationFee, 1500);
  assert.equal(result.totalCost, 6891500);
});

test('calculates ultra-bespoke tier (₹6,500/sq.ft) correctly', () => {
  const result = calculateProjectCost({
    sqft: 2000,
    tierId: 'bespoke',
    includeKitchen: false,
    includeBedroom: false
  });

  assert.equal(result.ratePerSqFt, 6500);
  assert.equal(result.totalCost, 13000000);
});

test('handles invalid, zero, and negative sqft inputs gracefully', () => {
  const zeroResult = calculateProjectCost({
    sqft: 0,
    tierId: 'essential'
  });
  assert.equal(zeroResult.sanitizedSqft, 0);
  assert.equal(zeroResult.totalCost, 0);

  const negResult = calculateProjectCost({
    sqft: -250,
    tierId: 'essential'
  });
  assert.equal(negResult.sanitizedSqft, 0);
  assert.equal(negResult.totalCost, 0);

  const nanResult = calculateProjectCost({
    sqft: NaN,
    tierId: 'signature'
  });
  assert.equal(nanResult.sanitizedSqft, 0);
  assert.equal(nanResult.totalCost, 0);
});

test('formats currency in Indian Rupees format', () => {
  const formatted = formatINR(1500);
  assert.match(formatted, /1,500/);
});

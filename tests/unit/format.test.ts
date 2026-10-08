import { describe, expect, it } from 'vitest';
import { formatCurrencyFromPaise, formatDateTime } from '../../src/lib/format';

describe('payment amount display', () => {
  it('converts integer paise without multiplying the charge shown to users', () => {
    expect(formatCurrencyFromPaise(12345)).toBe('₹123.45');
    expect(formatCurrencyFromPaise(1)).toBe('₹0.01');
    expect(formatCurrencyFromPaise(0)).toBe('₹0.00');
  });
  it('shows an absent timestamp without inventing a date', () => {
    expect(formatDateTime(null)).toBe('Not available');
    expect(formatDateTime(undefined)).toBe('Not available');
  });
});

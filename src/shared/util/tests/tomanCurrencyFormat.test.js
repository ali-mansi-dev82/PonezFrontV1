import { tomanCurrencyFormat } from '../numberFormats';

describe('tomanCurrencyFormat', () => {
  test('formats 300000 Tomans to "3,000,000"', () => {
    expect(tomanCurrencyFormat(300000)).toBe('3,000,000');
  });

  test('formats 12345 Tomans to "123,450"', () => {
    expect(tomanCurrencyFormat(12345)).toBe('123,450');
  });

  test('formats 0 Tomans to "0"', () => {
    expect(tomanCurrencyFormat(0)).toBe('0');
  });

  test('formats 100 Tomans to "1,000"', () => {
    expect(tomanCurrencyFormat(100)).toBe('1,000');
  });

  test('handles negative values, formats -5000 Tomans to "-50,000"', () => {
    expect(tomanCurrencyFormat(-5000)).toBe('-50,000');
  });
});
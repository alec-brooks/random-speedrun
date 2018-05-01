import { formatTime } from './Title';

describe('formatTime', () => {
  it('should format long to hours', () => {
    expect(formatTime(123456)).toBe('34:17:36');
  });
  it('should format milliseconds', () => {
    expect(formatTime(123.456)).toBe('02:03.456');
  });
  it('should delete trailing milliseconds', () => {
    expect(formatTime(123.45)).toBe('02:03.45');
  });
  it('should handle just seconds', () => {
    expect(formatTime(23.45)).toBe('23.45');
  });
});


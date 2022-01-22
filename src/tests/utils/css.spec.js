import css from "../../utils/css";

describe('css', () => {
  it('should get empty string if no arguments', () => {
    const result = css();
    expect(result).toBe('');
  });

  it('string should be trimmed', () => {
    const result = css('   any  thing ');
    expect(result).toBe('any  thing');
  });

  it('should get the same string if single string is passed', () => {
    const result = css('anything');
    expect(result).toBe(result);
  });

  it('should get a string concatenated by space if multiple strings are passed', () => {
    const result = css('a', 'b', 'c d');
    expect(result).toBe('a b c d');
  });

  it('falsy values should be ignored', () => {
    const result = css(0, 'a', undefined, 'b', null, 'c', false, 'd', '');
    expect(result).toBe('a b c d');
  });

  it('array arguments are handled recursively', () => {
    const result1 = css([]);
    const result2 = css(['a', 'b']);
    const result3 = css(['a', undefined, 'b', false]);
    const result4 = css('a', ['b', 'c', ['d', 'e']]);
    expect(result1).toBe('');
    expect(result2).toBe('a b');
    expect(result3).toBe('a b');
    expect(result4).toBe('a b c d e');
  });
});

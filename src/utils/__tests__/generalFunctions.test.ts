import { equalProps, generatePlaceholderArray, normalizeStarCounter } from '../generalFunctions';

describe('normalizeStarCounter', () => {
  it('should return the same number when num is less than 1000', () => {
    const num = 500;
    expect(normalizeStarCounter(num)).toBe(num);
  });

  it('should return a string number in K format when num is between 1000 and 1000000', () => {
    const num = 100000;
    expect(normalizeStarCounter(num)).toBe('100K');
  });

  it('should return a string number in M format when num is between 1000000 and 1000000000', () => {
    const num = 100000000;
    expect(normalizeStarCounter(num)).toBe('100M');
  });

  it('should return a string number in B format when num is greater than 1000000000', () => {
    const num = 1000000000;
    expect(normalizeStarCounter(num)).toBe('1B');
  });
});

describe('equalProps', () => {
  it('should return true if prev and next are equal', () => {
    const prev = { test: 'test' };
    const next = { test: 'test' };
    expect(equalProps(prev, next)).toBe(true);
  });

  it('should return false if prev and next are not equal', () => {
    const prev = { test: 'test' };
    const next = { test: 'anotherTest' };
    expect(equalProps(prev, next)).toBe(false);
  });
});

describe('generatePlaceholderArray', () => {
  it('should return an array of 3 elements if no arguments are passed', () => {
    expect(generatePlaceholderArray().length).toBe(3);
  });

  it('should return an array of the number of elements passed as argument', () => {
    const numOfElements = 5;
    expect(generatePlaceholderArray(numOfElements).length).toBe(numOfElements);
  });
});

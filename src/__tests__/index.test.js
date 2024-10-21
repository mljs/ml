import { it, describe, expect } from 'vitest';

import * as ML from '..';

describe('Check all properties are defined', () => {
  const objectsAndNbKeys = {
    Distance: 42,
    Similarity: 11,
    Array: 11,
    ArrayXY: 10,
    BitArray: 12,
    KMeans: 2,
    HClust: 2,
    NaiveBayes: 2,
    CrossValidation: 6,
    FCNNLS: 2,
    MatrixLib: 36,
    GSD: 7,
  };

  it.each(Object.keys(ML))('Check %s', (key) => {
    // if a function it should key should start with lowercase
    // if a class it should key should start with uppercase
    expect(ML[key]).toBeDefined();

    if (objectsAndNbKeys[key]) {
      expect(typeof ML[key]).toBe('object');
      expect(Object.keys(ML[key]).length).toBe(objectsAndNbKeys[key]);
    } else if (key[0] === key[0].toUpperCase()) {
      // should be a class
      expect(typeof ML[key]).toBe('function');
      expect(typeof ML[key].prototype).toBe('object');
      expect(ML[key].prototype?.constructor).toBe(ML[key]);
    } else {
      // should be function
      expect(typeof ML[key]).toBe('function');
    }
  });
});

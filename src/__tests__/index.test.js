import { it, describe, expect } from 'vitest';

import * as ML from '..';

describe('Check all properties are defined', () => {
  it.each(Object.keys(ML))('Check %s', (key) => {
    expect(ML[key]).toBeDefined();
  });
});

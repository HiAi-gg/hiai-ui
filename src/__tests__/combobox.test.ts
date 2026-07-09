import { describe, expect, it } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Combobox Component Build Artifacts', () => {
  const distPath = resolve(process.cwd(), 'dist/components/ui/combobox');

  it('should have combobox component dist files', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('should have combobox sub-components', () => {
    const files = readdirSync(distPath);
    expect(files.length).toBeGreaterThan(0);
  });
});
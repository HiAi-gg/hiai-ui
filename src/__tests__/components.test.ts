import { describe, expect, it } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('DropdownMenu Component Build Artifacts', () => {
  const distPath = resolve(process.cwd(), 'dist/components/ui/dropdown-menu');

  it('should have dropdown-menu component dist files', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('should have dropdown-menu sub-components', () => {
    const files = readdirSync(distPath);
    expect(files.length).toBeGreaterThan(0);
  });
});

describe('Popover Component Build Artifacts', () => {
  const distPath = resolve(process.cwd(), 'dist/components/ui/popover');

  it('should have popover component dist files', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('should have popover sub-components', () => {
    const files = readdirSync(distPath);
    expect(files.length).toBeGreaterThan(0);
  });
});

describe('Command Component Build Artifacts', () => {
  const distPath = resolve(process.cwd(), 'dist/components/ui/command');

  it('should have command component dist files', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('should have command sub-components', () => {
    const files = readdirSync(distPath);
    expect(files.length).toBeGreaterThan(0);
  });
});
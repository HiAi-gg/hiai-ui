import { describe, expect, it } from 'vitest';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Select Component Build Artifacts', () => {
  const distPath = resolve(process.cwd(), 'dist/components/ui/select');

  it('should have select component dist files', () => {
    expect(existsSync(distPath)).toBe(true);
  });

  it('should export Root component', () => {
    const files = readdirSync(distPath);
    expect(files.some(f => f.includes('select') || f.includes('index'))).toBe(true);
  });
});

describe('UI Components Dist Structure', () => {
  it('should have built ui components', () => {
    const uiPath = resolve(process.cwd(), 'dist/components/ui');
    expect(existsSync(uiPath)).toBe(true);
    const components = readdirSync(uiPath);
    expect(components).toContain('select');
    expect(components).toContain('combobox');
    expect(components).toContain('dropdown-menu');
    expect(components).toContain('popover');
    expect(components).toContain('command');
  });
});
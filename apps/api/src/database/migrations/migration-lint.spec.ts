import { readdirSync } from 'node:fs';
import { join } from 'node:path';

describe('migration filename lint', () => {
  it('has strictly increasing and unique numeric timestamp prefixes', () => {
    const migrationsDir = join(__dirname);
    const files = readdirSync(migrationsDir).filter(
      (file) => file.endsWith('.ts') && !file.endsWith('.spec.ts'),
    );

    const timestamps: number[] = [];
    for (const file of files) {
      const match = file.match(/^(\d+)-/);
      expect(match).not.toBeNull();
      const ts = Number(match![1]);
      timestamps.push(ts);
    }

    const uniqueTimestamps = new Set(timestamps);
    expect(uniqueTimestamps.size).toBe(timestamps.length);

    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i]).toBeGreaterThan(timestamps[i - 1]);
    }
  });
});

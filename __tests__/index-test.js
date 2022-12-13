import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const resultStylish = readFixture('stylish.txt');
const resultPlain = readFixture('plain.txt');
const resultJson = readFixture('json.txt');

describe('test', () => {
  it('testing json format', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  });

  it('testing yml format', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2)).toBe(resultStylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toBe(resultPlain);
    expect(genDiff(filepath1, filepath2, 'json')).toBe(resultJson);
  });
});

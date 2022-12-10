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
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(resultStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(resultStylish);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(resultPlain);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(resultJson);
  });

  it('testing yml format', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(resultStylish);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toBe(resultStylish);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(resultPlain);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(resultJson);
  });
});

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtures = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const actual = (file) => readFixtures(file);
const expected = (filename1, filename2, formatName = 'stylish') => parser(getFixturePath(filename1), getFixturePath(filename2), formatName);

describe('test', () => {
  it('testing json format', () => {
    expect(actual('stylish.txt')).toBe(expected('file1.json', 'file2.json'));

    expect(actual('stylish.txt')).toBe(expected('file1.json', 'file2.json', 'stylish'));

    expect(actual('plain.txt')).toBe(expected('file1.json', 'file2.json', 'plain'));

    expect(actual('json.txt')).toBe(expected('file1.json', 'file2.json', 'json'));
  });

  it('testing yml format', () => {
    expect(actual('stylish.txt')).toBe(expected('file1.yml', 'file2.yml'));

    expect(actual('stylish.txt')).toBe(expected('file1.yml', 'file2.yml', 'stylish'));

    expect(actual('plain.txt')).toBe(expected('file1.yml', 'file2.yml', 'plain'));

    expect(actual('json.txt')).toBe(expected('file1.yml', 'file2.yml', 'json'));
  });
});

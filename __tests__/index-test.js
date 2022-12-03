import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('test filepath.json', () => {
  const expected = readFile('resultFilepath.txt');
  const actual = parser(getFixturePath('filepath1.json'), getFixturePath('filepath2.json'), 'stylish');
  expect(actual).toBe(expected);
});

test('test filepath.yml', () => {
  const expected = readFile('resultFilepath.txt');
  const actual = parser(getFixturePath('filepath1.yml'), getFixturePath('filepath2.yml'), 'stylish');
  expect(actual).toBe(expected);
});

test('test file json', () => {
  const expected = readFile('result.txt');
  const actual = parser(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expect(actual).toBe(expected);
});

test('test file yml', () => {
  const expected = readFile('result.txt');
  const actual = parser(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  expect(actual).toBe(expected);
});

test('test plain json', () => {
  const expected = readFile('resultPlain.txt');
  const actual = parser(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toBe(expected);
});

test('test plain yml', () => {
  const expected = readFile('resultPlain.txt');
  const actual = parser(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actual).toBe(expected);
});

test('test json', () => {
  const expected = readFile('resultJson.txt');
  const actual = parser(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expect(actual).toBe(expected);
});

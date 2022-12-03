import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('test filepath.json', () => {
  const filename1 = getFixturePath('filepath1.json');
  const filename2 = getFixturePath('filepath2.json');
  const resultFilepath = getFixturePath('resultFilepath.txt');
  const result = readFileSync(resultFilepath, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('test filepath.yml', () => {
  const filename1 = getFixturePath('filepath1.yml');
  const filename2 = getFixturePath('filepath2.yml');
  const resultFilepath = getFixturePath('resultFilepath.txt');
  const result = readFileSync(resultFilepath, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('test file json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultname = getFixturePath('result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('test file yml', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');
  const resultname = getFixturePath('result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('test plain json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultPlain = getFixturePath('resultPlain.txt');
  const result = readFileSync(resultPlain, 'utf8');
  expect(parser(filename1, filename2, 'plain')).toBe(result);
});

test('test plain yml', () => {
  const filename1 = getFixturePath('file1.yml');
  const filename2 = getFixturePath('file2.yml');
  const resultPlain = getFixturePath('resultPlain.txt');
  const result = readFileSync(resultPlain, 'utf8');
  expect(parser(filename1, filename2, 'plain')).toBe(result);
});

test('test json', () => {
  const filename1 = getFixturePath('file1.json');
  const filename2 = getFixturePath('file2.json');
  const resultJson = getFixturePath('resultJson.txt');
  const result = readFileSync(resultJson, 'utf8');
  expect(parser(filename1, filename2, 'json')).toBe(result);
});

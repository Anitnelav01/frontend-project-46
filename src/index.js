import path from 'path';
import { readFileSync } from 'fs';
import buildDiff from './buildDiff.js';
import parse from './parse.js';
import format from './formatters/index.js';

const extractFormat = (filename) => path.extname(filename).slice(1);
const buildFullPath = (filepath) => parse(readFileSync(path.resolve(process.cwd(), filepath), 'utf8'), extractFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = buildFullPath(filepath1);
  const data2 = buildFullPath(filepath2);
  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;

import path from 'path';
import { readFileSync } from 'fs';
import buildDiff from './buildDiff.js';
import parse from './parse.js';
import format from './formatters/index.js';

const getFullPath = (filename) => path.resolve(process.cwd(), filename);
const getFormat = (filename) => path.extname(filename).slice(1);
const getData = (filepath) => parse(readFileSync(getFullPath(filepath), 'utf8'), getFormat(filepath));

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;

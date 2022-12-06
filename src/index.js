import path from 'path';
import { readFileSync } from 'fs';
import buildDiff from './buildDiff.js';
import parser from './parse.js';
import format from './formatters/index.js';

const getFullPath = (filename) => path.resolve(process.cwd(), filename);
const getFormat = (filename) => path.extname(filename).slice(1);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getData = (filepath) => parser(readFileSync(getFullPath(filepath), 'utf8'), getFormat(filepath));
  const diff = buildDiff(getData(filepath1), getData(filepath2));
  return format(diff, formatName);
};

export default genDiff;

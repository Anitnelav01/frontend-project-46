import path from 'path';
import { readFileSync } from 'fs';
import buildDiff from './buildDiff.js';
import parse from './parse.js';
import formatStylish from './formatters/formatStylish.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);
const getFileFormat = (filename) => path.extname(filename).slice(1);
const readFile = (filepath) => readFileSync(filepath, 'utf8');

const parser = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = parse(readFile(path1), getFileFormat(filepath1));
  const path2 = getPath(filepath2);
  const data2 = parse(readFile(path2), getFileFormat(filepath2));

  const diff = buildDiff(data1, data2);
  const formattedDiff = formatStylish(diff);
  return formattedDiff;
};

export default parser;

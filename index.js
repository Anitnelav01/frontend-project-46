import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const getFileFormat = (filename) => path.extname(filename).slice(1);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const diff = keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { state: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { state: 'removed' , key, value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { state: 'unchanged', key, value: data1[key]};
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { state: 'complex', key, value: buildDiff(data1[key], data2[key]) };
    }
    return { state: 'updated', key, value: { oldValue: data1[key], newValue: data2[key] } }; 
  });
  return diff;
};

const parser = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const data1 = JSON.parse(readFile(path1), getFileFormat(filepath1));
  const path2 = getPath(filepath2);
  const data2 = JSON.parse(readFile(path2), getFileFormat(filepath2));

  const diff = buildDiff(data1, data2);
  const formattedDiff = formatStylish(diff);
  return formattedDiff;
};

const parseDiff = (diff) => {
  const items = diff.flatMap(({ state, key, value }) => {
    if (state === 'removed') {
      return ` -  ${key}: ${value}`;
    }
    if (state === 'unchanged') {
      return `    ${key}: ${value}`;
    }
    if (state === 'complex') {
      formatStylish(diff);
    }
    if (state === 'added') {
      return ` +  ${key}: ${value}`;
    }
    if (state === 'updated') {
      return [` -  ${key}: ${value.oldValue}`, ` +  ${key}: ${value.newValue}`];
    }
  });
  const body = items.join('\n');
  return wrapBrackets(body);
};
const wrapBrackets = (body) => `{\n${body}\n}`;
const formatStylish = (diff) => parseDiff(diff);

export default parser;

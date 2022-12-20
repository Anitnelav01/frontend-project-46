import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const output = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const iter = (tree, depth) => tree.map((node) => {
  const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
  switch (node.type) {
    case 'added':
      return `${indent(depth)}${'+'} ${node.key}: ${stringify(node.value, depth)}\n`;
    case 'deleted':
      return `${indent(depth)}${'-'} ${node.key}: ${stringify(node.value, depth)}\n`;
    case 'updated':
      return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
    case 'complex':
      return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
    default:
      return getValue(node.value, ' ');
  }
});

const formatStylish = (diff) => `{\n${iter(diff, 1).join('')}}`;

export default formatStylish;

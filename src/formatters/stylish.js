import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const output = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${output.join('\n')}\n  ${indent(depth)}}`;
};

const iter = (tree, depth) => tree.map((node) => {
  switch (node.type) {
    case 'added':
      return `${indent(depth)}${'+'} ${node.key}: ${stringify(node.value, depth)}\n`;
    case 'deleted':
      return `${indent(depth)}${'-'} ${node.key}: ${stringify(node.value, depth)}\n`;
    case 'updated':
    {
      const output1 = `${indent(depth)}${'-'} ${node.key}: ${stringify(node.value1, depth)}\n`;
      const output2 = `${indent(depth)}${'+'} ${node.key}: ${stringify(node.value2, depth)}\n`;
      return `${output1}${output2}`;
    }
    case 'complex':
    {
      const output = iter(node.children, depth + 1);
      return `${indent(depth)}  ${node.key}: {\n${output.join('')}${indent(depth)}  }\n`;
    }
    default:
      return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}\n`;
  }
});

const formatStylish = (diff) => `{\n${iter(diff, 1).join('')}}`;

export default formatStylish;

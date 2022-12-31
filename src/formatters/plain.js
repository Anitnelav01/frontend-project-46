import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value) && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const iter = (nodes, parent) => nodes
  .filter((node) => node.type !== 'unchanged')
  .map((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'updated':
        return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        return `${iter(node.children, property)}`;
    }
  }).join('\n');

const formatPlain = (diff) => iter(diff, '');

export default formatPlain;

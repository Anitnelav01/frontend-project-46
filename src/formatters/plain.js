const prepareValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return null;
  }
  return `${value}`;
};

const formatPlain = (diff) => {
  const filteredDiff = (nodes, parent) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${property}' was added with value: ${prepareValue(node.value)}`;
        case 'deleted':
          return `Property '${property}' was removed`;
        case 'updated':
          return `Property '${property}' was updated. From ${prepareValue(node.value1)} to ${prepareValue(node.value2)}`;
        default:
          return `${filteredDiff(node.children, property)}`;
      }
    }).join('\n');
  return filteredDiff(diff, 0);
};

export default formatPlain;

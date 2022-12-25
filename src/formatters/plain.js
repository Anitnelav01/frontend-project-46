const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return String(null);
  }
  return String(value);
};

const formatPlain = (diff) => {
  const filteredDiff = (nodes, parent) => nodes
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
          return `${filteredDiff(node.children, property)}`;
      }
    }).join('\n');
  return filteredDiff(diff, '');
};

export default formatPlain;

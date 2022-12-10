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

const formatPlain = (diff, path = []) => {
  const filteredDiff = diff.filter((item) => item.type !== 'unchanged');
  const output = filteredDiff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');
    switch (item.type) {
      case 'removed':
        return `Property '${node}' was removed`;

      case 'added': {
        const val = prepareValue(item.value);
        return `Property '${node}' was added with value: ${val}`; }

      case 'updated': {
        const val1 = prepareValue(item.value.val1);
        const val2 = prepareValue(item.value.val2);
        return `Property '${node}' was updated. From ${val1} to ${val2}`; }

      default:
        return formatPlain(item.value, newPath);
    }
  }).join('\n');

  return output;
};

export default formatPlain;

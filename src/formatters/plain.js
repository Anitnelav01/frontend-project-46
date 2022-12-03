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
  const filteredDiff = diff.filter((item) => item.state !== 'unchanged');
  const output = filteredDiff.map((item) => {
    const newPath = path.concat(item.key);
    const node = newPath.join('.');
    switch (item.state) {
      case 'removed':
        return `Property '${node}' was removed`;

      case 'added': {
        const val = prepareValue(item.value);
        return `Property '${node}' was added with value: ${val}`; }

      case 'updated': {
        const oldVal = prepareValue(item.value.oldValue);
        const newVal = prepareValue(item.value.newValue);
        return `Property '${node}' was updated. From ${oldVal} to ${newVal}`; }

      default:
        return formatPlain(item.value, newPath);
    }
  }).join('\n');

  return output;
};

export default formatPlain;

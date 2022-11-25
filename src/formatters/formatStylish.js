const wrapBrackets = (body) => `{\n${body}\n}`;

const parseDiff = (diff) => {
  const items = diff.flatMap(({ state, key, value }) => {
    if (state === 'removed') {
      return [`  - ${key}: ${value}`];
    }
    if (state === 'unchanged') {
      return [`    ${key}: ${value}`];
    }
    if (state === 'complex') {
      parseDiff(diff);
    }
    if (state === 'added') {
      return [`  + ${key}: ${value}`];
    }
    if (state === 'updated') {
      return [`  - ${key}: ${value.oldValue}`, `  + ${key}: ${value.newValue}`];
    }
    return [`${key}: ${value}`];
  });

  const body = items.join('\n');
  return wrapBrackets(body);
};

const formatStylish = (diff) => parseDiff(diff);

export default formatStylish;

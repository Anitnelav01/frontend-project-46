import _ from 'lodash';

const beforeString = (depth) => `  ${' '.repeat(4).repeat(depth - 1)}`;
const afterString = (depth) => `${' '.repeat(4).repeat(depth)}`;
const getString = (key, value, char, depth) => `${beforeString(depth)}${char}${key}: ${value}`;
const wrapBrackets = (body, depth) => `{\n${body}\n${afterString(depth)}}`;

const prepareValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const entries = Object.entries(value);
  const items = entries.map(([key, val]) => getString(key, prepareValue(val, depth + 1), '  ', depth + 1));
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const parseDiff = (diff, depth) => {
  const items = diff.flatMap(({ key, value, state }) => {
    const chars = { added: '+ ', removed: '- ', unchanged: '  ' };
    if (state === 'updated') {
      return [getString(key, prepareValue(value.oldValue, depth + 1), chars.removed, depth + 1),
        getString(key, prepareValue(value.newValue, depth + 1), chars.added, depth + 1)];
    }
    if (state === 'complex') {
      return getString(key, parseDiff(value, depth + 1), '  ', depth + 1);
    }
    return getString(key, prepareValue(value, depth + 1), chars[state], depth + 1);
  });
  const body = items.join('\n');
  return wrapBrackets(body, depth);
};

const formatStylish = (diff) => parseDiff(diff, 0);

export default formatStylish;

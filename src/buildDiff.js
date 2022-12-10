import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const getKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  return getKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: value1 };
    }
    if (value1 === value2) {
      return { type: 'unchanged', key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'complex', key, value: buildDiff(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, value: { val1: value1, val2: value2 },
      };
    }
    return { type: 'updated', key, val: value1 };
  });
};

export default buildDiff;

import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const diff = keys.flatMap((key) => {
    if (!_.has(data1, key)) {
      return { state: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { state: 'removed' , key, value: data1[key] };
    }
    if (data1[key] === data2[key]) {
      return { state: 'unchanged', key, value: data1[key]};
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { state: 'complex', key, value: buildDiff(data1[key], data2[key]) };
    }
    return { state: 'updated', key, value: { oldValue: data1[key], newValue: data2[key] } }; 
  });
  return diff;
};

export default buildDiff;
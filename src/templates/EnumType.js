import _ from 'lodash';

export default (type, values) => `
const ${type} = new GraphQLEnumType({
  name: '${type}',
  values: {
    ${_.map(values, (val, key) => `${key}: '${val}'`).join(',\n    ')}
  },
});
`;

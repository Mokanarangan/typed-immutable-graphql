import {
  GraphQLEnumType
} from 'graphql/type';

const enumValType = new GraphQLEnumType({
  name: 'enumValType',
  values: {
    SALARY: { value: 'SALARY' },
    HOURLY: { value: 'HOURLY' }
  },
});

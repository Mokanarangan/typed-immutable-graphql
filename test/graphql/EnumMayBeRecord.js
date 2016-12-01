

import {
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const EnumValType = new GraphQLEnumType({
  name: 'EnumValType',
  values: {
    SALARY: { value: 'SALARY' },
    HOURLY: { value: 'HOURLY' }
  },
});

const EmployeeType = new GraphQLObjectType({
  name: 'EmployeeType',
  fields: {
      id : {
        type: new GraphQLNonNull(GraphQLString),
      },
      salaryType : {
        type: EnumValType,
      }
  }
});
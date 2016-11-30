

import {
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const EnumValType = new GraphQLEnumType({
  name: 'EnumValType',
  values: {
    SALARY: 'SALARY',
    HOURLY: 'HOURLY'
  },
});

const EmployeeType = new GraphQLObjectType({
  name: 'EmployeeType',
  fields: {
      id : {
        type: new GraphQLNonNull(GraphQLString),
      },
      salaryType : {
        type: new GraphQLNonNull(EnumValType),
      }
  }
});
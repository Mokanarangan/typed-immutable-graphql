

import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      id : {
        type: GraphQLInt,
      },
      name : {
        type: GraphQLString,
      }
  }
});


import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      float : {
        type: GraphQLFloat,
      },
      floatNonNull : {
        type: new GraphQLNonNull(GraphQLFloat),
      }
  }
});
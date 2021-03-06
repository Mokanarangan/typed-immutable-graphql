

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      list : {
        type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      }
  }
});
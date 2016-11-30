

import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      id : {
        type: GraphQLString,
      },
      type : {
        type: GraphQLString,
      }
  }
});

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
      id : {
        type: GraphQLInt,
      },
      tickets : {
        type: new GraphQLList(TicketType),
      }
  }
});
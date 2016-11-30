

import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql/type';

const TicketType = new GraphQLObjectType({
  name: 'TicketType',
  fields: {
      id : {
        type: GraphQLString,
      },
      message : {
        type: new GraphQLNonNull(GraphQLInt),
      }
  }
});

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
      id : {
        type: new GraphQLNonNull(GraphQLString),
      },
      tickets : {
        type: new GraphQLNonNull(TicketType),
	 resolve(member) {
        return [{ id: 1, message: 'Member: ' + member.id + ', Ticket: 1' }, { id: 2, message: 'Member: ' + member.id + ', Ticket: 2' }];
      }
      }
  }
});
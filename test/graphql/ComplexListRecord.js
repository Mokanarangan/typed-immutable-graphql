

import {
  GraphQLInt,
  GraphQLList,
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
        type: new GraphQLNonNull(new GraphQLList(TicketType)),
	 resolve(memeber) {
        return [{ id: 1, message: 'Member: ' + member.id + ', Ticket: 1' }, { id: 2, message: 'Member: ' + member.id + ', Ticket: 2' }];
      }
      }
  }
});
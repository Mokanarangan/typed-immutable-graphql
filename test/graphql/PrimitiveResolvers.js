

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
	 resolve(member) {
        return [{ id: 1, message: 'Member: ' + member.id + ', Ticket: 1' }, { id: 2, message: 'Member: ' + member.id + ', Ticket: 2' }];
      }
      },
      str : {
        type: GraphQLString,
      }
  }
});
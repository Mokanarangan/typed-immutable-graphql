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
        type: new GraphQLNonNull(GraphQLInt),
      },
      name : {
        type: new GraphQLNonNull(GraphQLString),
      }
  }
}); 
